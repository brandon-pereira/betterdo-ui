import React, { useEffect } from 'react';
import AddTask from '../../components/AddTask';
import Banner from '../../components/banner';
import Task from '../../components/Task';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import arrayMove from 'array-move';

import { Container, CompletedTasksButton } from './Body.styles';
import useListDetails from '@hooks/useListDetails';
import useModals from '@hooks/useModals';
import useCreateTask from '@hooks/useCreateTask';
import useCurrentListId from '@hooks/useCurrentListId';
import useModifyList from '@hooks/useModifyList';

const SortableItem = SortableElement(({ value }) => <Task task={value} />);

const SortableList = SortableContainer(({ items }) => {
    return (
        <div>
            {items.map((task, index) => (
                <SortableItem
                    key={typeof task === 'object' ? task._id : index}
                    index={index}
                    value={task}
                />
            ))}
        </div>
    );
});

function Body() {
    const currentListId = useCurrentListId();
    const {
        list: currentList,
        loading,
        isCompletedTasksIncluded,
        setIncludeCompletedTasks,
        error
    } = useListDetails(currentListId);
    const { createTask } = useCreateTask();
    const { modalVisibility } = useModals();
    const modifyList = useModifyList();

    const onSortEnd = ({ oldIndex, newIndex }) => {
        // Indexes match, no change
        if (oldIndex === newIndex) {
            return;
        }
        try {
            modifyList(currentListId, {
                tasks: arrayMove(currentList.tasks, oldIndex, newIndex)
            });
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        let lastRefresh = new Date();
        const listener = () => {
            if (!document.hidden) {
                const now = new Date();
                var timeDiff = now - lastRefresh; //in ms
                // strip the ms
                if (!document.hidden && timeDiff >= 5 * 1000) {
                    lastRefresh = new Date();
                    this.props.store.reload();
                }
            }
        };
        document.addEventListener('visibilitychange', listener);
        return document.removeEventListener('visibilitychange', listener);
    }, []);

    const reloadBrowser = () => {
        if (window && window.location) {
            window.location.reload();
        }
    };

    const hasServerError = Boolean(error);
    const showAllCaughtUpBanner =
        !hasServerError &&
        currentList.tasks &&
        currentList.tasks.length === 0 &&
        (currentList.additionalTasks !== 0 ||
            !currentList.completedTasks.find(task => typeof task !== 'string'));
    return (
        <Container mobileNavVisible={modalVisibility.listsView}>
            {/* {this.getNotificationBanner()} */}
            <AddTask
                hidden={currentList.type === 'loading' || hasServerError}
                createTask={createTask}
            />
            {showAllCaughtUpBanner && (
                <Banner icon="betterdo" body="You're all caught up!" />
            )}
            {hasServerError && (
                <Banner
                    icon="server-error"
                    title="Oops!"
                    body="There was an issue connecting to the server."
                    buttonText="Reload"
                    buttonAction={reloadBrowser}
                />
            )}
            {!hasServerError && (
                <>
                    <SortableList
                        pressDelay={200}
                        items={currentList.tasks || []}
                        onSortEnd={onSortEnd}
                    />
                    {currentList.completedTasks &&
                        currentList.completedTasks.map(task => {
                            if (typeof task === 'object') {
                                return <Task key={task._id} task={task} />;
                            }
                            return null;
                        })}
                    <CompletedTasksButton
                        hidden={
                            hasServerError ||
                            currentList.type === 'loading' ||
                            !currentList.additionalTasks ||
                            currentList.additionalTasks === 0
                        }
                        hasCaughtUpBanner={showAllCaughtUpBanner}
                        isLoading={loading && isCompletedTasksIncluded}
                        color="#999999"
                        onClick={() => setIncludeCompletedTasks(true)}
                    >
                        {currentList.additionalTasks} completed tasks
                    </CompletedTasksButton>
                </>
            )}
        </Container>
    );
}

export default Body;
