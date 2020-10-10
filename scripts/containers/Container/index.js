import React from 'react';

import { _Container } from './Container.styles';

function Container({ children }) {
    return <_Container mobileNavVisible={false}>{children}</_Container>;
}

export default Container;
