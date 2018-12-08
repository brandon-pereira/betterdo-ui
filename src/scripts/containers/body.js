import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { computed } from 'mobx';
import styled from 'styled-components';
import AddTask from '../components/addTask';
import NotificationBanner from '../components/notificationBanner';
import Task from '../components/task';
import Button from '../components/button';
import { QUERIES } from '../constants';
import {
    SortableContainer,
    SortableElement,
    arrayMove
} from 'react-sortable-hoc';

const CompletedTasksButton = styled(Button)`
    margin: 0.5rem 1rem;
    text-transform: uppercase;
    user-select: none;
`;
const Container = styled.div`
    grid-row: 2 / 3;
    grid-column: 2 / 3;
    overflow-y: scroll;
    background: #e4e4e4;
    ${props =>
        props.mobileNavVisible &&
        `
        grid-row: 4;
    `}
    @media ${QUERIES.medium} {
        grid-row: 2 / 3;
    }
`;
const SortableItem = SortableElement(({ value }) => <Task task={value} />);

const SortableList = SortableContainer(({ items }) => {
    return (
        <div>
            {items.map((task, index) => (
                <SortableItem key={task._id} index={index} value={task} />
            ))}
        </div>
    );
});

@inject('store')
@observer
export default class Body extends Component {
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

    onSortEnd = ({ oldIndex, newIndex }) => {
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
    };

    getNotificationBanner() {
        if (this.props.store.appUpdateAvailable) {
            return (
                <NotificationBanner
                    title="App Update Available"
                    description="Update to get the most out of your BetterDo experience."
                    primaryButtonCopy="Update"
                    primaryButtonAction={() =>
                        this.props.store.applyAppUpdate()
                    }
                />
            );
        } else if (this.props.store.addToHomeScreenAvailable) {
            return (
                <NotificationBanner
                    title="Install App"
                    description="Install our application to more quickly access your tasks."
                    primaryButtonCopy="Install"
                    primaryButtonAction={() =>
                        this.props.store.addToHomeScreen()
                    }
                    secondaryButtonCopy="Dismiss"
                    secondaryButtonAction={() => {
                        this.props.store.addToHomeScreenAvailable = false;
                    }}
                />
            );
        }
    }

    render() {
        return (
            <Container
                mobileNavVisible={this.props.store.modalVisibility.listsView}
            >
                {this.getNotificationBanner()}
                <AddTask hidden={this.currentList.type === 'loading'} />
                <SortableList
                    pressDelay={200}
                    items={this.currentList.tasks.map(task => task)}
                    onSortEnd={this.onSortEnd}
                />
                {this.currentList.completedTasks.map((task, index) => {
                    if (typeof task === 'object') {
                        return <Task key={index} task={task} />;
                    }
                    return null;
                })}
                <CompletedTasksButton
                    hidden={
                        this.currentList.type === 'loading' ||
                        !this.currentList.additionalTasks ||
                        this.currentList.additionalTasks === 0
                    }
                    loading={this.state.loadingCompletedTasks}
                    color="#999999"
                    onClick={this.loadCompletedTasks.bind(this)}
                >
                    {this.currentList.additionalTasks} completed tasks
                </CompletedTasksButton>
            </Container>
        );
    }
}
