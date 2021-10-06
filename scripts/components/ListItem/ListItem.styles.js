import styled from 'styled-components';

import { DEFAULT_LIST_COLOR } from '../../constants';

export const Container = styled.button`
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
    &:focus-visible {
        background: rgba(255, 255, 255, 0.1);
    }
    ${({ selected }) =>
        selected &&
        `
        & {
            box-shadow: inset 0 -1px rgba(0,0,0,.5);
            background: linear-gradient(#006EFF, #004DB4) !important;
        }
    `}
    ${({ isOver }) =>
        isOver &&
        `
        & {
            box-shadow: inset 0 -1px rgba(255, 255, 255, 0.15), inset 0 0 0 3px #006EFF;
            // background: linear-gradient(#006EFF, #004DB4) !important;
        }
    `}
`;

export const DotIcon = styled.div`
    height: 1rem;
    width: 1rem;
    background-color: ${props =>
        props.color ? props.color : DEFAULT_LIST_COLOR};
    background-image: linear-gradient(transparent, rgba(0, 0, 0, 0.2));
    box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.5),
        0 1px 10px rgba(0, 0, 0, 0.4);
    border-radius: 50%;
`;
export const Title = styled.span`
    flex: 1;
    padding: 1rem 1rem 1rem 0;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
`;
export const IconHolder = styled.div`
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
