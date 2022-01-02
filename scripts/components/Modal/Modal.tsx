import React, {
    forwardRef,
    useCallback,
    useEffect,
    useRef,
    useState
} from 'react';
import FocusLock from 'react-focus-lock';

import useEscapeKey from './useEscapeKey';
import {
    Overlay,
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
    // TODO: Framer motion this logic
    disableHeightAnimation: boolean;
}
const Modal = forwardRef<HTMLDivElement, Props>(
    (
        {
            className,
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

        useEffect(() => {
            if (!disableHeightAnimation && contentRef.current) {
                setHeight(contentRef.current.getBoundingClientRect().height);
                const resizeObserver = new ResizeObserver(() => {
                    // fixes ResizeObserver: loop limit exceeded error
                    window.requestAnimationFrame(() => {
                        if (contentRef.current) {
                            setHeight(
                                contentRef.current.getBoundingClientRect()
                                    .height
                            );
                        }
                    });
                });
                resizeObserver.observe(contentRef.current);
                return () => resizeObserver.disconnect();
            }
        }, [disableHeightAnimation, visible]);

        return (
            <Overlay visible={visible} onMouseDown={e => closeModal(e)}>
                <FocusLock disabled={Boolean(!visible)}>
                    <Container
                        disableHeightAnimation={disableHeightAnimation}
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
