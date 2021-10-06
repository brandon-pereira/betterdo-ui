import React from 'react';
import loadable from '@loadable/component';

import { Modal } from './UserSettingsModal.styles.js';

import { Loader } from '@components/Modal';
import useEditListModal from '@hooks/useEditListModal';

const Content = loadable(() => import('./Content'), {
    fallback: <Loader />
});

function EditListModalContainer({ isOpen }) {
    const { closeModal } = useEditListModal();
    return (
        <Modal onRequestClose={closeModal} visible={isOpen}>
            {isOpen && <Content onClose={closeModal} />}
        </Modal>
    );
}

export default EditListModalContainer;
