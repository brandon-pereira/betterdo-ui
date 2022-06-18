import React from 'react';
import LoaderSvg from '@components/Icon/svgs/loader.svg?component';

import { Loader as _Loader } from './Loader.styles';

type Props = {
    className?: string;
    isVisible?: boolean;
    color?: string;
    size?: string;
};

function Loader({ className, isVisible, color, size }: Props) {
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

export default Loader;
