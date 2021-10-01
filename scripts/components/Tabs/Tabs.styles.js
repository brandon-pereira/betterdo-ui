import styled from 'styled-components';

export const Container = styled.div``;
export const TabsHeader = styled.div`
    position: relative;
    list-style: none;
    display: flex;
    margin: 0;
    padding: 0;
    border: 2px solid ${props => props.color || props.theme.colors.general.blue};
    border-radius: 3px;
    margin-bottom: 1rem;
    overflow-x: auto;
`;
export const ActiveTabHeaderBackground = styled.div`
    position: absolute;
    z-index: -1;
    top: 0;
    bottom: 0;
    left: 0;
    transform: translateX(${props => props.selectedIndex * '100' || 0}%);
    transition: transform 0.2s;
    width: ${props => (1 / props.numberOfTabs) * 100}%;
    background-color: ${props =>
        props.color || props.theme.colors.general.blue};
`;
export const TabHeaderItem = styled.button`
    border: none;
    background: none;
    font: inherit;
    white-space: nowrap;
    flex: 1;
    text-align: center;
    border-right: 1px solid
        ${props => props.color || props.theme.colors.general.blue};
    padding: 0.6rem 0.4rem;
    cursor: pointer;
    color: ${props => props.color || props.theme.colors.general.blue};
    outline: none;
    ${props =>
        props.selected &&
        `
        color: #fff;
        cursor: default;
    `}
    &:focus-visible {
        text-decoration: underline;
    }
    &:last-of-type {
        border-right: none;
    }
`;

export const TabsBody = styled.div``;
export const TabBodyItem = styled.div`
    display: none;
    ${props =>
        props.selected &&
        `
        display: block;
    `}
`;