import { styled } from 'styled-components';

export const NavigationModalOverlay = styled.div`
    background: rgba(0, 0, 0, 0.5);
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    height: 1000px;
    opacity: 0;
`;

export const Container = styled.nav<{ $isMobileNavVisible?: boolean }>`
    display: flex;
    background: ${({ theme }) => theme.colors.navigation.background};
    flex-direction: column;
    box-shadow:
        inset 0 1px rgba(255, 255, 255, 0.15),
        0 1px 2px rgba(0, 0, 0, 0.9);
    position: relative;
    z-index: 5;
    grid-column: 1;
    grid-row: 2;
    max-height: 100%;
    pointer-events: none;
    ${({ $isMobileNavVisible }) =>
        $isMobileNavVisible &&
        `
        pointer-events: all;
        ${NavigationModalOverlay} {
            opacity: 1;
        }
    `}
    ${({ theme }) => theme.queries.medium} {
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
`;
