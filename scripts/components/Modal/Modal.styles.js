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
export const ModalContent = styled.div``;
export const Container = styled.div`
    position: absolute;
    top: ${props => props.theme.top || '50%'};
    left: ${props => props.theme.left || '50%'};
    bottom: ${props => props.theme.bottom || 'auto'};
    right: ${props => props.theme.right || 'auto'};
    transform:  ${props =>
        props.theme.transformFrom || 'translate(-50%, -50%)'};
    transform-origin: center;
    transition: transform 0.2s;
    backface-visibility: hidden;
    width: ${props => props.theme.mobileWidth || '100%'};
    max-width: 500px;
    ${ModalContent} {
        box-sizing: border-box;
        transition: all .2s;
        transform: ${props =>
            !props.theme.transformFrom ? 'scale(0)' : 'none'};
        background: ${props => props.theme.background || '#fff'};
        padding: 1rem;
        box-shadow: 0 3px 5px rgba(0, 0, 0, 0.5);
        overflow-y: scroll;
        max-height: 100vh;
        width: 100%;
        height: 100%;
    }
    ${props =>
        props.visible &&
        `
        transform: ${props.theme.transformTo || 'translate(-50%, -50%)'};
        ${ModalContent} {
            transform: scale(1);
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
    position: fixed;
    top: 1rem;
    right: 1rem;
    z-index: 2;
    filter: drop-shadow(0 1px #555);
`;
