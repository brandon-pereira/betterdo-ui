import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import styled from 'styled-components';
import Button from '../components/button';
import EditListModal from './editListModal';

const Container = styled.header`
    grid-row: 1 / 1;
    grid-column: 2 / 3;
    background-color: ${props => props.color};
    background-image: linear-gradient(transparent, rgba(0, 0, 0, 0.2));
    box-shadow: inset 0 -1px rgba(0, 0, 0, 0.3);
    color: #fff;
    display: flex;
    align-items: center;
    padding: 0 0.8rem;
    .button {
        font-size: 0.8rem;
        padding: 0.8rem;
        box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.5),
            inset 0 2px rgba(255, 255, 255, 0.1);
        background: linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.3));
    }
`;
const Title = styled.h2`
    flex: 1;
    text-align: center;
`;

@inject('store')
@observer
export default class Header extends Component {
    render() {
        const store = this.props.store;
        return (
            <Container color={store.currentList.color}>
                <Title>{store.currentList.title}</Title>
                <Button
                    color="rgba(0,0,0,.2)"
                    hidden={store.currentList.type !== 'default'}
                    className="button"
                    onClick={() => (store.modalVisibility.editList = true)}
                >
                    Settings
                </Button>
                <EditListModal />
            </Container>
        );
    }
}
