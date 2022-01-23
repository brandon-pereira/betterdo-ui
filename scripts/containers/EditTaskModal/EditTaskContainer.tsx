import React, { useRef, useCallback } from 'react';
import loadable from '@loadable/component';

import { Modal } from './EditTask.styles';
import Loader from './Loader';

import useEditTaskModal from '@hooks/useEditTaskModal';

const Content = loadable(() => import('./EditTaskContent'), {
    fallback: <Loader />
});

interface Props {
    isOpen: boolean;
}

function EditTaskContainer({ isOpen }: Props) {
    const hasUnsavedChanges = useRef(false);
    const { closeModal } = useEditTaskModal();
    const setUnsavedChanges = useCallback(bool => {
        hasUnsavedChanges.current = bool;
    }, []);

    const canCloseModal = useCallback(() => {
        if (!hasUnsavedChanges.current) {
            return true;
        } else {
            const status = Boolean(
                confirm(
                    `You've made changes that aren't saved. Are you sure you want to discard them?`
                )
            );
            if (status) {
                setUnsavedChanges(false);
            }
            return status;
        }
    }, [hasUnsavedChanges, setUnsavedChanges]);

    // TODO: Is this function needed?
    // const onClose = useCallback(() => {
    //     if (canCloseModal()) {
    //         closeModal();
    //         hasUnsavedChanges.current = false;
    //     }
    // }, [canCloseModal, closeModal]);

    return (
        <Modal
            disableHeightAnimation={true}
            canCloseModal={canCloseModal}
            onRequestClose={closeModal}
            visible={isOpen}
        >
            {isOpen && <Content setUnsavedChanges={setUnsavedChanges} />}
        </Modal>
    );
}

export default EditTaskContainer;
