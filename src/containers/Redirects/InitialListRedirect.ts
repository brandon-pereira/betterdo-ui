import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import useCurrentListId from '@hooks/useCurrentListId';
import useLists from '@hooks/useLists';

function InitialListRedirect() {
    const currentListId = useCurrentListId();
    const navigate = useNavigate();
    const { lists, loading } = useLists();
    useEffect(() => {
        if ((!currentListId || currentListId === 'inbox') && !loading) {
            const inbox = lists.find(l => l.type === 'inbox');
            const lastListId = localStorage.getItem('lastViewedList');
            const lastVisited = lists.find(l => l._id === lastListId);
            if (lastVisited) {
                navigate(`/${lastVisited._id}`);
            } else if (inbox) {
                navigate(`/${inbox._id}`);
            }
        }
    }, [currentListId, navigate, lists, loading]);
    return null;
}

export default InitialListRedirect;
