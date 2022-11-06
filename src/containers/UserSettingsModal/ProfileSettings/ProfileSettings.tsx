import { useCallback, useState } from 'react';

import {
    ButtonContainer,
    ProfilePictureBackground,
    ProfilePictureBanner
} from './ProfileSettings.styles';

import Button from '@components/Button';
import { Form, Label, Input } from '@components/Forms';
import ProfilePic, { FormatProfilePictureUrl } from '@components/ProfilePic';
import useProfile from '@hooks/useProfile';
import useModifyProfile from '@hooks/useModifyProfile';
import { ServerError } from '@utilities/server';

function ProfileSettings() {
    const { profile, logout, loading } = useProfile();
    const [state, setState] = useState({
        firstName: profile?.firstName || '',
        lastName: profile?.lastName || '',
        email: profile?.email || ''
    });
    const modifyProfile = useModifyProfile();
    const [isSaving, setSaving] = useState(false);
    const [error, setError] = useState<string | undefined>(undefined);
    const [invalid, setInvalid] = useState<keyof typeof state | null>(null);

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

    const onSubmit = useCallback(
        async (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            if (isSaving) {
                return;
            }
            if (validate()) {
                setSaving(true);
                setError(undefined);
                setInvalid(null);
                try {
                    await modifyProfile({
                        firstName: state.firstName,
                        lastName: state.lastName,
                        email: state.email
                    });
                } catch (err) {
                    setSaving(false);
                    if (err instanceof ServerError) {
                        setError(err.formattedMessage);
                    } else {
                        setError(ServerError.defaultError);
                    }
                    return;
                }
                setSaving(false);
            }
        },
        [isSaving, modifyProfile, state, validate]
    );

    if (loading) {
        return <>Loading</>;
    }
    return (
        <Form onSubmit={onSubmit} errorMessage={error}>
            <ProfilePictureBanner>
                <ProfilePictureBackground
                    src={FormatProfilePictureUrl(profile?.profilePicture)}
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
                <Button isLoading={isSaving} loadingText="Saving" type="submit">
                    Save
                </Button>
                <Button onClick={logout} color={'red'}>
                    Logout
                </Button>
            </ButtonContainer>
        </Form>
    );
}

export default ProfileSettings;
