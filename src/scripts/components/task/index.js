import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import { observer, inject } from 'mobx-react';
import Checkbox from './checkbox';
import { Input } from '../forms';
import Icon from '../icon';
const Header = styled.header`
    display: flex;
    align-items: center;
    ${Input} {
        padding: 0.6rem 0.4rem;
        margin: -0.6rem 0.5rem -0.6rem -0.4rem;
    }
`;
const Container = styled.div`
    background: linear-gradient(#fff, #eee);
    margin: 0.5rem 1rem;
    border-radius: 5px;
    box-shadow: 0 2px 3px rgba(0, 0, 0, 0.2), inset 0 -1px #fff;
    padding: 1rem;
    &.editing {
        ${Header} {
            margin-bottom: 1rem;
        }
        // height: 5rem;
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
        this.state = {
            isEditing: false
        };
    }

    updateTask(updatedTask) {
        Object.assign(this.props.task, updatedTask);
        return this.props.store.updateTask(this.props.task);
    }

    render() {
        const isEditing = this.state.isEditing;
        let { task } = this.props;
        return (
            <Container
                className={isEditing ? 'editing' : ''}
                onClick={() => {
                    this.setState({ isEditing: true });
                }}
            >
                <Header>
                    <Checkbox
                        onChange={() =>
                            this.updateTask({
                                isCompleted: !task.isCompleted
                            })
                        }
                        checked={task.isCompleted}
                    />
                    {isEditing ? (
                        <Fragment>
                            <Input value={task.title} />
                            <Icon
                                icon="chevron"
                                size="2rem"
                                color="#565656"
                                onClick={e => {
                                    this.setState({ isEditing: false });
                                    e.stopPropagation();
                                }}
                            >
                                Close
                            </Icon>
                        </Fragment>
                    ) : (
                        <Title>{task.title}</Title>
                    )}
                </Header>
                {isEditing ? <div>Lorem Ipsum</div> : null}
            </Container>
        );
    }
}

export default Task;
