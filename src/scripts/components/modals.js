import React, {Component} from 'react';
import {connect} from 'react-redux';
import actions from '../actions';
import styled from 'styled-components';

const Overlay = styled.div`
  display: ${props => props.newListModalVisible ? 'block' : 'none'};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
  background: rgba(0,0,0,.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Modal = styled.div`
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
    console.log(this.props.newListModalVisible)
    return (
      <Overlay>
        <NewListModal>
          <h1>NewListModal</h1>
        </NewListModal>
        <ListSettingsModal>
          <h1>ListSettingsModal</h1>
        </ListSettingsModal>
        <AppSettingsModal>
          <h1>AppSettingsModal</h1>
        </AppSettingsModal>
      </Overlay>
    )
  }

}
 
export default connect(
  (state) => ({
    newListModalVisible: state.newListModalVisible,
  }),
  (dispatch) => ({
    backButtonClick: () => dispatch(actions.click()),
    settingsButtonClick: () => dispatch(actions.click())
  })

)(Header)