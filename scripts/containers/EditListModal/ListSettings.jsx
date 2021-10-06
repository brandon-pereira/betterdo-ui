import React, { useState, useCallback } from 'react';
import styled from 'styled-components';

import Button from '@components/Button';
import { Form, Label, Input } from '@components/Forms';
import ColorPicker from '@components/ColorPicker';
import useCurrentListId from '@hooks/useCurrentListId';
import useModifyList from '@hooks/useModifyList';
import useListDetails from '@hooks/useListDetails';
import useDeleteList from '@hooks/useDeleteList';

const ButtonContainer = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 1.5rem;
`;

function ListSettings({ setUnsavedChanges, onRequestClose }) {
    const currentListId = useCurrentListId();
    const { list } = useListDetails(currentListId);
    const [isSaving, setSaving] = useState(false);
    const modifyList = useModifyList();
    const _deleteList = useDeleteList();
    const [isDeleting, setDeleting] = useState(false);
    const [isInvalid, setInvalid] = useState(false);
    const [error, setError] = useState(null);
    const [state, setState] = useState({
        title: list.title,
        color: list.color
    });

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
                setError(err.formattedMessage || 'Unexpected Error');
                setDeleting(false);
                return;
            }
        }
    }, [_deleteList, currentListId, state.title]);

    const onSubmit = useCallback(
        async e => {
            e.preventDefault();
            if (isSaving || isDeleting) {
                return;
            }
            if (state.title && state.title.length) {
                setSaving(true);
                setInvalid(false);
                setError(false);
                try {
                    await modifyList(currentListId, state);
                } catch (err) {
                    console.error(err);
                    setError(err.formattedMessage || 'Unexpected Error');
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
                currentColor={state.color}
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
