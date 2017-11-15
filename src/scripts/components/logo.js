import React, {Component} from 'react';
import {connect} from 'react-redux';
import actions from '../actions';
import '../../styles/components/logo.scss';

class Header extends Component {
  render() {
    return <div className="logo">
      <h1>Better<span>Do.</span></h1>
    </div>
  }
}
 
export default connect(
	null,
  (dispatch) => ({
    click: () => dispatch(actions.click())
  })

)(Header)