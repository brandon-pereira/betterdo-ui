import React, { Fragment, Component } from 'react';
import randomColor from 'randomcolor';
import Button from '../../components/button';
import { Body, Header } from '../../components/copy';
import { Form, Label, Input } from '../../components/forms';

export default class AddListModalContent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            color: randomColor()
        };
    }

    randomizeColor() {
        this.setState({ color: randomColor() });
    }

    async onSubmit(e) {
        e.preventDefault();
        const state = this.props.state;
        if (this.props.closeModal) {
            this.props.closeModal();
        }
        state.createList(this.state.title, this.state.color);
    }

    render() {
        return (
            <Fragment>
                <Header>Create List</Header>
                <Body>
                    Lists allow you to organize your tasks with even more
                    detail. You can create lists for almost anything.
                </Body>
                <Form onSubmit={e => this.onSubmit(e)}>
                    <Label htmlFor="name">List Name</Label>
                    <Input
                        value={this.state.title}
                        name="name"
                        id="name"
                        onChange={evt =>
                            this.setState({ title: evt.target.value })
                        }
                        placeholder="ex. Groceries"
                    />
                    <Button color={this.state.color}>Submit</Button>
                </Form>
            </Fragment>
        );
    }
}
