import { forwardRef, useCallback, useEffect, useRef, useState } from 'react';
import { Variant } from 'framer-motion';

import useEscapeKey from './useEscapeKey';
import {
    Overlay,
    FocusLock,
    Content,
    Arrow,
    Container,
    ModalClose,
    ContentContainer
} from './Modal.styles';

import x from '@components/Icon/svgs/x.svg';

interface Props {
    className?: string;
    style?: React.CSSProperties;
    visible: boolean;
    children: React.ReactNode;
    canCloseModal?: () => boolean;
    onRequestClose: () => void;
    variants?: {
        visible: Variant;
        hidden: Variant;
    };
    disableHeightAnimation?: boolean;
    onAnimationComplete?: () => void;
}

const defaultVariant = {
    hidden: {
        scale: 0
    },
    visible: {
        scale: 1
    }
};
const Modal = forwardRef<HTMLDivElement, Props>(
    (
        {
            onAnimationComplete,
            className,
            variants,
            visible,
            style,
            children,
            canCloseModal,
            onRequestClose,
            disableHeightAnimation
        },
        ref
    ) => {
        const contentRef = useRef<HTMLDivElement>(null);
        const [height, setHeight] = useState<number | 'auto'>('auto');
        const closeModal = useCallback(
            (e?: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
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

        const onContainerResize = useCallback(() => {
            if (!disableHeightAnimation && contentRef.current) {
                setHeight(contentRef.current.getBoundingClientRect().height);
            }
        }, [disableHeightAnimation]);

        useEffect(() => {
            if (!disableHeightAnimation && contentRef.current) {
                onContainerResize();
                const resizeObserver = new ResizeObserver(() => {
                    onContainerResize();
                });
                resizeObserver.observe(contentRef.current);
                return () => resizeObserver.disconnect();
            }
        }, [onContainerResize, disableHeightAnimation, visible]);

        return (
            <Overlay $isVisible={visible} onMouseDown={e => closeModal(e)}>
                <FocusLock disabled={Boolean(!visible)}>
                    <Container
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        transition={{ duration: 0.1, type: 'easeOut' }}
                        variants={variants || defaultVariant}
                        $disableHeightAnimation={disableHeightAnimation}
                        onAnimationComplete={() => {
                            onAnimationComplete && onAnimationComplete();
                            onContainerResize();
                        }}
                        style={style}
                        className={`${className || ''} ${
                            visible ? 'visible' : ''
                        }`}
                        ref={ref}
                        $visible={visible}
                    >
                        <ContentContainer
                            $disableHeightAnimation={disableHeightAnimation}
                            $height={height}
                        >
                            <Content
                                $disableHeightAnimation={disableHeightAnimation}
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
