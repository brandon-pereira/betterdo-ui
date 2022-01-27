import React, { Fragment } from 'react';

import { LIGHT_THEME } from '../../theme';

import ProfileSettings from './ProfileSettings';
import CustomLists from './CustomLists';
import General from './General';
import About from './About';

import useProfile from '@hooks/useProfile';
import Tabs, { Tab } from '@components/Tabs';
import Loader from '@components/Loader';
import { Error } from '@components/Forms';
import { Header } from '@components/Copy';

function UserSettingsModalContent() {
    const { loading, error } = useProfile();

    if (error) {
        return <Error>Unexpected Error Fetching Data</Error>;
    }

    if (loading) {
        return <Loader />;
    }
    return (
        <Fragment>
            <Header color={LIGHT_THEME.colors.general.blue}>Settings</Header>
            <Tabs
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
