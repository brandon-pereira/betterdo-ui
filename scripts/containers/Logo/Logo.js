import React from 'react';

import { Container, Content, Hamburger, ProfilePicture } from './Logo.styles';
import useListDetails from '@hooks/useListDetails';
import useProfile from '@hooks/useProfile';
import useCurrentListId from '@hooks/useCurrentListId';
import useGeneratedUrl from '@hooks/useGeneratedUrl';
import { useHistory } from 'react-router-dom';
import useHamburgerNav from '@hooks/useHamburgerNav';

function Logo() {
    const [isMobileNavVisible, setMobileNavVisibility] = useHamburgerNav();
    const generateUrl = useGeneratedUrl();
    const history = useHistory();

    const { profile } = useProfile();
    const currentListId = useCurrentListId();
    const { list } = useListDetails(currentListId);
    return (
        <Container color={list.color}>
            <Content
                onClick={() => {
                    // TODO: Reload
                    console.log('RELOAD');
                }}
            >
                <Hamburger
                    open={isMobileNavVisible}
                    onClick={e => {
                        setMobileNavVisibility(false);
                        e.stopPropagation();
                    }}
                />
                <h1>
                    Better
                    <span>Do.</span>
                </h1>
                {profile && profile.firstName && (
                    <ProfilePicture
                        onClick={e => {
                            e.stopPropagation();
                            history.replace(generateUrl('/account-settings'));
                        }}
                        user={profile}
                    />
                )}
            </Content>
        </Container>
    );
}

export default Logo;
