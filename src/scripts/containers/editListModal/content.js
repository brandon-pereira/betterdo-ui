import React, { Fragment, Component } from 'react';
import randomColor from 'randomcolor';
import Button from '../../components/button';
import { Body, Header } from '../../components/copy';
import { Form, Label, Input } from '../../components/forms';
import ColorPicker from '../../components/colorPicker';
import { observer, inject } from 'mobx-react';

@inject('store')
@observer
export default class AddListModalContent extends Component {
    constructor(props) {
        super(props);
        const currentList = this.props.store.currentList;
        this.state = {
            submitting: false,
            isInvalid: false,
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
            await store.updateList(store.currentList._id, {
                title: this.state.title,
                color: this.state.color
            });
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
                <Form onSubmit={e => this.onSubmit(e)}>
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
                    <Button
                        loading={this.state.submitting}
                        color={this.state.color}
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
                </Form>
            </Fragment>
        );
    }
}
