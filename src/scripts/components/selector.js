import React, { Component } from 'react';
import styled from 'styled-components';
import { COLORS } from '../constants';
const SelectorContainer = styled.div`
    display: flex;
    border-radius: 3px;
    margin-bottom: 1rem;
`;
const Selection = styled.button`
    flex: 1;
    appearance: none;
    border: none;
    margin: 0;
    background: linear-gradient(#fff, #ddd);
    box-shadow: inset 0 0 0 1px #a2a2a2, inset 0 -2px #fff;
    padding: 0.75rem 1rem;
    font: inherit;
    outline: none;
    &:first-of-type {
        border-radius: 5px 0 0 5px;
    }
    &:last-of-type {
        border-right: none;
        border-radius: 0 5px 5px 0;
    }
    ${props =>
        props.selected &&
        `
        background-color: ${COLORS.blue};
        background-image: linear-gradient(transparent, rgba(0,0,0,.3));
        box-shadow: inset 0 0 0 1px rgba(0,0,0,0.9), inset 0 -2px rgba(255,255,255,.3);
        text-shadow: 1px 1px rgba(0,0,0,.9);
        position: relative;
        z-index: 1;
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
