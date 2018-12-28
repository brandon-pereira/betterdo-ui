import React, { Component } from 'react';
import Tabs, { Tab } from '../../components/tabs';
import { observer, inject } from 'mobx-react';

@inject('store')
@observer
class UserSettingsModalContent extends Component {
    render() {
        return (
            <Tabs titles={['Account', 'General', 'Custom Lists']}>
                <Tab>Account</Tab>
                <Tab>General</Tab>
                <Tab>Custom Lists</Tab>
            </Tabs>
        );
    }
}

export default UserSettingsModalContent;
