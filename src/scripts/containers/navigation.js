import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import styled from 'styled-components';
import Search from '../components/search';
import ListItem from '../components/list';
import AddListModal from './addListModal';

const Container = styled.nav`
    grid-row: 2 / 3;
    grid-column: 1 / 1;
    background: #202020;
    display: flex;
    flex-direction: column;
    box-shadow: inset 0 1px rgba(255, 255, 255, 0.15);
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
            <Container>
                <Search />
                <ListsContainer>
                    {store.lists.map((item, i) => (
                        <ListItem
                            {...{
                                selected: item._id === store.currentList._id
                            }}
                            key={i}
                            title={item.title}
                            color={item.color}
                            onClick={() => store.switchLists(item)}
                        />
                    ))}
                    <ListItem
                        onClick={() => (store.modalVisibility.newList = true)}
                        newList
                    />
                </ListsContainer>
                <AddListModal />
            </Container>
        );
    }
}

export default Navigation;
