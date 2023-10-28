import { useState, useCallback, useRef } from 'react';

import { Container, Input } from './AddTask.styles';

import useCreateTask from '@hooks/useCreateTask';
import useCurrentListId from '@hooks/useCurrentListId';

interface Props {
    isHidden: boolean;
    isAbsolute: boolean;
}

const AddTask = function ({ isHidden, isAbsolute }: Props) {
    const currentListId = useCurrentListId();
    const [invalid, setInvalid] = useState(false);
    const createTask = useCreateTask();
    const inputRef = useRef<HTMLInputElement>(null);

    const onSubmit = useCallback(
        async (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            const title = inputRef.current?.value;
            if (!title || !inputRef.current) {
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
        <Container
            $isAbsolute={isAbsolute}
            $isHidden={isHidden}
            onSubmit={onSubmit}
        >
            <Input
                ref={inputRef}
                invalid={invalid}
                disabled={isHidden}
                placeholder="Add Task"
            />
        </Container>
    );
};

export default AddTask;
