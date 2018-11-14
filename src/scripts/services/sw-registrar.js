class ServiceWorkerRegistrar {
    constructor() {
        this.OfflinePluginRuntime = null;
        this.onUpdateAvailableCallbacks = [];
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
