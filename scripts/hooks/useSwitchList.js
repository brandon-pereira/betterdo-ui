import { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { mutate } from 'swr';

import { getListDetailUrl } from './internal/urls';

import useCompletedTasks from '@hooks/useCompletedTasks';
import useHamburgerNav from '@hooks/useHamburgerNav';

function useSwitchList() {
    const history = useHistory();
    const [, setShowCompletedTasks] = useCompletedTasks();
    const [, setMobileNavVisibility] = useHamburgerNav();

    const switchList = useCallback(
        async nextList => {
            // close the hamburger nav
            setMobileNavVisibility(false);
            // update the local data immediately, but disable the revalidation.
            // revalidation happens when useListDetails happens.
            await mutate(
                getListDetailUrl(nextList._id),
                list => ({ ...nextList, ...list }),
                false
            );
            // turn off completed tasks view
            setShowCompletedTasks(false);
            // update url
            history.replace(`/${nextList._id}`);
        },
        [history, setMobileNavVisibility, setShowCompletedTasks]
    );

    return switchList;
}

export default useSwitchList;
