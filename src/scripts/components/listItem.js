import React, {Component} from 'react';
import styled from 'styled-components';

const Li = styled.li`
	cursor: pointer;
	color: #fff;
	padding: 1rem;
	display: flex;
	align-items: center;
	background: ${props => props.selected ? 'linear-gradient(#006EFF, #004DB4)' : 'transparent'};
	box-shadow: ${props => props.selected ? 'inset 0 -1px rgba(0,0,0,.5)' : '0 1px rgba(255,255,255,.15)'};
`;
const Icon = styled.div`
	height: 10px;
	width: 10px;
	background-color: ${props => props.color ? props.color : '#585858'};
	background-image: linear-gradient(transparent, rgba(0,0,0,.2));
	box-shadow: inset 0 0 0 1px rgba(0,0,0,.3), 0 1px 10px rgba(0,0,0,.4);
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
		return <Li {...({selected: this.props.selected})} onClick={this.props.onClick}>
			<Icon color={this.props.color}></Icon>
			<Title>{title}</Title>
		</Li>
	}

}

export default ListItem;