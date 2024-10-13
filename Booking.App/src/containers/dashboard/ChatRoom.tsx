import { styled } from "@mui/system";
import { IChatItem, IChatInfo, IChatMessageInfo } from "../../interfaces/chat";
import { Avatar } from "@mui/material";
import { useAppSelector } from "../../hooks/redux";

import "../../css/DashBoardAnonymousClasses/index.scss";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import { useEffect, useRef, useState } from "react";
import {
    getListOfPostInfoForChatsForRealtor,
    getMessageListByChatId,
    setMessagesReadtByChatId,
} from "../../store/chat/chat.action";
import { unwrapResult } from "@reduxjs/toolkit";
import { APP_ENV } from "../../env";
import {
    deleteNumberOfMessageFromGeneralCount,
    setChatRoomId,
    setIsCuretnChatReaded,
} from "../../store/chat/chat.slice";
import * as signalR from "@microsoft/signalr";
import { connection } from "../../SignalR";
import ErrorHandler from "../../components/common/ErrorHandler";
import CustomizedDialogs from "../../components/common/Dialog";
import { ChatPostList } from "../../components/chat/ChatPostList";
import OutlinedErrorAlert from "../../components/common/ErrorAlert";
import { MessageLeft, MessageRight } from "../../components/chat/Message";
import { ChatTextInput } from "../../components/chat/ChatTextInput";
import { ChatRoomIsDeleted } from "../../components/common/ChatRoomIsDeleted/ChatRoomIsDeleted";

