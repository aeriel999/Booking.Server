import { Resolver } from "react-hook-form";
import {
    IEditRealtorInfo,
    IForgotPassword,
    ILogin,
    IRealtorRegister,
    IReconfirmEmail,
    IResetPassword,
    IUserRegister,
} from "../../interfaces/account";
import { IChangePassword, ICreatePassword, IEditClientProfile } from "../../interfaces/user";
import { isValidPhoneNumber } from "libphonenumber-js";

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

export const userRegisterResolver: Resolver<IUserRegister> = async (values) => {
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

    const confirmPasswordError = ConfirmPasswordValidator(
        values.password,
        values.confirmPassword
    );
    if (confirmPasswordError) {
        errors.confirmPassword = {
            type: "validation",
            message: confirmPasswordError,
        };
    }
    return {
        values: Object.keys(errors).length === 0 ? values : {},
        errors,
    };
};

export const realtorRegisterResolver: Resolver<IRealtorRegister> = async (
    values
) => {
    const errors: Record<string, any> = {};

    const firstNameError = FirstNameValidator(values.firstName);
    if (firstNameError) {
        errors.firstName = {
            type: "validation",
            message: firstNameError,
        };
    }

    const lastNameError = LastNameValidator(values.lastName);
    if (lastNameError) {
        errors.lastName = {
            type: "validation",
            message: lastNameError,
        };
    }

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

    const confirmPasswordError = ConfirmPasswordValidator(
        values.password,
        values.confirmPassword
    );
    if (confirmPasswordError) {
        errors.confirmPassword = {
            type: "validation",
            message: confirmPasswordError,
        };
    }
    return {
        values: Object.keys(errors).length === 0 ? values : {},
        errors,
    };
};

export const forgotPasswordResolver: Resolver<IForgotPassword> = async (
    values
) => {
    const errors: Record<string, any> = {};

    const emailError = EmailValidator(values.email);
    if (emailError) {
        errors.email = {
            type: "validation",
            message: emailError,
        };
    }

    return {
        values: Object.keys(errors).length === 0 ? values : {},
        errors,
    };
};

export const resetPasswordResolver: Resolver<IResetPassword> = async (
    values
) => {
    const errors: Record<string, any> = {};

    const passwordError = PasswordValidator(values.password);
    if (passwordError) {
        errors.password = {
            type: "validation",
            message: passwordError,
        };
    }

    const confirmPasswordError = ConfirmPasswordValidator(
        values.password,
        values.confirmPassword
    );
    if (confirmPasswordError) {
        errors.confirmPassword = {
            type: "validation",
            message: confirmPasswordError,
        };
    }

    return {
        values: Object.keys(errors).length === 0 ? values : {},
        errors,
    };
};

export const reconfirmemaildResolver: Resolver<IReconfirmEmail> = async (
    values
) => {
    const errors: Record<string, any> = {};

    const emailError = EmailValidator(values.email);
    if (emailError) {
        errors.email = {
            type: "validation",
            message: emailError,
        };
    }

    return {
        values: Object.keys(errors).length === 0 ? values : {},
        errors,
    };
};

export const editClientProfileResolver: Resolver<IEditClientProfile> = async (
    values
) => {
    const errors: Record<string, any> = {};

    const emailError = EmailValidator(values.email);
    if (emailError) {
        errors.email = {
            type: "validation",
            message: emailError,
        };
    }

    const firstNameError = FirstNameValidator(values.firstName);
    if (firstNameError) {
        errors.firstName = {
            type: "validation",
            message: firstNameError
        }
    }

    const lastNameError = LastNameValidator(values.lastName);
    if (lastNameError) {
        errors.lastName = {
            type: "validation",
            message: lastNameError
        }
    }

    return {
        values: Object.keys(errors).length === 0 ? values : {},
        errors,
    };
};

export const realtorEditProfileResolver: Resolver<IEditRealtorInfo> = async (
    values
) => {
    const errors: Record<string, any> = {};

    if (values.firstName !== null) {
        const firstNameError = FirstNameValidator(values.firstName);
        if (firstNameError) {
            errors.firstName = {
                type: "validation",
                message: firstNameError,
            };
        }
    }

    if (values.lastName !== null) {
        const lastNameError = LastNameValidator(values.lastName);
        if (lastNameError) {
            errors.lastName = {
                type: "validation",
                message: lastNameError,
            };
        }
    }

    if (values.email !== null) {
        const emailError = EmailValidator(values.email);
        if (emailError) {
            errors.email = {
                type: "validation",
                message: emailError,
            };
        }
    }

    return {
        values: Object.keys(errors).length === 0 ? values : {},
        errors,
    };
};

