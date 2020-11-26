import React, { useEffect, useState } from 'react';
import AddTask from '../../components/AddTask';
import Banner from '../../components/banner';
import Task from '../../components/Task';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import arrayMove from 'array-move';

import { Container, CompletedTasksButton } from './Body.styles';
import useCurrentList from '@hooks/useCurrentList';
import useModals from '@hooks/useModals';
import useCreateTask from '@hooks/useCreateTask';

const SortableItem = SortableElement(({ value }) => <Task task={value} />);

const SortableList = SortableContainer(({ items }) => {
    return (
        <>
            {items.map((task, index) => (
                <SortableItem
                    key={typeof task === 'object' ? task._id : index}
                    index={index}
                    value={task}
                />
            ))}
        </>
    );
});

function Body() {
    const [loadingCompletedTasks, setLoadingCompletedTasks] = useState(false);

    const loadCompletedTasks = async () => {
        setLoadingCompletedTasks(true);
        await loadCompletedTasks(currentList._id);
        setLoadingCompletedTasks(false);
    };

    const onSortEnd = ({ oldIndex, newIndex }) => {
        // Indexes match, no change
        if (oldIndex === newIndex) {
            return;
        }
        currentList.tasks = arrayMove(currentList.tasks, oldIndex, newIndex);
        try {
            this.props.store.updateList(currentList._id, {
                tasks: currentList.tasks.map(t => t._id)
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
    const { currentList, error } = useCurrentList();
    const { createTask } = useCreateTask();
    const { modalVisibility } = useModals();
    console.log(currentList, error);
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
                    <div>
                        {currentList.completedTasks &&
                            currentList.completedTasks.map((task, index) => {
                                if (typeof task === 'object') {
                                    return <Task task={task} />;
                                }
                                return null;
                            })}
                    </div>
                    <CompletedTasksButton
                        hidden={
                            hasServerError ||
                            currentList.type === 'loading' ||
                            !currentList.additionalTasks ||
                            currentList.additionalTasks === 0
                        }
                        hasCaughtUpBanner={showAllCaughtUpBanner}
                        isLoading={loadingCompletedTasks}
                        color="#999999"
                        onClick={loadCompletedTasks}
                    >
                        {currentList.additionalTasks} completed tasks
                    </CompletedTasksButton>
                </>
            )}
        </Container>
    );
}

export default Body;
