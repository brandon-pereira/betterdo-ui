import React from 'react';
import styled from 'styled-components';
import Checkbox from './checkbox';

const Container = styled.div`
    display: flex;
    align-items: center;
`;
const Title = styled.span`
    flex: 1;
    text-overflow: ellipsis;
    overflow: hidden;
`;

const Header = props => (
    <Container>
        <Checkbox
            onChange={() => {
                props.updateTask({
                    isCompleted: !props.isCompleted
                });
            }}
            checked={props.isCompleted}
        />
        <Title>{props.title}</Title>
    </Container>
);

export default Header;
