import { Resolver } from "react-hook-form";
import { ILogin } from "../../interfaces/account";

export const loginResolver: Resolver<ILogin> = async (values) => {
    const errors: Record<string, any> = {};

    const emailError = EmailValidator(values.email);
    if (emailError) {
        
        errors.email = {
            type: "validation",
            message: emailError,
        };
    }

    const passwordError = PasswordValidator(values.password);
    if (passwordError) {
        
        errors.password = {
            type: "validation",
            message: passwordError,
        };
    }

    return {
        values: Object.keys(errors).length === 0 ? values : {},
        errors,
    };
};

export const EmailValidator = (value: string | number): string | undefined => {
    const strValue = typeof value === "number" ? value.toString() : value;

    if (!strValue) return "Email must not be empty";
    if (/[а-яА-Я]/.test(strValue))
        return "Value must not contain Cyrillic characters";
    if (strValue.length < 5) return "Email must be at least 5 characters long";
    if (strValue.length > 254)
        return "Email must be less than 254 characters long";
    if (!/^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]+$/.test(strValue)) {
        return "Invalid email address format";
    }
    return undefined; // Return undefined if validation passes
};

export const PasswordValidator = (
    value: string | number
): string | undefined => {
    const strValue = typeof value === "number" ? value.toString() : value;

    if (!strValue) return "Password must not be empty";
    if (strValue.length < 8)
        return "Password must be at least 8 characters long";
    if (strValue.length > 24)
        return "Password must be less than 24 characters long";
    if (!/[A-Z]/.test(strValue))
        return "Password must contain at least one uppercase letter";
    if (!/[a-z]/.test(strValue))
        return "Password must contain at least one lowercase letter";
    if (!/\d/.test(strValue)) return "Password must contain at least one digit";
    if (!/[!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]/.test(strValue))
        return "Password must contain at least one special character";
    if (/[£# “”]/.test(strValue))
        return "Password must not contain the following characters: £ # “”";
    if (/[а-яА-Я]/.test(strValue))
        return "Value must not contain Cyrillic characters";
    return undefined; // Return undefined if validation passes
};

export const ConfirmPasswordValidator = (
    password: string | number,
    confirmPassword: string | number
): string | undefined => {
    const strPassword =
        typeof password === "number" ? password.toString() : password;
    const strConfirmPassword =
        typeof confirmPassword === "number"
            ? confirmPassword.toString()
            : confirmPassword;

    if (!strConfirmPassword) return "Confirm Password must not be empty";
    if (strConfirmPassword !== strPassword) return "Passwords do not match";
    return undefined; // Return undefined if validation passes
};

export const FirstNameValidator = (
    value: string | number
): string | undefined => {
    const strValue = typeof value === "number" ? value.toString() : value;

    if (!strValue) return "First Name must not be empty";
    if (strValue.length < 3)
        return "First Name must be at least 3 characters long";
    if (strValue.length > 50)
        return "First Name must be less than 50 characters long";
    if (!/^[A-Za-z\s]+$/.test(strValue))
        return "First Name must contain only letters and spaces";
    if (/[£# “”]/.test(strValue))
        return "First Name must not contain the following characters: £ # “”";
    return undefined; // Return undefined if validation passes
};

export const LastNameValidator = (
    value: string | number
): string | undefined => {
    const strValue = typeof value === "number" ? value.toString() : value;

    if (!strValue) return "Last Name must not be empty";
    if (strValue.length < 3)
        return "Last Name must be at least 3 characters long";
    if (strValue.length > 50)
        return "Last Name must be less than 50 characters long";
    if (!/^[A-Za-z\s]+$/.test(strValue))
        return "Last Name must contain only letters and spaces";
    if (/[£# “”]/.test(strValue))
        return "Last Name must not contain the following characters: £ # “”";
    return undefined; // Return undefined if validation passes
};

export const AvatarValidator = (files: File[]): string | undefined => {
    if (files.length === 0) return "Files are required";

    const maxSizeInBytes = 5 * 1024 * 1024; // 5 MB in bytes
    for (const file of files) {
        if (file.size > maxSizeInBytes) return "File size must not exceed 5 MB";
    }
    return undefined;
};
