import React, { useState, useCallback } from 'react';
import { Container, Input } from './styles';

const AddTask = function({ createTask, hidden }) {
    const [value, setValue] = useState('');
    const [invalid, setInvalid] = useState(false);
    // const [submitting, setSubmitting] = useState(false);

    const onSubmit = useCallback(
        async e => {
            e.preventDefault();
            const title = value;
            if (!title) {
                setInvalid(true);
                return;
            }
            setInvalid(false);
            // setSubmitting(true);
            setValue('');
            console.log(title);
            try {
                await createTask(title);
            } catch (err) {
                console.error(err);
            }
            console.log('HERE');
            // setInvalid(false);
            // setSubmitting(false);
        },
        [value, createTask]
    );

    const onChange = useCallback(e => {
        const value = e.target.value;
        setValue(value);
        setInvalid(!value);
    }, []);

    return (
        <Container hidden={hidden} onSubmit={onSubmit}>
            <Input
                invalid={invalid}
                value={value}
                onChange={onChange}
                placeholder="Add Task"
            />
        </Container>
    );
};

export default AddTask;
