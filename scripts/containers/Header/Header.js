import React from 'react';
import useModals from '@hooks/useModals';
import {
    Container,
    Hamburger,
    Loader,
    Title,
    SettingsButton,
    Icon
} from './Header.styles';

function Header(props) {
    const { modalVisibility, openModal, closeModal } = useModals();
    const store = {};
    return (
        <Container
            mobileNavVisible={modalVisibility.listsView}
            // color={store.currentList.color}
        >
            <Hamburger
                open={modalVisibility.listsView}
                hidden={modalVisibility.listsView}
                onClick={() => {
                    openModal('listsView');
                }}
            />
            <Loader isLoading={store.loading} size="2rem" />
            <Title>aa</Title>
            <SettingsButton
                color="rgba(0,0,0,.2)"
                // hidden={store.currentList.type !== 'default'}
                onClick={() => openModal('editList')}
            >
                <Icon icon="settings" color="#fff" />
            </SettingsButton>
        </Container>
    );
}

export default Header;
