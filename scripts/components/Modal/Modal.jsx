import React, { useCallback, useEffect, useRef, useState } from 'react';
import FocusLock from 'react-focus-lock';

import {
    Overlay,
    Content,
    Arrow,
    Container,
    ModalClose,
    ContentContainer
} from './Modal.styles.js';
import useEscapeKey from './useEscapeKey';
import x from '@components/Icon/svgs/x.svg';

const Modal = React.forwardRef(
    (
        {
            className,
            style,
            visible,
            children,
            canCloseModal,
            onRequestClose,
            disableHeightAnimation
        },
        ref
    ) => {
        const contentRef = useRef();
        const [height, setHeight] = useState('auto');
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

        useEffect(() => {
            if (!disableHeightAnimation && contentRef.current) {
                const _setHeight = () => {
                    if (contentRef.current) {
                        setHeight(
                            contentRef.current.getBoundingClientRect().height
                        );
                    }
                };
                setTimeout(() => {
                    _setHeight();
                }, 500);
                const resizeObserver = new ResizeObserver(() => _setHeight());
                resizeObserver.observe(contentRef.current);
                return () => resizeObserver.disconnect();
            }
        }, [disableHeightAnimation, visible]);

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
                        <ContentContainer
                            disableHeightAnimation={disableHeightAnimation}
                            height={height}
                        >
                            <Content
                                disableHeightAnimation={disableHeightAnimation}
                                ref={contentRef}
                            >
                                {children}
                            </Content>
                        </ContentContainer>
                        <ModalClose
                            icon={x}
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
