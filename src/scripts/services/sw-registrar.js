import {
    requestNotificationAccess,
    getNotificationSubscription
} from 'web-pushnotifications/web';

class ServiceWorkerRegistrar {
    constructor() {
        this._notificationStatus = 'UNKNOWN';
        this.OfflinePluginRuntime = null;
        this.installPrompt = null;
        this.onUpdateAvailableCallbacks = [];
        this.addToHomeScreenAvailableCallbacks = [];
        this.notificationAccessCallbacks = [];
        this._init();
    }

    _init() {
        this.OfflinePluginRuntime = import('offline-plugin/runtime').then(
            dep => dep.default
        );

        this.OfflinePluginRuntime.then(OfflinePluginRuntime => {
            OfflinePluginRuntime.install({
                onUpdateReady: () => this._whenUpdateAvailable(),
                onUpdated: () => this._whenUpdateCompleted()
            });
        });
        if (window) {
            window.addEventListener('beforeinstallprompt', e => {
                // Prevent automatically showing the prompt
                e.preventDefault();
                // Store event for later use
                this.installPrompt = e;
                // Notify listeners
                this._whenHomescreenStateChanges(true);
            });

            window.addEventListener('appinstalled', () => {
                this._whenHomescreenStateChanges(false);
            });

            this.getNotificationStatus();
        }
    }

    /**
     * Method to manually check for updates
     * This is done automatically usually, but exposed
     * incase required.
     */
    checkForUpdates() {
        this.OfflinePluginRuntime.then(OfflinePluginRuntime =>
            OfflinePluginRuntime.update()
        );
    }

    /**
     * Method to apply the update. Call this method
     * from a user interaction with "Update is available"
     * message.
     *
     * NOTE: This will trigger window reload!
     */
    applyUpdates() {
        this.OfflinePluginRuntime.then(OfflinePluginRuntime =>
            OfflinePluginRuntime.applyUpdate()
        );
    }

    onAddToHomeScreenAvailable(cb) {
        if (this.installPrompt) {
            return true;
        } else if (cb && typeof cb === 'function') {
            this.addToHomeScreenAvailableCallbacks.push(cb);
        }
    }

    requestAddToHomeScreenPrompt() {
        if (this.installPrompt) {
            this.installPrompt.prompt();
            return this.installPrompt.userChoice.then(choiceResult => {
                this.installPrompt = null;
                if (choiceResult.outcome === 'accepted') {
                    return true;
                } else {
                    return false;
                }
            });
        }
    }

    set notificationStatus(status) {
        this._notificationStatus = status;
        this.notificationAccessCallbacks.forEach(cb => cb(status));
    }

    subscribeToNotificationUpdates(cb) {
        this.notificationAccessCallbacks.push(cb);
    }

    async getNotificationStatus() {
        this.notificationStatus = 'DISABLED';
        const subscription = await getNotificationSubscription();
        const status = subscription ? 'ENABLED' : 'UNKNOWN';
        this.notificationStatus = status;
        return status;
    }

    async requestNotificationAccess(vapidKey) {
        console.info('Requesting user notification subscription');
        const subscription = await requestNotificationAccess(vapidKey);
        if (subscription) {
            console.info('Sucessfully got user subscription', subscription);
            this.notificationStatus = 'ENABLED';
            return subscription;
        } else {
            this.notificationStatus = 'DISABLED';
        }
    }

    /**
     * Called when an update to the app is available from the service worker.
     * @param {Function} cb
     */
    onUpdateAvailable(cb) {
        if (cb && typeof cb === 'function') {
            this.onUpdateAvailableCallbacks.push(cb);
        }
    }

    _whenUpdateAvailable() {
        this.onUpdateAvailableCallbacks.forEach(cb => {
            cb();
        });
    }

    _whenHomescreenStateChanges(state) {
        this.addToHomeScreenAvailableCallbacks.forEach(cb => {
            cb(state);
        });
    }

    _whenUpdateCompleted() {
        window.location.reload();
    }
}

export default new ServiceWorkerRegistrar();
