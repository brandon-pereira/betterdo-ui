import { styled } from 'styled-components';

import _Icon from '@components/Icon';
import _Button from '@components/Button';

export const Container = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    color: #fff;
    bottom: 0;
    overflow-y: scroll;
    padding: 2rem;
    background: ${({ theme }) => theme.colors.general.red};
    flex-direction: column;
    h1 {
        text-shadow: 1px 1px black;
        margin: 0 0 1rem;
        /* font-size: 3rem; */
        svg {
            filter: drop-shadow(1px 1px black);
            margin-bottom: 5rem;
        }
    }
    p {
        /* font-size: 2rem; */
        text-shadow: 1px 1px black;
        margin: 0 0 1rem;
    }
    pre {
        background: rgba(0, 0, 0, 0.1);
        overflow-y: scroll;
        padding: 1rem;
    }
`;

export const Icon = styled(_Icon)`
    /* background: red; */
    margin-bottom: 2rem;
    * {
        fill: #fff;
        stroke-width: 0;
    }
`;

export const Button = styled(_Button)``;
