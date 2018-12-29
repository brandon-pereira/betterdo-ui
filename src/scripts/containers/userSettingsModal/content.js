import React, { Component } from 'react';
import Tabs, { Tab } from '../../components/tabs';
import { observer, inject } from 'mobx-react';
import AccountSettings from './accountSettings';
import CustomLists from './customLists';

@inject('store')
@observer
class UserSettingsModalContent extends Component {
    render() {
        return (
            <Tabs titles={['Account', 'Custom Lists']}>
                <Tab>
                    <AccountSettings />
                </Tab>
                <Tab>
                    <CustomLists />
                </Tab>
            </Tabs>
        );
    }
}

export default UserSettingsModalContent;
