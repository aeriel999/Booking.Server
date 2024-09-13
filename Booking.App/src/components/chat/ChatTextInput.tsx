import SendIcon from "../../assets/DashboardIcons/send.svg";
import { IChatMessageInfo, ISendMessage } from "../../interfaces/chat";
import { useForm } from "react-hook-form";
import { sendMessageResolver } from "../../validations/chat";
import { connection } from "../../SignalR";

export type ChatTextInputProps = {
    roomId: string;
    userId: string;
    setMessage: (arg: IChatMessageInfo) => void;
};

export const ChatTextInput = (props: ChatTextInputProps) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm<ISendMessage>({ resolver: sendMessageResolver });

    const sendMessageSignalR = (message: string, roomId : string) =>
        connection.send('SendMessage', {message, roomId})
    
    const onSubmit = async (data: ISendMessage) => {
       await sendMessageSignalR(data.message, props.roomId)
       
       const messageInfo = {
            sentAt: new Date().toString(),
            text: data.message,
            isRead: true,
            userId: props.userId
       }

       props.setMessage(messageInfo)
    };

    return (
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
                    if (newValue) {
                        setValue("message", newValue, { shouldValidate: true });
                    }
                }}
                className="textFieldContainer"
                rows={3}
            />

            <button className="sendIcon">
                <img src={SendIcon} alt="" />
            </button>
        </form>
    );
};
