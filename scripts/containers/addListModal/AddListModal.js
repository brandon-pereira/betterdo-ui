import React, { useCallback, useEffect, useRef, useLayoutEffect } from 'react';
import { Loader } from '@components/Modal';
import { Modal } from './AddListModal.styles';
import useModals from '@hooks/useModals';
import loadable from '@loadable/component';

const Content = loadable(() => import('./content'), {
    fallback: <Loader />
});

function AddListModalContainer() {
    const modalRef = useRef();
    const { modalVisibility, closeModal } = useModals();

    const calculatePosition = useCallback(() => {
        const $modal = modalRef.current;
        const $newList = document.querySelector('[data-betterdo-newlist]');
        const $arrow = modalRef.current.querySelector(
            '[data-betterdo-modal-arrow]'
        );
        if (window.innerWidth >= 640) {
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
                    bottom: '10px'
                });
                $arrow.style = toStyleString({
                    top: 'auto',
                    bottom:
                        window.innerHeight -
                        (nlCords.height + nlCords.top) +
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
        if (modalVisibility.newList && modalRef.current) {
            calculatePosition();
        }
    }, [modalVisibility.newList, calculatePosition]);

    useEffect(() => {
        if (modalVisibility.newList && modalRef.current) {
            window.addEventListener('resize', calculatePosition);
            return () =>
                window.removeEventListener('resize', calculatePosition);
        }
    }, [modalVisibility.newList, calculatePosition]);

    return (
        <Modal
            ref={modalRef}
            onRequestClose={() => closeModal('newList')}
            onLoad={calculatePosition}
            visible={modalVisibility['newList']}
        >
            {modalVisibility['newList'] && (
                <Content onLoad={calculatePosition} />
            )}
        </Modal>
    );
}

const toStyleString = styles =>
    Object.entries(styles)
        .map(([k, v]) => `${k}:${v}`)
        .join(';');

export default AddListModalContainer;
