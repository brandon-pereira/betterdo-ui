import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTheme } from 'styled-components';

import ListSettings from './ListSettings';
import ListMembers from './ListMembers';

import Tabs, { Tab } from '@components/Tabs';
import { Header } from '@components/Copy';
import useListDetails from '@hooks/useListDetails';
import useCurrentListId from '@hooks/useCurrentListId';
import useGeneratedUrl from '@hooks/useGeneratedUrl';
import { checkIfColorGoodContrast } from '@utilities/colors';

export interface Props {
    setUnsavedChanges: (bool: boolean) => void;
    onRequestClose: () => void;
}

const tabs = ['general', 'members'];

function EditListModalContent({ setUnsavedChanges, onRequestClose }: Props) {
    const currentListId = useCurrentListId();
    const { list } = useListDetails(currentListId);

    const { section } = useParams();
    const [selectedIndex, setSelectedIndex] = useState(() => {
        const tab = tabs.findIndex(tab => tab === section);
        return tab !== -1 ? tab : 0;
    });
    const generateUrl = useGeneratedUrl();
    const navigate = useNavigate();
    const theme = useTheme();
    const isColorGoodContrast = checkIfColorGoodContrast(
        list.color || '#000',
        theme.colors.modals.contentBackground
    );

    return (
        <>
            <Header color={isColorGoodContrast ? list.color : undefined}>
                List Settings
            </Header>
            <Tabs
                color={isColorGoodContrast ? list.color : undefined}
                selectedIndex={selectedIndex}
                onChange={index => {
                    navigate(generateUrl(`/edit-list/${tabs[index]}`));
                    setSelectedIndex(index);
                }}
                titles={['General', 'Members']}
            >
                <Tab>
                    <ListSettings
                        setUnsavedChanges={setUnsavedChanges}
                        onRequestClose={onRequestClose}
                    />
                </Tab>
                <Tab>
                    <ListMembers />
                </Tab>
            </Tabs>
        </>
    );
}

export default EditListModalContent;
