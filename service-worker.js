import { precacheAndRoute } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { CacheFirst } from 'workbox-strategies';
import { googleFontsCache } from 'workbox-recipes';

googleFontsCache();
precacheAndRoute(self.__WB_MANIFEST);
registerRoute('/', CacheFirst);

const multiReplyResponses = {
    'shared-list': ({ listTitle, numberOfUpdates }) =>
        `${listTitle} has been updated ${numberOfUpdates} times.`
};

self.addEventListener('push', event => {
    let notification = {};
    try {
        notification = event.data.json();
        if (!notification || !notification.title) {
            throw new Error('Missing title or passed string instead of object');
        }
    } catch (e) {
        console.error('Expected JSON, got text');
        return;
    }
    let createMultiMessage;
    if (notification.tag) {
        // we split the tag by ":" because we pass identifiers after colon
        createMultiMessage =
            multiReplyResponses[notification.tag.split(':')[0]];
    }
    event.waitUntil(
        getNotificationsByTag(notification.tag)
            .then(([oldNotification]) => {
                if (oldNotification && createMultiMessage) {
                    // Increment counter
                    if (oldNotification.data.numberOfUpdates) {
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
                type: 'window'
            })
            .then(clientList => {
                const openClient = clientList.find(client => {
                    if (client.url) {
                        return true;
                    }
                });

                if (openClient && openClient.navigate) {
                    openClient.focus();
                    return openClient.navigate('/');
                } else {
                    clients.openWindow('/');
                }
            })
    );
};

function getNotificationsByTag(tag) {
    return self.registration.getNotifications({ tag });
}
