import { useCallback, useState } from 'react';

import createSharedHook from './internal/createSharedHook';

function useModalsOnce() {
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

    return { closeModal, openModal, modalVisibility };
}

const {
    Provider: ModalsProvider,
    Context: ModalsContext,
    useConsumer: useModals
} = createSharedHook(useModalsOnce);

export { ModalsContext, ModalsProvider };
export default useModals;
