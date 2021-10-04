import React, { Component, Fragment } from 'react';
import randomColor from 'randomcolor';
import styled from 'styled-components';
import { Label } from './Forms';
import _Icon from './Icon/Icon';
import TouchEvents from '../utilities/touchevents';
import Refresh from '@components/Icon/svgs/refresh.svg';
import Eyedropper from '@components/Icon/svgs/eyedropper.svg';

const Container = styled.div`
    display: flex;
    height: 3rem;
    overflow: hidden;
    border-radius: 50px;
    box-shadow: 0 3px 4px 0 rgba(0, 0, 0, 0.14),
        0 3px 3px -2px rgba(0, 0, 0, 0.12), 0 1px 8px 0 rgba(0, 0, 0, 0.2);
`;

const Icon = styled(_Icon)`
    color: ${({ theme }) => theme.colors.forms.label.color};
`;

const Color = styled.button.attrs(props => ({
    style: {
        backgroundColor: props.color
    }
}))`
    border: none;
    outline: none;
    flex: 1;
    background-image: linear-gradient(transparent, rgba(0, 0, 0, 0.3));
    box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.05);
    box-sizing: border-box;
    position: relative;
    &:focus-visible {
        box-shadow: inset 0 0 0 5px #fff;
    }
    &:first-of-type {
        border-radius: 50px 0 0 50px;
    }
    &:last-of-type {
        border-radius: 0 50px 50px 0;
    }
    ${props =>
        props.isCurrent &&
        `
        box-shadow: inset 0 0 0 5px ${props.theme.colors.general.blue};
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
        this.colorPaletteRef = React.createRef();
        this.state = {
            currentColor: 0,
            palette: [
                this.props.currentColor || this.randomColor(),
                this.randomColor(),
                this.randomColor(),
                this.randomColor()
            ]
        };
    }

    componentDidMount() {
        this.TouchEvents = new TouchEvents(
            this.colorPaletteRef.current,
            ({ direction }) => {
                if (['left', 'right'].includes(direction)) {
                    this.refreshPalette();
                }
            }
        );
    }

    componentWillUnmount() {
        this.TouchEvents.destroy();
    }

    randomColor() {
        return randomColor({ luminosity: 'dark' });
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
        if (e) {
            e.preventDefault();
        }
        const currentColor = this.state.palette[this.state.currentColor];
        this.setState({
            currentColor: 0,
            palette: this.state.palette.map((curr, i) =>
                i === 0 ? currentColor : this.randomColor()
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
                        type="button"
                        size="1rem"
                        icon={Refresh}
                        color="currentColor"
                        onClick={e => this.refreshPalette(e)}
                    >
                        Refresh Palette
                    </Icon>
                    <Icon
                        type="button"
                        size="1rem"
                        icon={Eyedropper}
                        color="currentColor"
                        onClick={e => this.launchPicker(e)}
                    >
                        Pick a colour
                    </Icon>
                </LabelContainer>
                <input
                    ref={this.inputColorRef}
                    value={this.state.palette[this.state.currentColor]}
                    onChange={e => {
                        e.preventDefault();
                        e.stopPropagation();
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
                <Container ref={this.colorPaletteRef}>
                    {this.state.palette.map((color, index) => (
                        <Color
                            type="button"
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
