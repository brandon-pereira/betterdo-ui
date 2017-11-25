import React, {Component} from 'react';
import {connect} from 'react-redux';
import actions from '../actions';
import styled from 'styled-components';

const Overlay = styled.div`
  display: ${props => props.visible ? 'flex' : 'none'};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
  background: rgba(0,0,0,.5);
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
const NewListModal = Modal.extend`

`;
const ListSettingsModal = Modal.extend`

`;
const AppSettingsModal = Modal.extend`
`;

class Header extends Component {
  
  render() {
    const props = this.props;
    let visibleModal = null;
    if(props.modals.newList.visible) {
      visibleModal = <NewListModal visible>
        <h1>NewListModal</h1>
      </NewListModal>
    } else if (props.modals.listSettings.visible) {
      visibleModal = <ListSettingsModal visible>
        <h1>ListSettingsModal</h1>
      </ListSettingsModal>
    } else if (props.modals.appSettings.visible) {
      visibleModal = <AppSettingsModal visible>
        <h1>App Settings</h1>
      </AppSettingsModal>
    }

    
    return (
      <Overlay {...({visible: this.props.isModalVisible})} onClick={this.props.closeModal}>
        {visibleModal}
      </Overlay>
    )
  }

}
 
export default connect(
  (state) => ({
    isModalVisible: (state.modals.newList.visible || state.modals.appSettings.visible || state.modals.listSettings.visible),
    modals: state.modals
  }),
  (dispatch) => ({
    closeModal: () => dispatch(actions.closeModals())
  })

)(Header)