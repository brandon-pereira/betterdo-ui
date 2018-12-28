import React from 'react';
import styled from 'styled-components';
import { COLORS } from '../constants';

const Container = styled.div`
    height: ${props => props.size || '3rem'};
    width: ${props => props.size || '3rem'};
    background: ${COLORS.blue};
    border-radius: 50%;
    overflow: hidden;
    font-size: 1.5rem;
    font-weight: bold;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Loader = ({ user, ...props }) => {
    console.log(user);
    const firstName = user ? user.firstName : 'A';
    const lastName = user ? user.lastName : 'A';
    const initials = firstName.charAt(0) + lastName.charAt(0);
    return (
        <Container {...props}>
            {user && user.profilePic && <div />}
            {initials}
        </Container>
    );
};

export default styled(Loader)``;
