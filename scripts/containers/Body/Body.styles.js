import styled from 'styled-components';

import { QUERIES } from '../../constants';

import Button from '@components/Button';
import _Banner from '@components/Banner';
import _Scroller from '@components/Scroller';

export const Banner = styled(_Banner)``;

export const Scroller = styled(_Scroller)`
    margin-bottom: 0.5rem;
    .simplebar-content {
        display: flex;
        flex-direction: column;
        height: 100%;
    }
`;

export const CompletedTasksButton = styled(Button)`
    margin: 0.5rem auto 1rem;
    text-transform: uppercase;
    user-select: none;
    align-self: start;
    background: rgba(0, 0, 0, 0.1) !important;
    border: 1px solid
        ${({ theme }) => theme.colors.body.completedTasksButton.borderColor};
    box-shadow: none;
    font-size: 1.1rem;
    line-height: 2rem;
    text-shadow: ${({ theme }) =>
        theme.colors.body.completedTasksButton.textShadow};
    color: ${({ theme }) => theme.colors.body.completedTasksButton.color};
    font-weight: 800;
    box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.02),
        0 2px 1px -1px rgba(0, 0, 0, 0.05), 0 1px 3px 0 rgba(0, 0, 0, 0.1);
    padding: 0.2rem 2rem;
    flex-shrink: 0;
`;

export const Container = styled.div`
    grid-row: 4;
    grid-column: 1;
    overflow: hidden;
    padding-top: 1rem;
    background: ${({ theme }) => theme.colors.body.background};
    ${QUERIES.medium} {
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

export const CounterContainer = styled.span`
    position: relative;
`;

const Counter = styled.span``;

export const CurrentCounter = styled(Counter)`
    ${({ isAnimating }) => (isAnimating ? `display: none;` : `display: inline`)}
`;

export const NextCounter = styled(Counter)`
    position: absolute;
    top: -1rem;
    opacity: 0;
    left: 0
    transition: none;
    ${({ isAnimating }) =>
        isAnimating
            ? `
        position: relative;
        top: 0rem;
        left: 0;
        opacity: 1;
        transition: top 0.6s, opacity 0.6s;
    `
            : `
        visibility: hidden;
    `}
`;

export const PrevCounter = styled(Counter)`
    position: absolute;
    top: 0rem;
    left: 0;
    opacity: 1;
    transition: top 0.6s, opacity 0.6s;
    ${({ isAnimating }) =>
        isAnimating
            ? `

        top: 1rem;
        opacity: 0;
    `
            : `visibility: hidden;`};
`;
