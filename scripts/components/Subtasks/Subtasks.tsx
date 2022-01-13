import React, { useEffect, useCallback, useState } from 'react';
import { arrayMoveImmutable } from 'array-move';

import { Subtask } from '../../../types/task';

import { Input, Container } from './Subtasks.styles';
import SortableList from './SortableList';

interface Props {
    subtasks: Subtask[];
    onChange: (newList: string[]) => void;
}
function Subtasks({ subtasks, onChange }: Props) {
    const [value, setValue] = useState('');
    const [invalid, setInvalid] = useState(false);
    // this is an internally managed state of subtasks
    const [_subtasks, _setSubtasks] = useState(subtasks || []);

    useEffect(() => {
        _setSubtasks(subtasks);
    }, [subtasks]);

    const setSubtasks = useCallback(
        mutatedTasks => {
            onChange(mutatedTasks);
            _setSubtasks(mutatedTasks);
        },
        [onChange]
    );

    const setInputValue = (value: string) => {
        setValue(value);
        setInvalid(!value);
    };

    const onToggleCompleted = (idx: string) => {
        const _temp = Array.from(_subtasks);
        const index = _temp.findIndex(subtask => subtask._id === idx);
        if (Number.isInteger(index)) {
            _temp[index].isComplete = !_temp[index].isComplete;
            setSubtasks(_temp);
        }
    };

    const onDelete = (idx: string) => {
        const _temp = Array.from(_subtasks);
        const index = _temp.findIndex(subtask => subtask._id === idx);
        if (Number.isInteger(index)) {
            _temp.splice(index, 1);
            setSubtasks(_temp);
        }
    };

    const onKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && value) {
            const _temp = Array.from(_subtasks);
            _temp.push({
                _id: `${Math.random()}`,
                title: value,
                isComplete: false
            });
            setValue('');
            setSubtasks(_temp);
        }
    };

    const onSortEnd = useCallback(
        ({ oldIndex, newIndex }) => {
            if (oldIndex !== newIndex) {
                const mutatedArray = arrayMoveImmutable(
                    _subtasks,
                    oldIndex,
                    newIndex
                );
                setSubtasks(mutatedArray);
            }
        },
        [_subtasks, setSubtasks]
    );

    return (
        <Container>
            <div>
                <SortableList
                    onDelete={onDelete}
                    onToggleCompleted={onToggleCompleted}
                    items={_subtasks}
                    onSortEnd={onSortEnd}
                />
            </div>
            <Input
                invalid={invalid}
                value={value}
                onChange={evt => setInputValue(evt.target.value)}
                onKeyPress={onKeyPress}
                placeholder="New Subtask"
            />
        </Container>
    );
}

export default Subtasks;
