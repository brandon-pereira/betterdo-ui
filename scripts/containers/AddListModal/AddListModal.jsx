import React, { useCallback, useEffect, useRef, useLayoutEffect } from 'react';
import loadable from '@loadable/component';

import { MEDIUM } from '../../constants';

import { Modal } from './AddListModal.styles.js';

import { Loader } from '@components/Modal';
import useNewListModal from '@hooks/useNewListModal';

const Content = loadable(() => import('./Content'), {
    fallback: <Loader />
});

function AddListModalContainer({ isOpen }) {
    const modalRef = useRef();
    const { closeModal } = useNewListModal();

    const calculatePosition = useCallback(() => {
        const $modal = modalRef.current;
        const $newList = document.querySelector('[data-betterdo-newlist]');
        const $arrow = modalRef.current.querySelector(
            '[data-betterdo-modal-arrow]'
        );
        if (window.innerWidth >= MEDIUM) {
            const nlCords = $newList.getBoundingClientRect();
            $modal.style = toStyleString({
                top: nlCords.top + 'px',
                left: nlCords.width + 10 + 'px',
                bottom: 'auto'
            });
            const mCords = $modal.getBoundingClientRect();
            const isBottom = mCords.top + mCords.height >= window.innerHeight;
            $arrow.style = null;
            if (isBottom) {
                $modal.style = toStyleString({
                    top: 'auto',
                    left: nlCords.width + 10 + 'px',
                    bottom: 0
                });
                $arrow.style = toStyleString({
                    top: 'auto',
                    bottom:
                        window.innerHeight -
                        (nlCords.height + nlCords.top) +
                        10 +
                        'px'
                });
            }
        } else {
            $arrow.style = null;
            $modal.style = null;
            $newList.style = null;
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
            onLoad={calculatePosition}
            visible={isOpen}
        >
            {isOpen && <Content onLoad={calculatePosition} />}
        </Modal>
    );
}

const toStyleString = styles =>
    Object.entries(styles)
        .map(([k, v]) => `${k}:${v}`)
        .join(';');

export default AddListModalContainer;
