import React from 'react';
import styled from 'styled-components';

const Container = styled.button`
    border: none;
    color: #fff;
    border-radius: 5px;
    padding: 0.8rem 1rem;
    font: inherit;
    background-color: ${props => props.color || '#1E88E5'};
    background-image: linear-gradient(transparent, rgba(0, 0, 0, 0.3));
    box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.5),
        inset 0 2px rgba(255, 255, 255, 0.5), 0 4px 6px rgba(0, 0, 0, 0.2);
    text-shadow: 1px 1px rgba(0, 0, 0, 0.6);
    font-size: 1rem;
    margin-top: 1rem;
    cursor: pointer;
    position: relative;
    overflow: hidden;
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
        props.loading &&
        `
            font-size: 0;
            pointer-events: none;
            &:before {
                opacity: 1;
                background: rgba(255, 255, 255, 0.3);
            }
            &:after {
                content: "Loading...";
                font-size: 1rem;
            }
        `};
`;

const Button = ({ children, ...props }) => (
    <Container {...props}>
        <span>{children}</span>
    </Container>
);

export default Button;
