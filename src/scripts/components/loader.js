import React from 'react';
import styled, { keyframes } from 'styled-components';
import Loader from '../../svgs/loader.svg';

const rotate = keyframes`
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(270deg);
    }
`;
const dashoffset = keyframes`
    0% {
        stroke-dashoffset: 184;
    }
    50% {
        stroke-dashoffset: 46;
        transform: rotate(135deg);
    }
    100% {
        stroke-dashoffset: 184;
        transform: rotate(450deg);
    }
`;
const Container = styled.div`
    height: ${props => props.size || '1rem'};
    width: ${props => props.size || '1rem'};
    transform: scale(0);
    opacity: 0;
    transition: all 0.5s 0.2s;
    svg {
        height: 100%;
        width: 100%;
        animation: ${rotate} 2s linear infinite;
    }

    svg .path {
        stroke-dasharray: 184;
        stroke-dashoffset: 0;
        transform-origin: center;
        stroke: ${props => props.color || '#fff'};
        animation: ${dashoffset} 2s ease-in-out infinite;
    }
    ${({ loading }) =>
        loading &&
        `
        transition: all 0s 0s !important;
        transform: scale(1);
        opacity: 1;
    `};
`;

const Button = props => (
    <Container {...props}>
        <Loader />
    </Container>
);

export default Button;
