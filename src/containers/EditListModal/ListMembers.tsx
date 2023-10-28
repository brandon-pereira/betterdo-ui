import { useState, useCallback } from 'react';
import { styled } from 'styled-components';

import Button from '@components/Button';
import { Form, Label, Input } from '@components/Forms';
import ProfilePic from '@components/ProfilePic';
import useCurrentListId from '@hooks/useCurrentListId';
import useListDetails from '@hooks/useListDetails';
import { getUserByEmail, ServerError } from '@utilities/server';
import useModifyList from '@hooks/useModifyList';

const UserList = styled.ol`
    list-style: none;
    padding: 0;
    margin: 0 0 1rem;
    max-height: 12.5rem;
    overflow-y: auto;
`;
const Owner = styled.div`
    color: ${({ theme }) => theme.colors.body.color};
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
    color: ${({ theme }) => theme.colors.body.color};
    ${ProfilePic} {
        margin-right: 1rem;
    }
    &:nth-of-type(odd) {
        background: ${({ theme }) =>
            theme.colors.modals.listViewAlternateBackground};
    }
`;

function ListMembers() {
    const [loading, setLoading] = useState(false);
    const [isInvalid, setInvalid] = useState(false);
    const [error, setError] = useState<string | undefined>();
    const [input, setInput] = useState('');
    const currentListId = useCurrentListId();
    const modifyList = useModifyList();
    const { list } = useListDetails(currentListId);
    const [members, setMembers] = useState(list.members!);

    const removeMember = useCallback(
        async (_id: string) => {
            // Temporarily update UI while request sends
            const _members = members.filter(member => member._id !== _id);
            setMembers(_members);
            // Make actual request
            await modifyList(currentListId, {
                members: _members
            });
        },
        [members, currentListId, modifyList]
    );
    const onSubmit = useCallback(
        async (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            // Validate
            if (!input) {
                setInvalid(true);
                return;
            }
            // Update UI to loading state
            setLoading(true);
            setInvalid(false);
            setError(undefined);
            // Get user details from server
            try {
                // See if member exists
                const user = await getUserByEmail(input);
                if (members.find(m => m._id === user._id)) {
                    setLoading(false);
                    setInvalid(true);
                    setError('User already exists on list');
                    return;
                }
                // Clone members array, add new member
                // const _members = new Set(members);
                members.push(user);
                setMembers(members);
                // Update the list with the new member
                modifyList(currentListId, {
                    members
                });
                // Update UI with response from server
                setLoading(false);
                setInvalid(false);
                setError(undefined);
            } catch (err) {
                console.error(err);
                setLoading(false);
                setInvalid(true);
                if (err instanceof ServerError) {
                    setError(err.formattedMessage);
                } else {
                    setError(ServerError.defaultError);
                }
                return;
            }
        },
        [members, currentListId, modifyList, input]
    );

    return (
        <Form onSubmit={e => onSubmit(e)} errorMessage={error}>
            <Label>Current Members</Label>
            <UserList>
                {list.members?.map((user, index) => (
                    <User key={index}>
                        <ProfilePic user={user} />
                        <UsersName>
                            {user.firstName} {user.lastName}
                        </UsersName>
                        {user._id === list.owner ? (
                            <Owner />
                        ) : (
                            <Button onClick={() => removeMember(user._id)}>
                                Remove
                            </Button>
                        )}
                    </User>
                ))}
            </UserList>
            <Label htmlFor="email">Add Member</Label>
            <Input
                value={input}
                name="email"
                id="email"
                invalid={Boolean(isInvalid)}
                onChange={evt => setInput(evt.target.value)}
                placeholder="hello@world.com"
            />
            <Button
                isLoading={loading}
                loadingText="Adding"
                color={list.color}
                type="submit"
            >
                Add
            </Button>
        </Form>
    );
}

export default ListMembers;
