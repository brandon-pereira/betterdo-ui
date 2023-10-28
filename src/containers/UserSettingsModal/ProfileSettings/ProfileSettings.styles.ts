import { styled } from 'styled-components';

import ProfilePic from '@components/ProfilePic';

export const ProfilePictureBanner = styled.div`
    position: relative;
    padding: 1rem 0;
    margin: 0 -1rem 1rem;
    display: flex;
    align-items: center;
    overflow: hidden;
    justify-content: center;
    border-radius: 1rem;
    &:before {
        content: '';
        background: ${({ theme }) => theme.colors.general.blue};
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
    }
    ${ProfilePic} {
        position: relative;
        z-index: 1;
        border: 2px solid #fff;
        box-shadow: 0 3px 5px rgba(0, 0, 0, 0.5);
    }
`;

export const ProfilePictureBackground = styled.img`
    position: absolute;
    top: -5%;
    left: -5%;
    width: 110%;
    height: 110%;
    filter: blur(10px);
`;

export const ButtonContainer = styled.div`
    display: flex;
    justify-content: space-between;
`;
