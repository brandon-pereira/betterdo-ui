import React, { Component } from 'react';
import styled from 'styled-components';
import { observer, inject } from 'mobx-react';
import { Label, Input, TextArea } from '../../components/forms';
import Dropdown from '../../components/dropdown';

const Container = styled.div``;
const Block = styled.div``;
const Notes = styled(TextArea)`
    background: #fff9b0;
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
        this.onKeyPress = this.onKeyPress.bind(this);
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

    onKeyPress(e) {
        if (e.key === 'Enter') {
            this.updateTask({
                dueDate: this.state.dueDate,
                title: this.state.title
            });
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
                        placeholder="Enter a title"
                        onKeyPress={this.onKeyPress}
                        onChange={evt =>
                            this.setState({
                                title: evt.target.value
                            })
                        }
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
                        value={state.dueDate || ''}
                        onChange={evt =>
                            this.setState({
                                dueDate: evt.target.value
                            })
                        }
                        onKeyPress={this.onKeyPress}
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
                    <Label>Notes</Label>
                    <Notes value={state.notes} />
                </Block>
                <Block>
                    <Label>Subtasks</Label>
                </Block>
            </Container>
        );
    }
}

export default EditTask;
