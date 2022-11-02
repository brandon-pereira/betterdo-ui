import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import useGeneratedUrl from '@hooks/useGeneratedUrl';

function useEditTaskModal() {
    const navigate = useNavigate();
    const generateUrl = useGeneratedUrl();
    const openTaskModal = useCallback(
        (taskId: string) => {
            navigate(generateUrl('/edit-task/' + taskId));
        },
        [generateUrl, navigate]
    );
    const closeModal = useCallback(() => {
        navigate(generateUrl());
    }, [generateUrl, navigate]);

    return {
        openTaskModal,
        closeModal
    };
}
export default useEditTaskModal;
