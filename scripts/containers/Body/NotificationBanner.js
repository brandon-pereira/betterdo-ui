import NotificationBanner from '../../components/notificationBanner';

const store = this.props.store;
let isSharedList = false;
let doesListHaveDueDates = false;
if (store.currentList.type !== 'loading') {
    isSharedList = store.currentList.members.length > 1;
    doesListHaveDueDates = Boolean(
        store.currentList.tasks.find(task => task.dueDate)
    );
}
if (store.appUpdateAvailable) {
    return (
        <NotificationBanner
            title="App Update Available"
            description="Update to get the most out of your BetterDo experience."
            primaryButtonCopy="Update"
            primaryButtonAction={() => store.applyAppUpdate()}
        />
    );
    // here check if any due dates set OR is shared list && pushNotificationAvailable
} else if (
    !localStorage.getItem('banners.pushDisabled') &&
    store.notificationStatus === 'UNKNOWN' &&
    store.user &&
    store.user.isPushEnabled &&
    (isSharedList || doesListHaveDueDates)
) {
    return (
        <NotificationBanner
            title="Get notified"
            description="Enable push notifications so we can notify you when a task is due as well as when a friend updates a shared list."
            primaryButtonCopy="Enable"
            primaryButtonAction={() =>
                store.requestNotificationAccess()
            }
            secondaryButtonCopy="Dismiss"
            secondaryButtonAction={() => {
                localStorage.setItem('banners.pushDisabled', true);
                this.setState({});
            }}
        />
    );
} else if (
    !localStorage.getItem('banners.a2hDisabled') &&
    store.addToHomeScreenAvailable
) {
    return (
        <NotificationBanner
            title="Install App"
            description="Install our application to more quickly access your tasks."
            primaryButtonCopy="Install"
            primaryButtonAction={() => store.addToHomeScreen()}
            secondaryButtonCopy="Dismiss"
            secondaryButtonAction={() => {
                localStorage.setItem('banners.a2hDisabled', true);
                this.setState({});
            }}
        />
    );