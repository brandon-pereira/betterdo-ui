import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import styled from 'styled-components';

const Container = styled.form`
    padding: 1rem 1rem 0;
`;

const Input = styled.input`
    appearance: none;
    background: #fff;
    width: 100%;
    box-sizing: border-box;
    padding: 1rem;
    border: none;
    box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    outline: none;
`;

@inject('state')
@observer
export default class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputValue: ''
        };
    }

    createTask(e) {
        e.preventDefault();
        this.props.state.createTask(this.state.inputValue);
        this.updateInputValue('');
    }

    updateInputValue(value) {
        this.setState({
            inputValue: value
        });
    }

    render() {
        return (
            <Container onSubmit={e => this.createTask(e, 'blah')}>
                <Input
                    value={this.state.inputValue}
                    onChange={evt => this.updateInputValue(evt.target.value)}
                    placeholder="Add Task"
                />
            </Container>
        );
    }
}
