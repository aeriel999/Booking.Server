 
import SendIcon from "../../assets/DashboardIcons/send.svg";
import { IUserMessage } from "../../interfaces/chat";
import { useForm } from "react-hook-form";
import { sendMessageResolver } from "../../validations/chat";
import { useState } from "react";

 

export type ChatTextInputProps = {
    chatId: string
}

export const ChatTextInput = (props: ChatTextInputProps) => {
    const[msg, setMsg] = useState<string>("");
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm<IUserMessage>({ resolver: sendMessageResolver });
    const onSubmit = async (data: IUserMessage) => {}
    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="sendMessageContainer"
            id="sendMessage"
            >
            <textarea
                {...register("message")}
                placeholder={"Enter your message"}
                onChange={(e)=>{ 
                    const newValue = e.target.value;
                    if (newValue) {
                        setValue("message", newValue, { shouldValidate: true })
                    }}}
                className="textFieldContainer"
                rows={3}
            />
            
            <button className="sendIcon">
                    <img src={SendIcon} alt="" />
            </button>
        </form>
    );
};
