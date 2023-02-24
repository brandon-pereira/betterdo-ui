import { useCallback } from 'react';
import { useSWRConfig } from 'swr';

import { getListDetailUrl, getListsUrl } from './internal/urls';

import List, { ServerList } from '@customTypes/list';
import useCompletedTasks from '@hooks/useCompletedTasks';
import { updateList } from '@utilities/server';

function useModifyList() {
    const { mutate } = useSWRConfig();
    const [isCompletedTasksIncluded] = useCompletedTasks();
    return useCallback(
        async (listId: string, updatedProps: Partial<List>) => {
            // Immediately update the cached data
            await mutate(
                getListDetailUrl(listId, isCompletedTasksIncluded),
                async (currentList?: Partial<List>) => {
                    return {
                        ...currentList,
                        ...updatedProps
                    } as Partial<List>;
                },
                false
            );
            // Special handling is needed to normalize the data for server
            const serverProps = normalizeDataForServerCall(updatedProps);
            // Send request to server
            await updateList(listId, serverProps);
            // Now that its mutated, update cached data
            await mutate(getListsUrl());
            await mutate(getListDetailUrl(listId, isCompletedTasksIncluded));
        },
        [isCompletedTasksIncluded, mutate]
    );
}

function normalizeDataForServerCall(updatedProps: Partial<List>): ServerList {
    const serverData = { ...updatedProps } as unknown as ServerList;
    if (updatedProps.tasks) {
        serverData.tasks = updatedProps.tasks.map(m => m._id);
    }
    if (updatedProps.members) {
        serverData.members = updatedProps.members.map(m => m._id);
    }
    return serverData;
}

export default useModifyList;
