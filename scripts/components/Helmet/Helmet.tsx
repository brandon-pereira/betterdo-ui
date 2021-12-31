import React from 'react';
import { Helmet } from 'react-helmet-async';

import useCurrentListId from '@hooks/useCurrentListId';
import useListDetails from '@hooks/useListDetails';
import useHamburgerNav from '@hooks/useHamburgerNav';

function _Helmet() {
    const currentListId = useCurrentListId();
    const { list, error } = useListDetails(currentListId);
    const [isNavOpen] = useHamburgerNav();

    if (error || !list) {
        return null;
    }

    return (
        <Helmet>
            <title>BetterDo.{list.title ? ` - ${list.title}` : ''}</title>
            <meta
                name="theme-color"
                content={!isNavOpen ? list.color : '#080808'}
            />
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link
                rel="preconnect"
                href="https://fonts.gstatic.com"
                crossOrigin="anonymous"
            />
            <link
                href="https://fonts.googleapis.com/css2?family=Noto+Sans&display=swap"
                rel="stylesheet"
            />
        </Helmet>
    );
}

export default _Helmet;
