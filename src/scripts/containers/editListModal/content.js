import React, { Fragment, Component } from 'react';
import Button from '../../components/button';
import { Header } from '../../components/copy';
import { Form, Label, Input } from '../../components/forms';
import ColorPicker from '../../components/colorPicker';
import { observer, inject } from 'mobx-react';
import styled from 'styled-components';

const ButtonContainer = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 1.5rem;
`;

@inject('store')
@observer
export default class EditListModalContent extends Component {
    constructor(props) {
        super(props);
        const currentList = this.props.store.currentList;
        this.state = {
            submitting: false,
            isInvalid: false,
            serverError: null,
            title: currentList.title,
            color: currentList.color
        };
    }

    async deleteList() {
        this.setState({ submitting: true, isInvalid: false });
        await this.props.store.deleteList(this.props.store.currentList._id);
        this.setState({ submitting: false });
    }

    async onSubmit(e) {
        e.preventDefault();
        if (this.state.submitting) {
            return;
        }
        const store = this.props.store;
        if (this.state.title && this.state.title.length) {
            this.setState({ submitting: true, isInvalid: false });
            try {
                await store.updateList(store.currentList._id, {
                    title: this.state.title,
                    color: this.state.color
                });
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
                <Header>Edit List</Header>
                <Form
                    onSubmit={e => this.onSubmit(e)}
                    errorMessage={this.state.serverError}
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
                            loading={this.state.submitting}
                            color={this.state.color}
                            type="submit"
                        >
                            Modify
                        </Button>
                        <Button
                            loading={this.state.submitting}
                            color={this.state.color}
                            onClick={() => this.deleteList()}
                            type="button"
                        >
                            Delete
                        </Button>
                    </ButtonContainer>
                </Form>
            </Fragment>
        );
    }
}
