import useCurrentListId from '@hooks/useCurrentListId';
import useListDetails from '@hooks/useListDetails';
import React from 'react';
import { Helmet } from 'react-helmet-async';

function _Helmet() {
    const currentListId = useCurrentListId();
    const { list, error } = useListDetails(currentListId);

    if (error || !list) {
        return null;
    }

    return (
        <Helmet>
            <title>BetterDo.{list.title ? ` - ${list.title}` : ''}</title>
            <meta name="theme-color" content={list.color} />
        </Helmet>
    );
}

export default _Helmet;
