import React, { Component } from 'react';
import styled from 'styled-components';
import { observer, inject } from 'mobx-react';
import Loader from './loader';

const Container = styled.div`
    grid-row: 1 / 1;
    grid-column: 1 / 1;
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
    .logo-loader {
        margin-right: 1rem;
    }
`;
@inject('store')
@observer
export default class Logo extends Component {
    render() {
        const state = this.props.store;
        return (
            <Container onClick={() => state.switchLists('inbox')}>
                <h1>
                    Better
                    <span>Do.</span>
                </h1>
                <Loader
                    className="logo-loader"
                    size="2rem"
                    loading={this.props.store.loading}
                />
            </Container>
        );
    }
}
