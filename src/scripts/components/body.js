import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import styled from 'styled-components';
import AddTask from './addTask';

const Container = styled.div``;

@inject('state')
@observer
export default class Body extends Component {
    render() {
        return (
            <Container>
                <AddTask />
                {this.props.state.currentList.tasks.map((task, i) => {
                    console.log(task);
                    return <h1>{task.title}</h1>;
                })}
            </Container>
        );
    }
}
