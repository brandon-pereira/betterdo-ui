import { useCallback, useEffect, useState } from 'react';
import {
    requestNotificationAccess as _requestNotificationAccess,
    getNotificationSubscription as _getNotificationSubscription
} from 'web-notifier/web';
import useModifyProfile from './useModifyProfile';
import useProfile from './useProfile';

const STATES = {
    UNKNOWN: 'UNKNOWN',
    DISABLED: 'DISABLED',
    ENABLED: 'ENABLED'
};

function usePushNotifications() {
    const { profile, loading, error } = useProfile();
    const modifyProfile = useModifyProfile();
    const [status, setStatus] = useState(STATES.DISABLED);

    useEffect(() => {
        (async () => {
            setStatus(STATES.DISABLED);
            if (
                !profile.isPushEnabled ||
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
            profile.config.vapidKey
        );
        if (subscription) {
            console.info('Successfully got user subscription', subscription);
            setStatus('ENABLED');
            modifyProfile({ pushSubscription: subscription });
            return subscription;
        } else {
            localStorage.setItem('banners.pushDisabled', true);
            setStatus('DISABLED');
        }
    }, [profile, modifyProfile, loading, error]);

    const onDeclineNotificationAccess = useCallback(() => {
        setStatus('DISABLED');
        localStorage.setItem('banners.pushDisabled', true);
    }, []);

    return {
        notificationStatus: status,
        onDeclineNotificationAccess,
        onRequestNotificationAccess
    };
}

export default usePushNotifications;
