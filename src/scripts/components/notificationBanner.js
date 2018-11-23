import React from 'react';
import styled from 'styled-components';
import Button from './button';
import { QUERIES } from '../constants';

const Header = styled.h2``;
const Description = styled.p``;
const Container = styled.div`
    background: #42a5f5;
    box-shadow: inset 0 -1px rgba(0, 0, 0, 0.3);
    color: #fff;
    padding: 1rem;
    text-shadow: 1px 1px rgba(0, 0, 0, 0.2);
    div {
        flex: 1;
    }
    ${Header} {
        margin: 0 0 0.3rem;
    }
    ${Description} {
        margin: 0;
    }
    ${Button} {
        margin-top: 1rem;
    }
    @media ${QUERIES.medium} {
        display: flex;
        justify-content: center;
        align-items: center;
        ${Button} {
            margin: 0;
        }
    }
`;

const NotificationBanner = ({
    title,
    description,
    buttonCopy,
    buttonAction
}) => (
    <Container onClick={() => buttonAction()}>
        <div>
            <Header>{title}</Header>
            <Description>{description}</Description>
        </div>
        <Button>{buttonCopy}</Button>
    </Container>
);

export default styled(NotificationBanner)``;
