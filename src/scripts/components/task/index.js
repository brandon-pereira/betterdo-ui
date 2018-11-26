import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import styled from 'styled-components';
import Header from './header';

const Container = styled.div`
    background: linear-gradient(#fff, #eee);
    margin: 0.5rem 1rem;
    border-radius: 5px;
    box-shadow: 0 2px 3px rgba(0, 0, 0, 0.2), inset 0 -1px #fff;
    padding: 1rem;
`;

@inject('store')
@observer
class Task extends Component {
    deleteTask() {
        const result = confirm(
            `Are you sure you want to delete the task "${
                this.props.task.title
            }"? This can't be undone.`
        );
        if (result) {
            return this.props.store.deleteTask(this.props.task._id);
        }
    }

    updateTask(updatedTask) {
        Object.assign(this.props.task, updatedTask);
        return this.props.store.updateTask(this.props.task);
    }

    openEditView() {
        this.props.store.currentTask = this.props.task;
    }

    closeEditView() {
        this.props.store.currentTask = null;
    }

    getChildren() {
        const task = this.props.task;
        // const lists = this.props.store.lists;
        return (
            <Header
                selected={this.props.store.currentTask === task}
                title={task.title}
                isCompleted={task.isCompleted}
                updateTask={this.updateTask.bind(this)}
            />
        );
    }

    render() {
        return (
            <Container onClick={this.openEditView.bind(this)}>
                {this.getChildren()}
            </Container>
        );
    }
}

export default Task;
