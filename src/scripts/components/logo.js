import React, {Component} from 'react';
import {connect} from 'react-redux';
import actions from '../actions';
import styled from 'styled-components';

const Container = styled.div`
	grid-row: 1 / 1;
	grid-column: 1 / 1;
	cursor: pointer;
	background: linear-gradient(transparent, rgba(0,0,0,.1)), #343434;
	color: #fff;
	display: flex;
	align-items: center;
	justify-content: center;
	h1 {
		font-size: 1.8rem;
		font-weight: 200;
	}
	span {
		font-weight: 600;
	}
`;

class Header extends Component {
  render() {
    return <Container>
      <h1>Better<span>Do.</span></h1>
    </Container>
  }
}
 
export default connect(
	null,
  (dispatch) => ({
    click: () => dispatch(actions.click())
  })

)(Header)