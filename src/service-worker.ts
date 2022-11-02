/// <reference lib="webworker" />

declare let self: ServiceWorkerGlobalScope;

import { cleanupOutdatedCaches, precacheAndRoute } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { CacheFirst } from 'workbox-strategies';
import { googleFontsCache } from 'workbox-recipes';
import { clientsClaim } from 'workbox-core';

self.skipWaiting();
clientsClaim();

cleanupOutdatedCaches();
googleFontsCache();
precacheAndRoute(self.__WB_MANIFEST, {
    ignoreURLParametersMatching: [/.*/]
});
registerRoute('/', new CacheFirst());

interface NotificationData {
    listId?: string;
    listTitle?: string;
    numberOfUpdates?: number;
}
interface NotificationPayload {
    title: string;
    body?: string;
    icon?: string;
    url?: string;
    tag?: string;
    data: NotificationData;
}
const multiReplyResponses: Record<string, (data: NotificationData) => string> =
    {
        'shared-list': ({ listTitle, numberOfUpdates }: NotificationData) =>
            `${listTitle} has been updated ${numberOfUpdates} times.`
    };

self.addEventListener('push', event => {
    let notification: NotificationPayload;
    try {
        notification = event.data?.json() as NotificationPayload;
        if (!notification || !notification.title) {
            throw new Error('Missing title or passed string instead of object');
        }
    } catch (e) {
        console.error('Expected JSON, got text');
        return;
    }
    let createMultiMessage: ((data: NotificationData) => string) | null = null;
    if (notification.tag) {
        // we split the tag by ":" because we pass identifiers after colon
        const [tagName] = notification.tag.split(':');
        if (tagName && tagName in multiReplyResponses) {
            createMultiMessage = multiReplyResponses[tagName];
        }
    }
    event.waitUntil(
        getNotificationsByTag(notification.tag)
            .then(([oldNotification]) => {
                if (oldNotification && createMultiMessage) {
                    // Increment counter
                    if (
                        oldNotification.data &&
                        oldNotification.data.numberOfUpdates
                    ) {
                        notification.data.numberOfUpdates =
                            oldNotification.data.numberOfUpdates + 1;
                    } else {
                        notification.data.numberOfUpdates = 2;
                    }
                    // Update title
                    notification.title = createMultiMessage(notification.data);
                    // Close old notification
                    oldNotification.close();
                }
            })
            .then(() => {
                // Send new notification
                const { title, url, data, ...details } = notification;
                return self.registration.showNotification(title, {
                    ...details,
                    data: {
                        url,
                        ...data
                    }
                });
            })
    );
});

self.addEventListener('activate', event => {
    return event.waitUntil(self.clients.claim()); // immediately control activating sw
});

self.onnotificationclick = event => {
    const notification = event.notification;
    const clients = self.clients;

    notification.close();

    // This looks to see if the current is already open and
    // focuses if it is
    event.waitUntil(
        clients
            .matchAll({
                type: 'window',
                includeUncontrolled: true
            })
            .then(clientList => {
                const openClient = clientList.find(client => {
                    return Boolean(client.url);
                });
                const url = notification.data.url || 'https://betterdo.app/app';
                if (openClient) {
                    openClient.focus();
                    openClient.navigate(url);
                } else {
                    clients.openWindow(url);
                }
            })
    );
};

function getNotificationsByTag(tag?: string) {
    return self.registration.getNotifications({ tag });
}
