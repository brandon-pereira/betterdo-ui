import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import styled from 'styled-components';

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
`;
const Button = styled.button`
    appearance: none;
    background: linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.3));
    border: none;
    box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.5),
        inset 0 2px rgba(255, 255, 255, 0.1);
    border-radius: 3px;
    font-size: 0.8rem;
    padding: 0.8rem;
    color: #fff;
    outline: none;
    cursor: pointer;
    &.hidden {
        display: none;
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
        const state = this.props.store;
        return (
            <Container color={state.currentList.color}>
                <Title>{state.currentList.title}</Title>
                <Button
                    className={
                        state.currentList.type !== 'default' ? 'hidden' : ''
                    }
                    onClick={state.settingsButtonClick}
                >
                    Settings
                </Button>
            </Container>
        );
    }
}
