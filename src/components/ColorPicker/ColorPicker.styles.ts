import { styled } from 'styled-components';

import _Icon from '@components/Icon';

export const Container = styled.div`
    display: flex;
    height: 3rem;
    overflow: hidden;
    border-radius: 50px;
    box-shadow:
        0 3px 4px 0 rgba(0, 0, 0, 0.14),
        0 3px 3px -2px rgba(0, 0, 0, 0.12),
        0 1px 8px 0 rgba(0, 0, 0, 0.2);
`;

export const Icon = styled(_Icon)`
    color: ${({ theme }) => theme.colors.forms.label.color};
`;

export const Color = styled.button.attrs(props => ({
    style: {
        backgroundColor: props.color
    }
}))<{ $isCurrent?: boolean }>`
    border: none;
    outline: none;
    flex: 1;
    background-image: linear-gradient(transparent, rgba(0, 0, 0, 0.3));
    box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.05);
    box-sizing: border-box;
    position: relative;
    &:focus-visible {
        box-shadow: inset 0 0 0 5px #fff;
    }
    &:first-of-type {
        border-radius: 50px 0 0 50px;
    }
    &:last-of-type {
        border-radius: 0 50px 50px 0;
    }
    ${props =>
        props.$isCurrent &&
        `
        box-shadow: inset 0 0 0 5px ${props.theme.colors.general.blue};
    `};
`;

export const TooltipContainer = styled.div`
    position: relative;
    height: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const LabelContainer = styled.div`
    display: flex;
    margin-bottom: 0.5rem;
    label {
        margin-bottom: 0;
    }
    ${Icon} {
        margin-left: 0.3rem;
    }
`;
