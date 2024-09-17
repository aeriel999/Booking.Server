import { styled } from "@mui/system";
import { IChatItem, IChatInfo, IChatMessageInfo } from "../../interfaces/chat";
import { Avatar, Button } from "@mui/material";
import { useAppSelector } from "../../hooks/redux";
import { MessageLeft, MessageRight } from "./Message";
import { ChatTextInput } from "./ChatTextInput";
import UAvatar from "../../assets/Templates/Rectangle-50.webp";
import "../../css/DashBoardAnonymousClasses/index.scss";
import { ChatPostList } from "./ChatPostList";
import Trash from "../../assets/DashboardIcons/mdi_trash-outline.svg";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import { useEffect, useRef, useState } from "react";
import ErrorHandler from "../common/ErrorHandler";
import {
    getListOfPostInfoForChatsForRealtor,
    getMessageListByChatId,
    setMessagesReadtByChatI,
} from "../../store/chat/chat.action";
import { unwrapResult } from "@reduxjs/toolkit";
import { APP_ENV } from "../../env";
import { setChatRoomId } from "../../store/chat/chat.slice";

const StyledAvatar = styled(Avatar)({
    color: "#fff",
    backgroundColor: "#23a1a0",
    width: "32px",
    height: "32px",
});

export default function ChatRoom() {
    //  const { roomId } = useParams();
    const { user } = useAppSelector((state) => state.account);
    const dispatch = useDispatch<AppDispatch>();
    const [errorMessage, setErrorMessage] = useState<string | undefined>(
        undefined
    );
    const [postChatList, setPostChatList] = useState<IChatItem[]>([]);
    const [chatInfo, setChatInfo] = useState<IChatInfo | null>(null);
    const [readMessages, setReadMessages] = useState<IChatMessageInfo[]>([]);
    const [unreadMessages, setUnreadMessages] = useState<IChatMessageInfo[]>(
        []
    );
    const [message, setMessage] = useState<IChatMessageInfo>();
    const { newMessage } = useAppSelector((state) => state.chat);
    const unreadMessageRef = useRef<HTMLDivElement | null>(null);

    const getChatList = async () => {
        try {
            const response = await dispatch(
                getListOfPostInfoForChatsForRealtor()
            );
            unwrapResult(response);
            return response;
        } catch (error) {
            setErrorMessage(ErrorHandler(error));
        }
    };

    const getMessageList = async (roomId: string) => {
        try {
            const response = await dispatch(getMessageListByChatId(roomId));
            unwrapResult(response);
            return response;
        } catch (error) {
            setErrorMessage(ErrorHandler(error));
        }
    };

    useEffect(() => {
        getChatList().then((data) => {
            console.log("(data?.payload", data?.payload.$values);
            if (data?.payload.$values) {
                setPostChatList(data.payload.$values);
            }
        });
    }, []);

    function deleteChat(): void {
        throw new Error("Function not implemented.");
    }

    useEffect(() => {
        if (chatInfo?.chatId) {
            dispatch(setChatRoomId(chatInfo?.chatId));
            getMessageList(chatInfo?.chatId).then((data) => {
                if (data?.payload) {
                    const readMessages = data?.payload.$values.filter(
                        (message: IChatMessageInfo) => message.isRead
                    );

                    // Filter for unread messages
                    const unreadMessages = data?.payload.$values.filter(
                        (message: IChatMessageInfo) => !message.isRead
                    );

                    // Update state for read and unread messages
                    setReadMessages(readMessages);
                    setUnreadMessages(unreadMessages);
                }
            });
        }
    }, [chatInfo]);

    useEffect(() => {
        console.log("send_message use", newMessage);

        const messageInfo: IChatMessageInfo = {
            sentAt: new Date().toUTCString(),
            text: newMessage!,
            isRead: false,
            userId: user?.id!,
        };

        const newMessageList: IChatMessageInfo[] = [
            ...readMessages!,
            messageInfo,
        ];

        setReadMessages(newMessageList);
    }, [newMessage]);

    useEffect(() => {
        if (unreadMessageRef.current) {
            unreadMessageRef.current.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        }
    }, [unreadMessages]);

    // Function to move all unread messages to the read messages list
    async function handleMessageRead(): Promise<void> {
        if (chatInfo?.chatId && unreadMessages.length > 0) {
            try {
                const response = await dispatch(
                    setMessagesReadtByChatI(chatInfo?.chatId)
                );
                unwrapResult(response);
            } catch (error) {
                setErrorMessage(ErrorHandler(error));
            }


            ////Not work  in testing now

            const numberOfUnreadMessage = unreadMessages.length;

            console.log("numberOfUnreadMessage", numberOfUnreadMessage);

            // Mark all unread messages as read
            const updatedUnreadMessages = unreadMessages.map((msg) => ({
                ...msg,
                isRead: true,
            }));

            console.log("updatedUnreadMessages", updatedUnreadMessages);

            // Add the unread messages to the read messages list
            setReadMessages((prevReadMessages) => [
                ...prevReadMessages,
                ...updatedUnreadMessages,
            ]);

            console.log("setReadMessages", readMessages);

            // Clear the unread messages list
            setUnreadMessages([]);

            console.log("before setPostChatList", postChatList);

            setPostChatList((prevPostChatList) =>
                prevPostChatList.map((chat) => {
                    // Assuming the chat ID can be used to identify the specific chat
                    if (chat.id === chatInfo?.chatId) {
                        return {
                            ...chat,
                            numberOfUnreadMessages: Math.max(
                                chat.numberOfUnreadMessages! -
                                    numberOfUnreadMessage,
                                0
                            ),
                        };
                    }
                    return chat; // Return other chats unchanged
                })
            );

            console.log("setPostChatList", postChatList);
        }
    }

    return (
        <div className="chatRoom">
            <div className="chatList">
                {/* ChatPostList */}
                {postChatList &&
                    postChatList.map((item, id) => (
                        <ChatPostList
                            key={id}
                            id={item.id}
                            name={item.name}
                            image={
                                APP_ENV.BASE_URL + "/images/posts/" + item.image
                            }
                            numberOfUnreadMessages={item.numberOfUnreadMessages}
                            setChatInfo={setChatInfo}
                        />
                    ))}
            </div>
            <div className="chatContainer">
                {/* Chat Header */}
                {chatInfo !== null ? (
                    <>
                        <div className="chatGroupName">
                            <img src={chatInfo!.postImage} alt="post" />
                            <p>{chatInfo!.postName}</p>
                        </div>
                        <div className="chatUserContainer">
                            <div className="chatInfo">
                                <div className="userInfo">
                                    <StyledAvatar
                                        alt={chatInfo!.userAvatar}
                                        src={
                                            chatInfo!.userAvatar == null
                                                ? UAvatar
                                                : chatInfo!.userAvatar
                                        }
                                    />
                                    <p>{chatInfo!.userName}</p>
                                </div>
                                <Button onClick={deleteChat}>
                                    <img src={Trash} alt="delete" />
                                </Button>
                            </div>
                            <div
                                className="messageContainer"
                                onClick={handleMessageRead}
                            >
                                <div className="messages">
                                    {/* Display Read Messages */}
                                    {readMessages && readMessages.length > 0 ? (
                                        readMessages.map((msg, index) =>
                                            msg.userId === user?.id ? (
                                                <MessageRight
                                                    key={`read-${index}`}
                                                    {...msg}
                                                />
                                            ) : (
                                                <MessageLeft
                                                    key={`read-${index}`}
                                                    {...msg}
                                                />
                                            )
                                        )
                                    ) : (
                                        <div>No read messages available</div>
                                    )}

                                    {/* Separator Line Between Read and Unread Messages */}
                                    {unreadMessages &&
                                        unreadMessages.length > 0 && (
                                            <hr className="messageSeparator" />
                                        )}

                                    {/* Display Unread Messages */}
                                    {unreadMessages &&
                                        unreadMessages.length > 0 &&
                                        unreadMessages.map((msg, index) =>
                                            msg.userId === user?.id ? (
                                                <MessageRight
                                                    key={`unread-${index}`}
                                                    {...msg}
                                                    ref={
                                                        index === 0
                                                            ? unreadMessageRef
                                                            : null
                                                    } // Focus on first unread message
                                                />
                                            ) : (
                                                <MessageLeft
                                                    key={`unread-${index}`}
                                                    {...msg}
                                                    ref={
                                                        index === 0
                                                            ? unreadMessageRef
                                                            : null
                                                    } // Focus on first unread message
                                                />
                                            )
                                        )}
                                </div>
                                {/* Chat Input for sending messages */}
                                <ChatTextInput
                                    roomId={chatInfo?.chatId!}
                                    setMessage={setMessage}
                                    userId={user?.id!}
                                />
                            </div>
                        </div>
                    </>
                ) : (
                    <>Please Choose Chat </>
                )}
            </div>
        </div>
    );
}
