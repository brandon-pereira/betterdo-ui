import { styled } from 'styled-components';

import _Modal from '@components/Modal';

export const Modal = styled(_Modal)`
    position: absolute;
    top: 4rem;
    right: 0;
    left: auto;
    opacity: 0;
    width: 100%;
    border-radius: 1rem;
    padding: 1rem;
    box-shadow:
        0 19px 38px rgba(0, 0, 0, 0.2),
        0 15px 12px rgba(0, 0, 0, 0.1);
    & [data-betterdo-modal-arrow] {
        top: -0.6rem;
        right: 1.7rem;
        height: 1.2rem;
        width: 1.2rem;
        left: auto;
        border-radius: 4px 0 0 0;
    }
    ${({ theme }) => theme.queries.medium} {
        right: 10px;
        & [data-betterdo-modal-arrow] {
            right: 1.2rem;
        }
    }
`;
