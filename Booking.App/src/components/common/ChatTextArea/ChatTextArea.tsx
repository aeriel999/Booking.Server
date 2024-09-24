import '../../../css/ChatTextAreaClasses/index.scss';
import SendIcon from "../../../assets/DashboardIcons/send.svg";
import { useState } from 'react';
import { connection } from '../../../SignalR';
import { IChatMessageInfo, ISendMessage } from '../../../interfaces/chat';
import { useForm } from 'react-hook-form';
import { sendMessageResolver } from '../../../validations/chat';
import { RootState } from '../../../store';
import { useAppSelector } from '../../../hooks/redux';
import * as signalR from "@microsoft/signalr";
interface IChatTextArea {
    maxLength: number,
    roomId: string,
    addNewMessage: React.Dispatch<React.SetStateAction<IChatMessageInfo[]>>,
    messages: IChatMessageInfo[]
}

export const ChatTextArea = (info: IChatTextArea) => {
    const user = useAppSelector((state: RootState) => state.account.user);
    const [textLength, setTextLength] = useState<number>(0);

    const {
        register,
        handleSubmit,
        formState: { isSubmitting, errors },
        setValue

    } = useForm<ISendMessage>({ resolver: sendMessageResolver })

    // const sendMessageSignalR = (message: string, roomId: string) =>
    //     connection.send('SendMessage', { message, roomId })
    const sendMessageSignalR = async (message: string, roomId: string) => {
        if (connection.state === signalR.HubConnectionState.Connected) {
            await connection.send("SendMessage", { message, roomId });
        } else {
            await connection.start().then(async () => {
                await connection.send("SendMessage", { message, roomId });
            });
        }
    }
    const onSubmit = async (data: ISendMessage) => {
        await sendMessageSignalR(data.message, info.roomId)
        info.addNewMessage([
            ...info.messages,
            {
                text: data.message,
                userId: user!.id,
                isRead: false,
                date: new Date()
            }
        ]);
    };
    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {

        const newValue = e.target.value;
        if (newValue) {
            setValue("message", newValue, { shouldValidate: true });
        }

        setTextLength(e.target.value.length);
    };
    return (
        <div className="chat-text-area">
            <form onSubmit={handleSubmit(onSubmit)}>


                <textarea
                    {...register("message")}
                    placeholder="Message"
                    maxLength={info.maxLength}

                    onChange={handleChange}></textarea>
                <div>
                    <button
                        type='submit'
                        disabled={isSubmitting}> <img src={SendIcon} alt="" /></button>
                    <p>{textLength}/{info.maxLength}</p>
                </div>

            </form>
            {errors.message ? <div className='error-message'>{errors.message.message}</div> : ""}
        </div>
    )
}