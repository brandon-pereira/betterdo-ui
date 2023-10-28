import { Fragment, useCallback, useEffect, useState } from 'react';
import randomColor from 'randomcolor';
import { styled, useTheme } from 'styled-components';

import Button from '@components/Button';
import { Body, Header } from '@components/Copy';
import { Form, Label, Input } from '@components/Forms';
import ColorPicker from '@components/ColorPicker';
import useCreateList from '@hooks/useCreateList';
import { ServerError } from '@utilities/server';
import { checkIfColorGoodContrast } from '@utilities/colors';

const ButtonContainer = styled.div`
    margin-top: 1.5rem;
`;

export interface AddListModalProps {
    onLoad: () => void;
}

function AddListModalContent({ onLoad }: AddListModalProps) {
    const [isSubmitting, setSubmitting] = useState(false);
    const [isInvalid, setInvalid] = useState(false);
    const [error, setError] = useState<string | false>(false);
    const [title, setTitle] = useState('');
    const [color, setColor] = useState(randomColor());
    const createList = useCreateList();
    const theme = useTheme();
    const isColorGoodContrast = checkIfColorGoodContrast(
        color,
        theme.colors.modals.contentBackground
    );

    useEffect(() => {
        if (onLoad && typeof onLoad === 'function') {
            onLoad();
        }
    }, [onLoad]);

    const onSubmit = useCallback(
        async (e: React.FormEvent<HTMLFormElement>) => {
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
                    if (err instanceof ServerError) {
                        setError(err.formattedMessage);
                    }
                    setInvalid(true);
                    return;
                }
                setSubmitting(false);
            } else {
                setInvalid(true);
            }
        },
        [isSubmitting, color, createList, title]
    );

    return (
        <Fragment>
            <Header color={isColorGoodContrast ? color : undefined}>
                Create List
            </Header>
            <Body>
                Lists allow you to organize your tasks with even more detail.
                You can create lists for almost anything.
            </Body>
            <Form
                errorMessage={error ? error : undefined}
                onSubmit={e => onSubmit(e)}
            >
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
                    value={color}
                    onChange={color => {
                        setColor(color);
                    }}
                />
                <ButtonContainer>
                    <Button
                        type="submit"
                        loadingText="Creating"
                        isLoading={isSubmitting}
                        color={isColorGoodContrast ? color : undefined}
                    >
                        Create
                    </Button>
                </ButtonContainer>
            </Form>
        </Fragment>
    );
}

export default AddListModalContent;
