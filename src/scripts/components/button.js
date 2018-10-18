import React from 'react';
import styled from 'styled-components';

const Container = styled.button`
    border: none;
    color: #fff;
    border-radius: 5px;
    padding: 1rem;
    font: inherit;
    background-color: ${props => props.color};
    background-image: linear-gradient(transparent, rgba(0, 0, 0, 0.3));
    box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.5);
    text-shadow: 1px 1px rgba(0, 0, 0, 0.6);
    font-size: 1rem;
    margin-top: 1rem;
`;

const Button = ({ children, ...props }) => (
    <Container {...props}>{children}</Container>
);

export default Button;
