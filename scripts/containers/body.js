import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { computed } from 'mobx';
import styled from 'styled-components';
import AddTask from '../components/addTask/index';
import NotificationBanner from '../components/notificationBanner';
import Banner from '../components/banner';
import Task from '../components/task';
import Button from '../components/button';
import { QUERIES } from '../constants';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import arrayMove from 'array-move';

const CompletedTasksButton = styled(Button)`
    margin: 0.5rem 1rem;
    text-transform: uppercase;
    user-select: none;
    align-self: start;
    flex-shrink: 0;
    ${props =>
        props.hasCaughtUpBanner &&
        `
        margin: 0 0 -0.5rem;
        align-self: stretch;
        border-radius: 0;
        justify-content: center;
        background-color: #cacaca !important;
    
    `}
}
`;
const Container = styled.div`
    grid-row: 2 / 3;
    grid-column: 2 / 3;
    overflow-y: scroll;
    background: #e4e4e4;
    display: flex;
    flex-direction: column;
    padding-bottom: 0.5rem;
    ${props =>
        props.mobileNavVisible &&
        `
        grid-row: 4;
        ${Banner} {
            opacity: 0;
        }
    `}
    @media ${QUERIES.medium} {
        grid-row: 2 / 3;
        ${Banner} {
            opacity: 1;
        }
    }
`;
const SortableItem = SortableElement(({ value }) => <Task task={value} />);

const SortableList = SortableContainer(({ items }) => {
    return (
        <div>
            {items.map((task, index) => (
                <SortableItem
                    key={typeof task === 'object' ? task._id : index}
                    index={index}
                    value={task}
                />
            ))}
        </div>
    );
});

@inject('store')
@observer
class Body extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loadingCompletedTasks: false
        };
    }

    @computed
    get currentList() {
        return this.props.store.currentList;
    }

    async loadCompletedTasks() {
        this.setState({
            loadingCompletedTasks: true
        });
        await this.props.store.loadCompletedTasks(this.currentList._id);
        this.setState({
            loadingCompletedTasks: false
        });
    }

    onSortEnd({ oldIndex, newIndex }) {
        // Indexes match, no change
        if (oldIndex === newIndex) {
            return;
        }
        this.currentList.tasks = arrayMove(
            this.currentList.tasks,
            oldIndex,
            newIndex
        );
        try {
            this.props.store.updateList(this.currentList._id, {
                tasks: this.currentList.tasks.map(t => t._id)
            });
        } catch (err) {
            console.error(err);
        }
    }

    componentDidMount() {
        let lastRefresh = new Date();
        document.addEventListener('visibilitychange', () => {
            if (!document.hidden) {
                const now = new Date();
                var timeDiff = now - lastRefresh; //in ms
                // strip the ms
                if (!document.hidden && timeDiff >= 5 * 1000) {
                    lastRefresh = new Date();
                    this.props.store.reload();
                }
            }
        });
    }

    componentWillUnmount() {
        document.removeEventListener('visibilitychange');
    }

    getNotificationBanner() {
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
            (store.user && store.user.isPushEnabled) &&
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
        }
    }

    reloadBrowser() {
        if (window && window.location) {
            window.location.reload();
        }
    }

    render() {
        const hasServerError = this.props.store.hasServerError;
        const showAllCaughtUpBanner =
            !hasServerError &&
            this.currentList.tasks.length === 0 &&
            (this.currentList.additionalTasks !== 0 ||
                !this.currentList.completedTasks.find(
                    task => typeof task !== 'string'
                ));
        return (
            <Container
                mobileNavVisible={this.props.store.modalVisibility.listsView}
            >
                {this.getNotificationBanner()}
                <AddTask
                    hidden={
                        this.currentList.type === 'loading' || hasServerError
                    }
                    createTask={title => this.props.store.createTask(title)}
                />
                {showAllCaughtUpBanner && (
                    <Banner icon="betterdo" body="You're all caught up!" />
                )}
                {hasServerError && (
                    <Banner
                        icon="server-error"
                        title="Oops!"
                        body="There was an issue connecting to the server."
                        buttonText="Reload"
                        buttonAction={this.reloadBrowser}
                    />
                )}
                {!hasServerError && (
                    <>
                        <SortableList
                            pressDelay={200}
                            items={this.currentList.tasks}
                            onSortEnd={this.onSortEnd.bind(this)}
                        />
                        <div>
                            {this.currentList.completedTasks.map(
                                (task, index) => {
                                    if (typeof task === 'object') {
                                        return <Task key={index} task={task} />;
                                    }
                                    return null;
                                }
                            )}
                        </div>
                        <CompletedTasksButton
                            hidden={
                                hasServerError ||
                                this.currentList.type === 'loading' ||
                                !this.currentList.additionalTasks ||
                                this.currentList.additionalTasks === 0
                            }
                            hasCaughtUpBanner={showAllCaughtUpBanner}
                            isLoading={this.state.loadingCompletedTasks}
                            color="#999999"
                            onClick={this.loadCompletedTasks.bind(this)}
                        >
                            {this.currentList.additionalTasks} completed tasks
                        </CompletedTasksButton>
                    </>
                )}
            </Container>
        );
    }
}

export default Body;
