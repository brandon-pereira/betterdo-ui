import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import styled from 'styled-components';
import Search from '../components/search';
import ListItem from '../components/list';
import AddListModal from './addListModal';
import { QUERIES } from '../constants';

const NavigationModalOverlay = styled.div`
    background: rgba(0, 0, 0, 0.5);
    position: fixed;
    top: 100%;
    left: 0;
    right: 0;
    height: 1000%;
`;
const Container = styled.nav`
    background: #202020;
    display: flex;
    flex-direction: column;
    box-shadow: inset 0 1px rgba(255, 255, 255, 0.15), 0 1px 2px rgba(0,0,0,.9);
    transform: translateY(-100%);
    transition: transform 0s;
    position: relative;
    z-index: 1;
     ${props =>
         props.visibleOnMobile &&
         `
        grid-row: 2;
        grid-column: 2;
        transform: translateY(0%);
        transition: transform .2s;
    `}
    @media ${QUERIES.medium} {
        position: static;
        transform: none;
        grid-row: 2 / 3;
        grid-column: 1 / 1;
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
`;

@inject('store')
@observer
class Navigation extends Component {
    render() {
        const store = this.props.store;
        return (
            <Container
                visibleOnMobile={this.props.store.modalVisibility.listsView}
            >
                <Search />
                <ListsContainer>
                    {store.lists.map((item, i) => (
                        <ListItem
                            {...{
                                selected: item._id === store.currentList._id
                            }}
                            key={i}
                            type={item.type}
                            title={item.title}
                            color={item.color}
                            onClick={() => store.switchLists(item._id)}
                        />
                    ))}
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
                <AddListModal />
            </Container>
        );
    }
}

export default Navigation;
