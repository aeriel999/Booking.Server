import { useEffect, useRef, useState } from 'react';
import { ChatTextArea } from '../../../components/common/ChatTextArea/ChatTextArea';
import '../../../css/ChatRoom/index.scss';
import { Message } from '../Message/Message';
import { useAppDispatch } from '../../../hooks/redux';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { getChatRoomById, getMessageListByChatId, setMessagesReadtByChatId } from '../../../store/chat/chat.action';
import { connection } from '../../../SignalR';
import { IChatMessageInfo } from '../../../interfaces/chat';
import * as signalR from "@microsoft/signalr";
import { APP_ENV } from '../../../env';
import { Status } from '../../../utils/enum';
import { Loading } from '../../../components/common/Loading/Loading';
import { unwrapResult } from '@reduxjs/toolkit';
import { deleteNumberOfMessageFromGeneralCount, readMessages, resetChatInfoForClient, setChatRoomId, setDeletedChatId } from '../../../store/chat/chat.slice';
import ErrorHandler from '../../../components/common/ErrorHandler';
import Trash from "../../../assets/DashboardIcons/mdi_trash-outline.svg";
import CustomizedDialogs from '../../../components/common/Dialog';
import OutlinedErrorAlert from '../../../components/common/ErrorAlert';

interface IChatRoom {
    chatRoomId: string | null,
    countOfUnreadedMessages: number,
    postId: string | null
}

