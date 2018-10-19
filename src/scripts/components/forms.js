import React from 'react';
import styled from 'styled-components';

const _input = styled.input`
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
    margin-bottom: 1rem;
    &:focus {
        box-shadow: inset 0 0 0 2px #2196f3;
    }
    ${({ invalid }) =>
        invalid &&
        `
    box-shadow: inset 0 0 0 2px #e57373 !important
    `};
`;

const _error = styled.div`
    background: #d32f2f;
    color: #fff;
    padding: 0.5rem;
    margin: 1rem 0;
    border-radius: 3px;
`;

const _label = styled.label`
    color: #666;
    margin: 0 0 0.4rem;
    display: block;
`;

const Input = ({ children, ...props }) => (
    <_input {...props}>{children}</_input>
);
const Error = ({ children, ...props }) => (
    <_error {...props}>{children}</_error>
);
const Form = ({ children, errorMessage, ...props }) => (
    <form {...props}>
        {errorMessage ? <Error>{errorMessage}</Error> : null}
        {children}
    </form>
);
const Label = ({ children, ...props }) => (
    <_label {...props}>{children}</_label>
);

export { Input, Label, Form, Error };
