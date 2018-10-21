import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { computed } from 'mobx';
import AddTask from '../components/addTask';
import Task from '../components/task';
import {
    SortableContainer,
    SortableElement,
    arrayMove
} from 'react-sortable-hoc';

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

    render() {
        return (
            <div>
                <AddTask />
                <SortableList
                    items={this.currentList.tasks.map(task => task)}
                    onSortEnd={this.onSortEnd}
                />
            </div>
        );
    }
}
