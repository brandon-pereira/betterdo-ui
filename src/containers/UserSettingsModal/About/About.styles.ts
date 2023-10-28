import { styled } from 'styled-components';

import _BetterDo from '@components/Icon/svgs/betterdo.svg';

export const Container = styled.div`
    text-align: center;
    color: ${({ theme }) => theme.colors.body.color};
    h1,
    h2 {
        margin: 0;
    }
    h2 {
        font-size: 1rem;
        font-weight: 400;
    }
`;

export const Logo = styled(_BetterDo)`
    height: 8rem;
    width: 8rem;
    display: block;
    margin: 2rem auto 1rem;
    filter: drop-shadow(1px 2px 3px rgba(0, 0, 0, 0.5));
`;

export const ChangeLog = styled.div`
    text-align: left;
    box-sizing: border-box;
    padding: 0.5rem 1rem;
    overflow-y: scroll;
    border: 2px solid #ddd;
    border-radius: 1rem;
    margin-top: 2rem;
    max-height: 30vh;
    h1 {
        margin-bottom: 1rem;
    }
    h2 {
        font-weight: bold;
    }
    a {
        color: ${({ theme }) => theme.colors.general.blue};
    }
`;
