import React from 'react';

import { Loader as _Loader } from './Loader.styles.js';

import LoaderSvg from '@components/Icon/svgs/loader.svg';

function Loader({ className, isVisible, color, size }) {
    return (
        <_Loader
            className={className}
            color={color}
            size={size}
            isVisible={isVisible}
        >
            <LoaderSvg />
        </_Loader>
    );
}

Loader.displayName = 'Loader';

export default Loader;
