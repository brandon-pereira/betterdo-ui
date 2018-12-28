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
class Icon extends Component {
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
        const { onClick, className, ...props } = this.props;
        if (Icon) {
            return (
                <IconContainer
                    {...props}
                    className={className}
                    onClick={onClick ? e => onClick(e) : null}
                >
                    <Icon
                        className={className}
                        title={this.props.children}
                        aria-describedby={this.props.children}
                    />
                </IconContainer>
            );
        } else {
            return (
                <div className={className} onClick={e => onClick(e)}>
                    {this.props.children}
                </div>
            );
        }
    }
}

export default styled(Icon)``;
