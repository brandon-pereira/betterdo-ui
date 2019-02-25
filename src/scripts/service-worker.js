/**
 * This file gets merged with 'offline-plugin' in the webpack config. As such,
 * it's good to ensure that any modifications are tested well for mutations.
 */
self.addEventListener('push', event => {
    let data = {};
    try {
        data = event.data.json();
        if (!data || !data.title) {
            throw new Error('Missing title or passed string instead of object');
        }
    } catch (e) {
        console.error('Expected JSON, got text');
        return;
    }
    event.waitUntil(
        self.registration.showNotification(data.title, {
            body: data.body,
            icon: data.icon,
            badge: data.badge,
            image: data.image,
            data: {
                url: data.url
            }
        })
    );
});

self.addEventListener('activate', event => {
    return event.waitUntil(self.clients.claim()); // immediately control activating sw
});
