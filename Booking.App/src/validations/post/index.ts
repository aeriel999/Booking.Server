import { Resolver } from "react-hook-form";
import { IPostCreate, IRoom } from "../../interfaces/post";

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

    const numberOfGuestsError = NumberOfGuestsValidator(values.numberOfGuests);
    if (numberOfGuestsError) {
        errors.numberOfGuests = {
            type: "validation",
            message: numberOfGuestsError,
        };
    }

    const priceError = PriceValidator(values.price);
    if (priceError) {
        errors.price = {
            type: "validation",
            message: priceError,
        };
    }

    const discountError = DiscountValidator(values.discount);
    if (discountError) {
        errors.discount = {
            type: "validation",
            message: discountError,
        };
    }
    return {
        values: Object.keys(errors).length === 0 ? values : {},
        errors,
    };
};

export const addRoomResolver: Resolver<IRoom> = async (values) => {
    const errors: Record<string, any> = {};

    const numberOfGuestsError = NumberOfGuestsValidator(values.numberOfGuests);
    if (numberOfGuestsError) {
        errors.numberOfGuests = {
            type: "validation",
            message: numberOfGuestsError,
        };
    }

    const numberOfRomsError = NumberOfRoomsValidator(values.numberOfRooms);
    if (numberOfGuestsError) {
        errors.numberOfRooms = {
            type: "validation",
            message: numberOfRomsError,
        };
    }

    const priceError = PriceValidator(values.price);
    if (priceError) {
        errors.price = {
            type: "validation",
            message: priceError,
        };
    }

    const discountError = DiscountValidator(values.discount);
    if (discountError) {
        errors.discount = {
            type: "validation",
            message: discountError,
        };
    }

    const mainImageError = ImageValidator(values.mainImage);
    if (mainImageError) {
        errors.mainImage = {
            type: "validation",
            message: mainImageError,
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
    value: number
): string | boolean | undefined => {
    const zipCode = typeof value === "string" ? parseInt(value, 10) : value;

    // Ensure the value is a positive number
    if (zipCode < 0) {
        return "Zip code must be a positive number";
    }

    // Ensure the value is a 5-digit number
    if (zipCode !== undefined) {
        const zipCodeString = zipCode.toString();
        if (zipCodeString.length !== 5) {
            return "Zip code must be a 5-digit number";
        }
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
export const NumberOfRoomsValidator = (value: number): string | undefined => {
    if (value < 0) {
        return "Value must be a positive number";
    }

    if (value > 1000) {
        return "Value must be less than or equal to 1000 ";
    }

    return undefined;
};

export const PriceValidator = (value: number): string | undefined => {
    const strValue = typeof value === "number" ? value.toString() : value;
    if (strValue !== undefined && strValue.length < 1)
        return "It is an required field";
    if (strValue !== undefined && strValue.length > 10)
        return "Price must be less than 10 characters long";
    if (!/^\d+$/.test(strValue)) return "Price must contain only digits";
    return undefined; // Return undefined if validation passes
};

export const DiscountValidator = (
    value: number | null
): string | undefined | boolean => {
    if (value === null || value === undefined || value.toString() === "") {
        return false;
    } else {
        if (value < 1) {
            return "Discount must be at least 1%";
        }
        if (value > 75) {
            return "Discount must be at most 75%";
        }
        return undefined; // Return undefined if validation passes
    }
};

export const ImageValidator = (file: File): string | undefined => {
    if (file === null) return "Files are required";

    const maxSizeInBytes = 5 * 1024 * 1024; // 5 MB in bytes
    const validFormats = ["image/png", "image/jpeg", "image/jpg", "image/gif"];

    if (file.size > maxSizeInBytes) return "File size must not exceed 5 MB";
    if (!validFormats.includes(file.type)) return "Invalid file format";

    return undefined;
};

export const ImagesValidator = (files: File[]): string | undefined => {
    if (files.length === 0) return "Files are required";

    const maxSizeInBytes = 5 * 1024 * 1024; // 5 MB in bytes
    const validFormats = ["image/png", "image/jpeg", "image/jpg", "image/gif"];

    for (const file of files) {
        if (file.size > maxSizeInBytes) return "File size must not exceed 5 MB";
        if (!validFormats.includes(file.type)) return "Invalid file format";
    }

    return undefined;
};
