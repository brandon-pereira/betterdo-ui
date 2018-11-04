import React, { Component } from 'react';
import styled from 'styled-components';

const IconContainer = styled.div`
    height: ${props => props.size || '1rem'};
    width: ${props => props.size || '1rem'};
    cursor: ${props => (props.onClick ? 'pointer' : 'default')}
    position: relative;
    svg {
        position: absolute;
        left: 0;
        top: 0;
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
                    <Icon
                        title={this.props.children}
                        aria-describedby={this.props.children}
                    />
                </IconContainer>
            );
        } else {
            return <div onClick={e => onClick(e)}>{this.props.children}</div>;
        }
    }
}

export { IconContainer };
