import React from 'react';
import _NotificationBanner from '@components/notificationBanner';
import usePushNotifications from '@hooks/usePushNotifications';
import useInstall from '@hooks/useInstall';
import useCurrentListId from '@hooks/useCurrentListId';
import useListDetails from '@hooks/useListDetails';

function NotificationBanner() {
    const currentListId = useCurrentListId();
    const { list, loading, error } = useListDetails(currentListId);
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

    let doesListHaveNotifications = false;
    if (!loading && !error && list && list.members) {
        const isSharedList = list.members.length > 1;
        const doesListHaveDueDates = Boolean(
            list.tasks.find(task => task.dueDate)
        );
        console.log({ isSharedList, doesListHaveDueDates });
        doesListHaveNotifications = isSharedList || doesListHaveDueDates;
    }

    if (doesListHaveNotifications && notificationStatus === 'UNKNOWN') {
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
