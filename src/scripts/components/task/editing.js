import React, { Component } from 'react';
import styled from 'styled-components';
import { Label, Input } from '../forms';
import Dropdown from '../dropdown';
import Icon, { IconContainer } from '../icon';

const Container = styled.div`
    display: flex;
    flex-wrap: wrap;
`;
const Header = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
    ${Input} {
        margin: 0 0.5rem 0 0;
    }
`;
const Block = styled.div`
    width: calc(50% - 0.5rem);
    margin-left: 1rem;
    &:nth-of-type(2n) {
        margin-left: 0;
    }
`;
const Icons = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    height: 100%;
    ${IconContainer} {
        background: red;
    }
`;
class EditBody extends Component {
    constructor(props) {
        super(props);
        const { task } = this.props;
        this.state = {
            title: task.title,
            priority: task.priority,
            dueDate: task.dueDate,
            list: task.list,
            iconProps: {
                color: 'red',
                size: '2rem'
            }
        };
        this.priorities = [
            { value: 'low', label: 'Low' },
            { value: 'normal', label: 'Normal' },
            { value: 'high', label: 'High' }
        ];
        this.lists = this.props.lists.map(list => ({
            value: list._id,
            label: list.title
        }));
        this.updatePriority = this.updatePriority.bind(this);
        this.updateList = this.updateList.bind(this);
        this.onKeyPress = this.onKeyPress.bind(this);
    }

    updatePriority(priority) {
        this.updateTask({ priority });
    }

    updateList(list) {
        this.updateTask({ list });
    }

    updateTask(updatedProperties = {}) {
        this.setState(updatedProperties);
        this.props.updateTask(updatedProperties);
    }

    onKeyPress(e) {
        if (e.key === 'Enter') {
            this.updateTask({
                dueDate: this.state.dueDate,
                title: this.state.title
            });
        }
    }

    render() {
        const state = this.state;
        return (
            <Container>
                <Header>
                    <Input
                        value={state.title}
                        placeholder="Enter a title"
                        onKeyPress={this.onKeyPress}
                        onChange={evt =>
                            this.setState({
                                title: evt.target.value
                            })
                        }
                    />
                    <Icon
                        icon="chevron"
                        size="2.5rem"
                        color="#565656"
                        onClick={e => {
                            this.props.onClose();
                            e.stopPropagation();
                        }}
                    >
                        Close
                    </Icon>
                </Header>
                <Block>
                    <Label>Priority</Label>
                    <Dropdown
                        values={this.priorities}
                        onSelect={this.updatePriority}
                        value={state.priority}
                    />
                </Block>
                <Block>
                    <Label>Due Date</Label>
                    <Input
                        type="date"
                        value={state.dueDate || ''}
                        onChange={evt =>
                            this.setState({
                                dueDate: evt.target.value
                            })
                        }
                        onKeyPress={this.onKeyPress}
                    />
                </Block>
                <Block>
                    <Label>List</Label>
                    <Dropdown
                        values={this.lists}
                        onSelect={this.updateList}
                        value={state.list}
                    />
                </Block>
                <Block>
                    <Icons>
                        <Icon {...this.state.iconProps} icon="subtasks">
                            Subtasks
                        </Icon>
                        <Icon {...this.state.iconProps} icon="book">
                            Notes
                        </Icon>
                        <Icon {...this.state.iconProps} icon="bin">
                            Delete
                        </Icon>
                        <Icon {...this.state.iconProps} icon="floppy-disk">
                            Save
                        </Icon>
                    </Icons>
                </Block>
            </Container>
        );
    }
}

export default EditBody;
