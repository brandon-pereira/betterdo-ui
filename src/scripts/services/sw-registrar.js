class ServiceWorkerRegistrar {
    constructor() {
        this.OfflinePluginRuntime = null;
        this.onUpdateAvailableCallbacks = [];
        this._init();
    }

    async _init() {
        this.OfflinePluginRuntime = (await import('offline-plugin/runtime')).default;
        this.OfflinePluginRuntime.install({
            onUpdateReady: () => this._whenUpdateAvailable(),
            onUpdated: () => this._whenUpdateCompleted()
        });
    }

    /**
     * Method to manually check for updates
     * This is done automatically usually, but exposed
     * incase required.
     */
    async checkForUpdates() {
        (await this.OfflinePluginRuntime).update();
    }

    /**
     * Method to apply the update. Call this method
     * from a user interaction with "Update is available"
     * message.
     *
     * NOTE: This will trigger window reload!
     */
    async applyUpdates() {
        (await this.OfflinePluginRuntime).applyUpdate();
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

    _whenUpdateCompleted() {
        window.location.reload();
    }
}

export default new ServiceWorkerRegistrar();
