import React, { useCallback } from 'react';
import { arrayMoveImmutable } from 'array-move';
import { LayoutGroup } from 'framer-motion';

import { Container, TaskContainer, Scroller } from './Body.styles.js';
import SortableList from './SortableList';
import CompletedTasksButton from './CompletedTasksButton';
import { AllCaughtUpBanner, ServerErrorBanner } from './Banners';
import NotificationBanner from './NotificationBanner';

import customLists from '@utilities/customLists';
import AddTask from '@components/AddTask';
import Task from '@components/Task';
import useListDetails from '@hooks/useListDetails';
import useCurrentListId from '@hooks/useCurrentListId';
import useModifyList from '@hooks/useModifyList';
import useCompletedTasks from '@hooks/useCompletedTasks';

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

    const customListConfig = customLists.find(cl => list._id === cl.id);
    const hideAddTaskInput =
        error || (customListConfig && customListConfig.disableTaskCreation);

    return (
        <Container>
            <Scroller>
                <NotificationBanner />
                <AddTask isHidden={hideAddTaskInput} />
                {isAllCaughtUp && <AllCaughtUpBanner />}
                {error && <ServerErrorBanner />}
                {!error && (
                    <LayoutGroup>
                        <TaskContainer>
                            {/* Regular non-complete tasks are loaded and sortable  */}
                            <SortableList
                                listId={list._id}
                                tasks={list.tasks}
                                onSortEnd={onSortEnd}
                            />
                            {/* Completed tasks are not sortable and only shown when requested */}
                            {isCompletedTasksIncluded &&
                                list.completedTasks.map(task => (
                                    <Task
                                        key={task._id}
                                        isCompleted={true}
                                        {...task}
                                    />
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
                    </LayoutGroup>
                )}
            </Scroller>
        </Container>
    );
}

export default Body;
