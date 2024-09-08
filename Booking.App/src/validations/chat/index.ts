import { Resolver } from "react-hook-form";
import { ISendMessage } from "../../interfaces/chat";

export const sendMessageResolver: Resolver<ISendMessage> = async (values) => {
    const errors: Record<string, any> = {};

    const messageErrors = MessageValidator(values.message);
    if (messageErrors) {
        errors.message = {
            type: "validation",
            message: messageErrors,
        };
    }

    return {
        values: Object.keys(errors).length === 0 ? values : {},
        errors,
    };
};

export const MessageValidator = (value: string): string | undefined => {
    if (!value) return "Message must not be empty";
    if (value.length < 5) return "Message must be at least 5 characters long";
    if (value.length > 4000)
        return "Message must be less than 4000 characters long";
    return undefined; // Return undefined if validation passes
};
