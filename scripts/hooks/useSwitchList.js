import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { mutate } from 'swr';

import { getListDetailUrl } from './internal/urls';

import useCompletedTasks from '@hooks/useCompletedTasks';
import useHamburgerNav from '@hooks/useHamburgerNav';

function useSwitchList() {
    const navigate = useNavigate();
    const [, setShowCompletedTasks] = useCompletedTasks();
    const [, setMobileNavVisibility] = useHamburgerNav();

    const switchList = useCallback(
        async nextList => {
            // close the hamburger nav
            setMobileNavVisibility(false);
            // update the local data immediately, but disable the revalidation.
            await mutate(
                getListDetailUrl(nextList._id),
                list => ({ ...nextList, ...list }),
                false
            );
            // turn off completed tasks view
            setShowCompletedTasks(false);
            // update url
            navigate(`/${nextList._id}`);
            // Force a network refresh when changing lists
            await mutate(getListDetailUrl(nextList._id));
        },
        [navigate, setMobileNavVisibility, setShowCompletedTasks]
    );

    return switchList;
}

export default useSwitchList;
