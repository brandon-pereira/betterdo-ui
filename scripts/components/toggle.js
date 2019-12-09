import React, { Component } from 'react';
import styled from 'styled-components';
import { COLORS } from '../constants';

const Slider = styled.div`
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: ${COLORS.red};
    transition: 0.4s;
    border-radius: 34px;
    ${({ disabled }) =>
        disabled &&
        `
        background-color: #ccc !important;
    `}
    &:before {
        position: absolute;
        content: '';
        height: 26px;
        width: 26px;
        left: 4px;
        bottom: 4px;
        background-color: white;
        transition: 0.4s;
        border-radius: 50%;
    }
`;
const Switch = styled.label`
    position: relative;
    display: inline-block;
    width: 60px;
    height: 34px;
    outline: none;
    ${({ disabled }) =>
        disabled &&
        `
        opacity: 0.7;
    `}
    input {
        position: absolute;
        top: -99999px;
        left: -99999px;
        &:checked + ${Slider} {
            background-color: #2196f3;
            &:before {
                transform: translateX(26px);
            }
        }
    }
`;

class Toggle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: props.checked || false
        };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        const newState = !this.state.checked;
        this.setState({ checked: newState });
        if (this.props.onChange) {
            this.props.onChange(e, newState);
        }
    }

    render() {
        return (
            <Switch disabled={this.props.disabled}>
                <input
                    type="checkbox"
                    checked={this.state.checked}
                    onChange={this.handleChange}
                    disabled={this.props.disabled}
                />
                <Slider disabled={this.props.disabled} />
            </Switch>
        );
    }
}

export default Toggle;
