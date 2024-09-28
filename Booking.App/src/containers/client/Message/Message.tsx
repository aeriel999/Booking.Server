import '../../../css/Message/index.scss';
import { formatDistanceToNow } from "date-fns"
import tabler_check from '../../../assets/Icons/tabler-check.svg';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { Status } from '../../../utils/enum';

interface IMessage {
    text: string,
    myMessage: boolean,
    date: Date,
    isRead: boolean | null
}
export const Message = (info: IMessage) => {
    const status = useSelector((state: RootState) => state.chat.status);
    return (
        <>
            <div id={info.myMessage ? "rightMessage" : "leftMessage"}>
                <div className='message-text'>
                    {info.text}
                </div>
                <div className='message-is-read'>

                    <img src={tabler_check} alt="Tabler Check 1" style={{ zIndex: status == Status.LOADING ? -1 : 0 }} />
                    {info.isRead == true ? <img src={tabler_check} alt="Tabler Check 2" /> : ""}


                </div>


            </div>
            <div style={{ alignSelf: info.myMessage ? "flex-end" : "flex-start" }}>{formatDistanceToNow(info.date, { addSuffix: true })}</div>
        </>
    )
}