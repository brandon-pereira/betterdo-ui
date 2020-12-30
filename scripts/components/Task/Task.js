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

function Task({ title, _id, isCompleted, list, isLoading, priority }) {
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
            isLoading={isLoading}
            onClick={onEditTask}
            priority={priority}
        >
            {isLoading ? (
                <Loader color="#202020" size="1.7rem" isVisible={true} />
            ) : (
                <Checkbox
                    type="checkbox"
                    onClick={e => e.stopPropagation()}
                    onChange={onToggleTaskCompletion}
                    checked={isCompleted}
                />
            )}
            <Title>{title}</Title>
            {priority === 'high' && <HighPriorityFlag />}
        </Container>
    );
}

export default Task;
