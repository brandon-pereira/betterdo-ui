import React from 'react';

import { LoaderContainer } from './Modal.styles.js';

import Loader from '@components/Loader';

function ModalLoader() {
    return (
        <LoaderContainer>
            <Loader color="#006fb0" size="4rem" isVisible={true}>
                Loading...
            </Loader>
        </LoaderContainer>
    );
}

export default ModalLoader;
