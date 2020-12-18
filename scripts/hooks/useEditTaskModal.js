import { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import useGeneratedUrl from './useGeneratedUrl';

function useEditTaskModal() {
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

    return {
        openTaskModal,
        closeTaskModal
    };
}
export default useEditTaskModal;
