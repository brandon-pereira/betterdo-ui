import { useCallback, useEffect, useRef, useState } from 'react';

function useInstall() {
    const installPrompt = useRef<BeforeInstallPromptEvent | null>(null);
    const [isInstallAvailable, setAvailable] = useState(false);

    useEffect(() => {
        window.addEventListener('beforeinstallprompt', (e: Event) => {
            // Prevent automatically showing the prompt
            e.preventDefault();
            // Store event for later use
            installPrompt.current = e as BeforeInstallPromptEvent;
            // Notify listeners
            if (!localStorage.getItem('banners.a2hDisabled')) {
                setAvailable(true);
            }
        });

        window.addEventListener('appinstalled', () => {
            // User installed the app, hide the notification
            setAvailable(false);
        });
    });

    const onRequestInstall = useCallback(async () => {
        // No event stored, short circuit
        if (!installPrompt.current) {
            return;
        }
        // Show the dialog
        installPrompt.current.prompt();
        const result = await installPrompt.current.userChoice;
        installPrompt.current = null;
        if (result.outcome === 'accepted') {
            return true;
        } else {
            return false;
        }
    }, []);

    const onDeclineInstall = useCallback(() => {
        localStorage.setItem('banners.a2hDisabled', 'true');
        setAvailable(false);
    }, []);

    return { onRequestInstall, onDeclineInstall, isInstallAvailable };
}

export default useInstall;
