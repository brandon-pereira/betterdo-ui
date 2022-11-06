import { useState, Fragment } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { LIGHT_THEME } from '../../theme';

import ProfileSettings from './ProfileSettings';
import CustomLists from './CustomLists';
import General from './General';
import About from './About';

import Tabs, { Tab } from '@components/Tabs';
import { Header } from '@components/Copy';
import useGeneratedUrl from '@hooks/useGeneratedUrl';

const tabs = ['general', 'profile', 'custom-lists', 'about'];

function UserSettingsModalContent() {
    const { section } = useParams();
    const [selectedIndex, setSelectedIndex] = useState(() => {
        const tab = tabs.findIndex(tab => tab === section);
        return tab !== -1 ? tab : 0;
    });
    const generateUrl = useGeneratedUrl();
    const navigate = useNavigate();

    return (
        <Fragment>
            <Header color={LIGHT_THEME.colors.general.blue}>Settings</Header>
            <Tabs
                onChange={index => {
                    navigate(generateUrl(`/profile-settings/${tabs[index]}`));
                    setSelectedIndex(index);
                }}
                selectedIndex={selectedIndex}
                color={LIGHT_THEME.colors.general.blue}
                titles={['General', 'Profile', 'Custom Lists', 'About']}
            >
                <Tab>
                    <General />
                </Tab>
                <Tab>
                    <ProfileSettings />
                </Tab>
                <Tab>
                    <CustomLists />
                </Tab>
                <Tab>
                    <About />
                </Tab>
            </Tabs>
        </Fragment>
    );
}

export default UserSettingsModalContent;
