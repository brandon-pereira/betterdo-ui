import React, { Component } from 'react';
import styled from 'styled-components';
import { observer, inject } from 'mobx-react';
import { Label, Input, TextArea } from '../../components/forms';
import Dropdown from '../../components/dropdown';
import Button from '../../components/button';
import Subtasks from '../../components/subtasks';

const Container = styled.div``;
const Block = styled.div``;
const ButtonContainer = styled.div`
    display: flex;
    justify-content: space-between;
`;
const Notes = styled(TextArea)`
    min-height: 10rem;
`;

@inject('store')
@observer
class EditTask extends Component {
    static priorities = [
        { value: 'low', label: 'Low' },
        { value: 'normal', label: 'Normal' },
        { value: 'high', label: 'High' }
    ];

    constructor(props) {
        super(props);
        const task = this.task;
        this.state = {
            title: task.title,
            priority: task.priority,
            dueDate: task.dueDate,
            list: task.list,
            notes: task.notes,
            subtasks: task.subtasks
        };
        this.updatePriority = this.updatePriority.bind(this);
        this.updateList = this.updateList.bind(this);
        this.saveTask = this.saveTask.bind(this);
        this.deleteTask = this.deleteTask.bind(this);
        this.updateSubtasks = this.updateSubtasks.bind(this);
        this.onKeyPress = this.onKeyPress.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    get lists() {
        return this.props.store.lists.map(list => ({
            value: list._id,
            label: list.title
        }));
    }

    get task() {
        return this.props.store.currentTask;
    }

    updatePriority(priority) {
        this.updateTask({ priority });
    }

    updateList(list) {
        this.updateTask({ list });
    }

    updateSubtasks(subtasks) {
        this.updateTask({ subtasks });
    }

    saveTask() {
        this.updateTask(this.state);
    }

    deleteTask() {
        const result = confirm(
            `Are you sure you want to delete the task "${
                this.task.title
            }"? This can't be undone.`
        );
        if (result) {
            return this.props.store.deleteTask(this.task._id);
        }
    }

    updateTask(updatedProperties) {
        console.log('Update', this.task._id, updatedProperties);
        this.setState(updatedProperties);
        return this.props.store.updateTask(this.task._id, updatedProperties);
    }

    onChange(e) {
        this.setState({ [e.target.id]: e.target.value });
    }

    onKeyPress(e) {
        if (e.key === 'Enter') {
            this.onChange(e);
            this.updateTask({ [e.target.id]: e.target.value });
        }
    }

    render() {
        const state = this.state;
        return (
            <Container>
                <Block>
                    <Label>Title</Label>
                    <Input
                        value={state.title}
                        id="title"
                        placeholder="Enter a title"
                        onKeyPress={this.onKeyPress}
                        onChange={this.onChange}
                    />
                </Block>
                <Block>
                    <Label>Priority</Label>
                    <Dropdown
                        values={EditTask.priorities}
                        onSelect={this.updatePriority}
                        value={state.priority}
                    />
                </Block>
                <Block>
                    <Label>Due Date</Label>
                    <Input
                        type="date"
                        id="dueDate"
                        value={state.dueDate || ''}
                        onKeyPress={this.onKeyPress}
                        onChange={this.onChange}
                    />
                </Block>
                <Block>
                    <Label>List</Label>
                    <Dropdown
                        values={this.lists}
                        onSelect={this.updateList}
                        value={state.list}
                    />
                </Block>
                <Block>
                    <Label>Subtasks</Label>
                    <Subtasks
                        subtasks={state.subtasks}
                        onChange={this.updateSubtasks}
                    />
                </Block>
                <Block>
                    <Label>Notes</Label>
                    <Notes
                        value={state.notes}
                        id="notes"
                        onKeyPress={this.onKeyPress}
                        onChange={this.onChange}
                    />
                </Block>
                <ButtonContainer>
                    <Button color="#42a5f5" onClick={this.saveTask}>
                        Save
                    </Button>
                    <Button color="#c62828" onClick={this.deleteTask}>
                        Delete
                    </Button>
                </ButtonContainer>
            </Container>
        );
    }
}

export default EditTask;
