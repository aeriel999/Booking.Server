import { IChatMessageInfo } from "../../interfaces/chat";
import "../../css/DashBoardAnonymousClasses/index.scss";
import { forwardRef } from "react";
import TablerCheck from "../../assets/DashboardIcons/tabler_check.svg";
import TablerCheckGrey from "../../assets/DashboardIcons/tabler_check_grey.svg";

// MessageLeft component
export const MessageLeft = forwardRef<HTMLDivElement, IChatMessageInfo>(
    (userMsg, ref) => {
        return (
            <div className="messageRowLeft" ref={ref}>
                <div className="messageBlue">
                    <div className="messageContent">{userMsg.text}</div>
                    <div className="messageTimestampRight">
                        {userMsg.sentAt}
                    </div>
                    <div className="tablerCheck">
                        <img src={TablerCheck} alt="tablerCheck" />
                        {userMsg.isRead && (
                            <img
                                src={TablerCheck}
                                alt="tablerCheck"
                                className="unreadMessage"
                            />
                        )}
                    </div>
                </div>
            </div>
        );
    }
);

// MessageRight component
export const MessageRight = forwardRef<HTMLDivElement, IChatMessageInfo>(
    (userMsg, ref) => {
        return (
            <div className="messageRowRight" ref={ref}>
                <div className="messageOrange">
                    <div className="messageContent">{userMsg.text}</div>
                    <div className="messageTimestampLeft">{userMsg.sentAt}</div>
                    <div className="tablerCheck">
                        <img src={TablerCheckGrey} alt="tablerCheck" />
                        {userMsg.isRead && (
                            <img
                                src={TablerCheckGrey}
                                alt="tablerCheck"
                                className="unreadMessage"
                            />
                        )}
                    </div>
                </div>
            </div>
        );
    }
);
