import styled from 'styled-components';
import _Modal from '@components/Modal';

export const Modal = styled(_Modal)`
    position: absolute;
    top: 4.5rem;
    right: 5px;
    left: auto;
    opacity: 0;
    transform: translateY(-10px);
    &.visible {
        opacity: 1;
        transform: translateY(0);
    }
    & [data-betterdo-modal-arrow] {
        top: -1rem;
        right: 1rem;
        left: auto;
    }
`;
