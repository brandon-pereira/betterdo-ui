import { styled } from 'styled-components';

import _Modal from '@components/Modal';

export const Modal = styled(_Modal)`
    padding: 1rem;
    border-radius: 0.8rem 0.8rem 0.8rem 0.8rem;
    box-shadow:
        0 19px 38px rgba(0, 0, 0, 0.2),
        0 15px 12px rgba(0, 0, 0, 0.1);
    [data-betterdo-modal-arrow] {
        display: none;
    }
    ${({ theme }) => theme.queries.medium} {
        position: absolute;
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
