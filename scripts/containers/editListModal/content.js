import React from 'react';
import Tabs, { Tab } from '@components/tabs';
import ListSettings from './listSettings';
import ListMembers from './listMembers';
import { Header } from '@components/copy';

function EditListModalContent({ onClose }) {
    const currentList = {
        color: 'red',
        members: []
    };
    return (
        <>
            <Header color={currentList.color}>List Settings</Header>
            <Tabs
                color={currentList.color}
                titles={['General', 'Members']}
                showTitleAbove={true}
            >
                <Tab>
                    <ListSettings
                        closeModal={onClose}
                        currentList={currentList}
                    />
                </Tab>
                <Tab>
                    <ListMembers
                        currentList={currentList}
                        closeModal={onClose}
                    />
                </Tab>
            </Tabs>
        </>
    );
}

export default EditListModalContent;
