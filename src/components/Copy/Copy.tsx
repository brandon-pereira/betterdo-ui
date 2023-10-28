import { styled } from 'styled-components';

const Header = styled.h2`
    color: ${props => props.color || props.theme.colors.general.blue};
    font-weight: 100;
    font-size: 2rem;
    margin: 0 0 1rem;
    padding: 0;
    letter-spacing: -2px;
`;

const Body = styled.p`
    color: ${({ theme }) => theme.colors.body.color};
    margin: 0 0 1rem;
`;

export { Header, Body };
