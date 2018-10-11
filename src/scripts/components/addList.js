import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import styled from 'styled-components';

const Container = styled.form``;

const Input = styled.input`
    appearance: none;
    background: #fff;
    width: 100%;
    box-sizing: border-box;
    padding: 1rem;
    border: none;
    box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    outline: none;
`;

const Color = styled.button`
    background: ${props => props.color};
`;

@inject('state')
@observer
export default class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            color: this.randomColor
        };
    }

    async componentDidMount() {
        this._randomColor = (await import('randomcolor')).randomColor;
        this.setState({
            color: this.randomColor
        });
    }

    get randomColor() {
        if (this._randomColor) {
            return this._randomColor();
        } else {
            return '#EEEEEE';
        }
    }

    createList(e) {
        e.preventDefault();
        this.props.state.closeModal();
        this.props.state.createList(this.state.title);
    }

    render() {
        return (
            <Container onSubmit={e => this.createList(e)}>
                <Input
                    value={this.state.title}
                    onChange={evt => this.setState({ title: evt.target.value })}
                    placeholder="Add List"
                />
                <Color color={this.state.color}>LOL</Color>
            </Container>
        );
    }
}
