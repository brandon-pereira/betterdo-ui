import React, { useCallback } from 'react';

import ListItem from '@components/ListItem';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import arrayMove from 'array-move';

import {
    Container,
    NavigationModalOverlay,
    ListsContainer
} from './Navigation.styles';
import useLists from '@hooks/useLists';
import useNewListModal from '@hooks/useNewListModal';
import useCurrentListId from '@hooks/useCurrentListId';
import useSwitchList from '@hooks/useSwitchList';
import useModifyProfile from '@hooks/useModifyProfile';
import useHamburgerNav from '@hooks/useHamburgerNav';

const SortableItem = SortableElement(({ value, onClick, currentId }) => (
    <ListItem
        selected={value.id === currentId}
        key={value.id}
        type={value.type}
        title={value.title}
        color={value.color}
        onClick={() => onClick(value)}
    />
));

const SortableList = SortableContainer(({ items, currentId, onClick }) => {
    return (
        <div>
            {items.map((list, index) => (
                <SortableItem
                    key={typeof task === 'object' ? list.id : index}
                    index={index}
                    value={list}
                    currentId={currentId}
                    onClick={onClick}
                    disabled={list.type !== 'default'}
                />
            ))}
        </div>
    );
});

function Navigation() {
    const [isMobileNavVisible, setMobileNavVisibility] = useHamburgerNav();
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
            {/* <MobileNavigationSkirt isMobileNavVisible={isMobileNavVisible} /> */}
            <Container isMobileNavVisible={isMobileNavVisible}>
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
                    onClick={() => setMobileNavVisibility(false)}
                />
            </Container>
        </>
    );
}

export default Navigation;
