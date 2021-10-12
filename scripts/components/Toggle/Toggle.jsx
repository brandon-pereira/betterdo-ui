import React, { useCallback, useState } from 'react';

import { Switch, Slider } from './Toggle.styles.js';

function Toggle({ value, onChange, disabled }) {
    const [checked, setChecked] = useState(value || false);

    const _onChange = useCallback(
        e => {
            const newState = e.target.checked;
            setChecked(newState);
            if (onChange) {
                onChange(e, newState);
            }
        },
        [onChange]
    );

    return (
        <Switch disabled={disabled}>
            <input
                type="checkbox"
                checked={checked}
                onChange={_onChange}
                disabled={disabled}
            />
            <Slider disabled={disabled} />
        </Switch>
    );
}

export default Toggle;
