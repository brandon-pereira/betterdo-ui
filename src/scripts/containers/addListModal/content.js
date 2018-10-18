import React, { Fragment, Component } from 'react';
import styled from 'styled-components';
import randomColor from 'randomcolor';
import Button from '../../components/button';

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

export default class AddListModalContent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            color: randomColor()
        };
    }

    randomizeColor() {
        this.setState({ color: randomColor() });
    }

    async onSubmit(e) {
        e.preventDefault();
        const state = this.props.state;
        if (this.props.closeModal) {
            this.props.closeModal();
        }
        state.createList(this.state.title, this.state.color);
        this.randomizeColor();
    }

    render() {
        return (
            <Fragment>
                <h1>Form</h1>
                <form onSubmit={e => this.createList(e)}>
                    <Input
                        value={this.state.title}
                        onChange={evt =>
                            this.setState({ title: evt.target.value })
                        }
                        placeholder="Add List"
                    />
                    <Button color={this.state.color}>Submit</Button>
                </form>
            </Fragment>
        );
    }
}
