import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import styled from 'styled-components';

const Container = styled.div`
    background: linear-gradient(#fff, #eee);
    margin: 0.5rem 1rem;
    border-radius: 5px;
    box-shadow: 0 2px 3px rgba(0, 0, 0, 0.2), inset 0 -1px #fff;
    padding: 1rem;
    display: flex;
    align-items: center;
`;
const Checkbox = styled.input`
    height: 1.4rem;
    width: 1.4rem;
    border-radius: 5px;
    display: inline-block;
    appearance: none;
    background: #fff;
    margin-right: 1rem;
    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.2);
    display: flex;
    align-items: center;
    justify-content: center;
    outline: none;
    cursor: pointer;
    flex-shrink: 0;
    &:before {
        content: '';
        border-radius: 50%;
        height: 1rem;
        width: 1rem;
        background: linear-gradient(#333, #666);
        display: block;
        transform: scale(0);
        transition: transform 0.2s;
    }
    &:checked:before {
        transform: scale(1);
    }
`;
const Title = styled.span`
    flex: 1;
    text-overflow: ellipsis;
    overflow: hidden;
`;
@inject('store')
@observer
class Task extends Component {
    edit() {
        this.props.store.currentTask = this.props.task;
    }

    toggleCompleted() {
        const { _id, isCompleted } = this.props.task;
        this.props.store.updateTask(_id, {
            isCompleted: !isCompleted
        });
    }

    render() {
        const { task } = this.props;
        return (
            <Container onClick={this.edit.bind(this)}>
                <Checkbox
                    type="checkbox"
                    onClick={e => e.stopPropagation()}
                    onChange={this.toggleCompleted.bind(this)}
                    checked={task.isCompleted}
                />
                <Title>{task.title}</Title>
            </Container>
        );
    }
}

export default Task;
