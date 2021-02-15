import React, { useState, Fragment, useCallback } from 'react';
import Button from '@components/Button';
import { Label, Error } from '@components/forms';
import Toggle from '@components/toggle';
import styled from 'styled-components';
import { COLORS } from '../../constants';
import useProfile from '@hooks/useProfile';
import useModifyProfile from '@hooks/useModifyProfile';

const OptionGroup = styled.div`
    display: flex;
    align-items: center;
    padding: 1rem;
    margin: 0 -1rem;
    &:first-of-type {
        padding-top: 0.5rem;
    }
    &:nth-of-type(even) {
        background: #eee;
    }
    > div {
        flex: 1;
        margin-right: 1rem;
    }
`;

const Description = styled.p`
    margin-top: -0.2rem;
    font-size: 0.9rem;
`;

function GeneralSettings() {
    const { logout, profile, loading } = useProfile();
    const modifyProfile = useModifyProfile();
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
                    checked={state.isPushEnabled}
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
                    checked={state.isBeta}
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
                <Button onClick={logout} color={COLORS.red}>
                    Logout
                </Button>
            </OptionGroup>
        </Fragment>
    );
}

export default GeneralSettings;
