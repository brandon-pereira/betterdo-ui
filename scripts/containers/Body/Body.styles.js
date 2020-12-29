import styled from 'styled-components';
import Button from '../../components/Button';
import { QUERIES } from '../../constants';
import Banner from '../../components/banner';

export const CompletedTasksButton = styled(Button)`
margin: 0.5rem auto 1rem;
text-transform: uppercase;
user-select: none;
align-self: start;
background: rgba(0,0,0,.1) !important;
border: 1px solid #aaa;
box-shadow: none;
font-size: 1.1rem;
color: #666;
text-shadow: 0 1px #fff;
font-weight: 800;
box-shadow: 0 1px 1px 0 rgba(0,0,0,0.02), 0 2px 1px -1px rgba(0,0,0,0.05), 0 1px 3px 0 rgba(0,0,0,0.1);

padding: 0.6rem 2rem;
flex-shrink: 0;
${props =>
    props.hasCaughtUpBanner &&
    `
    margin: 0 0 -0.5rem;
    align-self: stretch;
    border-radius: 0;
    justify-content: center;
    background-color: #cacaca !important;

`}
}
`;
export const Container = styled.div`
grid-row: 2 / 3;
grid-column: 2 / 3;
overflow-y: scroll;
background: #e4e4e4;
display: flex;
flex-direction: column;
padding-bottom: 0.5rem;
${props =>
    props.mobileNavVisible &&
    `
    grid-row: 4;
    ${Banner} {
        opacity: 0;
    }
`}
@media ${QUERIES.medium} {
    grid-row: 2 / 3;
    ${Banner} {
        opacity: 1;
    }
}
`;
