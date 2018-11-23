class ServiceWorkerRegistrar {
    constructor() {
        this.OfflinePluginRuntime = null;
        this.installPrompt = null;
        this.onUpdateAvailableCallbacks = [];
        this.addToHomeScreenAvailableCallbacks = [];
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
