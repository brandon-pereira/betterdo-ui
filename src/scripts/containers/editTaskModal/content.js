import React, { Component } from 'react';
import styled from 'styled-components';
import { observer, inject } from 'mobx-react';
import { Label, Input } from '../../components/forms';
import Dropdown from '../../components/dropdown';
import Icon from '../../components/icon';

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
    ${Icon} {
        margin-bottom: 0.5rem;
    }
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
        this.iconProps = { color: '#565656', size: '2rem' };
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
        console.log(task);
        return (
            <Container>
                <Header>
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
                    <Icons>
                        <Icon {...this.iconProps} icon="subtasks">
                            Subtasks
                        </Icon>
                        <Icon {...this.iconProps} icon="book">
                            Notes
                        </Icon>
                        <Icon
                            {...this.iconProps}
                            onClick={this.props.deleteTask}
                            icon="bin"
                        >
                            Delete
                        </Icon>
                        <Icon {...this.iconProps} icon="floppy-disk">
                            Save
                        </Icon>
                    </Icons>
                </Block>
            </Container>
        );
    }
}

export default EditTaskModalContent;
