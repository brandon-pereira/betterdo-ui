import React, { Component } from 'react';
import { COLORS } from '../constants';
import styled from 'styled-components';

const IconContainer = styled.div`
    height: ${props => props.size || '1rem'};
    width: ${props => props.size || '1rem'};
    background: none;
    border: none;
    outline: none;
    cursor: ${props => (props.onClick ? 'pointer' : 'default')};
    position: relative;
    svg {
        position: absolute;
        left: 0;
        top: 0;
        fill: ${props => props.color || '#000'};
        height: 100%;
        width: 100%;
    }
    &:focus-visible {
        svg {
            fill: ${COLORS.blue};
        }
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
        this._isMounted = true;
        let icon = await import(`../../svgs/${this.props.icon}.svg`);
        icon = icon.default;
        if (this._isMounted) {
            this.setState({
                icon
            });
        }
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    render() {
        const Icon = this.state.icon;
        const { onClick, className, ...props } = this.props;
        if (Icon) {
            return (
                <IconContainer
                    {...props}
                    as={onClick ? 'button' : 'div'}
                    className={className}
                    onClick={onClick ? e => onClick(e) : null}
                >
                    <Icon
                        title={this.props.children}
                        aria-describedby={this.props.children}
                    />
                </IconContainer>
            );
        }
        return null;
    }
}

export default styled(Icon)``;
