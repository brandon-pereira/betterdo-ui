import React, { Component } from 'react';
import styled from 'styled-components';
import { observer, inject } from 'mobx-react';
import { Label, Input, TextArea } from '../../components/forms';
import Dropdown from '../../components/dropdown';
import Button from '../../components/button';
import Subtasks from '../../components/subtasks';
import { COLORS, QUERIES } from '../../constants';
import ProfilePic from '../../components/profilePic';
import Selector from '../../components/selector';
import { Header } from '../../components/copy';

const Container = styled.div``;
const Block = styled.div``;
const Content = styled.div`
    padding: 1rem;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    overflow-y: scroll;
`;
const CreatorBlock = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 5rem;
    background: linear-gradient(rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.1));
    box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.2),
        inset 0 2px rgba(255, 255, 255, 0.2);
    padding: 1rem;
    border-radius: 3px;
    ${ProfilePic} {
        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
    }
    ${Block} {
        flex: 1;
        padding: 0 1rem;
    }
`;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: space-between;
    position: absolute;
    transition: all 0.5s;
    bottom: 0;
    width: 100%;
    padding: 1rem;
    box-sizing: border-box;
    right: 0;
    background: linear-gradient(
        rgba(255, 255, 255, 0.6),
        rgba(255, 255, 255, 0.9)
    );
    box-shadow: 0 -1px rgba(0, 0, 0, 0.1);
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
            subtasks: task.subtasks,
            formattedCreationDate: task.creationDate,
            isSaving: false,
            isDeleting: false
        };
        this.updatePriority = this.updatePriority.bind(this);
        this.updateList = this.updateList.bind(this);
        this.saveTask = this.saveTask.bind(this);
        this.deleteTask = this.deleteTask.bind(this);
        this.updateSubtasks = this.updateSubtasks.bind(this);
        this.onKeyPress = this.onKeyPress.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        import('./relativeTime').then(time => {
            this.relativeTime = time.default;
            this.setState({
                formattedCreationDate: this.relativeTime(
                    this.task.creationDate,
                    new Date()
                )
            });
        });
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
        this.updateTask({
            title: this.state.title,
            priority: this.state.priority,
            dueDate: this.state.dueDate,
            list: this.state.list,
            notes: this.state.notes,
            subtasks: this.state.subtasks
        });
    }

    async deleteTask() {
        const result = confirm(
            `Are you sure you want to delete the task "${
                this.task.title
            }"? This can't be undone.`
        );
        if (result) {
            this.setState({
                isDeleting: true
            });
            await this.props.store.deleteTask(this.task._id);
            this.setState({
                isDeleting: false
            });
        }
    }

    async updateTask(updatedProperties) {
        console.log('Update', this.task._id, updatedProperties);
        this.setState({
            ...updatedProperties,
            isSaving: true
        });
        await this.props.store.updateTask(this.task._id, updatedProperties);
        this.setState({
            isSaving: false
        });
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

    formatDateForInput(dateString) {
        const date = new Date(dateString);
        if (dateString && !isNaN(date.getTime())) {
            return date.toISOString().substr(0, 10);
        }
        return '';
    }

    render() {
        const state = this.state;
        return (
            <Container>
                <Content>
                    <Header>Edit Task</Header>
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
                        <Selector
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
                            value={this.formatDateForInput(state.dueDate)}
                            onKeyPress={this.onKeyPress}
                            onChange={this.onChange}
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
                    <Block>
                        <Label>List</Label>
                        <Dropdown
                            values={this.lists}
                            onSelect={this.updateList}
                            value={state.list}
                        />
                    </Block>
                    <CreatorBlock>
                        <ProfilePic user={this.task.createdBy} />
                        <Block>
                            Created by {this.task.createdBy.firstName}{' '}
                            {this.task.createdBy.lastName}
                            <br />
                            Created {this.state.formattedCreationDate}
                        </Block>
                    </CreatorBlock>
                </Content>
                <ButtonContainer>
                    <Button
                        color={COLORS.blue}
                        onClick={this.saveTask}
                        loading={this.state.isSaving}
                        loadingText="Saving"
                    >
                        Save
                    </Button>
                    <Button
                        color={COLORS.red}
                        onClick={this.deleteTask}
                        loading={this.state.isDeleting}
                        loadingText="Deleting"
                    >
                        Delete
                    </Button>
                </ButtonContainer>
            </Container>
        );
    }
}

export default EditTask;
