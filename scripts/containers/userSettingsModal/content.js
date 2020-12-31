import React, { Component, Fragment } from 'react';
import Tabs, { Tab } from '@components/tabs';
import AccountSettings from './accountSettings';
import CustomLists from './customLists';
import General from './general';
import { Header } from '../../components/copy';

class UserSettingsModalContent extends Component {
    render() {
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
                </Tabs>
            </Fragment>
        );
    }
}

export default UserSettingsModalContent;
