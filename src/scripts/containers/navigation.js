import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import styled from 'styled-components';
import Search from '../components/search';
import ListItem from '../components/list';

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

@inject('state')
@observer
class Navigation extends Component {
    render() {
        const state = this.props.state;
        return (
            <Container>
                <Search />
                <ListsContainer>
                    {state.lists.map((item, i) => (
                        <ListItem
                            {...{
                                selected: item._id === state.currentList._id
                            }}
                            key={i}
                            title={item.title}
                            color={item.color}
                            onClick={() => state.switchLists(item)}
                        />
                    ))}
                    <ListItem
                        onClick={() => state.openNewListModal()}
                        newList
                    />
                </ListsContainer>
            </Container>
        );
    }
}

export default Navigation;
