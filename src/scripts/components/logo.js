import React, { Component } from 'react';
import styled from 'styled-components';
import { observer, inject } from 'mobx-react';
import Loader from './loader';
import { QUERIES } from '../constants';
const Container = styled.div`
    overflow: hidden;
    cursor: pointer;
    background: linear-gradient(transparent, rgba(0, 0, 0, 0.3)), #222;
    border: none;
    box-shadow: inset 0 -1px rgba(0, 0, 0, 0.9);
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
    padding: 0;
    h1 {
        margin: 0 1rem;
        font-size: 1.8rem;
        font-weight: 200;
    }
    span {
        font-weight: 600;
    }
    ${Loader} {
        margin-right: 1rem;
    }
    ${props =>
        props.visibleOnMobile &&
        `
        grid-row: 1 / 1;
        grid-column: 2 / 3;
    `}
    @media ${QUERIES.medium} {
        grid-row: 1 / 1;
        grid-column: 1 / 1;
    }
`;
@inject('store')
@observer
export default class Logo extends Component {
    render() {
        const state = this.props.store;
        return (
            <Container
                visibleOnMobile={this.props.store.modalVisibility.listsView}
                onClick={() => state.switchLists('inbox')}
            >
                <h1>
                    Better
                    <span>Do.</span>
                </h1>
                <Loader size="2rem" loading={this.props.store.loading} />
            </Container>
        );
    }
}
