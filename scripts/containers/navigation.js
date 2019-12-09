import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import styled from 'styled-components';
// import Search from '../components/search';
import ListItem from '../components/list';
import { QUERIES } from '../constants';
import { COLORS } from '../constants';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import arrayMove from 'array-move';

const NavigationModalOverlay = styled.div`
    background: rgba(0, 0, 0, 0.5);
    position: fixed;
    top: 100%;
    left: 0;
    right: 0;
    height: 1000%;
`;
const Container = styled.nav`
    background: ${COLORS.navigationBackground};
    flex-direction: column;
    box-shadow: inset 0 1px rgba(255, 255, 255, 0.15), 0 1px 2px rgba(0,0,0,.9);
    transform: translateY(-100%);
    transition: transform 0s;
    position: relative;
    z-index: 5;
    display: none;
     ${props =>
         props.visibleOnMobile &&
         `
        display: flex;
        grid-row: 2;
        grid-column: 2;
        transform: translateY(0%);
        transition: transform .2s;
    `}
    @media ${QUERIES.medium} {
        display: flex;
        position: static;
        transform: none;
        grid-row: 2 / 3;
        grid-column: 1 / 1;
        overflow: hidden;
        ${NavigationModalOverlay} {
            display: none;
        }
    }
`;
const ListsContainer = styled.ul`
    list-style: none;
    padding: 0;
    margin: 0;
    flex: 1;
    overflow-y: auto;
    &::-webkit-scrollbar {
        width: 5px;
    }
    &::-webkit-scrollbar-track {
        background: rgba(0, 0, 0, 0.9);
    }
    &::-webkit-scrollbar-thumb {
        background: linear-gradient(#1e88e5, #1565c0);
    }
`;

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

@inject('store')
@observer
class Navigation extends Component {
    onSortEnd({ oldIndex, newIndex }) {
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
    }

    render() {
        const store = this.props.store;
        return (
            <Container
                visibleOnMobile={this.props.store.modalVisibility.listsView}
            >
                <ListsContainer>
                    <SortableList
                        lockAxis="y"
                        pressDelay={200}
                        items={store.lists}
                        currentId={store.currentList._id}
                        onSortEnd={this.onSortEnd.bind(this)}
                        onClick={id => store.switchLists(id)}
                    />
                    <ListItem
                        onClick={() => (store.modalVisibility.newList = true)}
                        newList
                    />
                </ListsContainer>
                <NavigationModalOverlay
                    onClick={() => {
                        this.props.store.modalVisibility.listsView = false;
                    }}
                />
            </Container>
        );
    }
}

export default Navigation;
