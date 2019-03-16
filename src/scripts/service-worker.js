/**
 * This file gets merged with 'offline-plugin' in the webpack config. As such,
 * it's good to ensure that any modifications are tested well for mutations.
 */

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
    // we split the tag by ":" because we pass identifiers after colon
    const createMultiMessage =
        multiReplyResponses[notification.tag.split(':')[0]];
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
                self.registration.showNotification(title, {
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

function getNotificationsByTag(tag) {
    return self.registration.getNotifications({ tag });
}
