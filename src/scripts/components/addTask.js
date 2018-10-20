import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import styled from 'styled-components';
import { Input } from './forms';

const Container = styled.form`
    padding: 1rem 1rem 0;
    input {
        margin: 0;
        box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.2);
    }
`;

@inject('store')
@observer
export default class addTask extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: ''
        };
    }

    async createTask(e) {
        e.preventDefault();
        if (!this.state.value) {
            this.setState({ isInvalid: true });
            return;
        }
        this.setState({ isInvalid: false, submitting: true });
        await this.props.store.createTask(this.state.value);
        this.setState({ isInvalid: false, submitting: false, value: '' });
    }

    updateInputValue(value) {
        this.setState({
            isInvalid: Boolean(this.state.value),
            value
        });
    }

    render() {
        return (
            <Container onSubmit={e => this.createTask(e)}>
                <Input
                    invalid={this.state.isInvalid}
                    value={this.state.value}
                    onChange={evt => this.updateInputValue(evt.target.value)}
                    placeholder="Add Task"
                />
            </Container>
        );
    }
}
