import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import styled from 'styled-components';
import AddTask from '../components/addTask';
import Task from '../components/task';

const Container = styled.div``;

@inject('store')
@observer
export default class Body extends Component {
    render() {
        // TODO: Fix but with double rendering and keys
        // console.log(this.props.store.currentList.tasks);
        return (
            <Container>
                <AddTask />
                {this.props.store.currentList.tasks.map((task, i) => {
                    return <Task key={task._id} task={task} />;
                })}
            </Container>
        );
    }
}
