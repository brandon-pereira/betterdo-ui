import React, { forwardRef, useCallback } from 'react';

import TaskType from '../../../types/task';

import {
    Container,
    Checkbox,
    Title,
    HighPriorityFlag,
    Loader
} from './Task.styles';

import useEditTaskModal from '@hooks/useEditTaskModal';
import useModifyTask from '@hooks/useModifyTask';

interface Props extends TaskType {
    containerProps?: React.ButtonHTMLAttributes<HTMLButtonElement>;
    touchEvents?: import('@dnd-kit/core').DraggableSyntheticListeners;
}

const Task = forwardRef<HTMLButtonElement, Props>(
    (
        {
            title,
            _id,
            isCompleted,
            list,
            isLoading,
            priority,
            containerProps,
            touchEvents
        },
        ref
    ) => {
        const { openTaskModal } = useEditTaskModal();
        const modifyTask = useModifyTask();

        const onEditTask = useCallback(() => {
            openTaskModal(_id);
        }, [openTaskModal, _id]);

        const onToggleTaskCompletion = useCallback(() => {
            modifyTask(_id, list, {
                isCompleted: !isCompleted
            });
        }, [_id, modifyTask, isCompleted, list]);

        return (
            <Container
                ref={ref}
                isLoading={isLoading}
                onClick={onEditTask}
                priority={priority}
                {...containerProps}
            >
                {isLoading ? (
                    <Loader color="#202020" size="1.7rem" isVisible={true} />
                ) : (
                    <Checkbox
                        type="checkbox"
                        onClick={e => e.stopPropagation()}
                        onChange={onToggleTaskCompletion}
                        checked={isCompleted}
                        {...touchEvents}
                    />
                )}
                <Title>{title}</Title>
                {priority === 'high' && <HighPriorityFlag />}
            </Container>
        );
    }
);

Task.displayName = 'Task';

export default Task;
