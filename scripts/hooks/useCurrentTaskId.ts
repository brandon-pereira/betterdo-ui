import { useParams } from 'react-router-dom';

function useCurrentTaskId() {
    const { currentTaskId } = useParams<{ currentTaskId: string }>();
    return currentTaskId;
}

export default useCurrentTaskId;
