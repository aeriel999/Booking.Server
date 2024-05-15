import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import {IListForCombobox} from "../../interfaces/post";

interface ComboBoxProps {
    options: IListForCombobox[];
    onChange: (newValue: IListForCombobox) => void;
    label: string;
}

export default function ComboBox({ options,  onChange, label }: ComboBoxProps) {
    // @ts-ignore
    const handleChange = (event , newValue : Option | null) => {
        if(newValue)
        {
            onChange(newValue);
        }
    };

    return (
        <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={options}
           // value={(option) => option.id}
            getOptionLabel={(option) => option.name} // Display the name in the dropdown
            sx={{ width: 400}}
            onChange={handleChange} // Handle change event
            renderInput={(params) => <TextField {...params} label={label} />}
        />
    );
}
