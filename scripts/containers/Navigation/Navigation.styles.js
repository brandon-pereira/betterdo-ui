import { QUERIES, COLORS } from '../../constants';
import styled from 'styled-components';

export const NavigationModalOverlay = styled.div`
    background: rgba(0, 0, 0, 0.5);
    position: fixed;
    top: 100%;
    left: 0;
    right: 0;
    height: 1000%;
`;
export const MobileNavigationSkirt = styled.div`
    display: none;
    grid-row: 2;
    grid-column: 2;
    background: #000;
    ${({ isMobileNavVisible }) =>
        isMobileNavVisible &&
        `
        display: block;
    `}
    @media ${QUERIES.medium} {
        display: block;
        grid-row: 2 / 3;
        grid-column: 1 / 1;
    }
`;

export const Container = styled.nav`
    background: ${COLORS.navigationBackground};
    flex-direction: column;
    box-shadow: inset 0 1px rgba(255, 255, 255, 0.15), 0 1px 2px rgba(0,0,0,.9);
    transform: translateY(-100%);
    transition: transform 0s;
    position: relative;
    z-index: 5;
    transition: transform .2s;
    opacity: 0;
    pointer-events: none;
    ${({ isMobileNavVisible }) =>
        isMobileNavVisible &&
        `
        display: flex;
        grid-row: 2;
        grid-column: 2;
        transform: translateY(0%);
        opacity: 1;
        pointer-events: all;
    `}
    @media ${QUERIES.medium} {
        display: flex;
        position: static;
        opacity: 1;
        pointer-events: all;
        transform: translateY(0%);
        grid-row: 2 / 3;
        grid-column: 1 / 1;
        overflow: hidden;
        ${NavigationModalOverlay} {
            display: none;
        }
    }
`;
export const ListsContainer = styled.ul`
    list-style: none;
    padding: 0;
    margin: 0;
    flex: 1;
    overflow-y: auto;
    &::-webkit-scrollbar {
        width: 5px;
    }
    &::-webkit-scrollbar-track {
        background: rgba(0, 0, 0, 0.9);
    }
    &::-webkit-scrollbar-thumb {
        background: linear-gradient(#1e88e5, #1565c0);
    }
`;
