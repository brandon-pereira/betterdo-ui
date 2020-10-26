import styled from 'styled-components';
import Icon from '../icon';
import { QUERIES } from '../../constants';

export const Overlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 10;
    background: rgba(0, 0, 0, 0.5);
    ${props =>
        !props.visible &&
        `
        visibility: hidden;
        pointer-events: none;
    `}
`;

export const Container = styled.div`
    background: #fff;
    transition: transform 0.2s;
    box-shadow: 0 3px 5px rgba(0, 0, 0, 0.5);
    box-sizing: border-box;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) scale(0);
    transform-origin: center;
    visibility: hidden;
    transition: transform 0.2s;
    backface-visibility: hidden;
    width: 100%;
    max-width: 500px;
    ${props =>
        props.visible &&
        `
        visibility: visible;
        transform: translate(-50%, -50%);
        }
    `}
    @media ${QUERIES.medium} {
        width: 60%;
    }
`;

export const LoaderContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 10rem;
`;
export const ModalClose = styled(Icon)`
    position: absolute;
    top: 1rem;
    right: 1rem;
    z-index: 3;
    filter: drop-shadow(0 1px #555);
`;

export const Content = styled.div`
    position: relative;
    z-index: 2;
    height: 100%;
    padding: 1rem;
    max-height: 100vh;
    width: 100%;
    box-sizing: border-box;
    overflow: auto;
`;

export const Arrow = styled.div`
    height: 2rem;
    width: 2rem;
    position: absolute;
    z-index: 1;
    top: 1rem;
    left: -1rem;
    transform: rotate(45deg);
    background: #fff;
`;
