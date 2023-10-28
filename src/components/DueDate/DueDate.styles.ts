import { styled } from 'styled-components';

import { Input } from '@components/Forms';

export const DueDateInput = styled(Input)`
    visibility: hidden;
    position: absolute;
    top: 0;
    left: 0;
`;
export const Container = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
`;

export const DayIcon = styled.div`
    height: 30px;
    width: 30px;
    padding-top: 3px;
    box-sizing: border-box;
    font-size: 16px;
    box-shadow: inset 0 -1px 0 3px currentColor;
`;

export const ItemContainer = styled.button<{ selected: boolean }>`
    position: relative;
    background: none;
    border: none;
    color: ${({ theme }) => theme.colors.forms.label.color};
    text-align: center;
    font: inherit;
    display: flex;
    align-items: center;
    cursor: pointer;
    justify-content: center;
    border-radius: 5px;
    flex-direction: column;
    padding: 1rem 0;
    margin: 0 1rem 1rem 0;

    ${({ theme, selected }) =>
        selected &&
        `
        &:hover {
            background: ${
                theme.isDarkMode
                    ? `rgba(255, 255, 255, 0.1)`
                    : `rgba(0, 0, 0, 0.1)`
            };
        }
        background: ${
            theme.isDarkMode ? `rgba(255, 255, 255, 0.1)` : `rgba(0, 0, 0, 0.1)`
        };
    `}
`;

export const ItemLabel = styled.label`
    margin-top: 0.7rem;
`;
