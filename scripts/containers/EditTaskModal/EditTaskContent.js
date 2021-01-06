import React, { useEffect, useCallback, useState } from 'react';
import { Header } from '@components/copy';
import Selector from '@components/selector';
import { Label, Input, Error } from '@components/forms';
import Button from '@components/Button';
import Subtasks from '@components/subtasks';

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
import Loader from './Loader';
import useDeleteTask from '@hooks/useDeleteTask';

const PRIORITIES = [
    { value: 'low', label: 'Low' },
    { value: 'normal', label: 'Normal' },
    { value: 'high', label: 'High' }
];

function EditTaskContent({ setUnsavedChanges }) {
    const taskId = useCurrentTaskId();
    const listId = useCurrentListId();
    const { task, loading, error } = useTaskDetails(taskId);
    const modifyTask = useModifyTask();
    const deleteTask = useDeleteTask();
    const [state, _setState] = useState({ ...(task || {}) });
    const [_error, setError] = useState(null);
    const [isSaving, setSaving] = useState(false);
    const [isDeleting, setDeleting] = useState(false);

    useEffect(() => {
        _setState({ ...(task || {}) });
    }, [task]);

    const onSaveButtonPressed = useCallback(() => {
        onSaveTask({
            title: state.title,
            priority: state.priority,
            dueDate: state.dueDate,
            list: state.list,
            notes: state.notes,
            subtasks: state.subtasks
        });
    }, [state, onSaveTask]);

    const onDeleteTask = useCallback(async () => {
        const result = confirm(
            `Are you sure you want to delete the task "${state.title}"? This can't be undone.`
        );
        if (result) {
            setDeleting(true);
            try {
                await deleteTask(taskId, state.list);
            } catch (err) {
                console.error(err);
                setError(err.formattedMessage || 'Unexpected Error');
                setSaving(false);
            }
            setDeleting(false);
        }
    }, [taskId, deleteTask, state.list, state.title]);

    const onSaveTask = useCallback(
        async updatedProps => {
            setSaving(true);
            try {
                await modifyTask(taskId, state.list, updatedProps);
            } catch (err) {
                console.error(err);
                setError(err.formattedMessage || 'Unexpected Error');
                setSaving(false);
            }
            setUnsavedChanges(false);
            setSaving(false);
        },
        [modifyTask, setUnsavedChanges, state.list, taskId]
    );

    const onInputChange = id => e => {
        // Mark content as dirty
        setUnsavedChanges(true);
        // Set state for re-render
        _setValues({ [id]: e.target.value });
    };

    const onInputKeyPress = id => e => {
        if (e.key === 'Enter') {
            const updatedProps = { [id]: e.target.value };
            // Set state for fast re-render
            _setValues(updatedProps);
            // Trigger save to server
            onSaveTask(updatedProps);
        }
    };

    const onValueChange = updatedProps => {
        setUnsavedChanges(true);
        _setValues(updatedProps);
    };

    const _setValues = updatedProps => {
        _setState(state => ({
            ...state,
            ...updatedProps
        }));
    };

    if (loading) {
        return <Loader />;
    }

    if (error) {
        return <Error>Unexpected Error</Error>;
    }

    return (
        <Container>
            <Content>
                <Header>Edit Task</Header>
                {_error && <Error>{_error}</Error>}
                <Block>
                    <Label>Title</Label>
                    <Input
                        value={state.title}
                        onKeyPress={onInputKeyPress('title')}
                        onChange={onInputChange('title')}
                    />
                </Block>
                <Block>
                    <Label>Priority</Label>
                    <Selector
                        values={PRIORITIES}
                        onSelect={priority => onValueChange({ priority })}
                        value={state.priority}
                    />
                </Block>
                <Block>
                    <Label>Subtasks</Label>
                    <Subtasks
                        subtasks={state.subtasks}
                        onChange={subtasks => onValueChange({ subtasks })}
                    />
                </Block>
                <Block>
                    <Label>Notes</Label>
                    <Notes
                        value={state.notes}
                        onKeyPress={onInputKeyPress('notes')}
                        onChange={onInputChange('notes')}
                    />
                </Block>
                <Block>
                    <Label>List</Label>
                    <ListsDropdown
                        onSelect={list => onValueChange({ list })}
                        currentListId={state.list}
                    />
                </Block>
                <Block>
                    <Label>Due Date</Label>
                    <Input
                        type="date"
                        value={formatDateForInput(state.dueDate)}
                        onKeyPress={onInputKeyPress('dueDate')}
                        onChange={onInputChange('dueDate')}
                    />
                </Block>
                {task && (
                    <CreatorBlock
                        createdBy={task.createdBy}
                        creationDate={task.creationDate}
                    />
                )}
            </Content>
            <ButtonContainer>
                <Button
                    onClick={onSaveButtonPressed}
                    isLoading={isSaving}
                    loadingText="Saving"
                >
                    Save
                </Button>
                <Button
                    color={COLORS.red}
                    onClick={onDeleteTask}
                    isLoading={isDeleting}
                    loadingText="Deleting"
                >
                    Delete
                </Button>
            </ButtonContainer>
        </Container>
    );
}

const formatDateForInput = dateString => {
    const date = new Date(dateString);
    if (dateString && !isNaN(date.getTime())) {
        return date.toISOString().substr(0, 10);
    }
    return '';
};

export default EditTaskContent;
