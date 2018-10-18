import React, { Component } from 'react';
import styled from 'styled-components';
import { observer, inject } from 'mobx-react';

const Li = styled.li`
    background: linear-gradient(#fff, #eee);
    margin: 0.5rem 1rem;
    border-radius: 5px;
    box-shadow: 0 2px 3px rgba(0, 0, 0, 0.2), inset 0 -1px #fff;
    list-style: none;
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
    &:checked:before {
        content: '';
        border-radius: 50%;
        height: 1rem;
        width: 1rem;
        background: linear-gradient(#333, #666);
        display: block;
    }
`;
const Title = styled.span`
    flex: 1;
`;
@inject('store')
@observer
class Task extends Component {
    constructor(props) {
        super(props);
        // this.state = {
        //     isCompleted: this.props.task.isCompleted
        // };
    }

    updateTask(updatedTask) {
        // this.props.task.isCompleted = true;
        Object.assign(this.props.task, updatedTask);
        return this.props.store.updateTask(this.props.task);
    }

    render() {
        let { task } = this.props;
        return (
            <Li onClick={this.props.onClick}>
                <Checkbox
                    type="checkbox"
                    onChange={() => {
                        this.updateTask({
                            isCompleted: !task.isCompleted
                        });
                    }}
                    checked={task.isCompleted}
                />
                <Title>{task.title}</Title>
            </Li>
        );
    }
}

export default Task;
