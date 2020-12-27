import { useCallback } from 'react';
import { mutate } from 'swr';
import { updateTask } from '@utilities/server';

import { getListDetailUrls } from './internal/urls';

function useModifyTask() {
    return useCallback(async (taskId, listId, updatedProps) => {
        const cacheMutations = getListDetailUrls(listId).map(url =>
            mutate(url, updateTaskInCache(taskId, listId, updatedProps), false)
        );
        console.log('HERE');
        await Promise.all(cacheMutations);
        console.log('DOMNE');
        await updateTask(taskId, updatedProps);
        await Promise.all(getListDetailUrls(listId).map(url => mutate(url)));
    }, []);
}

const updateTaskInCache = (
    listId,
    taskId,
    updatedProps
) => async currentList => ({
    ...currentList,
    tasks: currentList
        ? currentList.tasks.map(task => {
              if (task._id === taskId) {
                  return { ...task, ...updatedProps };
              }
              return task;
          })
        : []
});

const getListUrl = listId => `${process.env.SERVER_URL}/api/lists/${listId}`;

export default useModifyTask;
