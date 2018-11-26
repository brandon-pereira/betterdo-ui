import React, { Component } from 'react';
import styled from 'styled-components';
import { Input } from './forms';

const Container = styled.div`
    background: #fff;
    font-family: inherit;
    font-size: 1rem;
    margin-bottom: 1rem;
    width: 100%;
    box-sizing: border-box;
    border: 2px solid #ccc;
    border-radius: 3px;
    overflow: hidden;
    ${Input} {
        border: none;
        border-radius: 0;
        box-shadow: none;
        margin-bottom: 0;
    }
`;
const Task = styled.div`
    display: flex;
    align-items: center;
    padding: 0.8rem 1rem;
    border-bottom: 1px solid #ccc;
`;
const Checkbox = styled.input`
    height: 1rem;
    width: 1rem;
    border-radius: 100%;
    display: inline-block;
    appearance: none;
    background: #fff;
    margin: 0 0.8rem 0 0;
    border: 1px solid #ccc
    display: flex;
    align-items: center;
    justify-content: center;
    outline: none;
    cursor: pointer;
    flex-shrink: 0;
    &:checked {
        box-shadow: inset 0 0 0 2px #fff;
        background: linear-gradient(#333, #666);
    }
`;

export default class Subtasks extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            subtasks: props.subtasks
        };

        this.onKeyPress = this.onKeyPress.bind(this);
    }

    updateInputValue(value) {
        this.setState({
            isInvalid: !value,
            value
        });
    }

    toggleCompleted(index) {
        const subtasks = this.state.subtasks;
        subtasks[index].isComplete = !subtasks[index].isComplete;
        this.setState({
            subtasks
        });
        this.props.onChange(subtasks);
    }

    onKeyPress(e) {
        if (e.key === 'Enter' && this.state.value) {
            this.state.subtasks.push({ title: this.state.value });
            this.setState({
                value: ''
            });
            this.props.onChange(this.state.subtasks);
        }
    }

    render() {
        return (
            <Container>
                {this.state.subtasks.map((task, index) => (
                    <Task key={index}>
                        <Checkbox
                            type="checkbox"
                            onClick={e => e.stopPropagation()}
                            onChange={() => this.toggleCompleted(index)}
                            checked={task.isComplete}
                        />
                        {task.title}
                    </Task>
                ))}
                <Input
                    invalid={this.state.isInvalid}
                    value={this.state.value}
                    onChange={evt => this.updateInputValue(evt.target.value)}
                    onKeyPress={this.onKeyPress}
                    placeholder="New Subtask"
                />
            </Container>
        );
    }
}
