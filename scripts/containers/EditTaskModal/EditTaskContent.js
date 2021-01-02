import React, { useEffect, useState } from 'react';
import { Header } from '@components/copy';
import Selector from '@components/selector';
import { Label, Input } from '@components/forms';
import Button from '@components/Button';

import useCurrentTaskId from '@hooks/useCurrentTaskId';
import useTaskDetails from '@hooks/useTaskDetails';
import useCurrentListId from '@hooks/useCurrentListId';
import useModifyTask from '@hooks/useModifyTask';

import {
    Container,
    Content,
    Block,
    Notes,
    ButtonContainer
} from './EditTask.styles';
import CreatorBlock from './CreatorBlock';
import ListsDropdown from './ListsDropdown';
import { COLORS } from '../../constants';

const PRIORITIES = [
    { value: 'low', label: 'Low' },
    { value: 'normal', label: 'Normal' },
    { value: 'high', label: 'High' }
];

function EditTaskContent() {
    const taskId = useCurrentTaskId();
    const listId = useCurrentListId();
    const { task, loading, error } = useTaskDetails(listId, taskId);
    const modifyTask = useModifyTask();
    const [state, setState] = useState({ ...(task || {}) });
    const [_error, setError] = useState(null);
    const [isSaving, setSaving] = useState(false);
    const [isDeleting, setDeleting] = useState(false);

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

    const updateTask = async updatedProps => {
        setState(state => ({
            ...state,
            ...updatedProps
        }));
        setSaving(true);
        try {
            await modifyTask(taskId, state.list, updatedProps);
        } catch (err) {
            console.error(err);
        }
        // this.props.setUnsavedChanges(false);
        setSaving(false);
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
        if (task) {
            console.log('TASK');
        }
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
                        onKeyPress={onKeyPress}
                        onChange={onChange}
                    />
                </Block>
                <Block>
                    <Label>List</Label>
                    <ListsDropdown
                        onSelect={updateList}
                        currentListId={listId}
                    />
                </Block>
                <Block>
                    <Label>Due Date</Label>
                    <Input
                        type="date"
                        value={formatDateForInput(state.dueDate)}
                        onKeyPress={onKeyPress}
                        onChange={onChange}
                    />
                </Block>
                <CreatorBlock
                    createdBy={task.createdBy}
                    creationDate={task.creationDate}
                />
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
                    color={COLORS.red}
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
