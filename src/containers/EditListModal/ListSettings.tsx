import { useState, useCallback, useEffect } from 'react';
import { styled } from 'styled-components';

import Button from '@components/Button';
import { Form, Label, Input } from '@components/Forms';
import ColorPicker from '@components/ColorPicker';
import useCurrentListId from '@hooks/useCurrentListId';
import useModifyList from '@hooks/useModifyList';
import useListDetails from '@hooks/useListDetails';
import useDeleteList from '@hooks/useDeleteList';
import { ServerError } from '@utilities/server';

const ButtonContainer = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 1.5rem;
`;

interface Props {
    setUnsavedChanges: (bool: boolean) => void;
    onRequestClose: () => void;
}
function ListSettings({ setUnsavedChanges, onRequestClose }: Props) {
    const currentListId = useCurrentListId();
    const { list } = useListDetails(currentListId);
    const [isSaving, setSaving] = useState(false);
    const modifyList = useModifyList();
    const _deleteList = useDeleteList();
    const [isDeleting, setDeleting] = useState(false);
    const [isInvalid, setInvalid] = useState(false);
    const [error, setError] = useState<string | undefined>();
    const [state, setState] = useState({
        title: list.title,
        color: list.color
    });

    useEffect(() => {
        setState({
            title: list.title,
            color: list.color
        });
    }, [list]);

    const deleteList = useCallback(async () => {
        const result = confirm(
            `Are you sure you want to delete the list "${state.title}"? This can't be undone.`
        );
        if (result) {
            setDeleting(true);
            setInvalid(false);
            try {
                await _deleteList(currentListId);
            } catch (err) {
                console.error(err);
                if (err instanceof ServerError) {
                    setError(err.formattedMessage);
                } else {
                    setError(ServerError.defaultError);
                }
                setDeleting(false);
                return;
            }
        }
    }, [_deleteList, currentListId, state.title]);

    const onSubmit = useCallback(
        async (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            if (isSaving || isDeleting) {
                return;
            }
            if (state.title && state.title.length) {
                setSaving(true);
                setInvalid(false);
                setError(undefined);
                try {
                    await modifyList(currentListId, state);
                } catch (err) {
                    console.error(err);
                    if (err instanceof ServerError) {
                        setError(err.formattedMessage);
                    } else {
                        setError(ServerError.defaultError);
                    }
                    setSaving(false);
                    return;
                }
                setSaving(false);
                setUnsavedChanges(false);
                if (onRequestClose) {
                    onRequestClose();
                }
            } else {
                setInvalid(true);
            }
        },
        [
            onRequestClose,
            setUnsavedChanges,
            isSaving,
            currentListId,
            state,
            modifyList,
            isDeleting
        ]
    );

    return (
        <Form onSubmit={onSubmit} errorMessage={error}>
            <Label htmlFor="name">List Name</Label>
            <Input
                value={state.title}
                name="name"
                id="name"
                invalid={isInvalid}
                onChange={evt => {
                    const title = evt.target.value;
                    setUnsavedChanges(true);
                    setState(state => ({ ...state, title }));
                }}
                placeholder="ex. Groceries"
            />
            <ColorPicker
                value={state.color}
                onChange={color => {
                    setUnsavedChanges(true);
                    setState(state => ({ ...state, color }));
                }}
            />
            <ButtonContainer>
                <Button
                    isLoading={isSaving}
                    loadingText="Saving"
                    color={state.color}
                    type="submit"
                >
                    Save
                </Button>
                <Button
                    isLoading={isDeleting}
                    loadingText="Deleting"
                    onClick={deleteList}
                    color={'red'}
                    type="button"
                >
                    Delete
                </Button>
            </ButtonContainer>
        </Form>
    );
}

export default ListSettings;
