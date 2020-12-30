// import React from 'react';
import styled from 'styled-components';
// import SvgIcon from './icon';
import { COLORS } from '../../constants';

export const Container = styled.li`
    user-select: none;
    z-index: 5;
    position: relative;
    cursor: pointer;
    color: #fff;
    display: flex;
    align-items: center;
    background: ${props =>
        props.selected
            ? 'linear-gradient(#006EFF, #004DB4)'
            : COLORS.navigationBackground};
    box-shadow: ${props =>
        props.selected
            ? 'inset 0 1px rgba(0,0,0,.5)'
            : 'inset 0 1px rgba(255,255,255,.15)'};
    &:last-of-type {
        box-shadow: inset 0 -1px rgba(255, 255, 255, 0.15),
            inset 0 1px rgba(255, 255, 255, 0.15);
    }

    ${({ selected }) =>
        selected &&
        `
        margin-left: 2px;
        border-radius: 1rem 0 0 1rem;
        & + & {
            box-shadow: none;

        }
                `}
`;

export const DotIcon = styled.div`
    height: 1rem;
    width: 1rem;
    background-color: ${props =>
        props.color ? props.color : COLORS.defaultList};
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
    width: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    svg {
        filter: drop-shadow(0 1px #000);
    }
`;
