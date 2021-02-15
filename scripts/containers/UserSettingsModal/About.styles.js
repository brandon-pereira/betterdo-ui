import styled from 'styled-components';

import _BetterDo from '../../../svgs/betterdo.svg';

export const Container = styled.div`
    text-align: center;
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
`;
