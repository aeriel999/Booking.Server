import SendIcon from "../../assets/DashboardIcons/send.svg";
import { IChatMessageInfo, ISendMessage } from "../../interfaces/chat";
import { useForm } from "react-hook-form";
import { sendMessageResolver } from "../../validations/chat";
import { connection } from "../../SignalR";
import { useState } from "react";

export type ChatTextInputProps = {
    roomId: string;
    userId: string;
    setMessage: (arg: IChatMessageInfo) => void;
};

export const ChatTextInput = (props: ChatTextInputProps) => {
    const [isTyping, setIsTyping] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        setError,
        clearErrors,
        reset,
    } = useForm<ISendMessage>({ resolver: sendMessageResolver });

    const sendMessageSignalR = async (message: string, roomId: string) => {
        try {
            await connection.send('SendMessage', { message, roomId });
        } catch (error) {
            // Handle error sending message
            console.error("Failed to send message:", error);
            setError("message", { type: "manual", message: "Failed to send message." });
        }
    };

    const onSubmit = async (data: ISendMessage) => {
        await sendMessageSignalR(data.message, props.roomId);

        const messageInfo: IChatMessageInfo = {
            sentAt: new Date().toUTCString(),
            text: data.message,
            isRead: false,
            userId: props.userId,
        };

        props.setMessage(messageInfo);

        // Clear the form
        reset();

        setIsTyping(false);

    };

    return (
   <>
             <form
            onSubmit={handleSubmit(onSubmit)}
            className="sendMessageContainer"
            id="sendMessage"
        >
             <textarea
                    {...register("message")}
                    placeholder={"Enter your message"}
                    onChange={(e) => {
                        const newValue = e.target.value;
                        setIsTyping(newValue.length > 0); // Update typing state
                        setValue("message", newValue, { shouldValidate: true });
                        if (newValue) {
                            clearErrors("message"); // Clear the error when user starts typing
                        }
                    }}
                    className={isTyping ? "textFieldContainerActive" : "textFieldContainer"} // Apply class based on typing state
                    rows={3}
                />
            
            <button className="sendIcon">
                <img src={SendIcon} alt="Send" />
            </button>
        </form>

            {errors.message && (
                <div className="dashboardError">
                    * {errors.message.message}
                </div>
            )}
   </>
    );
};
