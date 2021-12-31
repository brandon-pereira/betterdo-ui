import React, { useCallback, useState } from 'react';

import { Container, Selection } from './Selector.styles';

// this is a fairly primitive implementation, could this use generics?
interface Props {
    value?: string;
    values: {
        value: string;
        label: string;
    }[];
    onSelect: (value: string) => void;
}

function Selector({ value, values, onSelect }: Props) {
    const [selectedValue, setSelectedValue] = useState<string>(
        value || values[0].value
    );

    const onChange = useCallback(
        (e, value: string) => {
            setSelectedValue(value);
            if (onSelect) {
                onSelect(value);
            }
        },
        [onSelect]
    );

    return (
        <Container>
            {values.map(value => (
                <Selection
                    onClick={e => onChange(e, value.value)}
                    key={value.value}
                    selected={value.value === selectedValue}
                >
                    {value.label}
                </Selection>
            ))}
        </Container>
    );
}

export default Selector;
