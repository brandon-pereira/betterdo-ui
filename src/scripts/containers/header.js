import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import styled from 'styled-components';
import Button from '../components/button';
import Loader from '../components/loader';
import Hamburger from '../components/hamburger';
import { QUERIES } from '../constants';

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
    overflow: hidden;
    ${Hamburger} {
        margin-right: 0.5rem;
    }
    ${Loader} {
        filter: drop-shadow(1px 1px rgba(0,0,0,.5))
    }
    ${Button} {
        margin-left: 0.5rem;
        font-size: 0.8rem;
        padding: 0.8rem;
        box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.5),
            inset 0 2px rgba(255, 255, 255, 0.1);
        background: linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.3));
    }
    ${props =>
        props.mobileNavVisible &&
        `
        grid-row: 3;
    `}
    @media ${QUERIES.medium} {
        grid-row: 1;
        ${Hamburger} {
            display: none;
        }
    }
`;
const Title = styled.h2`
    flex: 1;
    font-size: 1.8rem;
    text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);
    text-align: center;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    line-height: 4rem;
    margin: 0;
`;

@inject('store')
@observer
export default class Header extends Component {
    render() {
        const store = this.props.store;
        return (
            <Container
                mobileNavVisible={this.props.store.modalVisibility.listsView}
                color={store.currentList.color}
            >
                <Hamburger
                    open={this.props.store.modalVisibility.listsView}
                    hidden={this.props.store.modalVisibility.listsView}
                    onClick={() => {
                        this.props.store.modalVisibility.listsView = true;
                    }}
                />
                <Loader loading={this.props.store.loading} size="2rem" />
                <Title>{store.currentList.title}</Title>
                <Button
                    color="rgba(0,0,0,.2)"
                    hidden={store.currentList.type !== 'default'}
                    onClick={() => (store.modalVisibility.editList = true)}
                >
                    Settings
                </Button>
            </Container>
        );
    }
}
