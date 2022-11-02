import { useCallback, useEffect, useState } from 'react';

import useModifyProfile from '@hooks/useModifyProfile';
import useProfile from '@hooks/useProfile';

const STATES = {
    UNKNOWN: 'UNKNOWN',
    DISABLED: 'DISABLED',
    ENABLED: 'ENABLED'
} as const;

type valueof<T> = T[keyof T];

function usePushNotifications() {
    const { profile, loading, error } = useProfile();
    const modifyProfile = useModifyProfile();
    const [status, setStatus] = useState<valueof<typeof STATES>>(
        STATES.DISABLED
    );

    useEffect(() => {
        (async () => {
            setStatus(STATES.DISABLED);
            if (
                !profile?.isPushEnabled ||
                localStorage.getItem('banners.pushDisabled')
            ) {
                return;
            }
            const subscription = await _getNotificationSubscription();
            if (subscription) {
                setStatus(STATES.ENABLED);
            } else {
                setStatus(STATES.UNKNOWN);
            }
        })();
    }, [profile]);

    const onRequestNotificationAccess = useCallback(async () => {
        console.info('Requesting user notification subscription');
        if (loading || error) {
            console.warn(
                'Requesting user notification subscription before ready!'
            );
            return;
        }
        const subscription = await _requestNotificationAccess(
            profile?.config.vapidKey
        );
        if (subscription) {
            console.info('Successfully got user subscription', subscription);
            setStatus('ENABLED');
            modifyProfile({ pushSubscription: subscription });
            return subscription;
        } else {
            localStorage.setItem('banners.pushDisabled', 'true');
            setStatus('DISABLED');
        }
    }, [profile, modifyProfile, loading, error]);

    const onDeclineNotificationAccess = useCallback(() => {
        setStatus('DISABLED');
        localStorage.setItem('banners.pushDisabled', 'true');
    }, []);

    return {
        notificationStatus: status,
        onDeclineNotificationAccess,
        onRequestNotificationAccess
    };
}

const _getNotificationSubscription = async () => {
    if (navigator.serviceWorker) {
        try {
            const reg = await navigator.serviceWorker.ready;
            const subscription = await reg.pushManager.getSubscription();
            if (subscription) {
                const jsonSubscription = JSON.stringify(subscription);
                return jsonSubscription;
            }
            return false;
        } catch (err) {
            console.error(
                'Received error while getting user subscription',
                err
            );
            return false;
        }
    } else {
        console.error('No Service Worker detected ');
        return false;
    }
};

const _requestNotificationAccess = async (vapidPublicKey?: string) => {
    if (navigator.serviceWorker && vapidPublicKey) {
        try {
            const reg = await navigator.serviceWorker.ready;
            const subscription = await reg.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: urlBase64ToUint8Array(vapidPublicKey)
            });
            const jsonSubscription = JSON.stringify(subscription);
            return jsonSubscription;
        } catch (err) {
            console.error(
                'Received error while getting user subscription',
                err
            );
            return null;
        }
    } else {
        console.error('No Service Worker detected or no VAPID_PUBLIC_KEY');
    }
};

// https://gist.github.com/malko/ff77f0af005f684c44639e4061fa8019
const urlBase64ToUint8Array = (base64String: string) => {
    const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding)
        .replace(/-/g, '+')
        .replace(/_/g, '/');
    const rawData = window.atob(base64);
    return Uint8Array.from([...rawData].map(char => char.charCodeAt(0)));
};

export default usePushNotifications;
