import { useCallback } from 'react';
import { arrayMoveImmutable } from 'array-move';
import { LayoutGroup, AnimatePresence } from 'framer-motion';
import loadable from '@loadable/component';

import { Container, TaskContainer, Scroller } from './Body.styles';
import CompletedTasksButton from './CompletedTasksButton';
import { ServerErrorBanner } from './Banners';
import type { SortableListProps } from './SortableList';

import customLists from '@utilities/customLists';
import AddTask from '@components/AddTask';
import Task from '@components/Task';
import useListDetails from '@hooks/useListDetails';
import useCurrentListId from '@hooks/useCurrentListId';
import useModifyList from '@hooks/useModifyList';
import useCompletedTasks from '@hooks/useCompletedTasks';

const NotificationBanner = loadable<Record<string, never>>(
    () => import('./NotificationBanner')
);

const SortableList = loadable<SortableListProps>(
    () => import('./SortableList')
);

const AllCaughtUpBanner = loadable(() => import('./AllCaughtUp'));

function Body() {
    const currentListId = useCurrentListId();
    const { list, loading, error } = useListDetails(currentListId);
    const [isCompletedTasksIncluded, setIncludeCompletedTasks] =
        useCompletedTasks();
    const modifyList = useModifyList();

    const onSortEnd = useCallback(
        ({ oldIndex, newIndex }: { oldIndex: number; newIndex: number }) => {
            // Indexes match, no change
            if (oldIndex === newIndex) {
                return;
            }
            try {
                modifyList(currentListId, {
                    tasks: arrayMoveImmutable(
                        list.tasks || [],
                        oldIndex,
                        newIndex
                    )
                });
            } catch (err) {
                console.error(err);
            }
        },
        [list, currentListId, modifyList]
    );

    const isAllCaughtUp = Boolean(
        !error &&
            !loading &&
            list.tasks &&
            list.tasks.length === 0 &&
            !isCompletedTasksIncluded
    );

    const customListConfig = customLists.find(cl => list._id === cl.id);
    const hideAddTaskInput =
        error || (customListConfig && customListConfig.disableTaskCreation);

    return (
        <Container>
            <NotificationBanner />
            <Scroller>
                <AddTask
                    isAbsolute={isAllCaughtUp}
                    isHidden={hideAddTaskInput}
                />
                {!error && (
                    <LayoutGroup>
                        <TaskContainer>
                            {/* Regular non-complete tasks are loaded and sortable  */}
                            <SortableList
                                listId={list._id || currentListId}
                                tasks={list.tasks || []}
                                onSortEnd={onSortEnd}
                            />
                            {/* Completed tasks are not sortable and only shown when requested */}
                            {isCompletedTasksIncluded &&
                                list?.completedTasks?.map(task => (
                                    <Task
                                        key={task._id}
                                        {...task}
                                        isCompleted={true}
                                    />
                                ))}
                            {/* If not loaded, show completed tasks button */}
                            <CompletedTasksButton
                                isAllCaughtUp={isAllCaughtUp}
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
                <AnimatePresence initial={false}>
                    {/* AllCaughtUpBanner will manage unmounting internally for animations */}
                    <AllCaughtUpBanner />
                </AnimatePresence>
                {error && <ServerErrorBanner />}
            </Scroller>
        </Container>
    );
}

export default Body;
