import React, { Component } from 'react';
import styled from 'styled-components';
import { observer, inject } from 'mobx-react';
import ProfilePic from './profilePic';
import Icon from './hamburger';
import { QUERIES } from '../constants';

const Container = styled.div`
    background-image: linear-gradient(transparent,rgba(0,0,0,0.2));
    background-color: ${props => props.color};
    overflow: hidden;
    transform: translateY(-100%);
    transition: transform 0.2s;
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
    }
`;
const Content = styled.div`
    height: 100%;
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
    h1 {
        margin: 0;
        font-size: 1.8rem;
        font-weight: 200;
    }
    span {
        font-weight: 600;
    }
    ${ProfilePic} {
        box-shadow: 0 2px 3px rgba(0, 0, 0, 0.5);
        flex-shrink: 0;
    }
    @media ${QUERIES.medium} {
        border-radius: 0 30px 0 0;
        transform: none;
        padding: 0 0.5rem;
        h1 {
            font-size: 1.2rem;
            margin-right: 0.2rem;
        }
        ${ProfilePic} {
            height: 2rem;
            width: 2rem;
        }
        ${Icon} {
            display: none;
        }
    }
    @media ${QUERIES.large} {
        h1 {
            font-size: 1.8rem;
            margin-right: 1rem;
        }
        ${ProfilePic} {
            height: 3rem;
            width: 3rem;
        }
    }
`;
@inject('store')
@observer
class Logo extends Component {
    render() {
        const store = this.props.store;
        return (
            <Container
                color={store.currentList.color}
                // color="red"
                visibleOnMobile={store.modalVisibility.listsView}
            >
                <Content onClick={() => store.reload()}>
                    <Icon
                        open={store.modalVisibility.listsView}
                        onClick={e => {
                            store.modalVisibility.listsView = false;
                            e.stopPropagation();
                        }}
                    />
                    <h1>
                        Better
                        <span>Do.</span>
                    </h1>
                    {store.user && (
                        <ProfilePic
                            onClick={() =>
                                (store.modalVisibility.userSettings = true)
                            }
                            user={store.user}
                        />
                    )}
                </Content>
            </Container>
        );
    }
}
export default Logo;