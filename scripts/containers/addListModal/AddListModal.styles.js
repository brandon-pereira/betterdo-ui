import styled from 'styled-components';
import _Modal from '@components/Modal';
import { QUERIES } from '../../constants';

console.log(QUERIES);
export const Modal = styled(_Modal)`
    [data-betterdo-modal-arrow] {
        display: none;
    }
    @media ${QUERIES.medium} {
        transform: translateX(-50px);
        opacity: 0;
        transition: transform 0.2s;
        &.visible {
            transform: translateX(0%);
            opacity: 1;
        }
        [data-betterdo-modal-arrow] {
            display: block;
        }
    }
`;
