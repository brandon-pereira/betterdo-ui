import React, { Component } from 'react';
import { IconContainer } from './Icon.styles';

class Icon extends Component {
    constructor(props) {
        super(props);
        this.state = {
            icon: null
        };
    }

    async componentDidMount() {
        this._isMounted = true;
        let icon = await import(`./svgs/${this.props.icon}.svg`);
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

export default Icon;
