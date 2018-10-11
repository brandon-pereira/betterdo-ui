import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import styled from 'styled-components';

const Container = styled.div`
    padding: 1rem;
`;

const Input = styled.input`
    appearance: none;
    background: #fff;
    width: 100%;
    padding: 1rem;
    border: none;
    box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    outline: none;
`;

@inject('state')
@observer
export default class Header extends Component {
    render() {
        return (
            <Container>
                <Input placeholder="Add Task" />
            </Container>
        );
    }
}
