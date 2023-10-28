import { styled } from 'styled-components';

export const IconContainer = styled.div<{ size?: string }>`
    height: ${props => props.size || '1rem'};
    width: ${props => props.size || '1rem'};
    background: none;
    border: none;
    outline: none;
    cursor: ${props => (props.onClick ? 'pointer' : 'default')};
    position: relative;
    svg {
        position: absolute;
        left: 0;
        top: 0;
        fill: ${props => props.color || '#000'};
        height: 100%;
        width: 100%;
    }
    &:focus-visible {
        svg {
            fill: ${({ theme }) => theme.colors.general.blue};
        }
    }
`;
