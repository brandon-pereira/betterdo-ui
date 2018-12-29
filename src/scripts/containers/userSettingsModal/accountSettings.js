import React, { Component } from 'react';
import Button from '../../components/button';
import { Form, Label, Input } from '../../components/forms';
import { observer, inject } from 'mobx-react';
import styled from 'styled-components';
import ProfilePic, {
    FormatProfilePictureUrl
} from '../../components/profilePic';
import { COLORS } from '../../constants';

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

@inject('store')
@observer
class ListMembers extends Component {
    constructor(props) {
        super(props);
        const user = this.props.store.user;
        this.state = {
            isSaving: false,
            isInvalid: false,
            serverError: null,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email
        };
    }

    render() {
        const user = this.props.store.user;
        return (
            <Form onSubmit={e => this.onSubmit(e)}>
                {/* // errorMessage={this.state.serverError} */}
                <ProfilePictureBanner>
                    <ProfilePictureBackground
                        src={FormatProfilePictureUrl(user.profilePicture)}
                    />
                    <ProfilePic size="8rem" user={user} />
                </ProfilePictureBanner>
                <Label>First Name</Label>
                <Input value={this.state.firstName} placeholder="John" />
                <Label>Last Name</Label>
                <Input value={this.state.lastName} placeholder="Doe" />
                <Label>Email</Label>
                <Input value={this.state.email} placeholder="hello@world.com" />
                <Button
                    loading={this.state.isSaving}
                    loadingText="Saving"
                    type="Save"
                >
                    Save
                </Button>
            </Form>
        );
    }
}

export default ListMembers;
