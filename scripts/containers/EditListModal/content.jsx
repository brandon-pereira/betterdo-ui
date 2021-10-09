import React from 'react';

import ListSettings from './ListSettings';
import ListMembers from './ListMembers';

import Tabs, { Tab } from '@components/Tabs';
import { Header } from '@components/Copy';
import useListDetails from '@hooks/useListDetails';
import useCurrentListId from '@hooks/useCurrentListId';

function EditListModalContent({ setUnsavedChanges, onRequestClose }) {
    const currentListId = useCurrentListId();
    const { list } = useListDetails(currentListId);

    return (
        <>
            <Header color={list.color}>List Settings</Header>
            <Tabs
                color={list.color}
                titles={['General', 'Members']}
                showTitleAbove={true}
            >
                <Tab>
                    <ListSettings
                        setUnsavedChanges={setUnsavedChanges}
                        onRequestClose={onRequestClose}
                    />
                </Tab>
                <Tab>
                    <ListMembers
                        currentList={list}
                        setUnsavedChanges={setUnsavedChanges}
                        onRequestClose={onRequestClose}
                    />
                </Tab>
            </Tabs>
        </>
    );
}

export default EditListModalContent;
