import { IChatMessageInfo } from "../../interfaces/chat";
import "../../css/DashBoardAnonymousClasses/index.scss";

// MessageLeft component
export const MessageLeft = (userMsg: IChatMessageInfo) => {
    return (
        <div className="messageRow">
            <div className="messageBlue">
                <div className="messageContent">{userMsg.text}</div>

                <div className="messageTimestampRight">{userMsg.sentAt}</div>
            </div>
        </div>
    );
};

// MessageRight component
export const MessageRight = (userMsg: IChatMessageInfo) => {
    return (
        <div className="messageRowRight">
            <div className="messageOrange">
                <div className="messageContent">{userMsg.text}</div>
                <div className="messageTimestampLeft">{userMsg.sentAt}</div>
            </div>
        </div>
    );
};
