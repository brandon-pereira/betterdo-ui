import { useCallback } from 'react';
import { useHistory } from 'react-router-dom';

import useGeneratedUrl from '@hooks/useGeneratedUrl';

function useEditListModal() {
    const generateUrl = useGeneratedUrl();
    const history = useHistory();

    const openModal = useCallback(() => {
        history.replace(generateUrl('/edit-list'));
    }, [history, generateUrl]);

    const closeModal = useCallback(() => {
        history.replace(generateUrl());
    }, [history, generateUrl]);

    return {
        openModal,
        closeModal
    };
}

export default useEditListModal;
