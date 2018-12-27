import React, { Component } from 'react';
import Button from '../../components/button';
import { Form, Label, Input } from '../../components/forms';
import { observer, inject } from 'mobx-react';
import styled from 'styled-components';
import ProfilePic from '../../components/profilePic';

const UserList = styled.ol`
    list-style: none;
    padding: 0;
    margin: 0 0 1rem;
    li {
        display: flex;
        align-items: center;
        padding: 1rem;
        border-radius: 1rem;
        ${ProfilePic} {
            margin-right: 1rem;
        }
        &:nth-of-type(odd) {
            background: #eee;
        }
    }
`;

@inject('store')
@observer
class ListMembers extends Component {
    constructor(props) {
        super(props);
        const currentList = this.props.store.currentList;
        this.state = {
            isSaving: false,
            isDeleting: false,
            isInvalid: false,
            serverError: null,
            members: currentList.members,
            title: currentList.title,
            color: currentList.color
        };
    }

    render() {
        return (
            <Form
                onSubmit={e => this.onSubmit(e)}
                errorMessage={this.state.serverError}
            >
                <Label>Existing Members</Label>
                <UserList>
                    {this.state.members.map((user, index) => (
                        <li key={index}>
                            <ProfilePic user={user} />
                            {user.firstName} {user.lastName}
                        </li>
                    ))}
                </UserList>
                <Label>Add Member</Label>
                <Input placeholder="Email" />
                <Button
                    loading={this.state.isSaving}
                    loadingText="Saving"
                    color={this.state.color}
                    type="Save"
                >
                    Save
                </Button>
            </Form>
        );
    }
}

export default ListMembers;
