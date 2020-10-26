import React, { Fragment, Component } from 'react';
import randomColor from 'randomcolor';
import Button from '../../components/Button';
import { Body, Header } from '../../components/copy';
import { Form, Label, Input } from '../../components/forms';
import ColorPicker from '../../components/colorPicker';
import { observer, inject } from 'mobx-react';
import styled from 'styled-components';

const ButtonContainer = styled.div`
    margin-top: 1.5rem;
`;

class AddListModalContent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            submitting: false,
            isInvalid: false,
            serverError: null,
            title: '',
            color: randomColor()
        };
    }

    componentDidMount() {
        if (this.props.onLoad && typeof this.props.onLoad === 'function') {
            this.props.onLoad();
        }
    }

    randomizeColor() {
        this.setState({ color: randomColor() });
    }

    async onSubmit(e) {
        e.preventDefault();
        if (this.state.submitting) {
            return;
        }
        const state = this.props.store;
        if (this.state.title && this.state.title.length) {
            this.setState({ submitting: true, isInvalid: false });
            try {
                await state.createList(this.state.title, this.state.color);
            } catch (err) {
                this.setState({
                    submitting: false,
                    serverError: err.formattedMessage
                });
                return;
            }
            this.setState({ submitting: false });
            if (this.props.closeModal) {
                this.props.closeModal();
            }
        } else {
            this.setState({ isInvalid: true });
        }
    }

    render() {
        return (
            <Fragment>
                <Header color={this.state.color}>Create List</Header>
                <Body>
                    Lists allow you to organize your tasks with even more
                    detail. You can create lists for almost anything.
                </Body>
                <Form
                    errorMessage={this.state.serverError}
                    onSubmit={e => this.onSubmit(e)}
                >
                    <Label htmlFor="name">List Name</Label>
                    <Input
                        value={this.state.title}
                        name="name"
                        id="name"
                        invalid={Boolean(this.state.isInvalid)}
                        onChange={evt =>
                            this.setState({ title: evt.target.value })
                        }
                        placeholder="ex. Groceries"
                    />
                    <ColorPicker
                        currentColor={this.state.color}
                        onChange={color => {
                            this.setState({ color });
                        }}
                    />
                    <ButtonContainer>
                        <Button
                            type="submit"
                            loadingText="Creating"
                            isLoading={this.state.submitting}
                            color={this.state.color}
                        >
                            Create
                        </Button>
                    </ButtonContainer>
                </Form>
            </Fragment>
        );
    }
}

export default AddListModalContent;
