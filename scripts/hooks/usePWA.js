import { useCallback, useEffect, useState } from 'react';
import ServiceWorkerRegistrar from '@utilities/sw-registrar';

function usePWA() {
    const isEnabled = !localStorage.getItem('banners.a2hDisabled');

    const [isSupported, setSupported] = useState(false);
    const [isUpdateAvailable, setUpdateAvailable] = useState(true);

    useEffect(() => {
        ServiceWorkerRegistrar.onAddToHomeScreenAvailable(bool => {
            if (bool) {
                console.info('Add to home screen available!');
            } else {
                console.info('Added to home screen :)');
            }
            setSupported(bool);
        });
    }, []);

    const update = useCallback(() => {}, []);
    const install = useCallback(() => {}, []);

    return {
        isEnabled,
        isSupported,
        isUpdateAvailable,
        update,
        install
    };
}

export default usePWA;
