import { useParams } from 'react-router-dom';

function useCurrentListId() {
    const { currentListId } = useParams();

    return currentListId || 'inbox';
}

export default useCurrentListId;
