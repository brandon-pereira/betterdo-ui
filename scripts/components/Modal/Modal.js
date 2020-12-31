import React, { useCallback } from 'react';
import FocusLock from 'react-focus-lock';

import { Overlay, Content, Arrow, Container, ModalClose } from './Modal.styles';
import useEscapeKey from './useEscapeKey';

const Modal = React.forwardRef(
    (
        { className, style, visible, children, canCloseModal, onRequestClose },
        ref
    ) => {
        const closeModal = useCallback(
            e => {
                const isBackgroundClick = !e || e.currentTarget === e.target;
                if (isBackgroundClick) {
                    const _canCloseModal =
                        typeof canCloseModal === 'function'
                            ? canCloseModal()
                            : true;
                    if (_canCloseModal) {
                        onRequestClose();
                    }
                }
            },
            [canCloseModal, onRequestClose]
        );

        useEscapeKey(visible ? closeModal : undefined);

        return (
            <Overlay visible={visible} onMouseDown={e => closeModal(e)}>
                <FocusLock disabled={Boolean(!visible)}>
                    <Container
                        style={style}
                        className={`${className || ''} ${
                            visible ? 'visible' : ''
                        }`}
                        ref={ref}
                        visible={visible}
                    >
                        <Content>{children}</Content>
                        <ModalClose
                            icon="x"
                            color="#a9a9a9"
                            size="1rem"
                            onClick={() => closeModal()}
                        >
                            Close
                        </ModalClose>
                        <Arrow data-betterdo-modal-arrow></Arrow>
                    </Container>
                </FocusLock>
            </Overlay>
        );
    }
);

Modal.displayName = 'Modal';

export default Modal;
