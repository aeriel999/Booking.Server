import React, {FC, useState} from 'react';
import { TextField } from "@mui/material";

interface InputGroupProps{
    label: string,
    type?: "text" | "password" | "email" | "number",
    field: string,
    validator: (value: string) => string | false | undefined;
    onChange: (isValid: boolean) => void;
    setIncomeValue?: (value: string) => void;

}

const InputGroup: FC<InputGroupProps> = ({
                                             label,
                                             type = "text",
                                             field,
                                             onChange,
                                             validator,
                                             setIncomeValue,

                                         }) => {

    const [value, setValue] = useState("");
    const [error, setError] = useState<string | false | undefined>(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        const errorMessage = validator(newValue);
        setValue(newValue);
        setError(errorMessage);
        onChange(!errorMessage);
        if(setIncomeValue)
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

        />
    );
};

export default InputGroup;
