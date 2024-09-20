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
import {
    setChatRoomId,
    setIsCuretnChatReaded,
    
} from "../../store/chat/chat.slice";

const StyledAvatar = styled(Avatar)({
    color: "#fff",
    backgroundColor: "#23a1a0",
    width: "32px",
    height: "32px",
});

export default function ChatRoom() {
    const { user } = useAppSelector((state) => state.account);
    const dispatch = useDispatch<AppDispatch>();
    const [errorMessage, setErrorMessage] = useState<string | undefined>(
        undefined
    );
    const [postChatList, setPostChatList] = useState<IChatItem[]>([]);
    const [chatInfo, setChatInfo] = useState<IChatInfo | null>(null);
    const [messages, setMessages] = useState<IChatMessageInfo[]>([]);
    const [message, setMessage] = useState<IChatMessageInfo>();
    const [numberOfUnreadMessages, setMumberOfUnreadMessages] =
        useState<number>();
    const { newMessage } = useAppSelector((state) => state.chat);
    const messageEndRef = useRef<HTMLDivElement>(null);

    // Function to scroll to the bottom of the message list
    const scrollToBottom = () => {
        if (messageEndRef.current) {
            messageEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    };

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

    function deleteChat(): void {
        throw new Error("Function not implemented.");
    }

    useEffect(() => {
        getChatList().then((data) => {
            if (data?.payload.$values) {
                setPostChatList(data.payload.$values);
                console.log("setPostChatList", data.payload.$values);
            }
        });
    }, []);

    useEffect(() => {
        if (chatInfo?.chatId) {
            dispatch(setChatRoomId(chatInfo?.chatId));
            getMessageList(chatInfo?.chatId).then((data) => {
                if (data?.payload) {
                    const sortedMessages = data.payload.$values.sort(
                        (a: IChatMessageInfo, b: IChatMessageInfo) =>
                            new Date(a.sentAt!).getTime() -
                            new Date(b.sentAt!).getTime()
                    );

                    setMessages(sortedMessages); // Set the sorted messages
                }
            });
        }
    }, [chatInfo]);

    useEffect(() => {
        if (messages.length > 0) {
            scrollToBottom();
        }
    }, [messages]);

    useEffect(() => {
        if (newMessage) {
            const messageInfo: IChatMessageInfo = {
                sentAt: new Date().toUTCString(),
                text: newMessage!,
                isRead: false,
                userId: "",
            };

            setMessages((messages) => [
                ...messages, // Spread the previous state
                messageInfo, // Add the new message to the array
            ]);
        }
    }, [newMessage]);

    useEffect(() => {
        if (message) {
            const newMessageList: IChatMessageInfo[] = [...messages!, message];

            setMessages(newMessageList);
        }
    }, [message]);

    // Function to move all unread messages to the read messages list
    async function handleMessageRead(): Promise<void> {
        if (chatInfo?.chatId && chatInfo?.numberOfUnreadMessages! > 0) {
            try {
                console.log(
                    "numberOfUnreadMessages",
                    chatInfo?.numberOfUnreadMessages!
                );

                setMumberOfUnreadMessages(numberOfUnreadMessages);

                const response = await dispatch(
                    setMessagesReadtByChatI(chatInfo?.chatId)
                );
                unwrapResult(response);

                setMessages((prevMessages) =>
                    prevMessages.map((msg) =>
                        msg.userId !== user?.id && !msg.isRead
                            ? { ...msg, isRead: true } // Mark unread incoming messages as read
                            : msg
                    )
                );

                dispatch(setIsCuretnChatReaded(true));
            } catch (error) {
                setErrorMessage(ErrorHandler(error));
            }
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
                            numberOfUnreadMessages={
                                item.numberOfUnreadMessages!
                            }
                            setChatInfo={setChatInfo}
                            newNumberOfUnreadMessage={
                                item.numberOfUnreadMessages
                            }
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
                                    {messages && messages.length > 0 ? (
                                        messages.map((msg, index) =>
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
                                    <div id="Ref" ref={messageEndRef} />
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

// const unreadMessageRef = useRef<HTMLDivElement | null>(null);
// const newMessageRef = useRef<HTMLDivElement | null>(null); // Ref for new message
// const lastReadMessageRef = useRef<HTMLDivElement | null>(null); // Ref for last read message
// const [clientMessages, setClientMessages] = useState<IChatMessageInfo[]>(
//     []
// );
// const [readMessages, setReadMessages] = useState<IChatMessageInfo[]>([]);
// const [unreadMessages, setUnreadMessages] = useState<IChatMessageInfo[]>(
//     []
// );
