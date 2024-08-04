import { Resolver } from "react-hook-form";
import { IPostCreate } from "../../interfaces/post";

export const addPostResolver: Resolver<IPostCreate> = async (values) => {
    const errors: Record<string, any> = {};

    const nameError = PostNameValidator(values.name);
    if (nameError) {
        errors.name = {
            type: "validation",
            message: nameError,
        };
    }

    const cityError = CityNameValidator(values.cityName);
    if (cityError) {
        errors.cityName = {
            type: "validation",
            message: cityError,
        };
    }

    const streetError = CityNameValidator(values.cityName);
    if (streetError) {
        errors.streetError = {
            type: "validation",
            message: streetError,
        };
    }

    const zipCodeError = ZipCodeValidator(values.zipCode);
    if (zipCodeError) {
        errors.zipCode = {
            type: "validation",
            message: zipCodeError,
        };
    }

    const numberOfGuestsError = ZipCodeValidator(values.numberOfGuests);
    if (zipCodeError) {
        errors.zipCode = {
            type: "validation",
            message: zipCodeError,
        };
    }

    return {
        values: Object.keys(errors).length === 0 ? values : {},
        errors,
    };
};

export const PostNameValidator = (value: string): string | undefined => {
    if (!value) return "Title must not be empty";
    if (value.length < 8) return "Title must be at least 24 characters long";
    if (value.length > 256) return "Title must be less than 48 characters long";
    if (/[£#“”]/.test(value))
        return "Title must not contain the following characters: £ # “”";
    return undefined; // Return undefined if validation passes
};

export const CityNameValidator = (
    value: string | null
): string | false | undefined => {
    if (value === null || value === undefined || value.length === 0) {
        return false;
    } else {
        if (value !== undefined && value.length < 3)
            return "City must be at least 3 characters long";
        if (value !== undefined && value.length > 50)
            return "City must be less than 50 characters long";
        if (!/^[A-Za-z\s]+$/.test(value))
            return "City must contain only letters and spaces";
        if (/[£#“”]/.test(value))
            return "City must not contain the following characters: £ # “”";
        return undefined;
    }
};

export const StreetNameValidator = (
    value: string | null
): string | false | undefined => {
    if (value === null || value === undefined || value.length === 0) {
        return false;
    } else {
        if (!value) return "Street must not be empty";
        if (value.length < 3)
            return "Street must be at least 3 characters long";
        if (value.length > 50)
            return "Street must be less than 50 characters long";
        if (!/^[A-Za-z\s]+$/.test(value))
            return "Street must contain only letters and spaces";
        if (/[£#“”]/.test(value))
            return "Street must not contain the following characters: £ # “”";
        return undefined; // Return undefined if validation passes
    }
};

export const ZipCodeValidator = (
    value:  number
): string | false | undefined => {
    const zipCode = typeof value === "string" ? parseInt(value, 10) : value;

    // Ensure the value is a positive number
    if (zipCode < 0) {
        return "Zip code must be a positive number";
    }

    // Ensure the value is a 5-digit number
    const zipCodeString = zipCode.toString();
    if (zipCodeString.length !== 5) {
        return "Zip code must be a 5-digit number";
    }

    // If all checks pass, return undefined indicating no errors
    return undefined;
};


export const NumberOfGuestsValidator = (value: number): string | undefined => {
    if (value < 0) {
        return "Value must be a positive number";
    }

    if (value > 20) {
        return "Value must be less than or equal to 20 ";
    }

    return undefined;
};

export const DescriptionValidator = (
    value: string | number
): string | undefined => {
    const strValue = typeof value === "number" ? value.toString() : value;

    if (strValue.length < 256)
        return "Description must be at least 240 characters long";
    if (strValue.length > 5000)
        return "Description must be less than 1500 characters long";
    // if (!/^[A-Za-z0-9\s]+$/.test(value)) return 'Description must contain only letters, digits, and spaces';
    //if (/[£#“”]/.test(value)) return 'Description must not contain the following characters: £ # “”';
    return undefined; // Return undefined if validation passes
};



// export const NumberOfRoomsValidator = (value: string): string | undefined => {
//     if (value.length > 5)
//         return "Number Of Rooms must be less than 5 characters long";
//     if (!/^\d+$/.test(value)) return "Number Of Rooms must contain only digits";
//     return undefined; // Return undefined if validation passes
// };

// export const AreaValidator = (value: string): string | undefined => {
//     if (value.length > 5) return "Area must be less than 5 characters long";
//     if (!/^\d+$/.test(value)) return "Area must contain only digits";
//     return undefined; // Return undefined if validation passes
// };

export const PriceValidator = (value: string | number): string | undefined => {
    const strValue = typeof value === "number" ? value.toString() : value;

    if (strValue.length > 10)
        return "Price must be less than 10 characters long";
    if (!/^\d+$/.test(strValue)) return "Price must contain only digits";
    return undefined; // Return undefined if validation passes
};
