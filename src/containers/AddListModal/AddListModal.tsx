import { useCallback, useEffect, useRef, useLayoutEffect } from 'react';
import loadable from '@loadable/component';

import { MEDIUM } from '../../constants';

import { Modal } from './AddListModal.styles';
import { AddListModalProps } from './Content';

import { Loader } from '@components/Modal';
import useNewListModal from '@hooks/useNewListModal';

const Content = loadable<AddListModalProps>(() => import('./Content'), {
    fallback: <Loader />
});

interface Props {
    isOpen: boolean;
}

const variants = {
    hidden: {
        opacity: 0,
        x: -100
    },
    visible: {
        opacity: 1,
        x: 0
    }
};

function AddListModalContainer({ isOpen }: Props) {
    const modalRef = useRef<HTMLDivElement>(null);
    const { closeModal } = useNewListModal();

    const calculatePosition = useCallback(() => {
        const $modal = modalRef.current;
        const $newList = document.querySelector(
            '[data-betterdo-newlist]'
        ) as HTMLDivElement;
        const $arrow = modalRef.current?.querySelector(
            '[data-betterdo-modal-arrow]'
        ) as HTMLDivElement;
        if (!$modal || !$newList || !$arrow) {
            return;
        }
        if (window.innerWidth >= MEDIUM) {
            const nlCords = $newList.getBoundingClientRect();
            $modal.setAttribute(
                'style',
                toStyleString({
                    top: nlCords.top + 'px',
                    left: nlCords.width + 10 + 'px',
                    bottom: 'auto'
                })
            );
            const mCords = $modal.getBoundingClientRect();
            const isBottom = mCords.top + mCords.height >= window.innerHeight;
            $arrow.removeAttribute('style');
            if (isBottom) {
                $modal.setAttribute(
                    'style',
                    toStyleString({
                        top: 'auto',
                        left: nlCords.width + 10 + 'px',
                        bottom: 0
                    })
                );
                $arrow.setAttribute(
                    'style',
                    toStyleString({
                        top: 'auto',
                        bottom:
                            window.innerHeight -
                            (nlCords.height + nlCords.top) +
                            10 +
                            'px'
                    })
                );
            }
        } else {
            $arrow.removeAttribute('style');
            $modal.removeAttribute('style');
            $newList.removeAttribute('style');
        }
    }, []);

    useLayoutEffect(() => {
        if (isOpen && modalRef.current) {
            calculatePosition();
        }
    }, [isOpen, calculatePosition]);

    useEffect(() => {
        if (isOpen && modalRef.current) {
            window.addEventListener('resize', calculatePosition);
            return () =>
                window.removeEventListener('resize', calculatePosition);
        }
    }, [isOpen, calculatePosition]);

    return (
        <Modal
            disableHeightAnimation={true}
            ref={modalRef}
            onRequestClose={closeModal}
            visible={isOpen}
            onAnimationComplete={calculatePosition}
            variants={variants}
        >
            {isOpen && <Content onLoad={calculatePosition} />}
        </Modal>
    );
}

const toStyleString = (styles: Record<string, string | number>) =>
    Object.entries(styles)
        .map(([k, v]) => `${k}:${v}`)
        .join(';');

export default AddListModalContainer;
