import React, {Component} from 'react';
import styled from 'styled-components';

const Li = styled.li`
	cursor: pointer;
	color: #fff;
	padding: 1rem;
	display: flex;
	align-items: center;
	box-shadow: 0 1px rgba(255,255,255,.15);
		&:first-of-type {
			box-shadow: 0 -1px rgba(255,255,255,.15),
								0 1px rgba(255,255,255,.15);
		}
`;
const Icon = styled.div`
	height: 10px;
	width: 10px;
	background: ${props => props.color ? props.color : 'red'};
	margin-right: 0.5rem;
	border-radius: 50%;
`
const Title = styled.span`
	flex: 1;
`;

class ListItem extends Component {

	render() {
		let title = this.props.title;
		if(this.props.newList) {
			title = 'New List';
		}
		return <Li>
			<Icon color={this.props.color}></Icon>
			<Title>{title}</Title>
		</Li>
	}

}

export default ListItem;