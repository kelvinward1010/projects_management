'use client';

import { Select } from 'antd';
import ReactSelect from 'react-select'

interface SelectProps {
    label: string;
    value?: any;
    onChange: (value: string) => void;
    options: any[];
    disabled?: boolean;
    defaultValue?: string | null;
}

const SelectTask: React.FC<SelectProps> = ({
    label,
    value,
    onChange,
    options,
    disabled,
    defaultValue
}) => {
    return (
        <div className="z-[100]">
            <label
                className="
                    block 
                    text-sm 
                    font-medium 
                    leading-6 
                    text-gray-900
                "
            >
                {label}
            </label>
            <div className="mt-2">
                <Select
                    disabled={disabled}
                    defaultValue={defaultValue}
                    onChange={onChange}
                    style={{ width: "100%" }}
                    options={options}
                    value={value}
                />
            </div>
        </div>
    );
}

export default SelectTask;