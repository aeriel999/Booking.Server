import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { IListForCombobox } from "../../interfaces/post";

interface ComboBoxProps {
    options: IListForCombobox[];
    onChange: (newValue: IListForCombobox | null) => void;
    label: string;
    defaultValue?: string;
    isValid: (isValid: boolean) => void;
}

export default function ComboBox({
    options,
    onChange,
    label,
    defaultValue,
    isValid,
}: ComboBoxProps) {
    const [selectedOption, setSelectedOption] =
        useState<IListForCombobox | null>(
            options.find((option) => option.name === defaultValue) || null
        );

    useEffect(() => {
        const defaultOpt =
            options.find((option) => option.name === defaultValue) || null;
        setSelectedOption(defaultOpt);
    }, [defaultValue, options]);

    const handleChange = (
        _event: React.SyntheticEvent,
        newValue: IListForCombobox | null
    ) => {
        if (newValue === null) {
            isValid(false);
        } else {
            isValid(true);
        }
        setSelectedOption(newValue);
        onChange(newValue);
    };

    return (
        <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={options}
            value={selectedOption}
            getOptionLabel={(option) => option.name} // Display the name in the dropdown
            sx={{ minHeight: 40 }}
            onChange={handleChange} // Handle change event
            renderInput={(params) => (
                <TextField
                    {...params}
                    label={label}
                    sx={{ fontFamily: "Roboto, sans-serif" }}
                />
            )}
        />
    );
}
