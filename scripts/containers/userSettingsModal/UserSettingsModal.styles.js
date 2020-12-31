import styled from 'styled-components';
import _Modal from '@components/Modal';

export const Modal = styled(_Modal)`
    // 460 is to make all tabs fit nicely
    min-width: min(100%, 460px);
    & [data-betterdo-modal-arrow] {
        display: none;
    }
`;
