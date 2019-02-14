import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import styled from 'styled-components';
import Loader from './loader';

const Checkbox = styled.input`
    height: 1.4rem;
    width: 1.4rem;
    border-radius: 5px;
    display: inline-block;
    appearance: none;
    background: #fff;
    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.2);
    display: flex;
    align-items: center;
    justify-content: center;
    outline: none;
    cursor: pointer;
    flex-shrink: 0;
    margin: 1.2rem 1rem;
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
const HighPriorityFlag = styled.div`
    align-self: flex-start;
    height: 2rem;
    width: 1.6rem;
    background: linear-gradient(#e21d1d, #c11010);
    margin: -1px 1rem 0 0;
    position: relative;
    filter: drop-shadow(1px 1px #840000);
    &:before,
    &:after {
        content: '';
        position: absolute;
        top: calc(100% - 1px);
        left: 0;
        width: 0;
        height: 0;
        border-style: solid;
        border-width: 0.8rem 0.8rem 0 0;
        border-color: #c11010 transparent transparent transparent;
    }
    &:after {
        left: auto;
        right: 0;
        border-width: 0 0.8rem 0.8rem 0;
        border-color: transparent #c11010 transparent transparent;
    }
`;
const Container = styled.div`
    background: linear-gradient(#fff, #eee);
    margin: 0.5rem 1rem 0;
    border-radius: 5px;
    box-shadow: 0 2px 3px rgba(0, 0, 0, 0.2), inset 0 -1px #fff;
    display: flex;
    align-items: center;
    flex-shrink: 0;
    ${props =>
        props.isLoading &&
        `
        opacity: 0.5;
        pointer-events: none;
    `}
    ${props =>
        props.priority === 'low' &&
        `
        background: linear-gradient(#eee, #ddd);
        box-shadow: 0 2px 3px rgba(0, 0, 0, 0.2);
    `}
    ${Loader} {
        margin: 1rem;
    }
`;
const Title = styled.span`
    flex: 1;
    text-overflow: ellipsis;
    overflow: hidden;
    user-select: none;
    margin: 1rem 1rem 1rem 0;
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
            <Container
                isLoading={task.isLoading}
                onClick={this.edit.bind(this)}
                priority={task.priority}
            >
                {task.isLoading ? (
                    <Loader color="#202020" size="1.7rem" loading={true} />
                ) : (
                    <Checkbox
                        type="checkbox"
                        onClick={e => e.stopPropagation()}
                        onChange={this.toggleCompleted.bind(this)}
                        checked={task.isCompleted}
                    />
                )}
                <Title>{task.title}</Title>
                {task.priority === 'high' && <HighPriorityFlag />}
            </Container>
        );
    }
}

export default Task;
