import { useCallback, useState, useEffect } from 'react';

import {
    CustomListsContainer,
    CustomListItem,
    Title,
    IconHolder
} from './CustomLists.styles';

import CUSTOM_LISTS from '@utilities/customLists';
import { Body } from '@components/Copy';
import { Error } from '@components/Forms';
import Toggle from '@components/Toggle';
import useProfile from '@hooks/useProfile';
import useModifyProfile from '@hooks/useModifyProfile';

function CustomListSettings() {
    const { profile, loading, error } = useProfile();
    const [customLists, setCustomLists] = useState(profile?.customLists);
    const modifyProfile = useModifyProfile();
    useEffect(() => {
        if (!loading && !error) {
            setCustomLists(profile?.customLists);
        }
    }, [loading, error, profile]);
    const onCustomListToggle = useCallback(
        async (id: string, bool: boolean) => {
            try {
                await modifyProfile({
                    customLists: {
                        [id]: bool
                    }
                });
            } catch (err) {
                console.error(err);
                return;
            }
        },
        [modifyProfile]
    );

    return (
        <>
            {error && <Error>{error}</Error>}
            <Body>
                Enable or disable custom lists to customize your BetterDo
                experience.
            </Body>
            <CustomListsContainer>
                {CUSTOM_LISTS.filter(list => !list.required).map(list => (
                    <CustomListItem key={list.id}>
                        <IconHolder>{list.icon}</IconHolder>
                        <Title>{list.title}</Title>
                        <Toggle
                            onChange={(e, bool) =>
                                onCustomListToggle(list.id, bool)
                            }
                            value={
                                customLists
                                    ? customLists[
                                          list.id as keyof typeof customLists
                                      ] || false
                                    : false
                            }
                        />
                    </CustomListItem>
                ))}
            </CustomListsContainer>
        </>
    );
}

export default CustomListSettings;
