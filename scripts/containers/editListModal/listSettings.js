import React, { useState, useCallback } from 'react';
import Button from '@components/Button';
import { Form, Label, Input } from '@components/forms';
import ColorPicker from '@components/colorPicker';
import styled from 'styled-components';
import { COLORS } from '../../constants';
import useCurrentListId from '@hooks/useCurrentListId';
import useModifyList from '@hooks/useModifyList';
import useListDetails from '@hooks/useListDetails';

const ButtonContainer = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 1.5rem;
`;

//     async deleteList() {
//         const result = confirm(
//             `Are you sure you want to delete the list "${this.state.title}"? This can't be undone.`
//         );
//         if (result) {
//             this.setState({ isDeleting: true, isInvalid: false });
//             try {
//                 await this.props.store.deleteList(this.props.currentList._id);
//             } catch (err) {
//                 this.setState({
//                     isDeleting: false,
//                     serverError: err.formattedMessage
//                 });
//                 return;
//             }
//             if (this.props.closeModal) {
//                 this.props.closeModal();
//             }
//         }
//     }

function ListSettings({ setUnsavedChanges, onRequestClose }) {
    const currentListId = useCurrentListId();
    const { list } = useListDetails(currentListId);
    const [isSaving, setSaving] = useState(false);
    const modifyList = useModifyList();
    const [isDeleting, setDeleting] = useState(false);
    const [isInvalid, setInvalid] = useState(false);
    const [error, setError] = useState(null);
    const [state, setState] = useState({
        title: list.title,
        color: list.color
    });

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
                    console.log('ERR', err);
                    setError(err.formattedMessage);
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
                    setUnsavedChanges(true);
                    setState(state => ({ ...state, title: evt.target.value }));
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
                    onClick={() => this.deleteList()}
                    color={COLORS.red}
                    type="button"
                >
                    Delete
                </Button>
            </ButtonContainer>
        </Form>
    );
}

export default ListSettings;
