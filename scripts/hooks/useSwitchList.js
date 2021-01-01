import { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { mutate } from 'swr';
import { getListDetailUrl } from './internal/urls';
import useCompletedTasks from './useCompletedTasks';
import useHamburgerNav from './useHamburgerNav';

function useSwitchList() {
    const history = useHistory();
    const [, setShowCompletedTasks] = useCompletedTasks();
    const [, setMobileNavVisibility] = useHamburgerNav();

    const switchList = useCallback(
        async nextList => {
            // update the local data immediately, but disable the revalidation.
            // revalidation happens when useListDetails happens.
            await mutate(
                getListDetailUrl(nextList.id),
                list => ({ ...nextList, ...list }),
                false
            );
            // turn off completed tasks view
            setShowCompletedTasks(false);
            // close the hamburger nav
            setMobileNavVisibility(false);
            // update url
            history.replace(`/${nextList.id}`);
        },
        [history, setMobileNavVisibility, setShowCompletedTasks]
    );

    return switchList;
}

export default useSwitchList;
