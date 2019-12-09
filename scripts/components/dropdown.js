import React, { Component } from 'react';
import styled from 'styled-components';
import Icon from './icon';
import { COLORS } from '../constants';

const SelectContainer = styled.label`
    position: relative;
    display: block;
    margin: 0 0 1rem;
    ${Icon} {
        pointer-events: none;
        position: absolute;
        top: 50%;
        right: 0.8rem;
        transform: translateY(-50%) rotate(180deg);
    }
`;
const Select = styled.select`
    appearance: none;
    background: #fff;
    width: ${props => props.width || '100%'};
    box-sizing: border-box;
    padding: 0.8rem 1rem;
    border: none;
    box-shadow: inset 0 0 0 2px #ccc;
    border-radius: 3px;
    outline: none;
    font: inherit;
    font-size: 1rem;
    padding: 1rem;
    &:focus {
        box-shadow: inset 0 0 0 2px ${COLORS.blue};
    }
`;

export default class Dropdown extends Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
    }

    onChange(e) {
        const value = e.target.value;
        if (this.props.onSelect) {
            this.props.onSelect(value);
        }
    }

    render() {
        return (
            <SelectContainer>
                <Select value={this.props.value} onChange={this.onChange}>
                    {this.props.values.map(option => {
                        return (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        );
                    })}
                </Select>
                <Icon size="1.5rem" color="#444" icon="chevron" />
            </SelectContainer>
        );
    }
}
