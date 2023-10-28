import { styled } from 'styled-components';

import _Modal from '@components/Modal';

export const Modal = styled(_Modal)`
    /* 460 is to make all tabs fit nicely */
    min-width: min(100%, 460px);
    padding: 1rem;
    border-radius: 1rem;
    box-shadow:
        0 19px 38px rgba(0, 0, 0, 0.2),
        0 15px 12px rgba(0, 0, 0, 0.1);
    & [data-betterdo-modal-arrow] {
        display: none;
    }
`;
