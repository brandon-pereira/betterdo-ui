// Priority   |  Due Date
// List       | [subtask] | [notes] | [delete] | [save]

import React, { Component } from 'react';
import styled from 'styled-components';
import { Label, Input } from '../forms';
import Dropdown from '../dropdown';
import Icon from '../icon';

const Container = styled.div`
    display: flex;
    flex-wrap: wrap;
`;
const Block = styled.div`
    width: calc(50% - 0.5rem);
    margin-right: 1rem;
    &:nth-child(2n) {
        margin-right: 0;
    }
`;
const Icons = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    height: 100%;
`;
class EditBody extends Component {
    constructor(props) {
        super(props);
        const { task } = this.props;
        this.state = {
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

    render() {
        const state = this.state;
        console.log(this.state.task);
        return (
            <Container>
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
                    <Input type="date" value={state.dueDate || ''} />
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
                        <Icon {...this.state.iconProps} icon="refresh">
                            Subtasks
                        </Icon>
                        <Icon {...this.state.iconProps} icon="refresh">
                            Notes
                        </Icon>
                        <Icon {...this.state.iconProps} icon="refresh">
                            Delete
                        </Icon>
                        <Icon {...this.state.iconProps} icon="refresh">
                            Save
                        </Icon>
                    </Icons>
                </Block>
            </Container>
        );
    }
}

export default EditBody;
