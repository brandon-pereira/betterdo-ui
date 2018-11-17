import React from 'react';
import styled, { css } from 'styled-components';

const Bar = styled.div`
    height: 4px;
    width: 100%;
    background: #fff;
    border-radius: 3px;
    transition: transform 0.4s, opacity 0.2s;
    &:nth-of-type(1) {
        transform-origin: top left;
    }
    &:nth-of-type(3) {
        transform-origin: bottom left;
    }
`;
const Container = styled.div`
    flex-direction: column;
    justify-content: space-between;
    height: 1.5rem;
    width: 2rem;
    cursor: pointer;
    filter: drop-shadow(0 1px rgba(0, 0, 0, 0.5));
    display: flex;
    opacity: ${props => (props.hidden ? '0' : '1')};
    ${props =>
        props.open &&
        css`
            ${Bar}:nth-of-type(1) {
                transform: rotate(45deg);
            }
            ${Bar}:nth-of-type(2) {
                opacity: 0;
            }
            ${Bar}:nth-of-type(3) {
                transform: rotate(-45deg);
            }
        `}
`;

const Hamburger = props => (
    <Container {...props}>
        <Bar />
        <Bar />
        <Bar />
    </Container>
);

export default styled(Hamburger)``;
