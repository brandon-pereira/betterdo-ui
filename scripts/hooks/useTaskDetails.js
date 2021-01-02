import useListDetails from './useListDetails';

const getTaskFromList = (list, id) => {
    return (
        list.tasks.find(task => task._id === id) ||
        list.completedTasks.find(task => task._id === id)
    );
};

// TODO: This is kinda janky, we should expose a /api/task route...
function useTaskDetails(listId, taskId) {
    const { list, loading } = useListDetails(listId);
    let task = null;
    if (!loading && list) {
        task = getTaskFromList(list, taskId);
    }
    const error = !loading && list && taskId && !task;

    return {
        task,
        error,
        loading
    };
}

export default useTaskDetails;
