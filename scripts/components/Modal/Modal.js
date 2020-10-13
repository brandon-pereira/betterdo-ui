import React, { useCallback } from 'react';
import { Overlay, Container, ModalContent, ModalClose } from './Modal.styles';

const Modal = React.forwardRef(
    ({ className, visible, children, canCloseModal, onRequestClose }, ref) => {
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

        return (
            <Overlay visible={visible} onMouseDown={e => closeModal(e)}>
                <Container className={className} ref={ref} visible={visible}>
                    <ModalContent>
                        <ModalClose
                            icon="x"
                            color="#a9a9a9"
                            size="1rem"
                            onClick={() => closeModal()}
                        >
                            Close
                        </ModalClose>
                        {children}
                    </ModalContent>
                </Container>
            </Overlay>
        );
    }
);

Modal.displayName = 'Modal';

export default Modal;
