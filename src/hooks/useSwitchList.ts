import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSWRConfig } from 'swr';

import { getListDetailUrl } from './internal/urls';

import List from '@customTypes/list';
import Task from '@customTypes/task';
import useCompletedTasks from '@hooks/useCompletedTasks';
import useHamburgerNav from '@hooks/useHamburgerNav';

type DeepOptional<T> = T extends object ? DeepOptionalObject<T> : T | undefined;

type DeepOptionalObject<T> = { [P in keyof T]?: DeepOptional<T[P]> };

function useSwitchList() {
    const { mutate } = useSWRConfig();
    const navigate = useNavigate();
    const [, setShowCompletedTasks] = useCompletedTasks();
    const [, setMobileNavVisibility] = useHamburgerNav();

    const switchList = useCallback(
        async (nextList: DeepOptional<List>) => {
            if (!nextList._id) {
                console.warn('Next List ID is required!');
                return;
            }
            if (nextList && nextList.tasks) {
                nextList.tasks = nextList.tasks.map(_id => {
                    if (typeof _id === 'string') {
                        return {
                            _id: _id,
                            isTemporaryTask: true,
                            isLoading: true
                        } as Partial<Task>;
                    }
                    return _id;
                });
            }
            // close the hamburger nav
            setMobileNavVisibility(false);
            // update the local data immediately, but disable the revalidation.
            await mutate(
                getListDetailUrl(nextList._id),
                (list?: Partial<List>) =>
                    ({
                        ...nextList,
                        ...list
                    }) as Partial<List>,
                false
            );
            // turn off completed tasks view
            setShowCompletedTasks(false);
            // update url
            navigate(`/${nextList._id}`);
            // Force a network refresh when changing lists
            await mutate(getListDetailUrl(nextList._id));
        },
        [navigate, mutate, setMobileNavVisibility, setShowCompletedTasks]
    );

    return switchList;
}

export default useSwitchList;
