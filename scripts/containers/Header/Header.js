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
import useCurrentList from '@hooks/useCurrentList';
import useEditListModal from '@hooks/useEditListModal';

function Header() {
    const { modalVisibility } = useModals();
    const { openModal: openEditListModal } = useEditListModal();
    const { currentList, loading } = useCurrentList();
    return (
        <Container
            mobileNavVisible={modalVisibility.listsView}
            color={currentList.color}
        >
            <Hamburger
                open={modalVisibility.listsView}
                hidden={modalVisibility.listsView}
                // onClick={() => openModal('listsView')}
            />
            <Loader isVisible={loading} size="2rem" />
            <Title>{currentList.title}</Title>
            <SettingsButton
                color="rgba(0,0,0,.2)"
                hidden={currentList.type !== 'default'}
                onClick={openEditListModal}
            >
                <Icon icon="settings" color="#fff" />
            </SettingsButton>
        </Container>
    );
}

export default Header;
