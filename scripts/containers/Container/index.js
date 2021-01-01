import useHamburgerNav from '@hooks/useHamburgerNav';
import React from 'react';

import { _Container } from './Container.styles';

function Container({ children }) {
    const [isMobileNavVisible] = useHamburgerNav();
    return (
        <_Container isMobileNavVisible={isMobileNavVisible}>
            {children}
        </_Container>
    );
}

export default Container;
