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
import useEditListModal from '@hooks/useEditListModal';
import useListDetails from '@hooks/useListDetails';
import useCurrentListId from '@hooks/useCurrentListId';

function Header() {
    const { modalVisibility, openModal } = useModals();
    const { openModal: openEditListModal } = useEditListModal();
    const currentListId = useCurrentListId();
    const { list, loading } = useListDetails(currentListId);
    return (
        <Container
            mobileNavVisible={modalVisibility.listsView}
            color={list.color}
        >
            <Hamburger
                open={modalVisibility.listsView}
                hidden={modalVisibility.listsView}
                onClick={() => openModal('listsView')}
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
