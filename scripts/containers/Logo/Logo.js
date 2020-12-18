import React from 'react';

import useModals from '@hooks/useModals';
import { Container, Content, Hamburger, ProfilePicture } from './Logo.styles';
import useListDetails from '@hooks/useListDetails';
import useProfile from '@hooks/useProfile';
import useCurrentListId from '@hooks/useCurrentListId';

function Logo() {
    const { modalVisibility, closeModal } = useModals();
    const { profile } = useProfile();
    const currentListId = useCurrentListId();
    const { list, loading } = useListDetails(currentListId);
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
                {profile && (
                    <ProfilePicture
                        onClick={() => (modalVisibility.userSettings = true)}
                        user={profile}
                    />
                )}
            </Content>
        </Container>
    );
}

export default Logo;
