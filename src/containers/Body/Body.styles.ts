import { styled } from 'styled-components';

import _Banner from '@components/Banner';
import _Scroller from '@components/Scroller';

export const Banner = styled(_Banner)``;

export const Scroller = styled(_Scroller)`
    margin-bottom: 0.5rem;
    overflow-x: hidden;
    .simplebar-content {
        display: flex;
        flex-direction: column;
        height: 100%;
    }
`;

export const Container = styled.div`
    grid-row: 4;
    grid-column: 1;
    overflow: hidden;
    background: ${({ theme }) => theme.colors.body.background};
    ${({ theme }) => theme.queries.medium} {
        grid-row: 2;
        grid-column: 2;
        ${Banner} {
            opacity: 1;
        }
    }
`;

export const TaskContainer = styled.div`
    margin: 0 1rem;
    text-align: center;
`;
