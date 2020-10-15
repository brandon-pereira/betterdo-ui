import styled from 'styled-components';
import _ProfilePicture from '@components/profilePic';
import _Hamburger from '@components/hamburger';
import { QUERIES } from '../../constants';

export const Container = styled.div`
    background-image: linear-gradient(transparent,rgba(0,0,0,0.2));
    background-color: ${({ color, theme }) =>
        color || theme.colors.defaultList};
    overflow: hidden;
    transform: translateY(-100%);
    position: relative;
    z-index: 10;
    /* transition: transform 0.1s 0.1s; */
    ${props =>
        props.visibleOnMobile &&
        `
        transform: translateY(0%);
        grid-row: 1 / 1;
        grid-column: 2 / 3;
    `}
    @media ${QUERIES.medium} {
        transform: none;
        grid-row: 1 / 1;
        grid-column: 1 / 1;
    }
`;

export const Hamburger = styled(_Hamburger)``;
export const ProfilePicture = styled(_ProfilePicture)``;

export const Content = styled.div`
    height: 100%;
    overflow: hidden;
    cursor: pointer;
    background: linear-gradient(transparent, rgba(0, 0, 0, 0.3)), #222;
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
    ${ProfilePicture} {
        box-shadow: 0 2px 3px rgba(0, 0, 0, 0.5);
        flex-shrink: 0;
    }
    @media ${QUERIES.medium} {
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
    @media ${QUERIES.large} {
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
