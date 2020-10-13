import React from 'react';
import LoaderSvg from '../../../svgs/loader.svg';

import { Loader } from './Loader.styles';

function Icon({ className, isVisible, color, size }) {
    return (
        <Loader
            className={className}
            color={color}
            size={size}
            isVisible={isVisible}
        >
            <LoaderSvg />
        </Loader>
    );
}

Icon.displayName = 'LoaderIcon';

export default Icon;
