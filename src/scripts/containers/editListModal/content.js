import React, { Component, Fragment } from 'react';
import Tabs, { Tab } from '../../components/tabs';
import ListSettings from './listSettings';
import ListMembers from './listMembers';
import { observer, inject } from 'mobx-react';
import { Header } from '../../components/copy';

@inject('store')
@observer
class EditListModalContent extends Component {
    render() {
        const currentList = this.props.store.currentList;
        return (
            <Fragment>
                <Header color={currentList.color}>List Settings</Header>
                <Tabs
                    color={currentList.color}
                    titles={['General', 'Members']}
                    showTitleAbove={true}
                >
                    <Tab>
                        <ListSettings
                            closeModal={() => this.props.closeModal()}
                            currentList={currentList}
                        />
                    </Tab>
                    <Tab>
                        <ListMembers
                            closeModal={() => this.props.closeModal()}
                        />
                    </Tab>
                </Tabs>
            </Fragment>
        );
    }
}

export default EditListModalContent;
