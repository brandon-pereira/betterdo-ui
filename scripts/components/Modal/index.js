import React, { useEffect, useCallback, useState } from 'react';
import {
    Overlay,
    Container,
    ModalContent,
    ModalClose,
    LoaderContainer,
    Loader
} from './styles';

const Modal = React.forwardRef(
    (
        {
            className,
            visible,
            childProps,
            children,
            asyncContent,
            canCloseModal,
            onRequestClose
        },
        ref
    ) => {
        const [loading, setLoading] = useState(false);
        const [Content, setContent] = useState(null);

        const loadContent = useCallback(async () => {
            const _content = await asyncContent();
            setContent(_content.default);
            setLoading(false);
        }, [asyncContent]);

        const closeModal = useCallback(
            e => {
                const isBackgroundClick = !e || e.currentTarget === e.target;
                if (isBackgroundClick) {
                    const _canCloseModal =
                        typeof canCloseModal === 'function'
                            ? canCloseModal()
                            : true;
                    if (_canCloseModal) {
                        setContent(null);
                        onRequestClose();
                    }
                }
            },
            [canCloseModal, onRequestClose]
        );

        useEffect(() => {
            if (!Content && visible && asyncContent) {
                loadContent();
            }
        }, [visible, Content, loadContent, asyncContent]);

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
                        {loading && (
                            <LoaderContainer>
                                <Loader
                                    color="#006fb0"
                                    size="4rem"
                                    isLoading={true}
                                >
                                    Loading...
                                </Loader>
                            </LoaderContainer>
                        )}
                        {Content && (
                            <Content
                                {...(childProps || {})}
                                closeModal={e => closeModal(e)}
                            />
                        )}
                        {!loading && !Content && children}
                    </ModalContent>
                </Container>
            </Overlay>
        );
    }
);

Modal.displayName = 'Modal';

export default Modal;
