import styled from 'styled-components';
import { QUERIES } from '../constants';

export default styled.div`
    width: 100vw;
    height: 100vh;
    display: grid;
    grid-template-columns: 0px 1fr;
    grid-template-rows: 4rem 1fr;
    @media ${QUERIES.medium} {
        grid-template-columns: 10rem 1fr;
    }
    @media ${QUERIES.large} {
        display: grid;
        grid-template-columns: 14rem 1fr;
    }
`;
