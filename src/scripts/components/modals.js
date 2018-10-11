import React, { Component } from 'react';
import styled from 'styled-components';
import { observer, inject } from 'mobx-react';

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
const NewListModal = Modal.extend``;
const ListSettingsModal = Modal.extend``;
const AppSettingsModal = Modal.extend``;

@inject('state')
@observer
export default class Header extends Component {
    render() {
        const props = this.props.state;
        let visibleModal = null;
        if (props.modals.newList.visible) {
            visibleModal = (
                <NewListModal visible>
                    <h1>NewListModal</h1>
                </NewListModal>
            );
        } else if (props.modals.listSettings.visible) {
            visibleModal = (
                <ListSettingsModal visible>
                    <h1>ListSettingsModal</h1>
                </ListSettingsModal>
            );
        } else if (props.modals.appSettings.visible) {
            visibleModal = (
                <AppSettingsModal visible>
                    <h1>App Settings</h1>
                </AppSettingsModal>
            );
        }

        return (
            <Overlay
                {...{
                    visible:
                        props.modals.newList.visible ||
                        props.modals.appSettings.visible ||
                        props.modals.listSettings.visible
                }}
                onClick={() => props.closeModal()}
            >
                {visibleModal}
            </Overlay>
        );
    }
}

// export default connect(
//   (state) => ({
//     isModalVisible: (state.modals.newList.visible || state.modals.appSettings.visible || state.modals.listSettings.visible),
//     modals: state.modals
//   }),
//   (dispatch) => ({
//     closeModal: () => dispatch(actions.closeModals())
//   })

// )(Header)
