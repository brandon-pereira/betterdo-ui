import { styled } from 'styled-components';

export const Container = styled.div`
    display: flex;
    border-radius: 3px;
    margin-bottom: 1rem;
`;
export const Selection = styled.button<{ selected: boolean }>`
    flex: 1;
    appearance: none;
    border: none;
    margin: 0;
    background: ${({ theme }) => theme.colors.forms.selector.background};
    color: ${({ theme }) => theme.colors.forms.selector.color};
    box-shadow: ${({ theme }) => theme.colors.forms.selector.boxShadow};
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
    &:focus-visible {
        background-image: linear-gradient(
            rgba(0, 0, 0, 0.3),
            rgba(0, 0, 0, 0.2)
        );
    }
    ${props =>
        props.selected &&
        `
        background-color: ${props.theme.colors.general.blue};
        background-image: linear-gradient(transparent, rgba(0,0,0,.3));
        box-shadow: inset 0 0 0 1px rgba(0,0,0,0.9), inset 0 -2px rgba(255,255,255,.3);
        text-shadow: 1px 1px rgba(0,0,0,.9);
        position: relative;
        z-index: 1;
        color: #fff;
        &:focus-visible {
            background-image: linear-gradient(rgba(0,0,0,.3), transparent);
        }
    `}
`;
