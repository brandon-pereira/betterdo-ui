import React from 'react';

import { _Container } from './Container.styles.js';

import useHamburgerNav from '@hooks/useHamburgerNav';

function Container({ children }) {
    const [isMobileNavVisible] = useHamburgerNav();
    return (
        <_Container isMobileNavVisible={isMobileNavVisible}>
            {children}
        </_Container>
    );
}

export default Container;
