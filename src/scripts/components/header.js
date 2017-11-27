import React, {Component} from 'react';
import {connect} from 'react-redux';
import actions from '../actions';
import styled from 'styled-components';

const Container = styled.header`
  grid-row: 1 / 1;
  grid-column: 2 / 3;
  background-color: #2177BD;
  background-image: linear-gradient(transparent, rgba(0,0,0,.2));
  box-shadow: inset 0 -1px rgba(0,0,0,.3);
  color: #fff;
  display: flex;
  align-items: center;
  padding: 0 0.8rem;
`;
const Button = styled.button`
  appearance: none;
  background: linear-gradient(rgba(0,0,0,.2), rgba(0,0,0,.3));
  border: none;
  box-shadow: 0 1px rgba(255,255,255,.1);
  border-radius: 3px;
  padding: 0.8rem;
  color: #fff;
  outline: none;
  cursor: pointer;
`;
const Title = styled.h2`
  flex: 1;
  text-align: center;
`;
class Header extends Component {
  
  render() {
    return (
      <Container>
        <Button onClick={this.props.backButtonClick}>Back</Button>
        <Title>{this.props.currentList.title}</Title>
        <Button onClick={this.props.settingsButtonClick}>Settings</Button>
      </Container>
    )
  }

}
 
export default connect(
  (state) => ({
    navigation: state.navigation,
    currentList: state.currentList
  }),
  (dispatch) => ({
    backButtonClick: () => dispatch(actions.click()),
    settingsButtonClick: () => dispatch(actions.click())
  })

)(Header)