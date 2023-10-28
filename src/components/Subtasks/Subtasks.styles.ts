import { styled } from 'styled-components';

import { Input as _Input } from '@components/Forms';
import _Icon from '@components/Icon';

export const Input = styled(_Input)`
    border: none;
    border-radius: 0;
    box-shadow: none;
    margin-bottom: 0;
    box-shadow: ${({ theme }) => theme.colors.forms.input.boxShadow};
`;
export const Container = styled.div`
    background: #fff;
    font-family: inherit;
    font-size: 1rem;
    margin-bottom: 1rem;
    width: 100%;
    box-sizing: border-box;
    border-radius: 3px;
    overflow: hidden;
    color: ${({ theme }) => theme.colors.forms.input.color};
    background: ${({ theme }) => theme.colors.forms.input.background};
    ${({ theme }) =>
        theme.isDarkMode &&
        `
        border: none;
    `};
`;
export const DeleteIcon = styled(_Icon)``;

export const Task = styled.div<{ checked?: boolean }>`
    display: flex;
    align-items: center;
    padding: 0.8rem 1rem;
    border-color: #ccc;
    border-style: solid;
    border-width: 1px 1px 0 1px;
    z-index: 11;
    span {
        flex: 1;
    }
    ${DeleteIcon} {
        display: none;
    }
    ${props =>
        props.checked &&
        `
    text-decoration: line-through;
`}
    &:hover {
        ${DeleteIcon} {
            display: block;
        }
    }
    &:last-of-type {
        border-bottom: none;
    }
    ${({ theme }) =>
        theme.isDarkMode &&
        `
        && {
            border: none;
            border-bottom: 1px solid rgba(255,255,255,0.5);
        }
    `};
`;
export const Checkbox = styled.input`
    height: 1rem;
    width: 1rem;
    border-radius: 100%;
    display: inline-block;
    appearance: none;
    background: #fff;
    margin: 0 0.8rem 0 0;
    border: 1px solid #ccc;
    display: flex;
    align-items: center;
    justify-content: center;
    outline: none;
    cursor: pointer;
    flex-shrink: 0;
    &:checked {
        box-shadow: inset 0 0 0 2px #fff;
        background: linear-gradient(#333, #666);
    }
    &:focus-visible {
        box-shadow:
            inset 0 0 0 2px #fff,
            0 0 0 2px ${({ theme }) => theme.colors.general.blue};
    }
`;
