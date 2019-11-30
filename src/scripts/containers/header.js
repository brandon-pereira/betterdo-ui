import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import styled from 'styled-components';
import Button from '../components/button';
import Icon from '../components/icon';
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
    padding: 0 0.8rem 0 0;
    overflow: hidden;
    ${Hamburger} {
        padding: 0 0.5rem 0 0.8rem;
        
    }
    ${Loader} {
        filter: drop-shadow(1px 1px rgba(0,0,0,.5))
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

const SettingsButton = styled(Button)`
    margin-left: 0.35rem;
    border-radius: 20px;
    user-select: none;
    padding: 0.8rem 1.1rem;
    box-shadow: 0px 0px 0px 1px inset rgba(0, 0, 0, 0.8),
        0px 2px inset rgba(255, 255, 255, 0.1), 0 1px rgba(255, 255, 255, 0.3);
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
class Header extends Component {
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
                <Loader isLoading={this.props.store.loading} size="2rem" />
                <Title>{store.currentList.title}</Title>
                <SettingsButton
                    color="rgba(0,0,0,.2)"
                    hidden={store.currentList.type !== 'default'}
                    onClick={() => (store.modalVisibility.editList = true)}
                >
                    <Icon icon="settings" color="#fff" />
                </SettingsButton>
            </Container>
        );
    }
}

export default Header;
