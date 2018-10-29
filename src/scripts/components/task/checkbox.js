import React from 'react';
import styled from 'styled-components';

const Container = styled.input`
    height: 1.4rem;
    width: 1.4rem;
    border-radius: 5px;
    display: inline-block;
    appearance: none;
    background: #fff;
    margin-right: 1rem;
    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.2);
    display: flex;
    align-items: center;
    justify-content: center;
    outline: none;
    cursor: pointer;
    &:checked:before {
        content: '';
        border-radius: 50%;
        height: 1rem;
        width: 1rem;
        background: linear-gradient(#333, #666);
        display: block;
    }
`;

const Checkbox = ({ checked, onChange }) => (
    <Container
        type="checkbox"
        onChange={onChange.bind(this)}
        checked={checked}
    />
);

export default Checkbox;
