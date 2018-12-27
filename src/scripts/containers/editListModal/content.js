import React, { Component } from 'react';
import Tabs, { Tab } from '../../components/tabs';
import ListSettings from './listSettings';
import ListMembers from './listMembers';
import { observer, inject } from 'mobx-react';

@inject('store')
@observer
class EditListModalContent extends Component {
    render() {
        const currentList = this.props.store.currentList;
        return (
            <Tabs
                color={currentList.color}
                selectedIndex={1}
                titles={['Settings', 'Members']}
            >
                <Tab>
                    <ListSettings currentList={currentList} />
                </Tab>
                <Tab>
                    <ListMembers />
                </Tab>
            </Tabs>
        );
    }
}

export default EditListModalContent;
