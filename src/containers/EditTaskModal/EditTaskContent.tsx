import { useEffect, useCallback, useState } from 'react';

import {
    Container,
    Content,
    Block,
    Notes,
    ButtonContainer
} from './EditTask.styles';
import CreatorBlock from './CreatorBlock';
import ListsDropdown from './ListsDropdown';
import Loader from './Loader';

import Task from '@customTypes/task';
import { Header } from '@components/Copy';
import Selector from '@components/Selector';
import { Label, Input, Error } from '@components/Forms';
import Button from '@components/Button';
import DueDate from '@components/DueDate/DueDate';
import Subtasks from '@components/Subtasks';
import useCurrentTaskId from '@hooks/useCurrentTaskId';
import useTaskDetails from '@hooks/useTaskDetails';
import useModifyTask from '@hooks/useModifyTask';
import useDeleteTask from '@hooks/useDeleteTask';
import { ServerError } from '@utilities/server';

const PRIORITIES = [
    { value: 'low', label: 'Low' },
    { value: 'normal', label: 'Normal' },
    { value: 'high', label: 'High' }
];

export interface Props {
    setUnsavedChanges: (bool: boolean) => void;
}

function EditTaskContent({ setUnsavedChanges }: Props) {
    const taskId = useCurrentTaskId() || '';
    const { task, loading, error } = useTaskDetails(taskId);
    const modifyTask = useModifyTask();
    const deleteTask = useDeleteTask();
    const [state, _setState] = useState<Partial<Task>>({ ...(task || {}) });
    const [_error, setError] = useState<string | undefined>();
    const [isSaving, setSaving] = useState(false);
    const [isDeleting, setDeleting] = useState(false);

    useEffect(() => {
        _setState({ ...(task || {}) });
    }, [task]);

    const onSaveTask = useCallback(
        async (updatedProps: Partial<Task>) => {
            if (!state.list) {
                return;
            }
            setSaving(true);
            try {
                await modifyTask(taskId, state.list, updatedProps);
            } catch (err) {
                console.error(err);
                if (err instanceof ServerError) {
                    setError(err.formattedMessage);
                } else {
                    setError(ServerError.defaultError);
                }
                setSaving(false);
            }
            setUnsavedChanges(false);
            setSaving(false);
        },
        [modifyTask, setUnsavedChanges, state.list, taskId]
    );

    const onSaveButtonPressed = useCallback(() => {
        if (task) {
            onSaveTask({
                title: state.title,
                priority: state.priority,
                dueDate: state.dueDate,
                notes: state.notes,
                subtasks: state.subtasks,
                // we only mutate list if changed, or else we automatically
                // redirect which isn't ideal (custom lists)
                ...(state.list !== task.list ? { list: state.list } : {})
            });
        }
    }, [state, task, onSaveTask]);

    const onDeleteTask = useCallback(async () => {
        const result = confirm(
            `Are you sure you want to delete the task "${state.title}"? This can't be undone.`
        );
        if (result) {
            setDeleting(true);
            try {
                await deleteTask(taskId);
            } catch (err) {
                console.error(err);
                if (err instanceof ServerError) {
                    setError(err.formattedMessage);
                } else {
                    setError(ServerError.defaultError);
                }
                setSaving(false);
            }
            setDeleting(false);
        }
    }, [taskId, deleteTask, state.title]);

    const onInputChange =
        (id: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
            // Mark content as dirty
            setUnsavedChanges(true);
            // Set state for re-render
            _setValues({ [id]: e.target.value });
        };

    const onInputKeyPress =
        (id: string) => (e: React.KeyboardEvent<HTMLInputElement>) => {
            if (e.key === 'Enter') {
                const updatedProps = { [id]: e.currentTarget.value };
                // Set state for fast re-render
                _setValues(updatedProps);
                // Trigger save to server
                onSaveTask(updatedProps);
            }
        };

    const onValueChange = (updatedProps: Partial<Task>) => {
        setUnsavedChanges(true);
        _setValues(updatedProps);
    };

    const _setValues = (updatedProps: Partial<Task>) => {
        _setState(state => ({
            ...state,
            ...updatedProps
        }));
    };

    if (loading || !state._id) {
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
                        onSelect={(priority: Task['priority']) =>
                            onValueChange({ priority })
                        }
                        value={state.priority}
                    />
                </Block>
                <Block>
                    <Label>Subtasks</Label>
                    <Subtasks
                        subtasks={state.subtasks || []}
                        onChange={subtasks => {
                            onValueChange({ subtasks });
                            onSaveTask({ subtasks });
                        }}
                    />
                </Block>
                <Block>
                    <Label>Notes</Label>
                    <Notes
                        defaultValue={state.notes}
                        onBlur={e => {
                            onValueChange({
                                notes: e.target.value
                            });
                        }}
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
                    <Label>Due By</Label>
                    <DueDate
                        value={state.dueDate}
                        onChange={dueDate => onValueChange({ dueDate })}
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
                    color={'red'}
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

export default EditTaskContent;
