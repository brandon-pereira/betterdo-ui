import React, { useCallback, useRef } from 'react';
import loadable from '@loadable/component';

import { Props as ContentProps } from './content';
import { Modal } from './EditListModal.styles';

import { Loader } from '@components/Modal';
import useEditListModal from '@hooks/useEditListModal';

const Content = loadable<ContentProps>(() => import('./content'), {
    fallback: <Loader />
});

interface Props {
    isOpen: boolean;
}

function EditListModalContainer({ isOpen }: Props) {
    const hasUnsavedChanges = useRef<boolean>(false);
    const { closeModal } = useEditListModal();
    const setUnsavedChanges = useCallback((bool: boolean) => {
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
    const onClose = useCallback(() => {
        if (canCloseModal()) {
            closeModal();
            hasUnsavedChanges.current = false;
        }
    }, [canCloseModal, closeModal]);

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
