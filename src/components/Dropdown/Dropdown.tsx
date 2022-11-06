import { SelectContainer, Icon, Select } from './Dropdown.styles';

import Chrevron from '@components/Icon/svgs/chevron.svg';

interface Props {
    value?: string;
    values: {
        value: string;
        label: string;
    }[];
    onSelect: (value: string) => void;
}

function Dropdown({ onSelect, values, value }: Props) {
    const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
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
