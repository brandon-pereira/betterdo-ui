import React, {Component} from 'react';
import {connect} from 'react-redux';
import actions from '../actions';
import '../../styles/components/greeting.scss';

class Greeting extends Component {
  render() {
    console.log(this.props);
    return <h1 onClick={this.props.click}>{this.props.navigation.title}Hello World</h1>;
  }
}
 
export default connect(
  (state) => ({
    navigation: state.navigation
  }),
  (dispatch) => ({
    click: () => dispatch(actions.click())
  })

)(Greeting)