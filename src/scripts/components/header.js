import React, {Component} from 'react';
import {connect} from 'react-redux';
import actions from '../actions';
import Greeting from './greeting';
import Button from './button';
import '../../styles/components/header.scss';

class Header extends Component {
  
  render() {
    return (
      <header className="main">
        <Button>Back</Button>
        <Greeting />
        <Button>Settings</Button>
      </header>
    )
  }
  
}
 
export default connect(
  (state) => ({
    navigation: state.navigation
  }),
  (dispatch) => ({
    click: () => dispatch(actions.click())
  })

)(Header)