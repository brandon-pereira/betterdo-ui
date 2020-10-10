import React from 'react';

import useModals from '@hooks/useModals';
import { Container, Content, Icon, ProfilePicture } from './Logo.styles';

function Logo() {
    const { modalVisibility, closeModal } = useModals();
    return (
        <Container
            // color={store.currentList.color}
            visibleOnMobile={modalVisibility.listsView}
        >
            <Content
                onClick={() => {
                    // TODO: Reload
                    console.log('RELOAD');
                }}
            >
                <Icon
                    open={modalVisibility.listsView}
                    onClick={e => {
                        closeModal('listView');
                        e.stopPropagation();
                    }}
                />
                <h1>
                    Better
                    <span>Do.</span>
                </h1>
                {/* {store.user && (
                    <ProfilePicture
                        onClick={() =>
                            (store.modalVisibility.userSettings = true)
                        }
                        user={store.user}
                    />
                )} */}
            </Content>
        </Container>
    );
}

export default Logo;
