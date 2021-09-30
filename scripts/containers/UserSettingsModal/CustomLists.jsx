import React, { useCallback, useState, useEffect } from 'react';
import { Body } from '@components/Copy';
import { Error } from '@components/Forms';
import _Icon from '@components/Icon/Icon';
import Toggle from '@components/Toggle';
import styled from 'styled-components';
import useProfile from '@hooks/useProfile';
import useModifyProfile from '@hooks/useModifyProfile';
import Bookmarks from '@components/Icon/svgs/bookmarks.svg';
import Alarm from '@components/Icon/svgs/alarm.svg';
import Calendar from '@components/Icon/svgs/calendar.svg';

const Icon = styled(_Icon)``;

const CustomListsContainer = styled.ol`
    position: relative;
    padding: 0;
    margin: 0 -1rem;
    border-radius: 1rem;
    background: ${({ theme }) => theme.colors.navigation.background};
`;
const CustomList = styled.li`
    color: #fff;
    display: flex;
    align-items: center;
    box-shadow: 0 1px rgba(255, 255, 255, 0.15);
    padding: 0 0.5rem;
`;
const Title = styled.span`
    flex: 1;
    padding: 1rem 1rem 1rem 0;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
`;
const IconHolder = styled.div`
    width: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    ${Icon} {
        filter: drop-shadow(0 1px #000);
    }
`;

const CUSTOM_LISTS = [
    {
        id: 'highPriority',
        title: 'High Priority',
        icon: Bookmarks
    },
    {
        id: 'today',
        title: 'Today',
        icon: Alarm
    },
    {
        id: 'tomorrow',
        title: 'Tomorrow',
        icon: Calendar
    }
];
function CustomListSettings() {
    const { profile, loading, error } = useProfile();
    const [customLists, setCustomLists] = useState(profile.customLists || {});
    const modifyProfile = useModifyProfile();
    useEffect(() => {
        if (!loading && !error) {
            setCustomLists(profile.customLists);
        }
    }, [loading, error, profile]);
    const onCustomListToggle = useCallback(
        async (id, bool) => {
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
                {CUSTOM_LISTS.map(list => (
                    <CustomList key={list.id}>
                        <IconHolder>
                            <Icon icon={list.icon} color="#fff" />
                        </IconHolder>
                        <Title>{list.title}</Title>
                        <Toggle
                            onChange={(e, bool) =>
                                onCustomListToggle(list.id, bool)
                            }
                            checked={customLists[list.id]}
                        />
                    </CustomList>
                ))}
            </CustomListsContainer>
        </>
    );
}

export default CustomListSettings;
