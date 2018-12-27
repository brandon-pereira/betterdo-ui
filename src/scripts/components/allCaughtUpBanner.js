import React from 'react';
import styled from 'styled-components';
import Icon from './icon';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex: 1;
    ${Icon} {
        path {
            fill: #cacaca;
            stroke-width: 6px;
        }
    }
`;
const Title = styled.span`
    color: grey;
    font-size: 1.4rem;
    font-weight: 100;
    margin: 1rem 0 0 0;
`;

const AllCaughtUpBanner = ({ title }) => (
    <Container>
        <Icon size="30vmin" icon="betterdo" />
        <Title>{title}</Title>
    </Container>
);

export default AllCaughtUpBanner;
