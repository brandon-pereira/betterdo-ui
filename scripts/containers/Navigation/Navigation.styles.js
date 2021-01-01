import { QUERIES, COLORS } from '../../constants';
import styled from 'styled-components';

export const NavigationModalOverlay = styled.div`
    background: rgba(0, 0, 0, 0.5);
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    height: 1000px;
    opacity: 0;
`;

export const Container = styled.nav`
    display: flex;
    background: ${COLORS.navigationBackground};
    flex-direction: column;
    box-shadow: inset 0 1px rgba(255, 255, 255, 0.15), 0 1px 2px rgba(0,0,0,.9);
    position: relative;
    z-index: 5;
    grid-column: 1;
    grid-row: 2;
    max-height: 100%;
    pointer-events: none;
    ${({ isMobileNavVisible }) =>
        isMobileNavVisible &&
        `
        pointer-events: all;
        ${NavigationModalOverlay} {
            opacity: 1;
        }
    `}
    @media ${QUERIES.medium} {
        display: flex;
        position: static;
        opacity: 1;
        grid-row: 2;
        grid-column: 1;
        pointer-events: all;
        transform: translateY(0%);
        overflow: hidden;
        ${NavigationModalOverlay} {
            display: none;
        }
    }
`;
export const ListsContainer = styled.ul`
    list-style: none;
    max-height: 100%;
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
