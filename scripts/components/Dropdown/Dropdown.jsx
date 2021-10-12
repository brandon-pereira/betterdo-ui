import React, { Component } from 'react';

import { SelectContainer, Icon, Select } from './Dropdown.styles.js';

import Chrevron from '@components/Icon/svgs/chevron.svg';

function Dropdown({ onSelect, values, value }) {
    const onChange = e => {
        const value = e.target.value;
        if (onSelect) {
            onSelect(value);
        }
    };

    return (
        <SelectContainer>
            <Select value={value} onChange={onChange}>
                {values.map(option => {
                    return (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    );
                })}
            </Select>
            <Icon size="1.5rem" color="#444" icon={Chrevron} />
        </SelectContainer>
    );
}

export default Dropdown;
