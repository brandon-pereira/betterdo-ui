import React, { Component } from 'react';
import styled from 'styled-components';
import { observer, inject } from 'mobx-react';

const Container = styled.div`
    grid-row: 1 / 1;
    grid-column: 1 / 1;
    cursor: pointer;
    background: linear-gradient(transparent, rgba(0, 0, 0, 0.3)), #222;
    border: none;
    box-shadow: inset 0 -1px rgba(0, 0, 0, 0.9);
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    h1 {
        font-size: 1.8rem;
        font-weight: 200;
    }
    span {
        font-weight: 600;
    }
`;
@inject('store')
@observer
export default class Logo extends Component {
    render() {
        const state = this.props.store;
        return (
            <Container onClick={() => state.switchLists({ _id: 'inbox' })}>
                <h1>
                    Better
                    <span>Do.</span>
                </h1>
            </Container>
        );
    }
}
