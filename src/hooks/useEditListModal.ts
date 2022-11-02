import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import useGeneratedUrl from '@hooks/useGeneratedUrl';

function useEditListModal() {
    const generateUrl = useGeneratedUrl();
    const navigate = useNavigate();

    const openModal = useCallback(() => {
        navigate(generateUrl('/edit-list/general'));
    }, [navigate, generateUrl]);

    const closeModal = useCallback(() => {
        navigate(generateUrl());
    }, [navigate, generateUrl]);

    return {
        openModal,
        closeModal
    };
}

export default useEditListModal;
