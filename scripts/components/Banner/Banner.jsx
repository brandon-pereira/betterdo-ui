import React from 'react';
import styled from 'styled-components';
import _Icon from '@components/Icon';
import _Button from '@components/Button';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex: 1;
`;
const Icon = styled(_Icon)`
    path {
        stroke-width: 1px;
        fill: ${({ theme }) => theme.colors.body.banner.icon.background};
        ${props =>
            props.icon === 'betterdo' &&
            `
                stroke-width: 6px;
           `}
    }
`;
const Button = styled(_Button)`
    margin-top: 1rem;
`;

const BodyCopy = styled.span`
    color: ${({ theme }) => theme.colors.body.banner.color};
    font-size: 1.4rem;
    font-weight: 100;
    margin: 0.1rem 0 0 0;
    max-width: 300px;
    text-align: center;
`;
const Heading = styled.h2`
    color: grey;
    font-size: 1.4rem;
    font-weight: 800;
    margin: 1rem 0 0 0;
    max-width: 300px;
`;

const Banner = ({ title, body, buttonText, buttonAction, icon, className }) => (
    <Container className={className}>
        <Icon size="30vmin" icon={icon} />
        <Heading>{title}</Heading>
        <BodyCopy>{body}</BodyCopy>
        {buttonText && (
            <Button color="grey" onClick={buttonAction}>
                {buttonText}
            </Button>
        )}
    </Container>
);

export default Banner;
