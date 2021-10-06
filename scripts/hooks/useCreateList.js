import { useCallback } from 'react';
import { mutate } from 'swr';
import { useHistory } from 'react-router-dom';
import { getListsUrl } from './internal/urls';
import { createList } from '@utilities/server';

function useCreateList() {
    const history = useHistory();
    return useCallback(
        async (title, color) => {
            await mutate(
                getListsUrl(),
                async lists => {
                    return [
                        ...lists,
                        {
                            _id: Math.random(), // temp id
                            title,
                            color
                        }
                    ];
                },
                false
            );
            const list = await createList({ title, color });
            history.replace(`/${list._id}`);
            console.log(list);
            await mutate(getListsUrl());
        },
        [history]
    );
}

export default useCreateList;
