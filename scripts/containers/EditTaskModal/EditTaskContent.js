import React, { useEffect, useState } from 'react';
import { Header } from '@components/copy';
import Selector from '@components/selector';
import { Label, Input } from '@components/forms';
import Dropdown from '@components/dropdown';
import Button from '@components/Button';

import {
    Container,
    Content,
    Block,
    Notes,
    CreatorBlock,
    ProfilePic,
    ButtonContainer
} from './EditTask.styles';
import useLists from '@hooks/useLists';
import useCurrentTask from '@hooks/useCurrentTask';

const PRIORITIES = [
    { value: 'low', label: 'Low' },
    { value: 'normal', label: 'Normal' },
    { value: 'high', label: 'High' }
];

const defaultTask = {
    title: '',
    createdBy: {
        firstName: '',
        lastName: ''
    }
};
function EditTaskContent() {
    const { currentTask: _task, loading, error } = useCurrentTask();
    const task = _task || defaultTask;
    const [state, setState] = useState({
        title: task.title,
        priority: task.priority,
        dueDate: task.dueDate,
        list: task.list,
        notes: task.notes,
        subtasks: task.subtasks,
        formattedCreationDate: task.creationDate,
        createdBy: task.createdBy,
        isSaving: false,
        isDeleting: false
    });

    // componentDidMount() {
    //     import('./relativeTime').then(time => {
    //         this.relativeTime = time.default;
    //         this.setState({
    //             formattedCreationDate: this.relativeTime(
    //                 this.task.creationDate,
    //                 new Date()
    //             )
    //         });
    //     });
    // }

    const { lists } = useLists();
    const formattedLists = lists
        .filter(list => list.type === 'default' || list.type === 'inbox')
        .map(list => ({
            value: list._id,
            label: list.title
        }));

    const updatePriority = priority => {
        updateTask({ priority });
    };

    const updateList = list => {
        updateTask({ list });
    };

    const updateSubtasks = subtasks => {
        updateTask({ subtasks });
    };

    const saveTask = () => {
        updateTask({
            title: state.title,
            priority: state.priority,
            dueDate: state.dueDate,
            list: state.list,
            notes: state.notes,
            subtasks: state.subtasks
        });
    };

    const deleteTask = async () => {
        const result = confirm(
            `Are you sure you want to delete the task "${this.task.title}"? This can't be undone.`
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
    };

    const updateTask = async updatedProperties => {
        console.log('Update', this.task._id, updatedProperties);
        this.setState({
            ...updatedProperties,
            isSaving: true
        });
        await this.props.store.updateTask(this.task._id, updatedProperties);
        this.props.setUnsavedChanges(false);
        this.setState({
            isSaving: false
        });
    };

    const onChange = e => {
        this.props.setUnsavedChanges(true);
        this.setState({ [e.target.id]: e.target.value });
    };

    const onKeyPress = e => {
        if (e.key === 'Enter') {
            this.onChange(e);
            updateTask({ [e.target.id]: e.target.value });
        }
    };

    const formatDateForInput = dateString => {
        const date = new Date(dateString);
        if (dateString && !isNaN(date.getTime())) {
            return date.toISOString().substr(0, 10);
        }
        return '';
    };

    useEffect(() => {
        setState(prevState => ({
            ...prevState,
            ...task
        }));
    }, [task]);

    if (!task) {
        return null;
    }

    if (loading) {
        return 'LOADING';
    }
    if (error) {
        return 'ERROR';
    }

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
                        onKeyPress={onKeyPress}
                        onChange={onChange}
                    />
                </Block>
                <Block>
                    <Label>Priority</Label>
                    <Selector
                        values={PRIORITIES}
                        onSelect={updatePriority}
                        value={state.priority}
                    />
                </Block>
                <Block>
                    <Label>Subtasks</Label>
                    TODO
                    {/* <Subtasks
                            subtasks={state.subtasks}
                            onChange={this.updateSubtasks}
                        /> */}
                </Block>
                <Block>
                    <Label>Notes</Label>
                    <Notes
                        value={state.notes}
                        id="notes"
                        onKeyPress={onKeyPress}
                        onChange={onChange}
                    />
                </Block>
                <Block>
                    <Label>List</Label>
                    <Dropdown
                        values={formattedLists}
                        onSelect={updateList}
                        value={state.list}
                    />
                </Block>
                <Block>
                    <Label>Due Date</Label>
                    <Input
                        type="date"
                        id="dueDate"
                        value={formatDateForInput(state.dueDate)}
                        onKeyPress={onKeyPress}
                        onChange={onChange}
                    />
                </Block>
                <CreatorBlock>
                    <ProfilePic user={state.createdBy} />
                    <Block>
                        Created by {state.createdBy.firstName}{' '}
                        {state.createdBy.lastName}
                        <br />
                        Created {state.formattedCreationDate}
                    </Block>
                </CreatorBlock>
            </Content>
            <ButtonContainer>
                <Button
                    onClick={saveTask}
                    isLoading={state.isSaving}
                    loadingText="Saving"
                >
                    Save
                </Button>
                <Button
                    onClick={deleteTask}
                    isLoading={state.isDeleting}
                    loadingText="Deleting"
                >
                    Delete
                </Button>
            </ButtonContainer>
        </Container>
    );
}

export default EditTaskContent;