export const changePasswordResolver: Resolver<IChangePassword> = async (
    values
) => {
    const errors: Record<string, any> = {};

    const currentPasswordError = PasswordValidator(values.currentPassword);
    if (currentPasswordError) {
        errors.currentPassword = {
            type: "validation",
            message: currentPasswordError,
        };
    }

    const passwordError = PasswordValidator(values.newPassword);
    if (passwordError) {
        errors.newPassword = {
            type: "validation",
            message: passwordError,
        };
    }

    const confirmNewPasswordError = ConfirmPasswordValidator(
        values.newPassword,
        values.confirmNewPassword
    );
    if (confirmNewPasswordError) {
        errors.confirmNewPassword = {
            type: "validation",
            message: confirmNewPasswordError,
        };
    }

    return {
        values: Object.keys(errors).length === 0 ? values : {},
        errors,
    };
};

export const createPasswordResolver: Resolver<ICreatePassword> = async (
    values
) => {
    const errors: Record<string, any> = {};

    const passwordErrors = PasswordValidator(values.password);
    if (passwordErrors) {
        errors.password = {
            type: 'validation',
            message: passwordErrors
        }
    }

    const confirmPasswordErrors = ConfirmPasswordValidator(
        values.password,
        values.confirmPassword
    );

    if (confirmPasswordErrors) {
        errors.confirmPassword = {
            type: 'validation',
            message: confirmPasswordErrors
        }
    }

    return {
        values: Object.keys(errors).length === 0 ? values : {},
        errors
    }
}

export const EmailValidator = (value: string): string | undefined => {
    if (!value) return "Email must not be empty";
    if (/[а-яА-Я]/.test(value))
        return "Value must not contain Cyrillic characters";
    if (value.length < 5) return "Email must be at least 5 characters long";
    if (value.length > 254)
        return "Email must be less than 254 characters long";
    if (!/^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]+$/.test(value)) {
        return "Invalid email address format";
    }
    return undefined; // Return undefined if validation passes
};

export const PasswordValidator = (value: string): string | undefined => {
    if (!value) return "Password must not be empty";
    if (value.length < 8) return "Password must be at least 8 characters long";
    if (value.length > 24)
        return "Password must be less than 24 characters long";
    if (!/[A-Z]/.test(value))
        return "Password must contain at least one uppercase letter";
    if (!/[a-z]/.test(value))
        return "Password must contain at least one lowercase letter";
    if (!/\d/.test(value)) return "Password must contain at least one digit";
    if (!/[!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]/.test(value))
        return "Password must contain at least one special character";
    if (/[£# “”]/.test(value))
        return "Password must not contain the following characters: £ # “”";
    if (/[а-яА-Я]/.test(value))
        return "Value must not contain Cyrillic characters";
    return undefined; // Return undefined if validation passes
};

export const ConfirmPasswordValidator = (
    password: string,
    confirmPassword: string
): string | undefined => {
    if (!confirmPassword) return "Confirm Password must not be empty";
    if (confirmPassword !== password) return "Passwords do not match";
    return undefined; // Return undefined if validation passes
};

export const FirstNameValidator = (value: string): string | undefined => {
    if (!value) return "First Name must not be empty";
    if (value.length < 3)
        return "First Name must be at least 3 characters long";
    if (value.length > 50)
        return "First Name must be less than 50 characters long";
    if (!/^[A-Za-z\s]+$/.test(value))
        return "First Name must contain only letters and spaces";
    if (/[£# “”]/.test(value))
        return "First Name must not contain the following characters: £ # “”";
    return undefined; // Return undefined if validation passes
};

export const LastNameValidator = (value: string): string | undefined => {
    if (!value) return "Last Name must not be empty";
    if (value.length < 3) return "Last Name must be at least 3 characters long";
    if (value.length > 50)
        return "Last Name must be less than 50 characters long";
    if (!/^[A-Za-z\s]+$/.test(value))
        return "Last Name must contain only letters and spaces";
    if (/[£# “”]/.test(value))
        return "Last Name must not contain the following characters: £ # “”";
    return undefined; // Return undefined if validation passes
};

export const ImageValidator = (files: File[]): string | undefined => {
    if (files.length === 0) return "Files are required";

    const maxSizeInBytes = 5 * 1024 * 1024; // 5 MB in bytes
    const validFormats = ["image/png", "image/jpeg", "image/jpg", "image/gif"];

    for (const file of files) {
        if (file.size > maxSizeInBytes) return "File size must not exceed 5 MB";
        if (!validFormats.includes(file.type)) return "Invalid file format";
    }

    return undefined;
};

export const AvatarValidator = (file: File): string | undefined => {
    if (file === null) return "Files are required";

    const maxSizeInBytes = 5 * 1024 * 1024; // 5 MB in bytes
    const validFormats = ["image/png", "image/jpeg", "image/jpg", "image/gif"];

    if (file.size > maxSizeInBytes) return "File size must not exceed 5 MB";
    if (!validFormats.includes(file.type)) return "Invalid file format";

    return undefined;
};

export const PhoneNumberValidator = (value: string): string | undefined => {
    if (!value || !isValidPhoneNumber(value)) {
        return "Invalid phone number";
    }

    return undefined;
};
