import React, { Fragment } from 'react';
import Tabs, { Tab } from '@components/Tabs';
import AccountSettings from './AccountSettings';
import CustomLists from './CustomLists';
import General from './General';
import { Header } from '../../components/Copy';
import About from './About';
import useProfile from '@hooks/useProfile';
import Loader from '@components/Loader';
import { Error } from '@components/Forms';
import { LIGHT_THEME } from '../../constants';

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
                titles={['Account', 'Custom Lists', 'General', 'About']}
            >
                <Tab>
                    <AccountSettings />
                </Tab>
                <Tab>
                    <CustomLists />
                </Tab>
                <Tab>
                    <General />
                </Tab>
                <Tab>
                    <About />
                </Tab>
            </Tabs>
        </Fragment>
    );
}

export default UserSettingsModalContent;