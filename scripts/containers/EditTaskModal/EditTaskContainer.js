import React, { useState, useCallback } from 'react';
import loadable from '@loadable/component';
import { Modal } from './EditTask.styles';
import _Loader from '@components/Loader';
import useCurrentListId from '@hooks/useCurrentListId';
import useEditTaskModal from '@hooks/useEditTaskModal';

const Loader = () => <_Loader color="#006fb0" size="4rem" isVisible={true} />;

const Content = loadable(() => import('./EditTaskContent'), {
    fallback: <Loader />
});

function EditTaskContainer({ isOpen }) {
    const [hasUnsavedChanges, setUnsavedChanges] = useState(false);
    const { closeTaskModal } = useEditTaskModal();

    const onClose = useCallback(() => {
        if (canCloseModal()) {
            closeTaskModal();
            setUnsavedChanges(false);
        }
    }, [canCloseModal, closeTaskModal]);

    const canCloseModal = useCallback(() => {
        if (!hasUnsavedChanges) {
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
            onRequestClose={onClose}
            canCloseModal={canCloseModal}
            visible={isOpen}
        >
            {isOpen && (
                <Content setUnsavedChanges={() => setUnsavedChanges(true)} />
            )}
        </Modal>
    );
}

export default EditTaskContainer;
