import { useParams } from 'react-router-dom';

function useCurrentTaskId() {
    const { currentTaskId } = useParams();
    return currentTaskId;
}

export default useCurrentTaskId;
