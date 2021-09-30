import React, { useCallback } from 'react';
import AddTask from '@components/AddTask';
import Task from '@components/Task';
import { arrayMoveImmutable } from 'array-move';

import { Container, TaskContainer } from './Body.styles.js';
import useListDetails from '@hooks/useListDetails';
import useCurrentListId from '@hooks/useCurrentListId';
import useModifyList from '@hooks/useModifyList';
import SortableList from './SortableList';
import CompletedTasksButton from './CompletedTasksButton';
import { AllCaughtUpBanner, ServerErrorBanner } from './Banners';
import useCompletedTasks from '@hooks/useCompletedTasks';
import NotificationBanner from './NotificationBanner';

function Body() {
    const currentListId = useCurrentListId();
    const { list, loading, error } = useListDetails(currentListId);
    const [isCompletedTasksIncluded, setIncludeCompletedTasks] =
        useCompletedTasks();
    const modifyList = useModifyList();

    const onSortEnd = useCallback(
        ({ oldIndex, newIndex }) => {
            // Indexes match, no change
            if (oldIndex === newIndex) {
                return;
            }
            try {
                modifyList(currentListId, {
                    tasks: arrayMoveImmutable(list.tasks, oldIndex, newIndex)
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
        list.tasks.length === 0 &&
        !isCompletedTasksIncluded;

    return (
        <Container>
            <NotificationBanner />
            <AddTask hidden={error} />
            {isAllCaughtUp && <AllCaughtUpBanner />}
            {error && <ServerErrorBanner />}
            {!error && (
                <TaskContainer>
                    {/* Regular non-complete tasks are loaded and sortable  */}
                    <SortableList tasks={list.tasks} onSortEnd={onSortEnd} />
                    {/* Completed tasks are not sortable and only shown when requested */}
                    {isCompletedTasksIncluded &&
                        list.completedTasks.map(task => (
                            <Task key={task._id} isCompleted={true} {...task} />
                        ))}
                    {/* If not loaded, show completed tasks button */}
                    <CompletedTasksButton
                        hidden={
                            (loading && !isCompletedTasksIncluded) ||
                            error ||
                            list.additionalTasks === 0
                        }
                        count={list.additionalTasks}
                        isLoading={loading && isCompletedTasksIncluded}
                        onClick={() => setIncludeCompletedTasks(true)}
                    />
                </TaskContainer>
            )}
        </Container>
    );
}

export default Body;
