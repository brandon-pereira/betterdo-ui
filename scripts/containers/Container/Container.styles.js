import styled from 'styled-components';
import { QUERIES } from '../../constants';

export const _Container = styled.div`
    width: 100vw;
    height: 100vh;
    display: grid;
    grid-template-columns: 0px 1fr;
    grid-template-rows: 4rem 1fr;
    ${props =>
        props.mobileNavVisible &&
        `
          grid-template-rows: 4rem 60% 4rem 1fr;  
    `}
    @media ${QUERIES.medium} {
        grid-template-columns: 10rem 1fr;
        grid-template-rows: 4rem 1fr;
    }
    @media ${QUERIES.large} {
        grid-template-columns: 14rem 1fr;
    }
`;
