import { IChatMessageInfo } from "../../interfaces/chat";
import "../../css/DashBoardAnonymousClasses/index.scss";
import { forwardRef } from "react";

// MessageLeft component
export const MessageLeft = forwardRef<HTMLDivElement, IChatMessageInfo>((userMsg, ref) => {
    return (
        <div className="messageRowLeft" ref={ref}>
            <div className="messageBlue">
                <div className="messageContent">{userMsg.text}</div>
                <div className="messageTimestampRight">{userMsg.sentAt}</div>
            </div>
        </div>
    );
});

// MessageRight component
export const MessageRight = forwardRef<HTMLDivElement, IChatMessageInfo>((userMsg, ref) => {
    return (
        <div className="messageRowRight" ref={ref}>
            <div className="messageOrange">
                <div className="messageContent">{userMsg.text}</div>
                <div className="messageTimestampLeft">{userMsg.sentAt}</div>
            </div>
        </div>
    );
});
