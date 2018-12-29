import React from 'react';
import styled from 'styled-components';
import { COLORS } from '../constants';

const _Input = styled.input`
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
        box-shadow: inset 0 0 0 2px ${COLORS.blue};
    }
    ${({ invalid }) =>
        invalid &&
        `
    box-shadow: inset 0 0 0 2px ${COLORS.red} !important
    `};
`;

const Error = styled.div`
    background: ${COLORS.red};
    color: #fff;
    padding: 0.5rem;
    margin: 1rem 0;
    border-radius: 3px;
`;

const Label = styled.label`
    color: #666;
    margin: 0 0 0.4rem;
    display: block;
`;

const TextArea = styled.textarea`
    background: #fff;
    font-family: inherit;
    font-size: 1rem;
    margin-bottom: 1rem;
    resize: none;
    width: 100%;
    box-sizing: border-box;
    padding: 0.8rem 1rem;
    border: none;
    box-shadow: inset 0 0 0 2px #ccc;
    border-radius: 3px;
    outline: none;
`;

const Form = ({ children, errorMessage, ...props }) => (
    <form {...props}>
        {errorMessage ? <Error>{errorMessage}</Error> : null}
        {children}
    </form>
);

const Input = styled(props => (
    <_Input {...props} aria-label={props.placeholder} />
))``;

export { Input, Label, Form, Error, TextArea };