const StyledAvatar = styled(Avatar)({
    color: "#fff",
    backgroundColor: "#23a1a0",
    width: "40px",
    height: "40px",
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
    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
    const [deletedChatId, setDeletedChatId] = useState<string | null>(null);
    const deletedChatRooms = useAppSelector(
        (state) => state.chat.deletedChatRooms
    );
    const [isDeletePostChat, setIsDeletePostChat] = useState<boolean>(false);
    const {
        newMessage,
        generalNumberOfUnreadMessages,
        getingMessageInfo,
        outcomeMessagesReadedChatId,
    } = useAppSelector((state) => state.chat);
    const messageEndRef = useRef<HTMLDivElement>(null);
    const [openChatId, setOpenChatId] = useState<string | null>(null);
    const [chatIsDeleted, setChatIsDeleted] = useState<boolean>(false);

    // const leaveRoom = async (roomId: string) => {
    //     if (connection.state === signalR.HubConnectionState.Connected) {
    //         await connection.send("Leave", { roomId });
    //     } else {
    //         await connection.start().then(async () => {
    //             await connection.send("Leave", { roomId });
    //         });
    //     }
    // };

    const handleChatToggle = (chatId: string) => {
        // Toggle the chat open/close
        setOpenChatId((prevChatId) => (prevChatId === chatId ? null : chatId));
    };

    // Function to scroll to the bottom of the message list
    const scrollToBottom = () => {
        if (messageEndRef.current) {
            messageEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    };

    const numberOfUnreadMessages = messages.filter(
        (msg) => msg.userId !== user?.id && !msg.isRead
    ).length;

    const getChatList = async () => {
        setErrorMessage(undefined);

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
        setErrorMessage(undefined);

        try {
            const response = await dispatch(getMessageListByChatId(roomId));
            unwrapResult(response);
            return response;
        } catch (error) {
            setErrorMessage(ErrorHandler(error));
        }
    };

    const getMessageSignalR = async (roomId: string) => {
        setErrorMessage(undefined);

        if (connection.state === signalR.HubConnectionState.Connected) {
            await connection.send("GetPostNotify", { roomId });
        } else {
            await connection.start().then(async () => {
                await connection.send("GetPostNotify", { roomId });
            });
        }
    };

    const DeleteChatSignalR = async (roomId: string) => {
        setErrorMessage(undefined);

        if (connection.state === signalR.HubConnectionState.Connected) {
            await connection.send("DeleteChatNotify", { roomId });
        } else {
            await connection.start().then(async () => {
                await connection.send("DeleteChatNotify", { roomId });
            });
        }
    };

    const deleteChat = async (id: string) => {
        setErrorMessage(undefined);

        if (numberOfUnreadMessages < 1) {
            try {
                await DeleteChatSignalR(id);
                // const response = await dispatch(deleteChatById(id));
                // unwrapResult(response);
            } catch (error) {
                setErrorMessage(ErrorHandler(error));
            }

            setDeletedChatId(id);
            setChatInfo(null);
        } else {
            setErrorMessage(
                ErrorHandler("You cannot delete chat with unread messages")
            );
        }
    };

    useEffect(() => {
        setErrorMessage(undefined);

        getChatList().then((data) => {
            if (data?.payload.$values) {
                setPostChatList(data.payload.$values);
            }
        });

        if (isDeletePostChat) {
            setIsDeletePostChat(false);
        }
    }, [, generalNumberOfUnreadMessages, isDeletePostChat]);

    useEffect(() => {
        setErrorMessage(undefined);

        if (chatInfo?.chatId) {
            if (
                deletedChatRooms &&
                deletedChatRooms.find((element) => element == chatInfo.chatId)
            ) {
                setChatIsDeleted(true);
            } else {
                setChatIsDeleted(false);
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
        }
    }, [chatInfo]);

    useEffect(() => {
        setErrorMessage(undefined);

        if (messages.length > 0) {
            scrollToBottom();
        }
    }, [messages]);

    useEffect(() => {
        setErrorMessage(undefined);

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
        setErrorMessage(undefined);

        if (message) {
            const newMessageList: IChatMessageInfo[] = [...messages!, message];

            setMessages(newMessageList);
        }
    }, [message]);

    useEffect(() => {
        setErrorMessage(undefined);

        if (getingMessageInfo) {
            setPostChatList((prevPostChatList) =>
                prevPostChatList.map((chatItem) =>
                    chatItem.id === getingMessageInfo.postId
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

    useEffect(() => {
        setErrorMessage(undefined);

        if (outcomeMessagesReadedChatId) {
            setMessages((prevMessages) =>
                prevMessages.map((msg) =>
                    msg.userId === user?.id && !msg.isRead
                        ? { ...msg, isRead: true } // Mark unread incoming messages as read
                        : msg
                )
            );
        }
    }, [outcomeMessagesReadedChatId]);

    // Function to move all unread messages to the read messages list
    async function handleMessageRead(): Promise<void> {
        setErrorMessage(undefined);

        if (chatInfo?.chatId) {
            if (numberOfUnreadMessages > 0) {
                try {
                    const response = await dispatch(
                        setMessagesReadtByChatId(chatInfo?.chatId)
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

                    dispatch(
                        deleteNumberOfMessageFromGeneralCount(
                            numberOfUnreadMessages
                        )
                    );

                    await getMessageSignalR(chatInfo?.chatId);
                } catch (error) {
                    setErrorMessage(ErrorHandler(error));
                }
            }
        }
    }
    useEffect(() => {
        const leave = async () => {
            if (deletedChatRooms && chatInfo) {
                console.log(deletedChatRooms);
                if (
                    deletedChatRooms.find(
                        (element) => element == chatInfo.chatId
                    )
                ) {
                    //await leaveRoom(chatInfo.chatId);
                    setChatIsDeleted(true);
                }
            }
        };
        leave();
    }, [deletedChatRooms]);

    return (
        <div className="chatRoom">
            {isDialogOpen && chatInfo && (
                <CustomizedDialogs
                    message={`You want to delete chat with ${chatInfo.userName}. Are you sure?`}
                    isOpen={isDialogOpen}
                    setOpen={setIsDialogOpen}
                    action={async () => {
                        await deleteChat(chatInfo.chatId!);
                    }}
                    //  navigate={"/dashboard/chat"}
                    lable="Deleting chat"
                    //  menuItem="All Posts"
                />
            )}

            <div className="chatList">
                {/* ChatPostList */}
                {postChatList &&
                    postChatList.map((item, id) => (
                        <ChatPostList
                            key={id}
                            id={item.id}
                            name={item.name}
                            image={
                                APP_ENV.BASE_URL +
                                "/uploads/posts/" +
                                item.image
                            }
                            numberOfUnreadMessages={
                                item.numberOfUnreadMessages!
                            }
                            setChatInfo={setChatInfo}
                            isOpen={openChatId === item.id} // Check if the current chat should be open
                            onChatClick={() => handleChatToggle(item.id)} // Handle opening/closing the chat
                            deletedChatId={deletedChatId}
                            setDeletedPostChatId={setIsDeletePostChat}
                        />
                    ))}
            </div>
            <div className="chatContainer">
                {chatIsDeleted == true ? (
                    <ChatRoomIsDeleted />
                ) : (
                    <>
                        {errorMessage && (
                            <OutlinedErrorAlert
                                message={errorMessage}
                                textColor="#000"
                            />
                        )}
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
                                                alt={chatInfo!.userName}
                                                src={chatInfo!.userAvatar}
                                            />
                                            <p>{chatInfo!.userName}</p>
                                        </div>
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
                                                <div>
                                                    No read messages available
                                                </div>
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
                    </>
                )}
            </div>
        </div>
    );
}
