import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 1.4rem;
    width: 2rem;
    cursor: pointer;
`;
const Bar = styled.div`
    height: 4px;
    width: 100%;
    background: #fff;
    border-radius: 3px;
    box-shadow: 0 1px rgba(0, 0, 0, 0.5);
`;

const Hamburger = props => (
    <Container {...props}>
        <Bar />
        <Bar />
        <Bar />
    </Container>
);

export default styled(Hamburger)``;
