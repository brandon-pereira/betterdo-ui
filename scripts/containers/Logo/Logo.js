import React from 'react';

import useModals from '@hooks/useModals';
import { Container, Content, Hamburger, ProfilePicture } from './Logo.styles';
import useListDetails from '@hooks/useListDetails';
import useProfile from '@hooks/useProfile';
import useCurrentListId from '@hooks/useCurrentListId';
import useGeneratedUrl from '@hooks/useGeneratedUrl';
import { useHistory } from 'react-router-dom';

function Logo() {
    const { modalVisibility, closeModal } = useModals();
    const generateUrl = useGeneratedUrl();
    const history = useHistory();

    const { profile } = useProfile();
    const currentListId = useCurrentListId();
    const { list } = useListDetails(currentListId);
    return (
        <Container
            color={list.color}
            visibleOnMobile={modalVisibility.listsView}
        >
            <Content
                onClick={() => {
                    // TODO: Reload
                    console.log('RELOAD');
                }}
            >
                <Hamburger
                    open={modalVisibility.listsView}
                    onClick={e => {
                        closeModal('listsView');
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
