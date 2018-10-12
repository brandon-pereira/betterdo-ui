import React, { Component } from 'react';
import styled from 'styled-components';

const Li = styled.li`
    background: linear-gradient(#fff, #eee);
    margin: 0.5rem 1rem;
    border-radius: 5px;
    box-shadow: 0 2px 3px rgba(0, 0, 0, 0.2), inset 0 -1px #fff;
    list-style: none;
    padding: 1rem;
`;
const Checkbox = styled.input`
    flex: 1;
    &:checked {
        margin: 1rem;
    }
`;
const Title = styled.span`
    flex: 1;
`;

class Task extends Component {
    render() {
        let title = this.props.children;
        return (
            <Li
                {...{ selected: this.props.selected }}
                onClick={this.props.onClick}
            >
                <Checkbox type="radio" checked={this.props.selected} />
                <Title>{title}</Title>
            </Li>
        );
    }
}

export default Task;
