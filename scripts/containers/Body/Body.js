import React, { useCallback } from 'react';
import AddTask from '@components/AddTask';
import Task from '@components/Task';
import arrayMove from 'array-move';

import { Container, TaskContainer } from './Body.styles';
import useListDetails from '@hooks/useListDetails';
import useCurrentListId from '@hooks/useCurrentListId';
import useModifyList from '@hooks/useModifyList';
import SortableList from './SortableList';
import CompletedTasksButton from './CompletedTasksButton';
import { AllCaughtUpBanner, ServerErrorBanner } from './Banners';
import useCompletedTasks from '@hooks/useCompletedTasks';

function Body() {
    const currentListId = useCurrentListId();
    const { list, loading, error } = useListDetails(currentListId);
    const [
        isCompletedTasksIncluded,
        setIncludeCompletedTasks
    ] = useCompletedTasks();
    const modifyList = useModifyList();

    const onSortEnd = useCallback(
        ({ oldIndex, newIndex }) => {
            // Indexes match, no change
            if (oldIndex === newIndex) {
                return;
            }
            try {
                modifyList(currentListId, {
                    tasks: arrayMove(list.tasks, oldIndex, newIndex)
                });
            } catch (err) {
                console.error(err);
            }
        },
        [list, currentListId, modifyList]
    );

    const isAllCaughtUp =
        !error &&
        !loading &&
        list.tasks &&
        list.tasks.length === 0 &&
        (list.additionalTasks !== 0 ||
            !list.completedTasks.find(task => typeof task !== 'string'));
    return (
        <Container>
            {/* {this.getNotificationBanner()} */}
            <AddTask hidden={loading || error} />
            {isAllCaughtUp && <AllCaughtUpBanner />}
            {error && <ServerErrorBanner />}
            {!error && (
                <TaskContainer>
                    {/* Regular non-complete tasks are loaded and sortable  */}
                    <SortableList tasks={list.tasks} onSortEnd={onSortEnd} />
                    {/* Completed tasks are not sortable and only shown when requested */}
                    {isCompletedTasksIncluded &&
                        list &&
                        list.completedTasks.map(task => (
                            <Task
                                key={getTaskId(task)}
                                isCompleted={true}
                                {...task}
                            />
                        ))}
                    {/* If not loaded, show completed tasks button */}
                    <CompletedTasksButton
                        hidden={error || list.additionalTasks === 0}
                        count={list.additionalTasks}
                        isLoading={loading && isCompletedTasksIncluded}
                        onClick={() => setIncludeCompletedTasks(true)}
                    />
                </TaskContainer>
            )}
        </Container>
    );
}

function areCompletedTasksLoaded(list) {
    return list.completedTasks.find(task => typeof task === 'object');
}

function getTaskId(task) {
    return typeof task === 'object' ? task._id : task;
}

export default Body;
