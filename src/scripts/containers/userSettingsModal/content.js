import React, { Component, Fragment } from 'react';
import Tabs, { Tab } from '../../components/tabs';
import { observer, inject } from 'mobx-react';
import AccountSettings from './accountSettings';
import CustomLists from './customLists';
import { Header } from '../../components/copy';
@inject('store')
@observer
class UserSettingsModalContent extends Component {
    render() {
        return (
            <Fragment>
                <Header>Settings</Header>
                <Tabs titles={['Account', 'Custom Lists']}>
                    <Tab>
                        <AccountSettings />
                    </Tab>
                    <Tab>
                        <CustomLists />
                    </Tab>
                </Tabs>
            </Fragment>
        );
    }
}

export default UserSettingsModalContent;
