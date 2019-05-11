import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import styled from 'styled-components';
import { Input } from './forms';

const Container = styled.form`
    padding: 1rem 1rem 0;
    display: ${({ hidden }) => (hidden ? 'none' : 'block')};
    input {
        margin: 0;
        box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.2);
    }
`;

@inject('store')
@observer
class addTask extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: ''
        };
    }

    async createTask(e) {
        e.preventDefault();
        const title = this.state.value;
        if (!title) {
            this.setState({ isInvalid: true });
            return;
        }
        this.setState({ isInvalid: false, submitting: true, value: '' });
        await this.props.store.createTask(title);
        this.setState({ isInvalid: false, submitting: false });
    }

    updateInputValue(value) {
        this.setState({
            isInvalid: !value,
            value
        });
    }

    render() {
        return (
            <Container
                hidden={this.props.hidden}
                onSubmit={e => this.createTask(e)}
            >
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

export default addTask;
