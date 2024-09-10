import '../../../css/ChatTextAreaClasses/index.scss';
import SendIcon from "../../../assets/DashboardIcons/send.svg";
import { useState } from 'react';

interface IChatTextArea {
    maxLength: number
}
export const ChatTextArea = (info: IChatTextArea) => {
    const [textLength, setTextLength] = useState<number>(0);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setTextLength(e.target.value.length);
    };
    return (
        <div className="chat-text-area">
            <textarea
                placeholder="Message"
                maxLength={info.maxLength}
                onChange={handleChange}></textarea>
            <div>
                <button> <img src={SendIcon} alt="" /></button>
                <p>{textLength}/{info.maxLength}</p>
            </div>

        </div>
    )
}