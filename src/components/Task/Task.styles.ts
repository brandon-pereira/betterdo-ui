import { styled } from 'styled-components';

import _Loader from '@components/Loader';

export const Loader = styled(_Loader)`
    margin: 0.9rem 1.3rem 1rem;
`;

export const Checkbox = styled.input`
    touch-action: none;
    height: 2rem;
    width: 2rem;
    border-radius: 50%;
    display: inline-block;
    appearance: none;
    background: ${({ theme }) => theme.colors.task.checkbox.background};
    box-shadow: ${({ theme }) => theme.colors.task.checkbox.boxShadow};
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    outline: none;
    cursor: pointer;
    flex-shrink: 0;
    margin: 0.8rem 1rem 0.8rem 1.3rem;
    &:before {
        content: '';
        border-radius: 50%;
        height: 1rem;
        width: 1rem;
        background: ${({ theme }) => theme.colors.task.checkboxDot.background};
        display: block;
        transform: scale(0);
        transition: transform 0.2s;
    }
    &:checked:before {
        transform: scale(1);
    }
    &:focus-visible {
        box-shadow:
            0 0 0 2px ${({ theme }) => theme.colors.general.blue},
            inset 0 0 0 1px rgba(0, 0, 0, 0.2);
    }
`;

export const HighPriorityFlag = styled.div`
    align-self: flex-start;
    height: 2rem;
    width: 1.6rem;
    background: linear-gradient(#e21d1d, #c11010);
    margin: -1px 1.3rem 0 0;
    position: relative;
    filter: drop-shadow(1px 1px #840000);
    &:before,
    &:after {
        content: '';
        position: absolute;
        top: calc(100% - 1px);
        left: 0;
        width: 0;
        height: 0;
        border-style: solid;
        border-width: 0.8rem 0.8rem 0 0;
        border-color: #c11010 transparent transparent transparent;
    }
    &:after {
        left: auto;
        right: 0;
        border-width: 0 0.8rem 0.8rem 0;
        border-color: transparent #c11010 transparent transparent;
    }
`;

export const Container = styled.button<{
    $isLoading?: boolean;
    $priority: 'low' | 'normal' | 'high';
}>`
    display: block;
    border: none;
    font: inherit;
    box-sizing: border-box;
    padding: 0;
    background: ${({ theme }) => theme.colors.task.background};
    color: ${({ theme }) => theme.colors.task.color};
    box-shadow: ${({ theme }) => theme.colors.task.boxShadow};
    margin: 0 0 0.5rem 0;
    border-radius: 50px;
    width: 100%;
    text-align: left;
    outline: none;
    display: flex;
    align-items: center;
    flex-shrink: 0;
    z-index: 0;
    position: relative;
    ${props =>
        props.$isLoading &&
        `
        opacity: 0.5;
        pointer-events: none;
    `}
    ${({ $priority, theme }) =>
        $priority === 'low' &&
        `
        background: ${theme.colors.task.lowPriority.background};
        box-shadow: 0 2px 3px rgba(0, 0, 0, 0.2);
    `}
    &:focus-visible {
        box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.general.blue};
    }
`;

export const Title = styled.span`
    flex: 1;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    margin: 1rem 1rem 1rem 0;
`;
