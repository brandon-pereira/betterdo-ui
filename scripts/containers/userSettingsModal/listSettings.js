import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import styled from 'styled-components';

import Button from '@components/Button';
import { Form, Label, Input } from '@components/forms';
import ColorPicker from '@components/colorPicker';

import { COLORS } from '../../constants';

const ButtonContainer = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 1.5rem;
`;

class ListSettings extends Component {
    constructor(props) {
        super(props);
        const currentList = this.props.store.currentList;
        this.state = {
            isSaving: false,
            isDeleting: false,
            isInvalid: false,
            serverError: null,
            members: currentList.members,
            title: currentList.title,
            color: currentList.color
        };
    }

    async deleteList() {
        const result = confirm(
            `Are you sure you want to delete the list "${this.state.title}"? This can't be undone.`
        );
        if (result) {
            this.setState({ isDeleting: true, isInvalid: false });
            try {
                await this.props.store.deleteList(
                    this.props.store.currentList._id
                );
            } catch (err) {
                this.setState({
                    isDeleting: false,
                    serverError: err.formattedMessage
                });
                return;
            }
            if (this.props.closeModal) {
                this.props.closeModal();
            }
        }
    }

    async onSubmit(e) {
        e.preventDefault();
        if (this.state.isSaving || this.state.isDeleting) {
            return;
        }
        const store = this.props.store;
        if (this.state.title && this.state.title.length) {
            this.setState({
                isSaving: true,
                isInvalid: false,
                serverError: null
            });
            try {
                await store.updateList(store.currentList._id, {
                    title: this.state.title,
                    color: this.state.color
                });
            } catch (err) {
                this.setState({
                    isSaving: false,
                    serverError: err.formattedMessage
                });
                return;
            }
            this.setState({ isSaving: false });
            if (this.props.closeModal) {
                this.props.closeModal();
            }
        } else {
            this.setState({ isInvalid: true });
        }
    }

    render() {
        return (
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
                    onChange={evt => this.setState({ title: evt.target.value })}
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
                        isLoading={this.state.isSaving}
                        loadingText="Saving"
                        color={this.state.color}
                        type="Save"
                    >
                        Save
                    </Button>
                    <Button
                        isLoading={this.state.isDeleting}
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
}

export default ListSettings;
