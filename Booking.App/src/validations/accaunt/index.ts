export const EmailValidator = (value: string): string | undefined => {
    if (!value) return 'Email must not be empty';
    if (/[а-яА-Я]/.test(value)) return 'Value must not contain Cyrillic characters';
    if (value.length < 5) return 'Email must be at least 5 characters long';
    if (value.length > 254) return 'Email must be less than 254 characters long';
    if (!/^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]+$/.test(value)) {
        return 'Invalid email address format';
    }
    return undefined; // Return undefined if validation passes
};

export const PasswordValidator = (value: string): string | undefined => {
    if (!value) return 'Password must not be empty';
    if (value.length < 8) return 'Password must be at least 8 characters long';
    if (value.length > 24) return 'Password must be less than 24 characters long';
    if (!/[A-Z]/.test(value)) return 'Password must contain at least one uppercase letter';
    if (!/[a-z]/.test(value)) return 'Password must contain at least one lowercase letter';
    if (!/\d/.test(value)) return 'Password must contain at least one digit';
    if (!/[!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]/.test(value)) return 'Password must contain at least one special character';
    if (/[£# “”]/.test(value)) return 'Password must not contain the following characters: £ # “”';
    if (/[а-яА-Я]/.test(value)) return 'Value must not contain Cyrillic characters';
    return undefined; // Return undefined if validation passes
};

export const ConfirmPasswordValidator = (password: string, confirmPassword: string): string | undefined => {
    if (!confirmPassword) return 'Confirm Password must not be empty';
    if (confirmPassword !== password) return 'Passwords do not match';
    return undefined; // Return undefined if validation passes
};

export const FirstNameValidator = (value: string): string | undefined => {
    if (!value) return 'First Name must not be empty';
    if (value.length < 3) return 'First Name must be at least 3 characters long';
    if (value.length > 50) return 'First Name must be less than 50 characters long';
    if (!/^[A-Za-z\s]+$/.test(value)) return 'First Name must contain only letters and spaces';
    if (/[£# “”]/.test(value)) return 'First Name must not contain the following characters: £ # “”';
    return undefined; // Return undefined if validation passes
};

export const LastNameValidator = (value: string): string | undefined => {
    if (!value) return 'Last Name must not be empty';
    if (value.length < 3) return 'Last Name must be at least 3 characters long';
    if (value.length > 50) return 'Last Name must be less than 50 characters long';
    if (!/^[A-Za-z\s]+$/.test(value)) return 'Last Name must contain only letters and spaces';
    if (/[£# “”]/.test(value)) return 'Last Name must not contain the following characters: £ # “”';
    return undefined; // Return undefined if validation passes
};

export const AvatarValidator = (files: File[]): string | undefined => {
    if (files.length === 0) return 'Files are required';

    const maxSizeInBytes = 5 * 1024 * 1024; // 2 MB in bytes
    for (const file of files) {
        if (file.size > maxSizeInBytes) return 'File size must not exceed 2 MB';
    }
    return undefined;
};


