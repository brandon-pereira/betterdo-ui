import color from 'color';

import {
    Container,
    Hamburger,
    Loader,
    Title,
    SettingsButton,
    Icon
} from './Header.styles';

import Settings from '@components/Icon/svgs/settings.svg';
import useEditListModal from '@hooks/useEditListModal';
import useListDetails from '@hooks/useListDetails';
import useCurrentListId from '@hooks/useCurrentListId';
import useHamburgerNav from '@hooks/useHamburgerNav';

function Header() {
    const [isMobileNavVisible, setMobileNavVisibility] = useHamburgerNav();

    const { openModal: openEditListModal } = useEditListModal();
    const currentListId = useCurrentListId();
    const { list, loading } = useListDetails(currentListId);
    const isDarkColor = color(list.color).isDark();

    return (
        <Container $isDarkColor={isDarkColor} color={list.color}>
            <Hamburger
                open={isMobileNavVisible}
                hidden={isMobileNavVisible}
                onClick={() => setMobileNavVisibility(true)}
            />
            <Loader isVisible={loading} size="2rem" />
            <Title>{list.title}</Title>
            <SettingsButton
                aria-label="List Settings"
                color="none"
                hidden={list.type !== 'default'}
                onClick={openEditListModal}
            >
                <Icon icon={Settings} color={'currentColor'} />
            </SettingsButton>
        </Container>
    );
}

export default Header;
