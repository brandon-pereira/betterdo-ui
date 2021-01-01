import styled from 'styled-components';
import Button from '../../components/Button';
import { QUERIES } from '../../constants';
import Banner from '../../components/banner';

export const CompletedTasksButton = styled(Button)`
    margin: 0.5rem auto 1rem;
    text-transform: uppercase;
    user-select: none;
    align-self: start;
    background: rgba(0, 0, 0, 0.1) !important;
    border: 1px solid #aaa;
    box-shadow: none;
    font-size: 1.1rem;
    color: #666;
    text-shadow: 0 1px #fff;
    font-weight: 800;
    box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.02),
        0 2px 1px -1px rgba(0, 0, 0, 0.05), 0 1px 3px 0 rgba(0, 0, 0, 0.1);
    padding: 0.6rem 2rem;
    flex-shrink: 0;
`;

export const Container = styled.div`
    grid-row: 4;
    grid-column: 1;
    overflow-y: scroll;
    background: #e4e4e4;
    display: flex;
    flex-direction: column;
    padding-bottom: 0.5rem;
    @media ${QUERIES.medium} {
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
