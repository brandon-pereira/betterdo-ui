import React, {Component} from 'react';
import {connect} from 'react-redux';
import actions from '../actions';
// import '../../styles/components/navigation.scss';
import Search from './search';
import styled from 'styled-components';
import ListItem from './listItem';

const Container = styled.header`
  grid-row: 2 / 3;
  grid-column: 1 / 1;
  background: #202020;
  display: flex;
  flex-direction: column;
`;
const ListsContainer= styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  flex: 1;
`;
class Navigation extends Component {
  render() {
    return <Container>
      <Search />
      <ListsContainer>
        {this.props.lists.map((item, i) => <ListItem key={i}>{item.title}</ListItem>)}
      </ListsContainer>
    </Container>
  }
}
 
export default connect(
  (state) => ({
    lists: state.lists
  }),
  (dispatch) => ({
    click: () => dispatch(actions.click())
  })

)(Navigation)