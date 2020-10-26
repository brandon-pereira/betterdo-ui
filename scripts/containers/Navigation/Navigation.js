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

const SortableItem = SortableElement(({ value, onClick, currentId }) => (
    <ListItem
        {...{
            selected: value._id === currentId
        }}
        key={value._id}
        type={value.type}
        title={value.title}
        color={value.color}
        onClick={() => onClick(value._id)}
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
    const { modalVisibility, openModal, closeModal } = useModals();
    const { currentList, switchList } = useCurrentList();
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
                        currentId={currentList._id}
                        onSortEnd={onSortEnd}
                        onClick={switchList}
                    />

                    <ListItem onClick={() => openModal('newList')} newList />
                </ListsContainer>
                <NavigationModalOverlay
                    onClick={() => closeModal('listsView')}
                />
            </Container>
        </>
    );
}

export default Navigation;
