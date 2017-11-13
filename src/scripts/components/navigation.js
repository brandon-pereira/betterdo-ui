import React, {Component} from 'react';
import {connect} from 'react-redux';
import actions from '../actions';
import '../../styles/components/navigation.scss';
import Search from './search';

class Navigation extends Component {
  render() {
    return <nav className="main">
      <Search />
      <ul className="lists">
        <li>Haha</li>
        <li>Haha</li>
        <li>Haha</li>
      </ul>
    </nav>
  }
}
 
export default connect(
  (state) => ({
    navigation: state.navigation
  }),
  (dispatch) => ({
    click: () => dispatch(actions.click())
  })

)(Navigation)