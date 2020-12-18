import React from 'react';
import { Loader } from '@components/Modal';
import useEditListModal from '@hooks/useEditListModal';
import loadable from '@loadable/component';

import { Modal } from './EditListModal.styles';

const Content = loadable(() => import('./content'), {
    fallback: <Loader />
});

function EditListModalContainer({ isOpen }) {
    const { closeModal } = useEditListModal();
    return (
        <Modal onRequestClose={() => closeModal('editList')} visible={isOpen}>
            {isOpen && <Content onClose={() => closeModal('editList')} />}
        </Modal>
    );
}

export default EditListModalContainer;
