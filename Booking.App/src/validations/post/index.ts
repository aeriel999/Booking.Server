import { Resolver } from "react-hook-form";
import { IPostCreate } from "../../interfaces/post";

export const addPostResolver: Resolver<IPostCreate> = async (
    values
) => {
    const errors: Record<string, any> = {};

    const nameError = PostNameValidator(values.name);
    if (nameError) {
        errors.name = {
            type: "validation",
            message: nameError,
        };
    }

    return {
        values: Object.keys(errors).length === 0 ? values : {},
        errors,
    };
};

export const PostNameValidator = (value: string | number): string | undefined => {
    const strValue = typeof value === 'number' ? value.toString() : value;

    if (!strValue) return "Title must not be empty";
    if (strValue.length < 8) return "Title must be at least 24 characters long";
    if (strValue.length > 256) return "Title must be less than 48 characters long";
    // if (!/^[A-Za-z0-9\s]+$/.test(value)) return 'Title must contain only letters, digits, and spaces';
    if (/[£#“”]/.test(strValue))
        return "Title must not contain the following characters: £ # “”";
    return undefined; // Return undefined if validation passes
};

export const CityNameValidator = (value: string | number): string | false | undefined => {
    // Convert the value to a string if it is a number
    const strValue = typeof value === 'number' ? value.toString() : value;

    if (!strValue) return "City must not be empty";
    if (strValue.length < 3) return "City must be at least 3 characters long";
    if (strValue.length > 50) return "City must be less than 50 characters long";
    if (!/^[A-Za-z\s]+$/.test(strValue))
        return "City must contain only letters and spaces";
    if (/[£#“”]/.test(strValue))
        return "City must not contain the following characters: £ # “”";
    return undefined; // Return undefined if validation passes
};

export const StreetNameValidator = (value: string | number): string | undefined => {
    const strValue = typeof value === 'number' ? value.toString() : value;
    if (!strValue) return "Street must not be empty";
    if (strValue.length < 3) return "Street must be at least 3 characters long";
    if (strValue.length > 50) return "Street must be less than 50 characters long";
    if (!/^[A-Za-z\s]+$/.test(strValue))
        return "Street must contain only letters and spaces";
    if (/[£#“”]/.test(strValue))
        return "Street must not contain the following characters: £ # “”";
    return undefined; // Return undefined if validation passes
};



export const DescriptionValidator = (value: string | number): string | undefined => {
    const strValue = typeof value === 'number' ? value.toString() : value;

    if (strValue.length < 256)
        return "Description must be at least 240 characters long";
    if (strValue.length > 5000)
        return "Description must be less than 1500 characters long";
    // if (!/^[A-Za-z0-9\s]+$/.test(value)) return 'Description must contain only letters, digits, and spaces';
    //if (/[£#“”]/.test(value)) return 'Description must not contain the following characters: £ # “”';
    return undefined; // Return undefined if validation passes
};

export const ZipCodeValidator = (value: string | number): string | false | undefined => {
    const zipCode = typeof value === "string" ? parseInt(value, 10) : value;
  
    // Ensure the value is a positive number
    if (zipCode <= 0) {
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
    const strValue = typeof value === 'number' ? value.toString() : value;

    if (strValue.length > 10) return "Price must be less than 10 characters long";
    if (!/^\d+$/.test(strValue)) return "Price must contain only digits";
    return undefined; // Return undefined if validation passes
};
