import React from 'react';
import {
    Container,
    Hamburger,
    Loader,
    Title,
    SettingsButton,
    Icon
} from './Header.styles';
import useEditListModal from '@hooks/useEditListModal';
import useListDetails from '@hooks/useListDetails';
import useCurrentListId from '@hooks/useCurrentListId';
import useHamburgerNav from '@hooks/useHamburgerNav';

function Header() {
    const [isMobileNavVisible, setMobileNavVisibility] = useHamburgerNav();

    const { openModal: openEditListModal } = useEditListModal();
    const currentListId = useCurrentListId();
    const { list, loading } = useListDetails(currentListId);
    return (
        <Container mobileNavVisible={isMobileNavVisible} color={list.color}>
            <Hamburger
                open={isMobileNavVisible}
                hidden={isMobileNavVisible}
                onClick={() => setMobileNavVisibility(true)}
            />
            <Loader isVisible={loading} size="2rem" />
            <Title>{list.title}</Title>
            <SettingsButton
                color="rgba(0,0,0,.2)"
                hidden={list.type !== 'default'}
                onClick={openEditListModal}
            >
                <Icon icon="settings" color="#fff" />
            </SettingsButton>
        </Container>
    );
}

export default Header;
