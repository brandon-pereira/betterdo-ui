import { useCallback } from 'react';
import { mutate } from 'swr';

import { getListDetailUrl, getListsUrl } from './internal/urls';

import useEditTaskModal from '@hooks/useEditTaskModal';
import useCompletedTasks from '@hooks/useCompletedTasks';
import { deleteTask } from '@utilities/server';

function useDeleteTask() {
    const { closeModal } = useEditTaskModal();
    const [isCompletedTasksIncluded] = useCompletedTasks();
    return useCallback(
        async (taskId, listId) => {
            await deleteTask(taskId);
            closeModal();
            await mutate(getListDetailUrl(listId, isCompletedTasksIncluded));
            await mutate(getListsUrl());
        },
        [isCompletedTasksIncluded, closeModal]
    );
}

export default useDeleteTask;
