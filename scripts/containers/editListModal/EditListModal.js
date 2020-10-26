import React from 'react';
import { Loader } from '@components/Modal';
import useModals from '../../hooks/useModals';
import loadable from '@loadable/component';

import { Modal } from './EditListModal.styles';

const Content = loadable(() => import('./content'), {
    fallback: <Loader />
});

function EditListModalContainer() {
    const { modalVisibility, closeModal } = useModals();

    return (
        <Modal
            onRequestClose={() => closeModal('editList')}
            visible={modalVisibility.editList}
        >
            {modalVisibility.editList && (
                <Content onClose={() => closeModal('editList')} />
            )}
        </Modal>
    );
}

export default EditListModalContainer;
