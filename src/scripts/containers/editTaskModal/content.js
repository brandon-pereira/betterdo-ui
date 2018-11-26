import React, { Component } from 'react';
import styled from 'styled-components';
import { observer, inject } from 'mobx-react';
import { Label, Input, TextArea } from '../../components/forms';
import Dropdown from '../../components/dropdown';

const Container = styled.div``;
const Block = styled.div``;
const Notes = styled(TextArea)`
    background: #fff9b0;
    min-height: 400px;
`;
@inject('store')
@observer
class EditTaskModalContent extends Component {
    constructor(props) {
        super(props);
        this.priorities = [
            { value: 'low', label: 'Low' },
            { value: 'normal', label: 'Normal' },
            { value: 'high', label: 'High' }
        ];
        this.lists = this.props.store.lists.map(list => ({
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
        const task = this.props.store.currentTask;
        return (
            <Container>
                <Block>
                    <Label>Title</Label>
                    <Input
                        value={task.title}
                        placeholder="Enter a title"
                        onKeyPress={this.onKeyPress}
                        onChange={evt =>
                            this.setState({
                                title: evt.target.value
                            })
                        }
                    />
                </Block>
                <Block>
                    <Label>Priority</Label>
                    <Dropdown
                        values={this.priorities}
                        onSelect={this.updatePriority}
                        value={task.priority}
                    />
                </Block>
                <Block>
                    <Label>Due Date</Label>
                    <Input
                        type="date"
                        value={task.dueDate || ''}
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
                        value={task.list}
                    />
                </Block>
                <Block>
                    <Label>Notes</Label>
                    <Notes />
                </Block>
                <Block>
                    <Label>Subtasks</Label>
                </Block>
            </Container>
        );
    }
}

export default EditTaskModalContent;
