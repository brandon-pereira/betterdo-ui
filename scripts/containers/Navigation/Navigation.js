import React from 'react';
import useModals from '@hooks/useModals';
import ListItem from '@components/list';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import arrayMove from 'array-move';

import {
    Container,
    NavigationModalOverlay,
    ListsContainer,
    MobileNavigationSkirt
} from './Navigation.styles';
import useCurrentList from '@hooks/useCurrentList';
import useLists from '@hooks/useLists';
import { useHistory } from 'react-router-dom';
import useNewListModal from '@hooks/useNewListModal';

const SortableItem = SortableElement(({ value, onClick, currentId }) => (
    <ListItem
        selected={value._id === currentId}
        key={value._id}
        type={value.type}
        title={value.title}
        color={value.color}
        onClick={() => onClick(value)}
    />
));

const SortableList = SortableContainer(({ items, currentId, onClick }) => {
    return (
        <>
            {items.map((task, index) => (
                <SortableItem
                    key={typeof task === 'object' ? task._id : index}
                    index={index}
                    value={task}
                    currentId={currentId}
                    onClick={onClick}
                    disabled={task.type !== 'default'}
                />
            ))}
        </>
    );
});

function Navigation() {
    const { modalVisibility, closeModal } = useModals();
    const { currentListId, switchList } = useCurrentList();
    const { openModal: openNewListModal } = useNewListModal();
    const { lists } = useLists();

    const onSortEnd = ({ oldIndex, newIndex }) => {
        const store = this.props.store;
        // Indexes match, no change
        if (oldIndex === newIndex) {
            return;
        }
        store.lists = arrayMove(store.lists, oldIndex, newIndex);

        try {
            this.props.store.updateUser({
                lists: store.lists
                    .filter(t => t.type === 'default')
                    .map(t => t._id)
            });
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <>
            <MobileNavigationSkirt
                visibleOnMobile={modalVisibility.listsView}
            />
            <Container visibleOnMobile={modalVisibility.listsView}>
                <ListsContainer>
                    <SortableList
                        lockAxis="y"
                        pressDelay={200}
                        items={lists}
                        currentId={currentListId}
                        onSortEnd={onSortEnd}
                        onClick={switchList}
                    />

                    <ListItem onClick={openNewListModal} newList />
                </ListsContainer>
                <NavigationModalOverlay
                    onClick={() => closeModal('listsView')}
                />
            </Container>
        </>
    );
}

export default Navigation;
