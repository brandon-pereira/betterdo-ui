import React from 'react';
import Tabs, { Tab } from '@components/tabs';
import ListSettings from './ListSettings';
import ListMembers from './ListMembers';
import { Header } from '@components/copy';
import useCurrentList from '@hooks/useCurrentList';

function EditListModalContent({ onClose }) {
    const { currentList } = useCurrentList();

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
