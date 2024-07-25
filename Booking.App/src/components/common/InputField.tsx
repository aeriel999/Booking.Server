import React from "react";
import { UseFormRegister, UseFormSetValue } from "react-hook-form";
import "../../css/AuthenticationClasses/index.scss";

type InputFieldProps = {
    placeholder: string;
    register: UseFormRegister<any>;
    name: string;
    type: string;
    setValue: UseFormSetValue<any>;
    className: string;
    defaultValue?: string | number | readonly string[] | undefined;
};

const InputField: React.FC<InputFieldProps> = ({
    placeholder,
    register,
    name,
    type,
    setValue,
    className,
    defaultValue,
}) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setValue(name, newValue, { shouldValidate: true });
    };

    return (
        // <div  >
        //     <input
        //         {...register(name)}
        //         placeholder={placeholder}
        //         type={type}
        //         onChange={handleChange}
        //         className={className}
        //     />
        //     {error && <p>{error.message}</p>}
        // </div>
        <input
            {...register(name)}
            placeholder={placeholder}
            type={type}
            onChange={handleChange}
            className={className}
            defaultValue={defaultValue ? defaultValue : undefined}
        />
    );
};

export default InputField;
