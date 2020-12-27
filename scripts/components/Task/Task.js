import useEditTaskModal from '@hooks/useEditTaskModal';
import useModifyTask from '@hooks/useModifyTask';
import React, { useCallback } from 'react';

import {
    Container,
    Checkbox,
    Title,
    HighPriorityFlag,
    Loader
} from './Task.styles';

function Task({ task }) {
    const { openTaskModal } = useEditTaskModal();
    const modifyTask = useModifyTask();

    const onEditTask = useCallback(() => {
        openTaskModal(task._id);
    }, [openTaskModal, task]);

    const onToggleTaskCompletion = useCallback(() => {
        const { _id, isCompleted } = task;
        modifyTask(_id, task.list, {
            isCompleted: !isCompleted
        });
    }, [task.id]);

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
