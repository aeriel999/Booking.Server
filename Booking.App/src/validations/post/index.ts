export const CityNameValidator = (value: string): string | undefined => {
    if (!value) return "City must not be empty";
    if (value.length < 3) return "City must be at least 3 characters long";
    if (value.length > 50) return "City must be less than 50 characters long";
    if (!/^[A-Za-z\s]+$/.test(value))
        return "City must contain only letters and spaces";
    if (/[£#“”]/.test(value))
        return "City must not contain the following characters: £ # “”";
    return undefined; // Return undefined if validation passes
};

export const StreetNameValidator = (value: string): string | undefined => {
    if (!value) return "Street must not be empty";
    if (value.length < 3) return "Street must be at least 3 characters long";
    if (value.length > 50) return "Street must be less than 50 characters long";
    if (!/^[A-Za-z\s]+$/.test(value))
        return "Street must contain only letters and spaces";
    if (/[£#“”]/.test(value))
        return "Street must not contain the following characters: £ # “”";
    return undefined; // Return undefined if validation passes
};

export const PostNameValidator = (value: string): string | undefined => {
    if (!value) return "Title must not be empty";
    if (value.length < 8) return "Title must be at least 24 characters long";
    if (value.length > 256) return "Title must be less than 48 characters long";
    // if (!/^[A-Za-z0-9\s]+$/.test(value)) return 'Title must contain only letters, digits, and spaces';
    if (/[£#“”]/.test(value))
        return "Title must not contain the following characters: £ # “”";
    return undefined; // Return undefined if validation passes
};

export const DescriptionValidator = (value: string): string | undefined => {
    if (value.length < 256)
        return "Description must be at least 240 characters long";
    if (value.length > 5000)
        return "Description must be less than 1500 characters long";
    // if (!/^[A-Za-z0-9\s]+$/.test(value)) return 'Description must contain only letters, digits, and spaces';
    //if (/[£#“”]/.test(value)) return 'Description must not contain the following characters: £ # “”';
    return undefined; // Return undefined if validation passes
};

export const BuildingNumberValidator = (value: string): string | undefined => {
    if (value.length > 5)
        return "Number Of Building must be less than 5 characters long";
    if (!/^[A-Za-z0-9\s]+$/.test(value))
        return "Number Of Building must contain only letters, digits, and spaces";
    if (/[£#“”]/.test(value))
        return "Number Of Building must not contain the following characters: £ # “”";
    return undefined; // Return undefined if validation passes
};

export const NumberOfRoomsValidator = (value: string): string | undefined => {
    if (value.length > 5)
        return "Number Of Rooms must be less than 5 characters long";
    if (!/^\d+$/.test(value)) return "Number Of Rooms must contain only digits";
    return undefined; // Return undefined if validation passes
};

export const AreaValidator = (value: string): string | undefined => {
    if (value.length > 5) return "Area must be less than 5 characters long";
    if (!/^\d+$/.test(value)) return "Area must contain only digits";
    return undefined; // Return undefined if validation passes
};

export const PriceValidator = (value: string): string | undefined => {
    if (value.length > 10) return "Price must be less than 10 characters long";
    if (!/^\d+$/.test(value)) return "Price must contain only digits";
    return undefined; // Return undefined if validation passes
};
