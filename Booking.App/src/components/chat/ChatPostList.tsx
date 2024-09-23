import chewronTop from "../../assets/Icons/chevron-top.svg";
import chewronDown from "../../assets/Icons/chevron-down.svg";
import "../../css/DashBoardAnonymousClasses/index.scss";
import { useEffect, useState } from "react";
import { IChatInfo, IChatItem } from "../../interfaces/chat";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { getListOfChatsByPostInfoForRealtor } from "../../store/chat/chat.action";
import { unwrapResult } from "@reduxjs/toolkit";
import ErrorHandler from "../common/ErrorHandler";
import { setIsCuretnChatReaded } from "../../store/chat/chat.slice";

export const ChatPostList = (info: IChatItem) => {
    // const [isOpen, setIsOpen] = useState<boolean>(false);
    const dispatch = useAppDispatch();
    const { isCuretnChatReaded, currentChatRoomId, getingMessageInfo } =
        useAppSelector((state) => state.chat);
    const [_errorMessage, setErrorMessage] = useState<string | undefined>(
        undefined
    );
    const [chatList, setChatList] = useState<IChatItem[]>([]);
    const [
        numberOfUnreadMessageInAllChats,
        setNumberOfUnreadMessageInAllChats,
    ] = useState<number>(info.numberOfUnreadMessages);

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

    useEffect(() => {
        setNumberOfUnreadMessageInAllChats(info.numberOfUnreadMessages);
    }, [info]);

    useEffect(() => {
        if (isCuretnChatReaded && currentChatRoomId) {
            // Find the current chat room's unread message count
            const currentChat = chatList.find(
                (chatItem) => chatItem.id === currentChatRoomId
            );
            const numberOfUnreadMessages =
                currentChat?.numberOfUnreadMessages || 0;

            // Update the chat list to set the unread messages to 0 for the current chat
            setChatList((prevChatList) =>
                prevChatList.map((chatItem) =>
                    chatItem.id === currentChatRoomId
                        ? { ...chatItem, numberOfUnreadMessages: 0 }
                        : chatItem
                )
            );

            // Update the total number of unread messages in all chats
            setNumberOfUnreadMessageInAllChats(
                (prevTotal) => prevTotal - numberOfUnreadMessages
            );

            // Reset the isCuretnChatReaded flag
            dispatch(setIsCuretnChatReaded(false));
        }
    }, [isCuretnChatReaded, chatList, currentChatRoomId]);

    useEffect(() => {
        if (getingMessageInfo && info.id === getingMessageInfo.postId) {
            setChatList((prevChatList) =>
                prevChatList.map((chatItem) =>
                    chatItem.id === getingMessageInfo.chatRoomId
                        ? {
                              ...chatItem,
                              numberOfUnreadMessages:
                                  (chatItem.numberOfUnreadMessages || 0) + 1,
                          }
                        : chatItem
                )
            );
        }
    }, [getingMessageInfo]);

    return (
        <div className="chatMainItem">
            <div
                className="chatListItem"
                onClick={() => {
                    info.onChatClick();
                    handleCllick(info.id);
                }}
            >
                <img id="postImage" src={info.image} alt={info.name} />

                <div className="postName">{info.name}</div>

                {numberOfUnreadMessageInAllChats ? (
                    <div className="countOfUnreadMessages">
                        <div>{numberOfUnreadMessageInAllChats}</div>
                    </div>
                ) : (
                    ""
                )}
                <img
                    id="chewron"
                    src={info.isOpen ? chewronTop : chewronDown}
                    alt=""
                />
            </div>
            <div
                className="chat"
                style={{
                    display: info.isOpen ? "inline-block" : "none",
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
                                postId: info.id,
                            };

                            info.setChatInfo(chatInfo);
                        }}
                    >
                        <img id="postImage" src={item.image} alt="avatar" />

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
