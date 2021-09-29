import useCurrentListId from '@hooks/useCurrentListId';
import useLists from '@hooks/useLists';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

function InboxRedirect() {
    const currentListId = useCurrentListId();
    const history = useHistory();
    const { lists, loading } = useLists();
    useEffect(() => {
        if ((!currentListId || currentListId === 'inbox') && !loading) {
            const inbox = lists.find(l => l.type === 'inbox');
            history.replace(`/${inbox._id}`);
        }
    }, [currentListId, history, lists, loading]);
    return null;
}

export default InboxRedirect;
