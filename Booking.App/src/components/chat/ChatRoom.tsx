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
    const [clientMessages, setClientMessages] = useState<IChatMessageInfo[]>(
        []
    );
    const { newMessage } = useAppSelector((state) => state.chat);
    const unreadMessageRef = useRef<HTMLDivElement | null>(null);
    const newMessageRef = useRef<HTMLDivElement | null>(null); // Ref for new message
    const lastReadMessageRef = useRef<HTMLDivElement | null>(null); // Ref for last read message

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
        console.log("LOAD POSTLIST");
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
        console.log("LOAD MSGS");

        if (chatInfo?.chatId) {
            setClientMessages([]);
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
        if (newMessage) {
            console.log("Set user MSG IF", newMessage);

            const messageInfo: IChatMessageInfo = {
                sentAt: new Date().toUTCString(),
                text: newMessage!,
                isRead: false,
                userId: "",
            };

            setClientMessages((clientMessages) => [
                ...clientMessages, // Spread the previous state
                messageInfo, // Add the new message to the array
            ]);
        }
    }, [newMessage]);

    useEffect(() => {
        console.log("My MSG", message);

        if (message) {
            console.log("My MSG IF", message);

            const newMessageList: IChatMessageInfo[] = [
                ...readMessages!,
                message,
            ];

            setReadMessages(newMessageList);
        }
    }, [message]);

    useEffect(() => {
        if (unreadMessages.length > 0 && unreadMessageRef.current) {
            // Scroll to the first unread message
            unreadMessageRef.current.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        } else if (newMessageRef.current) {
            // If no unread messages, scroll to the latest message
            newMessageRef.current.scrollIntoView({
                behavior: "smooth",
                block: "end", // Scroll to the end where the new message appears
            });
        } else if (lastReadMessageRef.current) {
            // Scroll to the last read message if no unread or new messages
            lastReadMessageRef.current.scrollIntoView({
                behavior: "smooth",
                block: "end",
            });
        }
    }, [unreadMessages, clientMessages, readMessages]);

    // Function to move all unread messages to the read messages list
    async function handleMessageRead(): Promise<void> {
        console.log("unreadMessages.length", unreadMessages.length);
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

            //  console.log("numberOfUnreadMessage", numberOfUnreadMessage);

            // Mark all unread messages as read
            const updatedUnreadMessages = unreadMessages.map((msg) => ({
                ...msg,
                isRead: true,
            }));

            //  console.log("updatedUnreadMessages", updatedUnreadMessages);

            // Add the unread messages to the read messages list
            setReadMessages((prevReadMessages) => [
                ...prevReadMessages,
                ...updatedUnreadMessages,
            ]);

            // console.log("setReadMessages", readMessages);

            // Clear the unread messages list
            setUnreadMessages([]);

            //   console.log("before setPostChatList", postChatList);

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

            //  console.log("setPostChatList", postChatList);
        }
        if (clientMessages && clientMessages.length > 0) {
            const updatedUnreadMessages = clientMessages.map((msg) => ({
                ...msg,
                isRead: true,
            }));
            setReadMessages((prevReadMessages) => [
                ...prevReadMessages,
                ...updatedUnreadMessages,
            ]);
            setClientMessages([]);
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
                                                    ref={
                                                        index ===
                                                        readMessages.length - 1
                                                            ? lastReadMessageRef
                                                            : null
                                                    } // Focus on last read message
                                                />
                                            ) : (
                                                <MessageLeft
                                                    key={`read-${index}`}
                                                    {...msg}
                                                    ref={
                                                        index ===
                                                        readMessages.length - 1
                                                            ? lastReadMessageRef
                                                            : null
                                                    } // Focus on last read message
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
                                        unreadMessages.map((msg, index) => (
                                            <MessageLeft
                                                key={`unread-${index}`}
                                                {...msg}
                                                ref={
                                                    index === 0
                                                        ? unreadMessageRef
                                                        : null
                                                } // Focus on first unread message
                                            />
                                        ))}
                                    {/* Display New Message */}
                                    {clientMessages &&
                                        clientMessages.length > 0 &&
                                        clientMessages.map((msg, index) => (
                                            <MessageLeft
                                                key={`unread-${index}`}
                                                {...msg}
                                                ref={
                                                    index === 0
                                                        ? newMessageRef
                                                        : null
                                                } // Focus on first unread message
                                            />
                                        ))}
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
