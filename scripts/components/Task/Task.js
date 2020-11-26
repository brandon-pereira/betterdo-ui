import useTask from '@hooks/useTask';
import React, { useCallback } from 'react';

import {
    Container,
    Checkbox,
    Title,
    HighPriorityFlag,
    Loader
} from './Task.styles';

function Task({ task }) {
    const [, setCurrentTask] = useTask();
    const onEditTask = useCallback(() => {
        console.log('HERE');
        setCurrentTask(task);
    }, []);

    const onToggleTaskCompletion = useCallback(() => {
        const { _id, isCompleted } = this.props.task;
        this.props.store.updateTask(_id, {
            isCompleted: !isCompleted
        });
    }, []);

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
