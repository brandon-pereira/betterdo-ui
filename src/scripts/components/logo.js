import React, { Component } from 'react';
import styled from 'styled-components';
import { observer, inject } from 'mobx-react';
import Loader from './loader';
import Icon from './hamburger';
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
    padding: 0 1rem;
    transform: translateY(-100%);
    transition: transform .2s;
    h1 {
        margin: 0;
        font-size: 1.8rem;
        font-weight: 200;
    }
    span {
        font-weight: 600;
    }
    ${props =>
        props.visibleOnMobile &&
        `
        transform: translateY(0%);
        grid-row: 1 / 1;
        grid-column: 2 / 3;
    `}
    @media ${QUERIES.medium} {
        transform: none;
        grid-row: 1 / 1;
        grid-column: 1 / 1;
        h1 {
            font-size: 1.3rem;
            margin-right: 1rem;
        }
        ${Icon} {
            display: none;
        }

    }
    @media ${QUERIES.large} {
        h1 {
            font-size: 1.8rem;
        }
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
                onClick={() => state.reload()}
            >
                <Icon
                    open={this.props.store.modalVisibility.listsView}
                    onClick={e => {
                        this.props.store.modalVisibility.listsView = false;
                        e.stopPropagation();
                    }}
                />
                <h1>
                    Better
                    <span>Do.</span>
                </h1>
                <Loader size="2rem" loading={this.props.store.loading} />
            </Container>
        );
    }
}
