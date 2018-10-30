import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import styled from 'styled-components';
import EditTask from './editing';
import Header from './header';

const Container = styled.div`
    background: linear-gradient(#fff, #eee);
    margin: 0.5rem 1rem;
    border-radius: 5px;
    box-shadow: 0 2px 3px rgba(0, 0, 0, 0.2), inset 0 -1px #fff;
    padding: 1rem;
`;

@inject('store')
@observer
class Task extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isEditing: false
        };
    }

    updateTask(updatedTask) {
        Object.assign(this.props.task, updatedTask);
        return this.props.store.updateTask(this.props.task);
    }

    getChildren() {
        const task = this.props.task;
        const lists = this.props.store.lists;
        if (this.state.isEditing) {
            return (
                <EditTask
                    updateTask={this.updateTask.bind(this)}
                    task={task}
                    lists={lists}
                />
            );
        }
        return <Header title={task.title} isComplete={task.isComplete} />;
    }

    render() {
        return (
            <Container
                onClick={() => {
                    this.setState({ isEditing: true });
                }}
            >
                {this.getChildren()}
            </Container>
        );
    }
}

export default Task;
