import { styled } from 'styled-components';

import _Icon from '@components/Icon';

export const Icon = styled(_Icon)`
    pointer-events: none;
    position: absolute;
    top: 50%;
    right: 0.8rem;
    transform: translateY(-50%) rotate(180deg);
`;

export const SelectContainer = styled.label`
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

export const Select = styled.select<{ width?: string }>`
    appearance: none;
    background: ${({ theme }) => theme.colors.forms.input.background};
    color: ${({ theme }) => theme.colors.forms.input.color};
    width: ${props => props.width || '100%'};
    box-sizing: border-box;
    padding: 0.8rem 1rem;
    border: none;
    box-shadow: ${({ theme }) => theme.colors.forms.input.boxShadow};
    border-radius: 3px;
    outline: none;
    font: inherit;
    font-size: 1rem;
    padding: 1rem;
    padding-right: 2.8rem;
    &:focus {
        box-shadow: inset 0 0 0 2px ${({ theme }) => theme.colors.general.blue};
    }
`;
