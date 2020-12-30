import React, { useCallback } from 'react';
import AddTask from '@components/AddTask';
import Banner from '@components/banner';
import Task from '@components/Task';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import arrayMove from 'array-move';

import { Container, CompletedTasksButton } from './Body.styles';
import useListDetails from '@hooks/useListDetails';
import useModals from '@hooks/useModals';
import useCurrentListId from '@hooks/useCurrentListId';
import useModifyList from '@hooks/useModifyList';

const SortableItem = SortableElement(({ value }) => <Task {...value} />);

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
        list,
        loading,
        isCompletedTasksIncluded,
        setIncludeCompletedTasks,
        error
    } = useListDetails(currentListId);
    const { modalVisibility } = useModals();
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

    const reloadBrowser = useCallback(() => {
        window.location.reload();
    }, []);

    const hasServerError = Boolean(error);
    const showAllCaughtUpBanner =
        !hasServerError &&
        list.tasks &&
        list.tasks.length === 0 &&
        (list.additionalTasks !== 0 ||
            !list.completedTasks.find(task => typeof task !== 'string'));
    return (
        <Container mobileNavVisible={modalVisibility.listsView}>
            {/* {this.getNotificationBanner()} */}
            <AddTask hidden={list.type === 'loading' || hasServerError} />
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
                        items={list.tasks || []}
                        onSortEnd={onSortEnd}
                    />
                    {list.completedTasks &&
                        list.completedTasks.map(task => {
                            if (typeof task === 'object') {
                                return <Task key={task._id} {...task} />;
                            }
                            return null;
                        })}
                    <CompletedTasksButton
                        hidden={
                            hasServerError ||
                            list.type === 'loading' ||
                            !list.additionalTasks ||
                            list.additionalTasks === 0
                        }
                        hasCaughtUpBanner={showAllCaughtUpBanner}
                        isLoading={loading && isCompletedTasksIncluded}
                        color="#999999"
                        onClick={() => setIncludeCompletedTasks(true)}
                    >
                        {list.additionalTasks} completed tasks
                    </CompletedTasksButton>
                </>
            )}
        </Container>
    );
}

export default Body;
