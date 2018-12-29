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

    handleChange() {
        this.setState({ checked: !this.state.checked });
    }

    render() {
        return (
            <Switch>
                <input
                    type="checkbox"
                    value={this.state.isChecked}
                    onChange={this.handleChange}
                />
                <Slider />
            </Switch>
        );
    }
}

export default Toggle;
