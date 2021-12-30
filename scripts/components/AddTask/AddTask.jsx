import React, { useState, useCallback, useRef } from 'react';

import { Container, Input } from './AddTask.styles.js';

import useCreateTask from '@hooks/useCreateTask';
import useCurrentListId from '@hooks/useCurrentListId';

const AddTask = function ({ hidden }) {
    const currentListId = useCurrentListId();
    const [invalid, setInvalid] = useState(false);
    const createTask = useCreateTask();
    const inputRef = useRef();

    const onSubmit = useCallback(
        async e => {
            e.preventDefault();
            const title = inputRef.current.value;
            if (!title) {
                setInvalid(true);
                return;
            }
            inputRef.current.value = '';
            try {
                await createTask(currentListId, title);
            } catch (err) {
                console.error(err);
                // restore title for easy re-adding
                inputRef.current.value = title;
                setInvalid(true);
            }
            setInvalid(false);
        },
        [currentListId, createTask]
    );

    return (
        <Container isHidden={hidden} onSubmit={onSubmit}>
            <Input
                ref={inputRef}
                invalid={invalid}
                disabled={hidden}
                placeholder="Add Task"
            />
        </Container>
    );
};

export default AddTask;
