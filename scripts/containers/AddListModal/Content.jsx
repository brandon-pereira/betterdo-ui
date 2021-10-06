import React, { Fragment, useCallback, useEffect, useState } from 'react';
import randomColor from 'randomcolor';
import styled from 'styled-components';

import Button from '@components/Button';
import { Body, Header } from '@components/Copy';
import { Form, Label, Input } from '@components/Forms';
import ColorPicker from '@components/ColorPicker';
import useCreateList from '@hooks/useCreateList';

const ButtonContainer = styled.div`
    margin-top: 1.5rem;
`;

function AddListModalContent({ onRequestClose, onLoad }) {
    const [isSubmitting, setSubmitting] = useState(false);
    const [isInvalid, setInvalid] = useState(false);
    const [error, setError] = useState(false);
    const [title, setTitle] = useState('');
    const [color, setColor] = useState(randomColor());
    const createList = useCreateList();

    useEffect(() => {
        if (onLoad && typeof onLoad === 'function') {
            onLoad();
        }
    }, [onLoad]);

    const onSubmit = useCallback(
        async e => {
            e.preventDefault();
            if (isSubmitting) {
                return;
            }
            if (title && title.length) {
                setSubmitting(true);
                setInvalid(false);
                try {
                    await createList(title, color);
                } catch (err) {
                    console.error(err);
                    setSubmitting(false);
                    setError(err.formattedMessage || 'Unexpected Error');
                    setInvalid(true);
                    return;
                }
                setSubmitting(false);
                if (onRequestClose) {
                    onRequestClose();
                }
            } else {
                setInvalid(true);
            }
        },
        [isSubmitting, color, createList, onRequestClose, title]
    );

    return (
        <Fragment>
            <Header color={color}>Create List</Header>
            <Body>
                Lists allow you to organize your tasks with even more detail.
                You can create lists for almost anything.
            </Body>
            <Form errorMessage={error} onSubmit={e => onSubmit(e)}>
                <Label htmlFor="name">List Name</Label>
                <Input
                    value={title}
                    name="name"
                    id="name"
                    invalid={Boolean(isInvalid)}
                    onChange={evt => setTitle(evt.target.value)}
                    placeholder="ex. Groceries"
                />
                <ColorPicker
                    currentColor={color}
                    onChange={color => {
                        setColor(color);
                    }}
                />
                <ButtonContainer>
                    <Button
                        type="submit"
                        loadingText="Creating"
                        isLoading={isSubmitting}
                        color={color}
                    >
                        Create
                    </Button>
                </ButtonContainer>
            </Form>
        </Fragment>
    );
}

export default AddListModalContent;
