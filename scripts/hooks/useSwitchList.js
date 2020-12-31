import { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { mutate } from 'swr';
import useHamburgerNav from './useHamburgerNav';

function useSwitchList() {
    const history = useHistory();
    const [, setMobileNavVisibility] = useHamburgerNav();

    const switchList = useCallback(
        async nextList => {
            // update the local data immediately, but disable the revalidation
            await mutate(
                getUrl(nextList.id),
                list => ({ ...nextList, ...list }),
                false
            );
            setMobileNavVisibility(false);
            // update url
            history.replace(`/${nextList.id}`);
        },
        [history, setMobileNavVisibility]
    );

    return switchList;
}

const getUrl = listId => `${process.env.SERVER_URL}/api/lists/${listId}`;

export default useSwitchList;
