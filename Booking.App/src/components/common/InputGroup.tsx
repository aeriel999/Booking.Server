import React, { FC, useState } from 'react';
import { TextField } from "@mui/material";

interface InputGroupProps {
    label: string,
    type?: "text" | "password" | "email" | "number",
    field: string,
    validator: (value: string | number) => string | false | undefined,
    onChange: (isValid: boolean) => void,
    setIncomeValue?: (value: string) => void,
    defaultValue?: string | null | number,
    rowsCount?: number | null,
    isMultiline?: boolean | false,
}

const InputGroup: FC<InputGroupProps> = ({
    label,
    type = "text" ,
    field,
    onChange,
    validator,
    setIncomeValue,
    defaultValue,
    rowsCount,
    isMultiline
}) => {

    const [value, setValue] = useState(defaultValue ?? "");
    const [error, setError] = useState<string | false | undefined>(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        const errorMessage = validator(newValue);
        setValue(newValue);
        setError(errorMessage);
        onChange(!errorMessage);
        if (setIncomeValue)
            setIncomeValue(newValue);
    };

    return (
        <TextField
            fullWidth
            label={label}
            type={type}
            value={value}
            id={field}
            name={field}
            onChange={handleChange}
            error={!!error}
            helperText={error}
            rows={rowsCount === null ? 1 : rowsCount}
            multiline={!!isMultiline}
        />
    );
};

export default InputGroup;
