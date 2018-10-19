import React, { Component, Fragment } from 'react';
import randomColor from 'randomcolor';
import styled from 'styled-components';
import { Label } from './forms';

const Container = styled.div`
    display: flex;
    height: 3rem;
    overflow: hidden;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
    border-radius: 5px;
`;

const Color = styled.div`
    flex: 1;
    background: ${props => props.color};
    ${props =>
        props.isCurrent &&
        `
        border: 5px solid #2979ff;
    `};
`;

export default class ColorPicker extends Component {
    constructor(props) {
        super(props);
        this.inputColorRef = React.createRef();
        this.state = {
            currentColor: 0,
            palette: [
                this.props.currentColor || randomColor(),
                randomColor(),
                randomColor(),
                randomColor()
            ]
        };
    }

    changeColor(color) {
        this.props.onChange(color);
        this.setState({
            currentColor: this.state.palette.findIndex(curr => color === curr),
            palette: this.state.palette.map(
                curr => (curr === color ? color : curr)
            )
        });
    }

    refreshPalette(e) {
        e.preventDefault();
        const currentColor = this.state.palette[this.state.currentColor];
        this.setState({
            currentColor: 0,
            palette: this.state.palette.map(
                (curr, i) => (i === 0 ? currentColor : randomColor())
            )
        });
    }

    launchPicker(e) {
        e.preventDefault();
        this.inputColorRef.current.click();
    }

    render() {
        return (
            <Fragment>
                <Label>List Colour</Label>
                <button onClick={e => this.refreshPalette(e)}>Refresh</button>
                <button
                    style={{ display: 'none' }}
                    onClick={e => this.launchPicker(e)}
                >
                    Picker
                </button>
                <input
                    ref={this.inputColorRef}
                    value={this.state.palette[this.state.currentColor]}
                    onChange={() => {
                        if (
                            this.inputColorRef.current &&
                            this.inputColorRef.current.value
                        ) {
                            this.changeColor(this.inputColorRef.current.value);
                        }
                    }}
                    type="color"
                    style={{ display: 'none' }}
                />
                <Container>
                    {this.state.palette.map((color, index) => (
                        <Color
                            key={color}
                            onClick={() => this.changeColor(color)}
                            color={color}
                            isCurrent={this.state.currentColor === index}
                        />
                    ))}
                </Container>
            </Fragment>
        );
    }
}
