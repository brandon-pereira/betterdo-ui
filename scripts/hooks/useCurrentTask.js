import { useCallback, useMemo } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import createSharedHook from './internal/createSharedHook';
import useCurrentList from './useCurrentList';
import useGeneratedUrl from './useGeneratedUrl';

const getTaskFromList = (list, id) => list.tasks.find(task => task._id === id);

function useTaskOnce() {
    const params = useParams();
    const { subrouteId: currentTaskId } = params;
    const { currentList, loading } = useCurrentList();
    const history = useHistory();
    const generateUrl = useGeneratedUrl();
    const openTaskModal = useCallback(
        taskId => {
            history.replace(generateUrl('/edit-task/' + taskId));
        },
        [generateUrl, history]
    );
    const closeTaskModal = useCallback(() => {
        history.replace(generateUrl());
    }, [generateUrl, history]);
    const currentTask = useMemo(() => {
        if (!loading && currentTaskId) {
            return getTaskFromList(currentList, currentTaskId);
        }
        return null;
    }, [currentList, loading, currentTaskId]);
    const error = !loading && currentList && currentTaskId && !currentTask;

    return {
        openTaskModal,
        closeTaskModal,
        currentTaskId,
        currentTask,
        error,
        loading
    };
}

const { Provider, Context, useConsumer: useTask } = createSharedHook(
    useTaskOnce
);

export { Provider as CurrentTaskProvider, Context as TaskContext };
export default useTask;
