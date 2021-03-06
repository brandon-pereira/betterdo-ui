import React from 'react';
import styled from 'styled-components';
import { COLORS } from '../constants';

const Container = styled.div`
    border: none;
    outline: none;
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
    position: relative;
    box-shadow: 0 2px 3px rgba(0, 0, 0, 0.5);
    &:focus-visible {
        box-shadow: 0 0 0 2px ${COLORS.blue};
    }
`;
const Img = styled.img`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    right: 0;
    bottom: 0;
`;

const ProfilePicture = ({ user, ...props }) => {
    user = user || {};
    const firstName = user.firstName || 'A';
    const lastName = user.lastName || 'A';
    const initials = firstName.charAt(0) + lastName.charAt(0);
    return (
        <Container as={props.onClick ? 'button' : 'div'} {...props}>
            {user && user.profilePicture && (
                <Img src={FormatProfilePictureUrl(user.profilePicture)} />
            )}
            {initials}
        </Container>
    );
};

export const FormatProfilePictureUrl = (url, sizeInPx) => {
    if (url && typeof url === 'string') {
        return url.replace('sz=50', sizeInPx ? `sz=${sizeInPx}` : '');
    }
    return null;
};

export default styled(ProfilePicture)``;
