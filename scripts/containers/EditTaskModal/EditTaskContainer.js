import React, { useRef, useCallback } from 'react';
import loadable from '@loadable/component';
import { Modal } from './EditTask.styles';
import Loader from './Loader';
import useEditTaskModal from '@hooks/useEditTaskModal';

const Content = loadable(() => import('./EditTaskContent'), {
    fallback: <Loader />
});

function EditTaskContainer({ isOpen }) {
    const hasUnsavedChanges = useRef(false);
    const { closeModal } = useEditTaskModal();
    const setUnsavedChanges = useCallback(bool => {
        hasUnsavedChanges.current = bool;
    }, []);

    const onClose = useCallback(() => {
        if (canCloseModal()) {
            closeModal();
            hasUnsavedChanges.current = false;
        }
    }, [canCloseModal, closeModal]);

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

    return (
        <Modal
            canCloseModal={canCloseModal}
            onRequestClose={closeModal}
            visible={isOpen}
        >
            {isOpen && (
                <Content
                    onRequestClose={onClose}
                    setUnsavedChanges={setUnsavedChanges}
                />
            )}
        </Modal>
    );
}

export default EditTaskContainer;
