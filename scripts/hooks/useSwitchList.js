import { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { mutate } from 'swr';
import useModals from './useModals';

function useSwitchList() {
    const history = useHistory();
    const { closeModal } = useModals();

    const switchList = useCallback(
        async nextList => {
            // update the local data immediately, but disable the revalidation
            await mutate(
                getUrl(nextList.id),
                list => ({ ...nextList, ...list }),
                false
            );
            closeModal('listsView');
            // update url
            history.replace(`/${nextList.id}`);
        },
        [history, closeModal]
    );

    return switchList;
}

const getUrl = listId => `${process.env.SERVER_URL}/api/lists/${listId}`;

export default useSwitchList;
