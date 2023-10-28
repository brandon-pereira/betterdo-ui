import { styled } from 'styled-components';

import { DEFAULT_LIST_COLOR } from '../../constants';

import Button from '@components/Button';
import _Icon from '@components/Icon';
import _Loader from '@components/Loader';
import _Hamburger from '@components/Hamburger';

export const Icon = styled(_Icon)``;

export { Button };

export const Hamburger = styled(_Hamburger)<{ hidden: boolean }>`
    ${({ hidden }) =>
        hidden &&
        `
        display: none;
    `}
`;
export const Loader = styled(_Loader)`
    margin-left: 0.5rem;
`;

export const Container = styled.header<{ $isDarkColor: boolean }>`
    grid-row: 3;
    grid-column: 1;
    background-color: ${({ color }) => color || DEFAULT_LIST_COLOR};
    background-image: linear-gradient(transparent, rgba(0, 0, 0, 0.2));
    box-shadow: inset 0 -1px rgba(0, 0, 0, 0.3);
    color: #1f1f1f;
    display: flex;
    align-items: center;
    padding: 0 0.8rem 0 0;
    overflow: hidden;
    transform: translateY(0%);
    transition: background 0.6s;
    ${({ $isDarkColor }) =>
        $isDarkColor &&
        `
        color: #fff;
    `}
    ${Hamburger} {
        padding: 0 0.5rem 0 0.8rem;
    }
    ${Loader} {
        filter: drop-shadow(1px 1px rgba(0, 0, 0, 0.5));
    }
    ${({ theme }) => theme.queries.medium} {
        grid-row: 1;
        grid-column: 2;
        ${Hamburger} {
            display: none;
        }
    }
`;

export const SettingsButton = styled(Button)`
    color: currentColor;
    margin-left: 0.35rem;
    border-radius: 2rem;
    user-select: none;
    padding: 0.6rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.1);
    border: 1px solid rgba(0, 0, 0, 0.2);
    box-shadow: none;
    &[hidden] {
        display: none;
    }
    ${Icon} {
        height: 1.6rem;
        width: 1.6rem;
    }
`;
export const Title = styled.h2`
    flex: 1;
    font-size: 1.8rem;
    text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);
    text-align: center;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    line-height: 4rem;
    margin: 0;
`;
