import React from 'react';
import LoaderSvg from '@components/Icon/svgs/loader.svg';

import { Loader as _Loader } from './Loader.styles';

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
