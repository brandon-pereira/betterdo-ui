import React from 'react';
import styled from 'styled-components';
import { COLORS } from '../constants';

const _header = styled.h2`
    color: ${COLORS.blue};
    font-weight: 100;
    font-size: 2rem;
    margin: 0 0 1rem;
    padding: 0;
    letter-spacing: -2px;
`;

const _body = styled.p`
    color: #222;
    margin: 0 0 1rem;
`;

const Header = ({ children, ...props }) => (
    <_header {...props}>{children}</_header>
);
const Body = ({ children, ...props }) => <_body {...props}>{children}</_body>;

export { Header, Body };
