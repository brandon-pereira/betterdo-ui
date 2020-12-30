import React, { useCallback } from 'react';
import useModals from '@hooks/useModals';
import ListItem from '@components/ListItem';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import arrayMove from 'array-move';

import {
    Container,
    NavigationModalOverlay,
    ListsContainer,
    MobileNavigationSkirt
} from './Navigation.styles';
import useLists from '@hooks/useLists';
import useNewListModal from '@hooks/useNewListModal';
import useCurrentListId from '@hooks/useCurrentListId';
import useSwitchList from '@hooks/useSwitchList';
import useModifyProfile from '@hooks/useModifyProfile';

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
        <div>
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
        </div>
    );
});

function Navigation() {
    const { modalVisibility, closeModal } = useModals();
    const currentListId = useCurrentListId();
    const modifyProfile = useModifyProfile();
    const switchList = useSwitchList();
    const { openModal: openNewListModal } = useNewListModal();
    const { lists } = useLists();

    const onSortEnd = useCallback(
        ({ oldIndex, newIndex }) => {
            // Indexes match, no change
            if (oldIndex === newIndex) {
                return;
            }
            try {
                modifyProfile({
                    lists: arrayMove(lists, oldIndex, newIndex)
                });
            } catch (err) {
                console.error(err);
            }
        },
        [lists, modifyProfile]
    );

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

                    <ListItem onClick={openNewListModal} type="newList" />
                </ListsContainer>
                <NavigationModalOverlay
                    onClick={() => closeModal('listsView')}
                />
            </Container>
        </>
    );
}

export default Navigation;
