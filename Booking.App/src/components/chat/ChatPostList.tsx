import chewronTop from "../../assets/Icons/chevron-top.svg";
import chewronDown from "../../assets/Icons/chevron-down.svg";
import "../../css/DashBoardAnonymousClasses/index.scss";
import { useEffect, useState } from "react";
import { Avatar } from "../common/Avatar/Avatar";

interface IChatPostList {
    postChatItem: {
        name: string;
        mainImage: string;
        chats: {
            chatId: string;
            clientName: string;
            avatar: string;
            countOfUnreadMessages: number | null;
        }[];
    };
    countOfUnreadMessages: number | null;
}

export const ChatPostList = (info: IChatPostList) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    return (
        <div className="chatMainItem">
            <div
                className="chatListItem"
                onClick={() => {
                    setIsOpen(!isOpen);
                }}
            >
                    <img
                        id="postImage"
                        src={info.postChatItem.mainImage}
                        alt=""
                    />

                <div className="postName">{info.postChatItem.name}</div>

                {info.countOfUnreadMessages ? (
                    <div className="countOfUnreadMessages">
                        <div>{info.countOfUnreadMessages}</div>
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
                {info.postChatItem.chats.map((item) => (
                    <div className="chatUseritem">
                        <img
                            id="postImage"
                            src={item.avatar}
                            alt=""
                        />

                        <div className="postName">{item.clientName}</div>
                        {item.countOfUnreadMessages ? (
                            <div className="countOfUnreadMessages">
                                <div>{item.countOfUnreadMessages}</div>
                            </div>
                        ) : (
                            ""
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};
