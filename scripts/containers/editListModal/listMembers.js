import React, { Component } from 'react';
import styled from 'styled-components';

import Button from '@components/Button';
import { Form, Label, Input } from '@components/forms';
import ProfilePic from '@components/profilePic';

const UserList = styled.ol`
    list-style: none;
    padding: 0;
    margin: 0 0 1rem;
    max-height: 12.5rem;
    overflow-y: scroll;
`;
const Owner = styled.div`
    color: grey;
    text-transform: uppercase;
    font-weight: bold;
    &:before {
        content: 'OWNER';
    }
`;
const UsersName = styled.div`
    flex: 1;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
`;

const User = styled.li`
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
`;

class ListMembers extends Component {
    constructor(props) {
        super(props);
        const currentList = this.props.currentList;
        this.state = {
            isAdding: false,
            isInvalid: false,
            serverError: null,
            owner: currentList.owner,
            members: currentList.members,
            input: '',
            color: currentList.color
        };
    }

    async onSubmit(e) {
        e.preventDefault();
        // Validate
        if (!this.state.input) {
            this.setState({ isInvalid: true });
            return;
        }
        // Update UI to loading state
        this.setState({ isAdding: true, isInvalid: false, serverError: null });
        // Get user details from server
        try {
            // See if member exists
            const user = await this.props.store.getUser(this.state.input);
            // Clone members array, add new member
            const members = Array.from(this.state.members);
            members.push(user);
            // Update the list with the new member
            const updatedList = await this.props.store.updateList(
                this.props.currentList._id,
                {
                    members: members.map(m => m._id)
                }
            );
            // Update UI with response from server
            this.setState({
                members: updatedList.members,
                isAdding: false,
                isInvalid: false,
                serverError: null
            });
        } catch (err) {
            console.log(err);
            this.setState({
                isAdding: false,
                isInvalid: true,
                serverError: err.formattedMessage
            });
            return;
        }
    }

    async removeMember(_id) {
        // // Temporarily update UI while request sends
        const members = this.state.members.filter(member => member._id !== _id);
        this.setState({ members });
        // Make actual request
        const updatedList = await this.props.store.updateList(
            this.props.currentList._id,
            {
                members: members.map(m => m._id)
            }
        );
        // Update UI with response from server
        this.setState({
            members: updatedList.members
        });
    }

    render() {
        return (
            <Form
                onSubmit={e => this.onSubmit(e)}
                errorMessage={this.state.serverError}
            >
                <Label>Current Members</Label>
                <UserList>
                    {this.state.members.map((user, index) => (
                        <User key={index}>
                            <ProfilePic user={user} />
                            <UsersName>
                                {user.firstName} {user.lastName}
                            </UsersName>
                            {user._id === this.state.owner ? (
                                <Owner />
                            ) : (
                                <Button
                                    onClick={() => this.removeMember(user._id)}
                                >
                                    Remove
                                </Button>
                            )}
                        </User>
                    ))}
                </UserList>
                <Label htmlFor="email">Add Member</Label>
                <Input
                    value={this.state.input}
                    name="email"
                    id="email"
                    invalid={Boolean(this.state.isInvalid)}
                    onChange={evt => this.setState({ input: evt.target.value })}
                    placeholder="hello@world.com"
                />
                <Button
                    isLoading={this.state.isAdding}
                    loadingText="Adding"
                    color={this.props.currentList.color}
                    type="submit"
                >
                    Add
                </Button>
            </Form>
        );
    }
}

export default ListMembers;
