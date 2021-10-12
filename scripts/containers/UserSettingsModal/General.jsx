import React, { useState, Fragment, useCallback } from 'react';
import styled from 'styled-components';

import Button from '@components/Button';
import { Label, Error } from '@components/Forms';
import Toggle from '@components/Toggle';
import useProfile from '@hooks/useProfile';
import useModifyProfile from '@hooks/useModifyProfile';
import useDarkMode from '@hooks/useDarkMode';

const OptionGroup = styled.div`
    display: flex;
    border-radius: 1rem;
    align-items: center;
    padding: 1rem;
    margin: 0 -1rem;
    &:first-of-type {
        padding-top: 0.5rem;
    }
    &:nth-of-type(even) {
        background: ${({ theme }) =>
            theme.colors.modals.listViewAlternateBackground};
    }
    > div {
        flex: 1;
        margin-right: 1rem;
    }
`;

const Description = styled.p`
    margin-top: -0.2rem;
    font-size: 0.9rem;
    color: ${({ theme }) => theme.colors.body.color};
`;

function GeneralSettings() {
    const { logout, profile, loading } = useProfile();
    const modifyProfile = useModifyProfile();
    const [darkMode, doesPreferDarkMode] = useDarkMode();
    const [state, setState] = useState({
        isBeta: profile.isBeta,
        isPushEnabled: profile.isPushEnabled
    });
    const [error, setError] = useState(null);

    const onChange = useCallback(
        async newState => {
            setState(state => ({ ...state, ...newState }));
            try {
                await modifyProfile({
                    ...state,
                    ...newState
                });
            } catch (err) {
                setError(err.formattedMessage || 'Unexpected Error Occurred');
                return;
            }
        },
        [state, modifyProfile]
    );

    if (loading) {
        return 'LOADING';
    }
    return (
        <Fragment>
            {error && <Error>{error}</Error>}
            <OptionGroup>
                <div>
                    <Label>Notifications</Label>
                    <Description>
                        These are used to notify you when a task is due and when
                        a friend updates a shared list.
                    </Description>
                </div>
                <Toggle
                    onChange={(e, bool) => {
                        onChange({ isPushEnabled: bool });
                    }}
                    value={true}
                />
            </OptionGroup>
            <OptionGroup>
                <div>
                    <Label>Automatic Dark Mode</Label>
                    <Description>
                        BetterDo leverages your system preferences to turn dark
                        mode on or off. However, turn this setting off to fully
                        disable dark mode on this device.
                    </Description>
                </div>
                <Toggle
                    onChange={(e, bool) => {
                        doesPreferDarkMode(bool);
                    }}
                    value={darkMode}
                />
            </OptionGroup>
            <OptionGroup>
                <div>
                    <Label>Beta Program</Label>
                    <Description>
                        Join the beta program to help test exclusive features
                        before anyone else.{' '}
                        <strong>Beta program currently full.</strong>
                    </Description>
                </div>
                <Toggle
                    disabled
                    onChange={(e, bool) => {
                        onChange({ isBeta: bool });
                    }}
                    value={state.isBeta}
                />
            </OptionGroup>
            {/* <OptionGroup>
                <div>
                    <Label>Timezone</Label>
                    <Description>
                        Update your current timezone. This will affect when
                        items appear in your custom lists as well as
                        notification times.
                    </Description>
                </div>
                <Dropdown
                    values={[
                        { key: 1, label: 'two' },
                        { key: 1, label: 'three' },
                        { key: 1, label: 'fifteen' }
                    ]}
                />
            </OptionGroup> */}
            <OptionGroup>
                <div>
                    <Label>Logout</Label>
                    <Description>
                        Clear your current session and return to login screen.
                    </Description>
                </div>
                <Button onClick={logout} color={'red'}>
                    Logout
                </Button>
            </OptionGroup>
        </Fragment>
    );
}

export default GeneralSettings;
