import React, { Component } from 'react';
import styled from 'styled-components';
import SvgIcon from './icon';

const Li = styled.li`
    cursor: pointer;
    color: #fff;
    display: flex;
    align-items: center;
    background: ${props =>
        props.selected ? 'linear-gradient(#006EFF, #004DB4)' : 'transparent'};
    box-shadow: ${props =>
        props.selected
            ? 'inset 0 -1px rgba(0,0,0,.5)'
            : '0 1px rgba(255,255,255,.15)'};
`;
const DotIcon = styled.div`
    height: 10px;
    width: 10px;
    background-color: ${props => (props.color ? props.color : '#585858')};
    background-image: linear-gradient(transparent, rgba(0, 0, 0, 0.2));
    box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.3),
        0 1px 10px rgba(0, 0, 0, 0.4);
    border-radius: 50%;
`;
const Title = styled.span`
    flex: 1;
    padding: 1rem 0;
    text-overflow: ellipsis;
`;
const IconContainer = styled.div`
    width: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    .icon {
        filter: drop-shadow(0 1px #000);
    }
`;

class ListItem extends Component {
    render() {
        let title = this.props.title;
        let Icon = <DotIcon color={this.props.color} />;
        const svgIconProps = {
            color: '#fff'
        };
        if (this.props.newList) {
            title = 'New List';
            Icon = <SvgIcon icon="quill" {...svgIconProps} />;
        }
        if (this.props.type === 'inbox') {
            Icon = <SvgIcon icon="drawer" {...svgIconProps} />;
        }
        return (
            <Li
                {...{ selected: this.props.selected }}
                onClick={this.props.onClick}
            >
                <IconContainer>{Icon}</IconContainer>
                <Title>{title}</Title>
            </Li>
        );
    }
}

export default ListItem;
