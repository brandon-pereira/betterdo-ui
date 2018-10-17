import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import styled from 'styled-components';
import Modal from '../components/modal';

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
    font: inherit;
    font-size: 1rem;
`;
const Button = styled.button`
    border: none;
    color: #fff;
    border-radius: 5px;
    padding: 1rem;
    font: inherit;
    background-color: ${props => props.color};
    background-image: linear-gradient(transparent, rgba(0, 0, 0, 0.3));
    box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.5);
    text-shadow: 1px 1px rgba(0, 0, 0, 0.6);
    font-size: 1rem;
    margin-top: 1rem;
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
        this.randomizeColor();
    }

    get randomColor() {
        if (this._randomColor) {
            return this._randomColor();
        } else {
            return '#EEEEEE';
        }
    }

    randomizeColor() {
        this.setState({
            color: this.randomColor
        });
    }

    createList(e) {
        e.preventDefault();
        this.props.state.closeModal();
        this.props.state.createList(this.state.title, this.state.color);
    }

    render() {
        return (
            <Container onSubmit={e => this.createList(e)}>
                <Input
                    value={this.state.title}
                    onChange={evt => this.setState({ title: evt.target.value })}
                    placeholder="Add List"
                />
                <Button color={this.state.color}>Submit</Button>
            </Container>
        );
    }
}