export const ChatRoom = (info: IChatRoom) => {
    const dispatch = useAppDispatch();
    const chatRoom = useSelector((state: RootState) => state.chat.chatRoomInfoForClient);
    const outcomeMessagesReadedChatId = useSelector((state: RootState) => state.chat.outcomeMessagesReadedChatId);
    const newMessage = useSelector((state: RootState) => state.chat.newMessage);
    const status = useSelector((state: RootState) => state.chat.status);
    const user = useSelector((state: RootState) => state.account.user);
    const [messages, setMessages] = useState<IChatMessageInfo[]>([]);
    const [numberOfUnreadMessages, setNumberOfUnreadMessages] =
        useState<number>(0);
    const [errorMessage, setErrorMessage] = useState<string | undefined>(
        undefined
    );
    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

    const messagesRef = useRef<HTMLDivElement>(null);
    const chatRoomRef = useRef<HTMLDivElement>(null);

    const getChatRoom = async () => {
        if (info.chatRoomId) {
            await dispatch(getChatRoomById(info.chatRoomId));
        }
    };

    useEffect(() => {
        setNumberOfUnreadMessages(info.countOfUnreadedMessages);
        getChatRoom();
        if (info.chatRoomId)
            dispatch(setChatRoomId(info.chatRoomId!))
    }, [info.chatRoomId])

    useEffect(() => {

        if (newMessage) {
            const addNewMessage = async () => {
                const messageInfo: IChatMessageInfo = {
                    id: Date.now().toString(),
                    date: new Date(),
                    text: newMessage!,
                    isRead: false,
                    userId: "",
                };

                setMessages((messages) => [
                    ...messages, // Spread the previous state
                    messageInfo, // Add the new message to the array
                ]);

            }
            addNewMessage();
        }

    }, [newMessage]);



    useEffect(() => {
        if (messagesRef.current != null) {
            messagesRef.current!.scrollTop = messagesRef.current!.scrollHeight;
        }
    }, [messages.length]);


    useEffect(() => {
        return () => {
            dispatch(setChatRoomId(""));
        };
    }, [])



    const getMessageSignalR = async (chatId: any) => {
        if (connection.state === signalR.HubConnectionState.Connected) {
            console.log("GetPostNotify");
            await connection.send("GetPostNotify", { chatId });
        } else {
            await connection.start().then(async () => {
                await connection.send("GetPostNotify", { chatId });
            });
        }
    }
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
    useEffect(() => {
        setErrorMessage(undefined);

        if (info.chatRoomId) {
            setNumberOfUnreadMessages(info.countOfUnreadedMessages);
            dispatch(setChatRoomId(info.chatRoomId));
            getMessageList(info.chatRoomId).then((data) => {
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
    }, [chatRoom]);

    useEffect(() => {
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

    async function handleMessageRead(): Promise<void> {
        if (info?.chatRoomId && numberOfUnreadMessages > 0) {
            try {

                dispatch(readMessages({
                    chatRoomId: info.chatRoomId!,
                    countReadedMessages: numberOfUnreadMessages
                }))



                const response = await dispatch(
                    setMessagesReadtByChatId(info.chatRoomId)
                );
                unwrapResult(response);

                setMessages((prevMessages) =>
                    prevMessages.map((msg) =>
                        msg.userId !== user?.id && !msg.isRead
                            ? { ...msg, isRead: true }
                            : msg
                    )
                );


                dispatch(
                    deleteNumberOfMessageFromGeneralCount(
                        numberOfUnreadMessages
                    )
                );
                setNumberOfUnreadMessages(0);
                await getMessageSignalR(info.chatRoomId);


            } catch (error) {
                setErrorMessage(ErrorHandler(error));
            }
        }
    }
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
            } catch (error) {
                setErrorMessage(ErrorHandler(error));
            }
            dispatch(setDeletedChatId(id))
            dispatch(resetChatInfoForClient())
        } else {
            setErrorMessage(
                ErrorHandler("You cannot delete chat with unread messages")
            );
        }
    };

    useEffect(() => {
        if (errorMessage && errorMessage != null && messagesRef && messagesRef.current) {
            messagesRef.current.style.height = "65%";
        }
    }, [errorMessage])

    return (
        <div id="chat-room" ref={chatRoomRef}>
            {errorMessage ? <OutlinedErrorAlert message={errorMessage} /> : ""}
            {isDialogOpen && chatRoom && (
                <CustomizedDialogs
                    message={`You want to delete chat with ${chatRoom.realtorName}. Are you sure?`}
                    isOpen={isDialogOpen}
                    setOpen={setIsDialogOpen}
                    action={async () => {
                        await deleteChat(info.chatRoomId!);
                    }}
                    lable="Deleting chat"
                />
            )}
            {status == Status.LOADING ? <Loading /> : ""}
            {chatRoom && info.chatRoomId ? (
                <>
                    <div className="chat-room-header">
                        <div className="post">
                            <img
                                src={`${APP_ENV.BASE_URL}/images/posts/${chatRoom.postImage}`}
                                alt="Post Image"
                            />
                            <p>{chatRoom.postName}</p>
                        </div>
                        <div className="realtor">
                            <img
                                src={`${APP_ENV.BASE_URL}/images/avatars/${chatRoom.realtorAvatar}`}
                                alt="Realtor Avatar"
                            />
                            <p>{chatRoom.realtorName}</p>
                            <button
                                tabIndex={0}
                                className='delete-button'
                                onClick={() => setIsDialogOpen(true)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        setIsDialogOpen(true)
                                    }
                                }}
                            >
                                <img src={Trash} alt="delete" />
                            </button>
                        </div>
                    </div>
                    <div className="chat-room-messages" onClick={handleMessageRead}>
                        <div className="messages" ref={messagesRef}>
                            {messages.length > 0
                                ? messages.map((item) => (
                                    <Message
                                        key={item.id}
                                        text={item.text}
                                        myMessage={user?.id === item.userId}
                                        date={new Date(item.date!)}
                                        isRead={item.isRead}
                                    />
                                ))
                                : ""}
                        </div>
                        <div className="send-message">
                            <ChatTextArea
                                maxLength={4000}
                                roomId={info.chatRoomId}
                                addNewMessage={setMessages}
                                messages={messages}
                            />
                        </div>
                    </div>
                </>
            ) : (
                <div className="choose-chat">
                    <p>Choose a chat to communicate</p>
                </div>
            )}

        </div>
    )
}


