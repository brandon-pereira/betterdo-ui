import _NotificationBanner from '@components/NotificationBanner';
import usePushNotifications from '@hooks/usePushNotifications';
import useInstall from '@hooks/useInstall';
import useCurrentListId from '@hooks/useCurrentListId';
import useListDetails from '@hooks/useListDetails';
import useDarkMode from '@hooks/useDarkMode';
import { getTimeZone } from '@utilities/timezones';
import useModifyProfile from '@hooks/useModifyProfile';
import useTimezones from '@hooks/useTimezones';

function NotificationBanner() {
    const modifyProfile = useModifyProfile();
    const currentListId = useCurrentListId();
    const [darkMode, setPrefersDarkMode] = useDarkMode();
    const { list, loading, error } = useListDetails(currentListId);
    const {
        notificationStatus,
        onRequestNotificationAccess,
        onDeclineNotificationAccess
    } = usePushNotifications();
    const { onRequestInstall, onDeclineInstall, isInstallAvailable } =
        useInstall();
    const { isTimezoneChanged, setDismissed } = useTimezones();

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
    if (!loading && !error && list && list.members && list.tasks) {
        const isSharedList = list.members.length > 1;
        const doesListHaveDueDates = Boolean(
            list.tasks.find(task => task.dueDate)
        );
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

    if (!darkMode && typeof darkMode === 'undefined') {
        return (
            <_NotificationBanner
                title="Dark Mode"
                description="BetterDo now offers dark mode! Would you like to try it out?"
                primaryButtonCopy="Enable"
                primaryButtonAction={() => setPrefersDarkMode(true)}
                secondaryButtonCopy="Dismiss"
                secondaryButtonAction={() => setPrefersDarkMode(false)}
            />
        );
    }

    const localTimeZone = getTimeZone(
        Intl.DateTimeFormat().resolvedOptions().timeZone
    ).name;
    if (isTimezoneChanged) {
        return (
            <_NotificationBanner
                title="Timezone Changed"
                description="Your browsing from a different timezone than what we have on file. Would you like us to adjust your timezone settings?"
                primaryButtonCopy="Adjust"
                primaryButtonAction={() =>
                    modifyProfile({ timeZone: localTimeZone })
                }
                secondaryButtonCopy="Dismiss"
                secondaryButtonAction={() => setDismissed(true)}
            />
        );
    }

    return null;
}

export default NotificationBanner;
