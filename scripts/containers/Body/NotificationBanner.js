import React from 'react';
import _NotificationBanner from '@components/notificationBanner';
import usePushNotifications from '@hooks/usePushNotifications';
import useInstall from '@hooks/useInstall';

function NotificationBanner() {
    const {
        notificationStatus,
        onRequestNotificationAccess,
        onDeclineNotificationAccess
    } = usePushNotifications();
    const {
        onRequestInstall,
        onDeclineInstall,
        isInstallAvailable
    } = useInstall();

    if (isInstallAvailable) {
        return (
            <_NotificationBanner
                title="Install App"
                description="Install our application to more quickly access your tasks."
                primaryButtonCopy="Install"
                primaryButtonAction={onRequestInstall}
                secondaryButtonCopy="Dismiss"
                secondaryButtonAction={onDeclineInstall}
            />
        );
    }

    if (notificationStatus === 'UNKNOWN') {
        return (
            <_NotificationBanner
                title="Get notified"
                description="Enable push notifications so we can notify you when a task is due as well as when a friend updates a shared list."
                primaryButtonCopy="Enable"
                primaryButtonAction={onRequestNotificationAccess}
                secondaryButtonCopy="Dismiss"
                secondaryButtonAction={onDeclineNotificationAccess}
            />
        );
    }
    return null;
}

export default NotificationBanner;
