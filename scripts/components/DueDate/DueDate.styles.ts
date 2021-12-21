import styled from 'styled-components';

export const Container = styled.div`
    margin-bottom: 1rem;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
`;

export const ItemContainer = styled.button<{ selected: boolean }>`
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
    &:hover {
        background: rgba(255, 255, 255, 0.1);
    }
    ${({ selected }) =>
        selected &&
        `
        background: rgba(255, 255, 255, 0.1);
    `}
`;

export const ItemLabel = styled.label`
    margin-top: 0.7rem;
`;
