import React, { useCallback, useRef } from 'react';
import { Loader } from '@components/Modal';
import useEditListModal from '@hooks/useEditListModal';
import loadable from '@loadable/component';

import { Modal } from './EditListModal.styles';

const Content = loadable(() => import('./content'), {
    fallback: <Loader />
});

function EditListModalContainer({ isOpen }) {
    const hasUnsavedChanges = useRef(false);
    const { closeModal } = useEditListModal();
    const setUnsavedChanges = useCallback(bool => {
        hasUnsavedChanges.current = bool;
    }, []);
    const canCloseModal = useCallback(() => {
        if (!hasUnsavedChanges.current) {
            return true;
        } else {
            return Boolean(
                confirm(
                    `You've made changes that aren't saved. Are you sure you want to discard them?`
                )
            );
        }
    }, [hasUnsavedChanges]);
    const onClose = useCallback(() => {
        if (canCloseModal()) {
            closeModal();
            setUnsavedChanges(false);
        }
    }, [setUnsavedChanges, canCloseModal, closeModal]);

    return (
        <Modal
            canCloseModal={canCloseModal}
            onRequestClose={closeModal}
            visible={isOpen}
        >
            {isOpen && (
                <Content
                    setUnsavedChanges={setUnsavedChanges}
                    onRequestClose={onClose}
                />
            )}
        </Modal>
    );
}

export default EditListModalContainer;
