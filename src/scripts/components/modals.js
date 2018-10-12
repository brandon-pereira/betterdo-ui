import React, { Component } from 'react';
import styled from 'styled-components';
import { observer, inject } from 'mobx-react';
import AddList from './addList';

const Overlay = styled.div`
    display: ${props => (props.visible ? 'flex' : 'none')};
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1000;
    background: rgba(0, 0, 0, 0.5);
    justify-content: center;
    align-items: center;
`;
const Modal = styled.div`
    display: block;
    background: #fff;
    width: 60%;
    max-width: 600px;
    padding: 1rem;
`;
const NewListModal = styled(Modal)``;
// const ListSettingsModal = styled(Modal)``;
// const AppSettingsModal = styled(Modal)``;

@inject('state')
@observer
export default class Header extends Component {
    closeModal(e) {
        // e.preventDefault();
        if (e.currentTarget === e.target) {
            this.props.state.closeModal();
        }
    }

    render() {
        const state = this.props.state;
        let visibleModal = null;
        if (state.modals.newList.visible) {
            visibleModal = (
                <NewListModal visible>
                    <h1>NewListModal</h1>
                    <AddList />
                </NewListModal>
            );
        }

        return (
            <Overlay
                {...{
                    visible:
                        state.modals.newList.visible ||
                        state.modals.appSettings.visible ||
                        state.modals.listSettings.visible
                }}
                onClick={e => this.closeModal(e)}
            >
                {visibleModal}
            </Overlay>
        );
    }
}
