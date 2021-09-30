import React from 'react';
import _Loader from '@components/Loader';

import { LoaderContainer } from './EditTask.styles.js';

const Loader = () => (
    <LoaderContainer>
        <_Loader color="#006fb0" size="4rem" isVisible={true} />
    </LoaderContainer>
);

export default Loader;
