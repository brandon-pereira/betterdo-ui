import React, { Component } from 'react';
import styled from 'styled-components';

const IconContainer = styled.div`
    height: ${props => props.size || '1rem'};
    width: ${props => props.size || '1rem'};
    cursor: ${props => (props.onClick ? 'pointer' : 'default')}
    position: relative;
    svg {
        position: absolute;
        fill: ${props => props.color || '#000'}
        height: 100%;
        width: 100%;
    }
`;
export default class Icon extends Component {
    constructor(props) {
        super(props);
        this.state = {
            icon: null
        };
    }

    async componentDidMount() {
        let icon = await import(`../../svgs/${this.props.icon}.svg`);
        icon = icon.default;
        this.setState({
            icon
        });
    }

    render() {
        const Icon = this.state.icon;
        const { onClick, ...props } = this.props;
        if (Icon) {
            return (
                <IconContainer {...props} onClick={e => onClick(e)}>
                    <Icon />
                </IconContainer>
            );
        } else {
            return <span onClick={e => onClick(e)}>Loading...</span>;
        }
    }
}