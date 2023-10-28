import { styled } from 'styled-components';

import { DEFAULT_LIST_COLOR } from '../../constants';

import _ProfilePicture from '@components/ProfilePic';
import _Hamburger from '@components/Hamburger';

export const Container = styled.div`
    background-image: linear-gradient(transparent, rgba(0, 0, 0, 0.2));
    background-color: ${({ color }) => color || DEFAULT_LIST_COLOR};
    overflow: hidden;
    position: relative;
    grid-row: 1;
    grid-column: 1;
    z-index: 10;
    transition: background 0.6s;
    ${({ theme }) => theme.queries.medium} {
        transform: none;
        grid-row: 1 / 1;
        grid-column: 1 / 1;
    }
`;

export const Hamburger = styled(_Hamburger)``;
export const ProfilePicture = styled(_ProfilePicture)`
    flex-shrink: 0;
`;

export const Content = styled.div`
    height: 100%;
    overflow: hidden;
    cursor: pointer;
    background: linear-gradient(transparent, rgba(0, 0, 0, 0.3)),
        ${({ theme }) => theme.colors.navigation.background};
    border: none;
    box-shadow: inset 0 -1px rgba(0, 0, 0, 0.9);
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
    padding: 0 1rem;
    h1 {
        margin: 0;
        font-size: 1.8rem;
        font-weight: 200;
    }
    span {
        font-weight: 600;
    }
    ${({ theme }) => theme.queries.medium} {
        border-radius: 0 30px 0 0;
        transform: none;
        padding: 0 0.5rem;
        h1 {
            font-size: 1.2rem;
            margin-right: 0.2rem;
        }
        ${ProfilePicture} {
            height: 2rem;
            width: 2rem;
        }
        ${Hamburger} {
            display: none;
        }
    }
    ${({ theme }) => theme.queries.large} {
        h1 {
            font-size: 1.8rem;
            margin-right: 1rem;
        }
        ${ProfilePicture} {
            height: 3rem;
            width: 3rem;
        }
    }
`;
