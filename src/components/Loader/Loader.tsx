import { Loader as _Loader } from './Loader.styles';

import LoaderSvg from '@components/Icon/svgs/loader.svg';

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
            $color={color}
            $size={size}
            $isVisible={isVisible}
        >
            <LoaderSvg />
        </_Loader>
    );
}

export default Loader;
