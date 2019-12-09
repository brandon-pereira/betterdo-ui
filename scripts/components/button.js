import React from 'react';
import styled from 'styled-components';
import Loader from './loader';
import { COLORS } from '../constants';
const Container = styled.button.attrs(props => ({
    style: {
        backgroundColor: props.color || COLORS.blue
    }
}))`
    border: none;
    color: #fff;
    border-radius: 5px;
    padding: ${props => (props.small ? '0.4rem 0.5rem' : '0.8rem 1rem')};
    font: inherit;
    background-image: linear-gradient(transparent, rgba(0, 0, 0, 0.3));
    box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.5),
        inset 0 2px rgba(255, 255, 255, 0.5), 0 4px 6px rgba(0, 0, 0, 0.2);
    text-shadow: 1px 1px rgba(0, 0, 0, 0.6);
    font-size: ${props => (props.small ? '0.6rem' : '1rem')};
    cursor: pointer;
    position: relative;
    z-index: 0;
    overflow: hidden;
    outline: none;
    display: ${({ hidden }) => (hidden ? 'none' : 'inline-flex')};
    align-items: center;
    ${Loader} {
        display: inline-block;
        margin-right: 0.5rem;
    }
    span {
        position: relative;
        z-index: 1;
    }
    &:before {
        content: '';
        opacity: 0;
        transition: opacity 0.2s;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.3);
    }
    &:hover:before {
        opacity: 1;
    }
    ${props =>
        props.isLoading &&
        `
            pointer-events: none;
            &:before {
                opacity: 1;
                background: rgba(255, 255, 255, 0.3);
            }
        `};
`;

const Button = ({ children, type, ...props }) => (
    <Container type={type || 'button'} {...props}>
        {props.isLoading && <Loader isLoading={true} size="1rem" />}
        {props.isLoading ? (
            <span>{props.loadingText || 'Loading'}</span>
        ) : (
            <span>{children}</span>
        )}
    </Container>
);

export default styled(Button)``;
