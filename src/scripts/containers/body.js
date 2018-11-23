import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { computed } from 'mobx';
import styled from 'styled-components';
import AddTask from '../components/addTask';
import NotificationBanner from '../components/notificationBanner';
import Task from '../components/task';
import { QUERIES } from '../constants';
import {
    SortableContainer,
    SortableElement,
    arrayMove
} from 'react-sortable-hoc';

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
    @computed
    get currentList() {
        return this.props.store.currentList;
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
                    buttonCopy="Update"
                    buttonAction={() => this.props.store.applyAppUpdate()}
                />
            );
        } else if (this.props.store.addToHomeScreenAvailable) {
            return (
                <NotificationBanner
                    title="Install App"
                    description="Install our application to more quickly access your tasks."
                    buttonCopy="Install"
                    buttonAction={() => this.props.store.addToHomeScreen()}
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
                <AddTask
                    hidden={this.props.store.currentList.type === 'loading'}
                />
                <SortableList
                    distance={10}
                    items={this.currentList.tasks.map(task => task)}
                    onSortEnd={this.onSortEnd}
                />
            </Container>
        );
    }
}
