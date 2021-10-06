import { useCallback } from 'react';
import { mutate } from 'swr';

import { getListDetailUrl, getListsUrl } from './internal/urls';
import useCompletedTasks from './useCompletedTasks';
import { updateList } from '@utilities/server';

function useModifyList() {
    const [isCompletedTasksIncluded] = useCompletedTasks();
    return useCallback(
        async (listId, updatedProps) => {
            // Immediately update the cached data
            await mutate(
                getListDetailUrl(listId, isCompletedTasksIncluded),
                async currentList => {
                    return {
                        ...currentList,
                        ...updatedProps
                    };
                },
                false
            );
            // Special handling is needed to normalize the data for server
            updatedProps = normalizeDataForServerCall(updatedProps);
            // Send request to server
            await updateList(listId, updatedProps);
            // Now that its mutated, update cached data
            await mutate(getListsUrl());
            await mutate(getListDetailUrl(listId, isCompletedTasksIncluded));
        },
        [isCompletedTasksIncluded]
    );
}

function normalizeDataForServerCall(updatedProps) {
    if (updatedProps.tasks) {
        updatedProps.tasks = updatedProps.tasks.map(m => m._id);
    }
    if (updatedProps.members) {
        updatedProps.members = updatedProps.members.map(m => m._id);
    }
    return updatedProps;
}

export default useModifyList;
