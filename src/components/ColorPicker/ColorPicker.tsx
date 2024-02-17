import { useState, useEffect, useCallback, useRef } from 'react';
import randomColor from 'randomcolor';

import {
    Icon,
    Container,
    Color,
    LabelContainer,
    TooltipContainer
} from './ColorPicker.styles';

import Refresh from '@components/Icon/svgs/refresh.svg';
import Eyedropper from '@components/Icon/svgs/eyedropper.svg';
import { Label } from '@components/Forms';
import TouchEvents from '@utilities/touchevents';

function generateRandomColor() {
    return randomColor({ luminosity: 'dark' });
}

interface Props {
    value?: string;
    onChange: (color: string) => void;
}

function ColorPicker({ value, onChange }: Props) {
    const inputColorRef = useRef<HTMLInputElement>(null);
    const colorPaletteRef = useRef<HTMLDivElement>(null);
    const [index, setIndex] = useState(0);
    const [palette, setPalette] = useState([
        value || generateRandomColor(),
        generateRandomColor(),
        generateRandomColor(),
        generateRandomColor()
    ]);

    const onChangeColor = useCallback(
        (color: string) => {
            onChange(color);
            setIndex(palette.findIndex(curr => color === curr));
            setPalette(palette.map(curr => (curr === color ? color : curr)));
        },
        [onChange, palette]
    );

    const onChangeColorFromPicker = useCallback(
        (color: string) => {
            onChange(color);
            setPalette(palette.map((curr, i) => (index === i ? color : curr)));
        },
        [index, palette, onChange]
    );

    const onRefreshPalette = useCallback(
        (e?: React.MouseEvent<HTMLDivElement>) => {
            if (e) {
                e.preventDefault();
            }
            const currentColor = palette[index];
            setIndex(0);
            setPalette(
                palette.map((curr, i) =>
                    i === 0 ? currentColor : randomColor()
                )
            );
        },
        [palette, index]
    );

    const onLaunchPicker = useCallback(
        (e?: React.MouseEvent<HTMLDivElement>) => {
            if (e) {
                e.preventDefault();
            }
            if (inputColorRef.current) {
                inputColorRef.current.focus();
                inputColorRef.current.click();
            }
        },
        []
    );

    useEffect(() => {
        if (colorPaletteRef.current) {
            const events = new TouchEvents(
                colorPaletteRef.current,
                ({ direction }) => {
                    if (['left', 'right'].includes(direction)) {
                        onRefreshPalette();
                    }
                }
            );
            return events.destroy();
        }
    }, [onRefreshPalette]);

    return (
        <>
            <LabelContainer>
                <Label>List Colour</Label>
                <Icon
                    size="1rem"
                    icon={Refresh}
                    color="currentColor"
                    onClick={onRefreshPalette}
                >
                    Refresh Palette
                </Icon>
                <TooltipContainer>
                    <Icon
                        size="1rem"
                        icon={Eyedropper}
                        color="currentColor"
                        onClick={onLaunchPicker}
                    >
                        Pick a colour
                    </Icon>
                    <input
                        ref={inputColorRef}
                        value={palette[index]}
                        onChange={e => {
                            e.preventDefault();
                            e.stopPropagation();
                            if (
                                inputColorRef.current &&
                                inputColorRef.current.value
                            ) {
                                onChangeColorFromPicker(
                                    inputColorRef.current.value
                                );
                            }
                        }}
                        type="color"
                        style={{
                            position: 'absolute',
                            visibility: 'hidden',
                            left: '50%',
                            transform: 'translateX(-50%)'
                        }}
                    />
                </TooltipContainer>
            </LabelContainer>

            <Container ref={colorPaletteRef}>
                {palette.map((color, idx) => (
                    <Color
                        type="button"
                        key={color}
                        onClick={() => onChangeColor(color)}
                        color={color}
                        $isCurrent={index === idx}
                    />
                ))}
            </Container>
        </>
    );
}

export default ColorPicker;
