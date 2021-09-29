import React, { Component } from 'react';
import styled from 'styled-components';
import { Input } from './forms';
import Icon from './Icon/Icon';
import { arrayMoveImmutable } from 'array-move';

const _Input = styled(Input)`
    border: none;
    border-radius: 0;
    box-shadow: none;
    margin-bottom: 0;
    box-shadow: ${({ theme }) => theme.colors.forms.input.boxShadow};
`;
const Container = styled.div`
    background: #fff;
    font-family: inherit;
    font-size: 1rem;
    margin-bottom: 1rem;
    width: 100%;
    box-sizing: border-box;
    border-radius: 3px;
    overflow: hidden;
    color: ${({ theme }) => theme.colors.forms.input.color};
    background: ${({ theme }) => theme.colors.forms.input.background};
    ${({ theme }) =>
        theme.isDarkMode &&
        `
            border: none;
        `};
`;
const DeleteIcon = styled(Icon)``;

const Task = styled.div`
    display: flex;
    align-items: center;
    padding: 0.8rem 1rem;
    border-color: #ccc;
    border-style: solid;
    border-width: 1px 1px 0 1px;
    z-index: 11;
    span {
        flex: 1;
    }
    ${DeleteIcon} {
        display: none;
    }
    ${props =>
        props.checked &&
        `
        text-decoration: line-through;
    `}
    &:hover {
        ${DeleteIcon} {
            display: block;
        }
    }
    &:last-of-type {
        border-bottom: none;
    }
    ${({ theme }) =>
        theme.isDarkMode &&
        `
            && {
                border: none;
                border-bottom: 1px solid rgba(255,255,255,0.5);
            }
        `};
`;
const Checkbox = styled.input`
    height: 1rem;
    width: 1rem;
    border-radius: 100%;
    display: inline-block;
    appearance: none;
    background: #fff;
    margin: 0 0.8rem 0 0;
    border: 1px solid #ccc;
    display: flex;
    align-items: center;
    justify-content: center;
    outline: none;
    cursor: pointer;
    flex-shrink: 0;
    &:checked {
        box-shadow: inset 0 0 0 2px #fff;
        background: linear-gradient(#333, #666);
    }
    &:focus-visible {
        box-shadow: inset 0 0 0 2px #fff,
            0 0 0 2px ${({ theme }) => theme.colors.general.blue};
    }
`;

export default class Subtasks extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            items: props.subtasks
        };

        this.onKeyPress = this.onKeyPress.bind(this);
    }

    updateInputValue(value) {
        this.setState({
            isInvalid: !value,
            value
        });
    }

    toggleCompleted(index) {
        const subtasks = this.state.items;
        subtasks[index].isComplete = !subtasks[index].isComplete;
        this.setState({
            subtasks
        });
        this.props.onChange(subtasks);
    }

    triggerDelete(index) {
        const subtasks = this.state.items;
        subtasks.splice(index, 1);
        this.setState({
            subtasks
        });
        this.props.onChange(subtasks);
    }

    onKeyPress(e) {
        if (e.key === 'Enter' && this.state.value) {
            this.state.items.push({ title: this.state.value });
            this.setState({
                value: ''
            });
            this.props.onChange(this.state.items);
        }
    }

    onSortEnd({ oldIndex, newIndex }) {
        if (oldIndex !== newIndex) {
            this.setState({
                items: arrayMoveImmutable(this.state.items, oldIndex, newIndex)
            });
            this.props.onChange(this.state.items);
        }
    }

    render() {
        const SortableItem = SortableElement(({ value, sortIndex }) => (
            <Task checked={value.isComplete}>
                <Checkbox
                    type="checkbox"
                    onClick={e => e.stopPropagation()}
                    onChange={() => this.toggleCompleted(sortIndex)}
                    onKeyDown={e => {
                        // if space key
                        if (e.keyCode === 13) {
                            this.toggleCompleted(sortIndex);
                        }
                    }}
                    checked={value.isComplete}
                />
                <span>{value.title}</span>
                <DeleteIcon
                    icon="x"
                    size="1rem"
                    color="#d8d8d8"
                    onClick={() => {
                        this.triggerDelete(sortIndex);
                    }}
                />
            </Task>
        ));
        const SortableList = SortableContainer(({ items }) => {
            return (
                <div>
                    {items.map((value, index) => (
                        <SortableItem
                            key={`item-${index}`}
                            index={index}
                            sortIndex={index}
                            value={value}
                        />
                    ))}
                </div>
            );
        });

        return (
            <Container>
                <SortableList
                    items={this.state.items || []}
                    onSortEnd={this.onSortEnd.bind(this)}
                    pressDelay={200}
                    lockAxis="y"
                    lockToContainerEdges={true}
                />
                <_Input
                    invalid={this.state.isInvalid}
                    value={this.state.value}
                    onChange={evt => this.updateInputValue(evt.target.value)}
                    onKeyPress={this.onKeyPress}
                    placeholder="New Subtask"
                />
            </Container>
        );
    }
}
