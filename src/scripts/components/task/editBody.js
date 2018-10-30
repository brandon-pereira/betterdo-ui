// Priority   |  Due Date
// List       | [subtask] | [notes] | [delete] | [save]

import React, { Component } from 'react';
import styled from 'styled-components';
import { Label, Input } from '../forms';
import Dropdown from '../dropdown';
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
class EditBody extends Component {
    render() {
        const { task } = this.props;
        return (
            <Container>
                <Block>
                    <Label>Priority</Label>
                    <Dropdown
                        values={[
                            { value: 'low', label: 'Low' },
                            { value: 'normal', label: 'Normal' },
                            { value: 'high', label: 'High' }
                        ]}
                        onSelect={v => {
                            this.props.updateTask({
                                priority: v
                            });
                        }}
                        value={task.priority}
                    />
                </Block>
                <Block>
                    <Label>Due Date</Label>
                    <Input type="date" value={task.dueDate || ''} />
                </Block>
                <Block>
                    <Label>List</Label>
                    <Dropdown
                        values={[
                            { value: task.list, label: task.list }
                            // { value: 'normal', label: 'Normal' },
                            // { value: 'high', label: 'High' }
                        ]}
                        // onSelect={v => {
                        //     this.props.updateTask({
                        //         priority: v
                        //     });
                        // }}
                        value={task.list}
                    />
                </Block>
                <Block>
                    <button>delete</button>
                </Block>
            </Container>
        );
    }
}

export default EditBody;
