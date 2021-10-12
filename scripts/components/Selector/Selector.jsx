import React, { useCallback, useState } from 'react';

import { Container, Selection } from './Selector.styles.js';

function Selector({ value, values, onSelect }) {
    const [selectedValue, setSelectedValue] = useState(
        value || values[0].value
    );

    const onChange = useCallback(
        (e, value) => {
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
