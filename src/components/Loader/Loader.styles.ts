import { styled, keyframes } from 'styled-components';

const rotate = keyframes`
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(270deg);
    }
`;

const dashoffset = keyframes`
    0% {
        stroke-dashoffset: 184;
    }
    50% {
        stroke-dashoffset: 46;
        transform: rotate(135deg);
    }
    100% {
        stroke-dashoffset: 184;
        transform: rotate(450deg);
    }
`;

export const Loader = styled.div<{
    $isVisible?: boolean;
    $size?: string;
    $color: string | undefined;
}>`
    height: 0;
    width: 0;
    transform: scale(0);
    opacity: 0;
    transition: all 0.5s 0.2s;
    position: relative;
    svg {
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        animation: ${rotate} 2s linear infinite;
    }

    svg circle {
        stroke-width: 5px;
        stroke-dasharray: 184;
        stroke-dashoffset: 0;
        transform-origin: center;
        stroke: ${props => props.$color || '#fff'};
        animation: ${dashoffset} 2s linear infinite;
    }
    ${({ $isVisible, $size }) =>
        $isVisible &&
        `
        transition: all 0s 0s, width 0.2s !important;
        transform: scale(1);
        opacity: 1;
        height: ${$size || '1rem'};
        width: ${$size || '1rem'};
    `};
`;
