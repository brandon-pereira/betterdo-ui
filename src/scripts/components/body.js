import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import styled from 'styled-components';
import AddTask from './addTask';
import Task from './Task';

const Container = styled.div``;

@inject('state')
@observer
export default class Body extends Component {
    render() {
        return (
            <Container>
                <AddTask />
                {this.props.state.currentList.tasks.map((task, i) => {
                    return <Task key={i}>{task.title}</Task>;
                })}
            </Container>
        );
    }
}
