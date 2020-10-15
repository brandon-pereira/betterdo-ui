import React, { useCallback, useEffect, useRef } from 'react';
import Modal, { Loader } from '../../components/Modal';
import useModals from '@hooks/useModals';
import loadable from '@loadable/component';

const Content = loadable(() => import('./content'), {
    fallback: <Loader />
});

function AddListModalContainer() {
    const modalRef = useRef();
    // const [pos, setPosition] = useState({ top: 0, left: 0 });
    const { modalVisibility, closeModal } = useModals();

    const calculatePosition = useCallback(() => {
        const listItem = document.querySelector('[data-betterdo-newlist]');
        const modal = modalRef.current;
        console.log(listItem, modal);
    }, []);

    useEffect(() => {
        calculatePosition();
    }, [modalVisibility.newList, calculatePosition]);

    useEffect(() => {
        window.addEventListener('resize', calculatePosition);
        return () => window.removeEventListener('resize', calculatePosition);
    }, [calculatePosition]);

    return (
        <Modal
            ref={modalRef}
            onRequestClose={() => closeModal('newList')}
            visible={modalVisibility['newList']}
        >
            {modalVisibility['newList'] && <Content />}
        </Modal>
    );
}
export default AddListModalContainer;
