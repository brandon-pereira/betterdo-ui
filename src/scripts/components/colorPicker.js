import React, { Component, Fragment } from 'react';
import randomColor from 'randomcolor';
import styled from 'styled-components';
import { Label } from './forms';
import Icon from './icon';
import { COLORS } from '../constants';

const Container = styled.div`
    display: flex;
    height: 3rem;
    overflow: hidden;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
    border-radius: 5px;
`;

const Color = styled.div.attrs(props => ({
    style: {
        backgroundColor: props.color
    }
}))`
    flex: 1;
    background-image: linear-gradient(transparent, rgba(0, 0, 0, 0.3));
    box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.05);
    ${props =>
        props.isCurrent &&
        `
        box-shadow: none;
        border: 5px solid ${COLORS.blue};
    `};
`;

const LabelContainer = styled.div`
    display: flex;
    margin-bottom: 0.5rem;
    label {
        margin-bottom: 0;
    }
    ${Icon} {
        margin-left: 0.3rem;
    }
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
            palette: this.state.palette.map(curr =>
                curr === color ? color : curr
            )
        });
    }

    changeColorFromPicker(color) {
        this.props.onChange(color);
        this.setState({
            palette: this.state.palette.map((curr, i) =>
                this.state.currentColor === i ? color : curr
            )
        });
    }

    refreshPalette(e) {
        e.preventDefault();
        const currentColor = this.state.palette[this.state.currentColor];
        this.setState({
            currentColor: 0,
            palette: this.state.palette.map((curr, i) =>
                i === 0 ? currentColor : randomColor()
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
                <LabelContainer>
                    <Label>List Colour</Label>
                    <Icon
                        size="1rem"
                        icon="refresh"
                        color="#505050"
                        onClick={e => this.refreshPalette(e)}
                    >
                        Refresh Palette
                    </Icon>
                    <Icon
                        size="1rem"
                        icon="eyedropper"
                        color="#505050"
                        onClick={e => this.launchPicker(e)}
                    >
                        Pick a colour
                    </Icon>
                </LabelContainer>
                <input
                    ref={this.inputColorRef}
                    value={this.state.palette[this.state.currentColor]}
                    onChange={() => {
                        if (
                            this.inputColorRef.current &&
                            this.inputColorRef.current.value
                        ) {
                            this.changeColorFromPicker(
                                this.inputColorRef.current.value
                            );
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
