import { useNavigate } from 'react-router-dom';

import { Container, Content, Hamburger, ProfilePicture } from './Logo.styles';

import useListDetails from '@hooks/useListDetails';
import useProfile from '@hooks/useProfile';
import useCurrentListId from '@hooks/useCurrentListId';
import useGeneratedUrl from '@hooks/useGeneratedUrl';
import useHamburgerNav from '@hooks/useHamburgerNav';
import { getAccessibleAccent } from '@utilities/colors';

function Logo() {
    const [isMobileNavVisible, setMobileNavVisibility] = useHamburgerNav();
    const generateUrl = useGeneratedUrl();
    const navigate = useNavigate();

    const { profile } = useProfile();
    const currentListId = useCurrentListId();
    const { list } = useListDetails(currentListId);
    const color = getAccessibleAccent(list.color!);
    return (
        <Container color={color.toHex()}>
            <Content>
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
                {profile?.firstName && (
                    <ProfilePicture
                        onClick={e => {
                            e.stopPropagation();
                            navigate(generateUrl('/profile-settings/general'));
                        }}
                        user={profile}
                    />
                )}
            </Content>
        </Container>
    );
}

export default Logo;
