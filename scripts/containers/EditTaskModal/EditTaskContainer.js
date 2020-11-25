import React, { useState, useCallback } from 'react';
import useTask from '@hooks/useTask';
import loadable from '@loadable/component';
import { Modal } from './EditTask.styles';

// import { Loader } from './Ed'
const Content = loadable(() => import('./EditTaskContent'), {
    // fallback: <Loader />
});

function EditTaskContainer() {
    const [hasUnsavedChanges, setUnsavedChanges] = useState(false);
    const [task, setTask] = useTask();
    const isVisible = Boolean(task);

    const onClose = useCallback(() => {
        setTask(null);
        setUnsavedChanges(false);
    }, []);

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
    }, []);

    return (
        <Modal
            onRequestClose={onClose}
            canCloseModal={canCloseModal}
            visible={isVisible}
            //  TODO: This doesn't work...
            // childProps={{
            //     setUnsavedChanges: this.setUnsavedChanges.bind(this)
            // }}
            // asyncContent={() => import('../EditTaskModal/content')}
        >
            {isVisible && <Content task={task} />}
        </Modal>
    );
}

export default EditTaskContainer;
