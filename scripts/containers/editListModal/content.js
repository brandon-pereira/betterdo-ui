import React from 'react';
import Tabs, { Tab } from '@components/tabs';
import ListSettings from './ListSettings';
import ListMembers from './ListMembers';
import { Header } from '@components/copy';
import useListDetails from '@hooks/useListDetails';
import useCurrentListId from '@hooks/useCurrentListId';

function EditListModalContent({ onClose }) {
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
                    <ListSettings closeModal={onClose} currentList={list} />
                </Tab>
                <Tab>
                    <ListMembers currentList={list} closeModal={onClose} />
                </Tab>
            </Tabs>
        </>
    );
}

export default EditListModalContent;
