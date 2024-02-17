import { Helmet } from 'react-helmet-async';

import { DEFAULT_LIST_COLOR } from '../../constants';

import useCurrentListId from '@hooks/useCurrentListId';
import useListDetails from '@hooks/useListDetails';
import useHamburgerNav from '@hooks/useHamburgerNav';
import { getAccessibleAccent } from '@utilities/colors';

function _Helmet() {
    const currentListId = useCurrentListId();
    const { list, error } = useListDetails(currentListId);
    const [isNavOpen] = useHamburgerNav();

    if (error || !list) {
        return (
            <Helmet>
                <meta name="theme-color" content={DEFAULT_LIST_COLOR} />
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

    const listColor = getAccessibleAccent(list.color!).toHex();

    return (
        <Helmet>
            <title>BetterDo.{list.title ? ` - ${list.title}` : ''}</title>
            <meta
                name="theme-color"
                content={!isNavOpen ? listColor : '#080808'}
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
