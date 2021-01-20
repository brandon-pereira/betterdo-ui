import React, { useCallback, useState } from 'react';
import Button from '../../components/Button';
import { Form, Label, Input } from '../../components/forms';
import styled from 'styled-components';
import ProfilePic, {
    FormatProfilePictureUrl
} from '../../components/profilePic';
import { COLORS } from '../../constants';
import useProfile from '@hooks/useProfile';
import useModifyProfile from '@hooks/useModifyProfile';

const ProfilePictureBanner = styled.div`
    position: relative;
    padding: 1rem 0;
    margin: 0 -1rem 1rem;
    display: flex;
    align-items: center;
    overflow: hidden;
    justify-content: center;
    border-radius: 1rem;
    &:before {
        content: '';
        background: ${COLORS.blue};
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
    }
    ${ProfilePic} {
        position: relative;
        z-index: 1;
        border: 2px solid #fff;
        box-shadow: 0 3px 5px rgba(0, 0, 0, 0.5);
    }
`;
const ProfilePictureBackground = styled.img`
    position: absolute;
    top: -5%;
    left: -5%;
    width: 110%;
    height: 110%;
    filter: blur(10px);
`;
const ButtonContainer = styled.div`
    display: flex;
    justify-content: space-between;
`;

function AccountSettings() {
    const { profile, logout, loading } = useProfile();
    const [state, setState] = useState({
        firstName: profile.firstName,
        lastName: profile.lastName,
        email: profile.email
    });
    const modifyProfile = useModifyProfile();
    const [isSaving, setSaving] = useState(false);
    const [error, setError] = useState(null);
    const [invalid, setInvalid] = useState(null);

    const onSubmit = useCallback(
        async e => {
            e.preventDefault();
            if (isSaving) {
                return;
            }
            if (validate()) {
                setSaving(true);
                setError(null);
                setInvalid(null);
                try {
                    await modifyProfile({
                        firstName: state.firstName,
                        lastName: state.lastName,
                        email: state.email
                    });
                } catch (err) {
                    setSaving(false);
                    setError(err.formattedMessage || err.message);
                    return;
                }
                setSaving(false);
            }
        },
        [isSaving, modifyProfile, state, validate]
    );

    const validate = useCallback(() => {
        if (!state.firstName) {
            setInvalid('firstName');
            return false;
        } else if (!state.email) {
            setInvalid('email');
            return false;
        }
        return true;
    }, [state]);

    if (loading) {
        return 'Loading';
    }
    return (
        <Form onSubmit={e => onSubmit(e)} errorMessage={error}>
            <ProfilePictureBanner>
                <ProfilePictureBackground
                    src={FormatProfilePictureUrl(profile.profilePicture)}
                />
                <ProfilePic size="8rem" user={profile} />
            </ProfilePictureBanner>
            <Label htmlFor="firstName">First Name</Label>
            <Input
                value={state.firstName}
                name="firstName"
                id="firstName"
                invalid={Boolean(invalid === 'firstName')}
                onChange={evt =>
                    setState(state => ({
                        ...state,
                        firstName: evt.target.value
                    }))
                }
                placeholder="John"
            />
            <Label htmlFor="lastName">Last Name</Label>
            <Input
                value={state.lastName}
                name="lastName"
                id="lastName"
                invalid={Boolean(invalid === 'lastName')}
                onChange={evt =>
                    setState(state => ({
                        ...state,
                        lastName: evt.target.value
                    }))
                }
                placeholder="Doe"
            />
            <Label htmlFor="email">Email</Label>
            <Input
                value={state.email}
                name="email"
                id="email"
                invalid={Boolean(invalid === 'email')}
                onChange={evt =>
                    setState(state => ({
                        ...state,
                        email: evt.target.value
                    }))
                }
                placeholder="hello@world.com"
            />
            <ButtonContainer>
                <Button isLoading={isSaving} loadingText="Saving" type="Save">
                    Save
                </Button>
                <Button onClick={logout} color={COLORS.red}>
                    Logout
                </Button>
            </ButtonContainer>
        </Form>
    );
}

export default AccountSettings;
