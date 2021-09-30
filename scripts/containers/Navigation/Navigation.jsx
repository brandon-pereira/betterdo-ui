import React, { useCallback } from 'react';
import { arrayMoveImmutable } from 'array-move';

import useLists from '@hooks/useLists';
import useNewListModal from '@hooks/useNewListModal';
import useCurrentListId from '@hooks/useCurrentListId';
import useSwitchList from '@hooks/useSwitchList';
import useModifyProfile from '@hooks/useModifyProfile';
import useHamburgerNav from '@hooks/useHamburgerNav';
import ListItem from '@components/ListItem';

import SortableList from './SortableList';
import {
    Container,
    NavigationModalOverlay,
    ListsContainer
} from './Navigation.styles.js';

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
                    lists: arrayMoveImmutable(lists, oldIndex, newIndex)
                });
            } catch (err) {
                console.error(err);
            }
        },
        [lists, modifyProfile]
    );

    return (
        <Container isMobileNavVisible={isMobileNavVisible}>
            <ListsContainer>
                <SortableList
                    lists={lists}
                    currentId={currentListId}
                    onSortEnd={onSortEnd}
                    onClick={switchList}
                />
                <ListItem
                    onClick={openNewListModal}
                    list={{ type: 'newList' }}
                />
            </ListsContainer>
            <NavigationModalOverlay
                onClick={() => setMobileNavVisibility(false)}
            />
        </Container>
    );
}

export default Navigation;
