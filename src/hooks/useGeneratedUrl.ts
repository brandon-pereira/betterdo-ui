import { useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { generatePath } from 'react-router';

function useGeneratedUrl() {
    const baseUrl = '/:currentListId';
    const params = useParams();
    const generateUrl = useCallback(
        (url = '', _params?: { [key: string]: string }) => {
            return generatePath(
                baseUrl + url,
                Object.assign({}, params, _params)
            );
        },
        [params]
    );
    return generateUrl;
}

export default useGeneratedUrl;
