import React, { Component, useCallback, useState } from 'react';
import Button from '../../components/Button';
import { Form, Label, Input } from '../../components/forms';
import styled from 'styled-components';
import ProfilePic, {
    FormatProfilePictureUrl
} from '../../components/profilePic';
import { COLORS } from '../../constants';
import useProfile from '@hooks/useProfile';

const ProfilePictureBanner = styled.div`
    position: relative;
    padding: 1rem 0;
    margin: 0 -1rem 1rem;
    display: flex;
    align-items: center;
    overflow: hidden;
    justify-content: center;
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
class ListMembers extends Component {
    constructor(props) {
        super(props);
        const user = this.props.store.user;
        this.state = {
            isSaving: false,
            isInvalid: null,
            serverError: null,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email
        };
    }

    validate() {
        if (!this.state.firstName) {
            this.setState({ isInvalid: 'firstName' });
            return false;
        } else if (!this.state.email) {
            this.setState({ isInvalid: 'email' });
            return false;
        }
        return true;
    }

    async onSubmit(e) {
        e.preventDefault();
        if (this.state.isSaving) {
            return;
        }
        if (this.validate()) {
            this.setState({
                isSaving: true,
                isInvalid: null,
                serverError: null
            });
            const store = this.props.store;
            try {
                await store.updateUser({
                    firstName: this.state.firstName,
                    lastName: this.state.lastName,
                    email: this.state.email
                });
            } catch (err) {
                this.setState({
                    isSaving: false,
                    serverError: err.formattedMessage
                });
                return;
            }
            this.setState({ isSaving: false });
        }
    }

    logout() {
        if (window) {
            window.location.href = `${process.env.ROOT_APP_DIR}auth/logout`;
        }
    }

    render() {
        const user = this.props.store.user;
        return (
            <Form
                onSubmit={e => this.onSubmit(e)}
                errorMessage={this.state.serverError}
            >
                <ProfilePictureBanner>
                    <ProfilePictureBackground
                        src={FormatProfilePictureUrl(user.profilePicture)}
                    />
                    <ProfilePic size="8rem" user={user} />
                </ProfilePictureBanner>
                <Label htmlFor="firstName">First Name</Label>
                <Input
                    value={this.state.firstName}
                    name="firstName"
                    id="firstName"
                    invalid={Boolean(this.state.isInvalid === 'firstName')}
                    onChange={evt =>
                        this.setState({ firstName: evt.target.value })
                    }
                    placeholder="John"
                />
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                    value={this.state.lastName}
                    name="lastName"
                    id="lastName"
                    invalid={Boolean(this.state.isInvalid === 'lastName')}
                    onChange={evt =>
                        this.setState({ lastName: evt.target.value })
                    }
                    placeholder="Doe"
                />
                <Label htmlFor="email">Email</Label>
                <Input
                    value={this.state.email}
                    name="email"
                    id="email"
                    invalid={Boolean(this.state.isInvalid === 'email')}
                    onChange={evt => this.setState({ email: evt.target.value })}
                    placeholder="hello@world.com"
                />
                <ButtonContainer>
                    <Button
                        isLoading={this.state.isSaving}
                        loadingText="Saving"
                        type="Save"
                    >
                        Save
                    </Button>
                    <Button onClick={() => this.logout()} color={COLORS.red}>
                        Logout
                    </Button>
                </ButtonContainer>
            </Form>
        );
    }
}

function AccountSettings() {
    const { profile, logout, loading } = useProfile();
    const [state, setState] = useState({
        firstName: profile.firstName,
        lastName: profile.lastName,
        email: profile.email
    });
    const [error, setError] = useState(null);

    const onSubmit = useCallback(() => {
        console.log('on sobmit');
    }, []);
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
                invalid={Boolean(state.isInvalid === 'firstName')}
                onChange={evt => setState({ firstName: evt.target.value })}
                placeholder="John"
            />
            <Label htmlFor="lastName">Last Name</Label>
            <Input
                value={state.lastName}
                name="lastName"
                id="lastName"
                invalid={Boolean(state.isInvalid === 'lastName')}
                onChange={evt => setState({ lastName: evt.target.value })}
                placeholder="Doe"
            />
            <Label htmlFor="email">Email</Label>
            <Input
                value={state.email}
                name="email"
                id="email"
                invalid={Boolean(state.isInvalid === 'email')}
                onChange={evt => setState({ email: evt.target.value })}
                placeholder="hello@world.com"
            />
            <ButtonContainer>
                <Button
                    isLoading={state.isSaving}
                    loadingText="Saving"
                    type="Save"
                >
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
