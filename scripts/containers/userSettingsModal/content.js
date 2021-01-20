import React, { Fragment } from 'react';
import Tabs, { Tab } from '@components/tabs';
import AccountSettings from './accountSettings';
import CustomLists from './customLists';
import General from './general';
import { Header } from '../../components/copy';
import About from './About';
import useProfile from '@hooks/useProfile';
import Loader from '@components/Loader';
import { Error } from '@components/forms';

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
            <Header>Settings</Header>
            <Tabs titles={['Account', 'Custom Lists', 'General', 'About']}>
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
