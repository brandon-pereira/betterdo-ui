import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

function useCurrentListId() {
    const { currentListId } = useParams<{ currentListId?: string }>();

    useEffect(() => {
        if (currentListId) {
            localStorage.setItem('lastViewedList', currentListId);
        }
    }, [currentListId]);

    return currentListId || 'inbox';
}

export default useCurrentListId;
