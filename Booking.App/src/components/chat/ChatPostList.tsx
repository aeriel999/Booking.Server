import chewronTop from "../../assets/Icons/chevron-top.svg";
import chewronDown from "../../assets/Icons/chevron-down.svg";
import "../../css/DashBoardAnonymousClasses/index.scss";
import { useState } from "react";
import {IPostChatItem } from "../../interfaces/chat";

export const ChatPostList = (info: IPostChatItem) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    return (
        <div className="chatMainItem">
            <div
                className="chatListItem"
                onClick={() => {
                    setIsOpen(!isOpen);
                }}
            >
                <img id="postImage" src={info.image} alt="" />

                <div className="postName">{info.postName}</div>

                {info.numberOfUnreadMessages ? (
                    <div className="countOfUnreadMessages">
                        <div>{info.numberOfUnreadMessages}</div>
                    </div>
                ) : (
                    ""
                )}
                <img
                    id="chewron"
                    src={isOpen ? chewronTop : chewronDown}
                    alt=""
                />
            </div>
            <div
                className="chat"
                style={{
                    display: isOpen ? "inline-block" : "none",
                    padding: 15,
                    boxSizing: "border-box",
                }}
            >
                {/* {info.postChatItem.chats.map((item) => (
                    <div className="chatUseritem">
                        <img id="postImage" src={item.avatar} alt="" />

                        <div className="postName">{item.clientName}</div>
                        {item.countOfUnreadMessages ? (
                            <div className="countOfUnreadMessages">
                                <div>{item.countOfUnreadMessages}</div>
                            </div>
                        ) : (
                            ""
                        )}
                    </div>
                ))} */}
            </div>
        </div>
    );
};
