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
    isExist?: (isExist: boolean) => void;
};

const InputField: React.FC<InputFieldProps> = ({
    placeholder,
    register,
    name,
    type,
    setValue,
    className,
    defaultValue,
    isExist,
}) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        if (newValue && isExist) {
            isExist(true);

            if (newValue!.length < 2) {
                isExist(false);
            }
        }

        setValue(name, newValue, { shouldValidate: true });
    };

    return (
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
