import { motion } from 'framer-motion';
import { styled } from 'styled-components';

import { DEFAULT_LIST_COLOR } from '../../constants';

export const Container = styled.button<{ selected?: boolean }>`
    border: none;
    display: block;
    font: inherit;
    width: 100%;
    text-align: left;
    outline: none;
    user-select: none;
    z-index: 5;
    position: relative;
    cursor: pointer;
    color: #fff;
    display: flex;
    align-items: center;
    background: ${({ theme }) => theme.colors.navigation.background};
    box-shadow: inset 0 -1px rgba(255, 255, 255, 0.15);
    ${({ selected }) =>
        selected &&
        `
        z-index: 6;
    `}
    &:focus-visible,
    &:hover {
        background: rgba(255, 255, 255, 0.05);
    }
`;

export const SelectedItemBackground = styled(motion.div)`
    box-shadow: inset 0 -1px rgba(0, 0, 0, 0.5);
    background: linear-gradient(#006eff, #004db4);
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
`;

export const DotIcon = styled.div`
    height: 1rem;
    width: 1rem;
    background-color: ${props =>
        props.color ? props.color : DEFAULT_LIST_COLOR};
    background-image: linear-gradient(transparent, rgba(0, 0, 0, 0.2));
    box-shadow:
        inset 0 0 0 1px rgba(0, 0, 0, 0.5),
        0 1px 10px rgba(0, 0, 0, 0.4);
    border-radius: 50%;
`;

export const DateIcon = styled.div`
    height: 1.4rem;
    width: 1.1rem;
    overflow: hidden;
    /* Using the 2 values on box-shadow gave me more flexibility */
    box-shadow:
        inset 0 0 0 1px #fff,
        inset 0 -3px 0 1px #fff;
    font-weight: 800;
    font-size: 12px;
    /* height of container - bottom border */
    line-height: calc(1.4rem - 3px);
`;

export const Title = styled.span`
    position: relative;
    z-index: 1;
    flex: 1;
    padding: 1rem 1rem 1rem 0;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
`;
export const IconHolder = styled.div`
    position: relative;
    z-index: 1;
    touch-action: none;
    width: 50px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    * {
        filter: drop-shadow(0 1px #000);
    }
`;
