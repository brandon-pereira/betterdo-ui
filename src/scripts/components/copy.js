import React from 'react';
import styled from 'styled-components';

const _header = styled.h2`
    color: #006fb0;
    font-weight: 100;
    font-size: 2rem;
    margin: 0.3rem 0 0;
    padding: 0;
`;

const _body = styled.p`
    color: #222;
`;

const Header = ({ children, ...props }) => (
    <_header {...props}>{children}</_header>
);
const Body = ({ children, ...props }) => <_body {...props}>{children}</_body>;

export { Header, Body };
