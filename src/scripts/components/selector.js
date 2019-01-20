import React, { Component } from 'react';
import styled from 'styled-components';
import { COLORS } from '../constants';
const SelectorContainer = styled.div`
    display: flex;
    border: 1px solid #a2a2a2;
    border-radius: 3px;
    overflow: hidden;
    margin-bottom: 1rem;
`;
const Selection = styled.button`
    flex: 1;
    appearance: none;
    border: none;
    border-right: 1px solid #d6d6d6
    background: linear-gradient(#fff, #ddd);
    box-shadow: inset 0 -1px #fff;
    padding: 0.5rem 1rem;
    font: inherit;
    outline: none;
    &:last-of-type {
        border-right: none;
    }
    ${props =>
        props.selected &&
        `
        background: ${COLORS.blue};
        box-shadow: inset 0 0 0 1px rgba(0,0,0,0.9), inset 0 0 30px rgba(0,0,0,.8);
        text-shadow: 1px 1px rgba(0,0,0,.9);
        color: #fff;
    `}
`;
class Selector extends Component {
    constructor(props) {
        super(props);
        this.state = { selectedValue: props.value || props.values[0].value };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e, value) {
        this.setState({ selectedValue: value });
        if (this.props.onSelect) {
            this.props.onSelect(value);
        }
    }

    render() {
        return (
            <SelectorContainer>
                {this.props.values.map(value => (
                    <Selection
                        onClick={e => this.handleChange(e, value.value)}
                        key={value.value}
                        selected={value.value === this.state.selectedValue}
                    >
                        {value.label}
                    </Selection>
                ))}
            </SelectorContainer>
        );
    }
}

export default Selector;
