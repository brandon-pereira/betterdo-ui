import React, { Component } from 'react';
import styled from 'styled-components';
import SvgIcon from './icon';
import { COLORS } from '../constants';

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
    height: 1rem;
    width: 1rem;
    background-color: ${props =>
        props.color ? props.color : COLORS.defaultList};
    background-image: linear-gradient(transparent, rgba(0, 0, 0, 0.2));
    box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.5),
        0 1px 10px rgba(0, 0, 0, 0.4);
    border-radius: 50%;
`;
const Title = styled.span`
    flex: 1;
    padding: 1rem 1rem 1rem 0;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
`;
const IconHolder = styled.div`
    width: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    ${SvgIcon} {
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
        switch (this.props.type) {
            case 'inbox':
                title = 'Inbox';
                Icon = <SvgIcon icon="drawer" {...svgIconProps} />;
                break;
            case 'today':
                title = 'Today';
                Icon = <SvgIcon icon="alarm" {...svgIconProps} />;
                break;
            case 'tomorrow':
                title = 'Tomorrow';
                Icon = <SvgIcon icon="calendar" {...svgIconProps} />;
                break;
            case 'highPriority':
                title = 'High Priority';
                Icon = <SvgIcon icon="bookmarks" {...svgIconProps} />;
                break;
        }
        return (
            <Li
                {...{ selected: this.props.selected }}
                onClick={this.props.onClick}
            >
                <IconHolder>{Icon}</IconHolder>
                <Title>{title}</Title>
            </Li>
        );
    }
}

export default ListItem;
