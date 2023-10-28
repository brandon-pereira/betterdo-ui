import { useState } from 'react';
import { styled } from 'styled-components';

import User from '@customTypes/user';

const Container = styled.div<{ size?: string }>`
    border: none;
    outline: none;
    height: ${props => props.size || '3rem'};
    width: ${props => props.size || '3rem'};
    background: ${({ theme }) => theme.colors.general.blue};
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
        box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.general.blue};
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
    text-indent: 100%;
    white-space: nowrap;
    overflow: hidden;
`;

interface Props {
    user?: User;
    size?: string;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const ProfilePicture = ({ user, onClick, ...props }: Props) => {
    const [error, setError] = useState(false);
    const firstName = user?.firstName || 'A';
    const lastName = user?.lastName || 'A';
    const initials = firstName.charAt(0) + lastName.charAt(0);
    return (
        <Container as={onClick ? 'button' : 'div'} onClick={onClick} {...props}>
            {user && user.profilePicture && !error && (
                <Img
                    onError={() => setError(true)}
                    alt={`${firstName} ${lastName}}`}
                    src={FormatProfilePictureUrl(user.profilePicture)}
                />
            )}
            {initials}
        </Container>
    );
};

export const FormatProfilePictureUrl = (url?: string, sizeInPx?: number) => {
    if (url && typeof url === 'string') {
        return url.replace('sz=50', sizeInPx ? `sz=${sizeInPx}` : '');
    }
    return undefined;
};

export default styled(ProfilePicture)``;
