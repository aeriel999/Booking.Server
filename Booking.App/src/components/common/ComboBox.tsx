import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { IListForCombobox } from "../../interfaces/post";

interface ComboBoxProps {
    options: IListForCombobox[];
    onChange: (newValue: IListForCombobox) => void;
    label: string;
    defaultValue?: string;
}

export default function ComboBox({
    options,
    onChange,
    label,
    defaultValue,
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
        event: React.SyntheticEvent,
        newValue: IListForCombobox | null
    ) => {
        setSelectedOption(newValue);
        if (newValue) {
            onChange(newValue);
        }
    };

    return (
        <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={options}
            value={selectedOption}
            getOptionLabel={(option) => option.name} // Display the name in the dropdown
            sx={{ width: 400 }}
            onChange={handleChange} // Handle change event
            renderInput={(params) => <TextField {...params} label={label} />}
        />
    );
}
