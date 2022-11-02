import { useParams } from 'react-router-dom';

function useCurrentListId() {
    const { currentListId } = useParams<{ currentListId?: string }>();

    return currentListId || 'inbox';
}

export default useCurrentListId;
