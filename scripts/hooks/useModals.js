import React, { useCallback, useState } from 'react';

import createSharedHook from './internal/createSharedHook';

const { Provider, Context, useConsumer } = createSharedHook();

function ModalsProvider({ children }) {
    const [modalVisibility, _setVisibility] = useState({
        // todo: sync up newList and addList
        newList: false
    });

    const closeModal = useCallback(modalName => {
        _setVisibility(visibility => {
            visibility[modalName] = false;
            return { ...visibility };
        });
    }, []);

    const openModal = useCallback(modalName => {
        _setVisibility(visibility => {
            visibility[modalName] = true;
            return { ...visibility };
        });
    }, []);

    console.log(modalVisibility);
    return (
        <Provider value={{ closeModal, openModal, modalVisibility }}>
            {children}
        </Provider>
    );
}

export { Context, ModalsProvider };
export default useConsumer;