/*
{chatRoom != null && info.chatRoomId != null ? (
                <>
                    <div className="chat-room-header">
                        <div className="post">
                            <img
                                src={`${APP_ENV.BASE_URL}/images/posts/${chatRoom.postImage}`}
                            />
                            <p>{chatRoom.postName}</p>
                        </div>
                        <div className="realtor">
                            <img
                                src={`${APP_ENV.BASE_URL}/images/avatars/${chatRoom.realtorAvatar}`}
                            />
                            <p>{chatRoom.realtorName}</p>
                        </div>
                    </div>
                    <div className="chat-room-messages">
                        <div className="messages" ref={messagesRef}>
                            {messages.length > 0
                                ? messages.map((item) => (
                                    <Message
                                        text={item.text}
                                        myMessage={
                                            user?.id === item.userId
                                                ? true
                                                : false
                                        }
                                        date={new Date(item.date!)}
                                        isRead={item.isRead}
                                    />
                                ))
                                : ""}
                        </div>
                        <div className="send-message">
                            <ChatTextArea
                                maxLength={4000}
                                roomId={info.chatRoomId}
                                addNewMessage={setMessages}
                                messages={messages}
                            />
                        </div>
                    </div>
                </>
            ) : (
                <div className="choose-chat">
                    <p>Choose a chat to communicate</p>
                </div>
            )}





 <Message
                                text='Text message from Nazariy Slava Ukraine!'
                                myMessage={true}
                                date={new Date(Date.now())}
                                isRead={true}
                            />
                            <Message
                                text='Text message from Nazariy Slava Ukraine!'
                                myMessage={false}
                                date={new Date(Date.now())}
                                isRead={null}
                            />
                            <Message
                                text='Text message from Nazariy Slava Ukraine!'
                                myMessage={true}
                                date={new Date(Date.now())}
                                isRead={true}
                            />
                            <Message
                                text='Text message from Nazariy Slava Ukraine!'
                                myMessage={false}
                                date={new Date(Date.now())}
                                isRead={null}
                            />
                            <Message
                                text='Text message from Nazariy Slava Ukraine!
                        Text message from Nazariy Slava Ukraine!
                        Text message from Nazariy Slava Ukraine!
                        Text message from Nazariy Slava Ukraine!
                        Text message from Nazariy Slava Ukraine!
                        Text message from Nazariy Slava Ukraine!
                        Text message from Nazariy Slava Ukraine!
                        Text message from Nazariy Slava Ukraine!
                        Text message from Nazariy Slava Ukraine!
                        Text message from Nazariy Slava Ukraine!'
                                myMessage={false}
                                date={new Date(Date.now())}
                                isRead={null}
                            />
                            <Message
                                text='Text message from Nazariy Slava Ukraine!
                        Text message from Nazariy Slava Ukraine!
                        Text message from Nazariy Slava Ukraine!
                        Text message from Nazariy Slava Ukraine!
                        Text message from Nazariy Slava Ukraine!
                        Text message from Nazariy Slava Ukraine!
                        Text message from Nazariy Slava Ukraine!'
                                myMessage={false}
                                date={new Date(Date.now())}
                                isRead={null}
                            />
                            <Message
                                text='Text message from Nazariy Slava Ukraine!
                        Text message from Nazariy Slava Ukraine!
                        Text message from Nazariy Slava Ukraine!
                        Text message from Nazariy Slava Ukraine!'
                                myMessage={true}
                                date={new Date(Date.now())}
                                isRead={false}
                            />
<Message
                        text='Text message from Nazariy Slava Ukraine!'
                        myMessage={true}
                        date={new Date(Date.now())}
                        isRead={true}
                    />
                    <Message
                        text='Text message from Nazariy Slava Ukraine!'
                        myMessage={false}
                        date={new Date(Date.now())}
                        isRead={null}
                    />
                    <Message
                        text='Text message from Nazariy Slava Ukraine!'
                        myMessage={true}
                        date={new Date(Date.now())}
                        isRead={true}
                    />
                    <Message
                        text='Text message from Nazariy Slava Ukraine!'
                        myMessage={false}
                        date={new Date(Date.now())}
                        isRead={null}
                    />
                    <Message
                        text='Text message from Nazariy Slava Ukraine!
                        Text message from Nazariy Slava Ukraine!
                        Text message from Nazariy Slava Ukraine!
                        Text message from Nazariy Slava Ukraine!
                        Text message from Nazariy Slava Ukraine!
                        Text message from Nazariy Slava Ukraine!
                        Text message from Nazariy Slava Ukraine!
                        Text message from Nazariy Slava Ukraine!
                        Text message from Nazariy Slava Ukraine!
                        Text message from Nazariy Slava Ukraine!'
                        myMessage={false}
                        date={new Date(Date.now())}
                        isRead={null}
                    />
                    <Message
                        text='Text message from Nazariy Slava Ukraine!
                        Text message from Nazariy Slava Ukraine!
                        Text message from Nazariy Slava Ukraine!
                        Text message from Nazariy Slava Ukraine!
                        Text message from Nazariy Slava Ukraine!
                        Text message from Nazariy Slava Ukraine!
                        Text message from Nazariy Slava Ukraine!'
                        myMessage={false}
                        date={new Date(Date.now())}
                        isRead={null}
                    />
                    <Message
                        text='Text message from Nazariy Slava Ukraine!
                        Text message from Nazariy Slava Ukraine!
                        Text message from Nazariy Slava Ukraine!
                        Text message from Nazariy Slava Ukraine!'
                        myMessage={true}
                        date={new Date(Date.now())}
                        isRead={false}
                    /> */
