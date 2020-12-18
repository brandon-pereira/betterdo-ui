import useCurrentTask from '@hooks/useCurrentTask';
import React, { useCallback } from 'react';

import {
    Container,
    Checkbox,
    Title,
    HighPriorityFlag,
    Loader
} from './Task.styles';

function Task({ task }) {
    const { openTaskModal } = useCurrentTask();
    const onEditTask = useCallback(() => {
        openTaskModal(task._id);
    }, [task]);

    const onToggleTaskCompletion = useCallback(() => {
        const { _id, isCompleted } = task;
        updateTask(_id, {
            isCompleted: !isCompleted
        });
    }, [task]);

    return (
        <Container
            isLoading={task.isLoading}
            onClick={onEditTask}
            priority={task.priority}
        >
            {task.isLoading ? (
                <Loader color="#202020" size="1.7rem" isVisible={true} />
            ) : (
                <Checkbox
                    type="checkbox"
                    onClick={e => e.stopPropagation()}
                    onChange={onToggleTaskCompletion}
                    checked={task.isCompleted}
                />
            )}
            <Title>{task.title}</Title>
            {task.priority === 'high' && <HighPriorityFlag />}
        </Container>
    );
}

export default Task;
