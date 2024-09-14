import '../../../css/Message/index.scss';
import { formatDistanceToNow } from "date-fns"
import tabler_check from '../../../assets/Icons/tabler-check.svg';
import { useRef } from 'react';

interface IMessage {
    text: string,
    myMessage: boolean,
    date: Date,
    isRead: boolean | null
}
export const Message = (info: IMessage) => {
    return (
        <>
            <div id={info.myMessage ? "rightMessage" : "leftMessage"}>
                <div className='message-text'>
                    {info.text}
                </div>
                {!info.myMessage ? <div className='message-is-read'>
                    {info.isRead != null ? (<>
                        <img src={tabler_check} alt="Tabler Check 1" />
                        {info.isRead == true ? <img src={tabler_check} alt="Tabler Check 2" /> : ""}
                    </>) : ""}

                </div> : ""}


            </div>
            <div style={{ alignSelf: info.myMessage ? "flex-end" : "flex-start" }}>{formatDistanceToNow(info.date, { addSuffix: true })}</div>
        </>
    )
}
//