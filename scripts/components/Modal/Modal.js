import React, { useCallback } from 'react';
import { Overlay, Content, Arrow, Container, ModalClose } from './Modal.styles';

const Modal = React.forwardRef(
    (
        { className, style, visible, children, canCloseModal, onRequestClose },
        ref
    ) => {
        const closeModal = useCallback(
            e => {
                console.log('HERE');
                const isBackgroundClick = !e || e.currentTarget === e.target;
                console.log(isBackgroundClick);
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

        return (
            <Overlay visible={visible} onMouseDown={e => closeModal(e)}>
                <Container
                    style={style}
                    className={`${className || ''} ${visible ? 'visible' : ''}`}
                    ref={ref}
                    visible={visible}
                >
                    <ModalClose
                        icon="x"
                        color="#a9a9a9"
                        size="1rem"
                        onClick={() => closeModal()}
                    >
                        Close
                    </ModalClose>
                    <Content>{children}</Content>
                    <Arrow data-betterdo-modal-arrow></Arrow>
                </Container>
            </Overlay>
        );
    }
);

Modal.displayName = 'Modal';

export default Modal;
