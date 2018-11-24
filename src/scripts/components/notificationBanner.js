import React from 'react';
import styled from 'styled-components';
import Button from './button';
import { QUERIES } from '../constants';

const Header = styled.h2`
    margin: 0 0 0.3rem;
`;
const Description = styled.p`
    margin: 0;
`;
const CopyContainer = styled.div`
    flex: 1;
`;
const ButtonContainer = styled.div`
    display: flex;
`;
const Container = styled.div`
    background: #42a5f5;
    box-shadow: inset 0 -1px rgba(0, 0, 0, 0.3);
    color: #fff;
    padding: 1rem;
    text-shadow: 1px 1px rgba(0, 0, 0, 0.2);
    ${Button} {
        margin-top: 1rem;
        margin-right: 0.5rem;
        &:first-of-type {
            box-shadow: none;
            background: none;
            order: 2;
            &:before {
                display: none;
            }
        }
    }
    @media ${QUERIES.medium} {
        display: flex;
        justify-content: center;
        align-items: center;
        ${Button} {
            margin: 0;
            order: 2;
            margin-left: 0.5rem;
            margin-right: 0;
            &:first-of-type {
                order: 1;
            }
        }
    }
`;

const NotificationBanner = ({
    title,
    description,
    primaryButtonCopy,
    primaryButtonAction,
    secondaryButtonCopy,
    secondaryButtonAction
}) => (
    <Container onClick={() => primaryButtonAction()}>
        <CopyContainer>
            <Header>{title}</Header>
            <Description>{description}</Description>
        </CopyContainer>
        <ButtonContainer>
            {secondaryButtonAction && secondaryButtonCopy && (
                <Button
                    onClick={e => {
                        e.stopPropagation();
                        secondaryButtonAction();
                    }}
                    color="transparent"
                >
                    {secondaryButtonCopy}
                </Button>
            )}
            <Button>{primaryButtonCopy}</Button>
        </ButtonContainer>
    </Container>
);

export default styled(NotificationBanner)``;
