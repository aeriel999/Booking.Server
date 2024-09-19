import chewronTop from "../../assets/Icons/chevron-top.svg";
import chewronDown from "../../assets/Icons/chevron-down.svg";
import "../../css/DashBoardAnonymousClasses/index.scss";
import { useEffect, useState } from "react";
import { IChatInfo, IChatItem, IChatMessageInfo } from "../../interfaces/chat";
import { useAppDispatch } from "../../hooks/redux";
import { getListOfChatsByPostInfoForRealtor } from "../../store/chat/chat.action";
import { unwrapResult } from "@reduxjs/toolkit";
import ErrorHandler from "../common/ErrorHandler";

export const ChatPostList = (info: IChatItem) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const dispatch = useAppDispatch();
    const [errorMessage, setErrorMessage] = useState<string | undefined>(
        undefined
    );
    const [chatList, setChatList] = useState<IChatItem[]>([]);
    // const [newNumberOfUnreadMessage, setNewNumberOfUnreadMessage] =
    //     useState<number>(info.numberOfUnreadMessages);

    const getChatList = async (postId: string) => {
        try {
            const response = await dispatch(
                getListOfChatsByPostInfoForRealtor(postId)
            );
            unwrapResult(response);
            return response.payload.$values;
        } catch (error) {
            setErrorMessage(ErrorHandler(error));
        }
    };

    function handleCllick(postId: string) {
        getChatList(postId).then((data) => {
            setChatList(data);
        });
    }

    // useEffect(() => {
    //     if (info.newNumberOfUnreadMessage) {
    //         setNewNumberOfUnreadMessage(info.newNumberOfUnreadMessage);
    //     }
    // }, [info.newNumberOfUnreadMessage]);

    return (
        <div className="chatMainItem">
            <div
                className="chatListItem"
                onClick={() => {
                    setIsOpen(!isOpen);
                    handleCllick(info.id);
                }}
            >
                <img id="postImage" src={info.image} alt="" />

                <div className="postName">{info.name}</div>

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
                {chatList.map((item, index) => (
                    <div
                        className="chatUseritem"
                        key={item.id || index}
                        onClick={() => {
                            const chatInfo: IChatInfo = {
                                chatId: item.id,
                                postImage: info.image,
                                postName: info.name,
                                userAvatar: item.image,
                                userName: item.name,
                                chatMessages: null,
                                numberOfUnreadMessages: item.numberOfUnreadMessages,
                            };

                            info.setChatInfo(chatInfo);
                        }}
                    >
                        <img id="postImage" src={item.image} alt="" />

                        <div className="postName">{item.name}</div>
                        {item.numberOfUnreadMessages ? (
                            <div className="countOfUnreadMessages">
                                <div>{item.numberOfUnreadMessages}</div>
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
