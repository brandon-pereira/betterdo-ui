import { useState, Fragment, useCallback } from 'react';

import { OptionGroup, Description } from './General.styles';

import { timeZones } from '@utilities/timezones';
import Button from '@components/Button';
import { Label, Error } from '@components/Forms';
import Toggle from '@components/Toggle';
import useProfile from '@hooks/useProfile';
import useModifyProfile from '@hooks/useModifyProfile';
import useDarkMode from '@hooks/useDarkMode';
import Dropdown from '@components/Dropdown';
import { ServerError } from '@utilities/server';

function GeneralSettings() {
    const { logout, profile, loading } = useProfile();
    const modifyProfile = useModifyProfile();
    const [darkMode, doesPreferDarkMode] = useDarkMode();
    const [state, setState] = useState({
        isBeta: profile?.isBeta || false,
        isPushEnabled: profile?.isPushEnabled || false,
        timeZone: profile?.timeZone || ''
    });
    const [error, setError] = useState<string | null>(null);

    const onChange = useCallback(
        async (newState: Partial<typeof state>) => {
            setState(state => ({ ...state, ...newState }));
            try {
                await modifyProfile({
                    ...state,
                    ...newState
                });
            } catch (err) {
                if (err instanceof ServerError) {
                    setError(err.formattedMessage);
                } else {
                    setError(ServerError.defaultError);
                }
                return;
            }
        },
        [state, modifyProfile]
    );

    if (loading) {
        return <>Loading</>;
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
            <OptionGroup>
                <div>
                    <Label>Timezone</Label>
                    <Description>
                        This will determine what timezone to use when setting
                        due dates on tasks.
                    </Description>
                </div>
                <Dropdown
                    value={state.timeZone}
                    onSelect={v => {
                        onChange({ timeZone: v });
                    }}
                    values={timeZones.map(({ name, currentTimeFormat }) => ({
                        label: currentTimeFormat,
                        value: name
                    }))}
                />
            </OptionGroup>
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
