import { useCallback, useEffect, useRef, useState } from 'react';
import { ChatTextArea } from '../../../components/common/ChatTextArea/ChatTextArea';
import '../../../css/ChatRoom/index.scss';
import { Message } from '../Message/Message';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { CheckChatIsExist, getChatRoomById, getMessageListByChatId, setMessagesReadtByChatId } from '../../../store/chat/chat.action';
import { connection } from '../../../SignalR';
import { IChatMessageInfo } from '../../../interfaces/chat';
import * as signalR from "@microsoft/signalr";
import { APP_ENV } from '../../../env';
import { Status } from '../../../utils/enum';
import { Loading } from '../../../components/common/Loading/Loading';
import { unwrapResult } from '@reduxjs/toolkit';
import { deleteNumberOfMessageFromGeneralCount, readMessages, setChatRoomId, setIsCuretnChatReaded } from '../../../store/chat/chat.slice';
import ErrorHandler from '../../../components/common/ErrorHandler';
import { ChatRoomIsDeleted } from '../../../components/common/ChatRoomIsDeleted/ChatRoomIsDeleted';

interface IChatRoom {
    chatRoomId: string | null,
    countOfUnreadedMessages: number,
    postId: string | null
}

export const ChatRoom = (info: IChatRoom) => {
    const dispatch = useAppDispatch();
    const chatRoom = useSelector((state: RootState) => state.chat.chatRoomInfoForClient);
    const chatIsExist = useSelector((state: RootState) => state.chat.chatIsExist);
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

    const messagesRef = useRef<HTMLDivElement>(null);

    ///////////
    const { deletedChatId } = useAppSelector((state) => state.chat);

    const leave = (roomId: string) =>
        connection.send("LeaveRoom", { roomId }).then(() => {
            console.log("leave", roomId);
        });

    useEffect(() => {
        if (deletedChatId) {
            leave(deletedChatId);
        }
    }, [deletedChatId]);
    ///////////////
    const getChatRoom = async () => {
        if (info.chatRoomId) {
            await dispatch(getChatRoomById(info.chatRoomId));
            //dispatch(changeLoaderIsLoading(true));
        }
    };
    const chechIsChatExist = async () => {
        console.log("Post - ", info.postId)
        if (info.postId) {

            await dispatch(CheckChatIsExist(info.postId));
        }
    }
    /*useEffect(() => {
        if (chatIsExist) {
            if (chatIsExist === true) {
                setNumberOfUnreadMessages(info.countOfUnreadedMessages);
                getChatRoom();
                handleMessageRead();
                if (info.chatRoomId)
                    dispatch(setChatRoomId(info.chatRoomId!))
            }
        }
    }, [chatIsExist])*/
    /*useEffect(() => {
        if (info.chatRoomId)
            startListeningPost(info.chatRoomId)
    }, [chatRoom])*/
    useEffect(() => {
        //if (chatIsExist) {
        //if (chatIsExist === true) {
        setNumberOfUnreadMessages(info.countOfUnreadedMessages);
        getChatRoom();
        //handleMessageRead();
        if (info.chatRoomId)
            dispatch(setChatRoomId(info.chatRoomId!))
        //}
        //}
        //chechIsChatExist()
        /*setNumberOfUnreadMessages(info.countOfUnreadedMessages);
        getChatRoom();
        handleMessageRead();
        if (info.chatRoomId)
            dispatch(setChatRoomId(info.chatRoomId))*/
    }, [info.chatRoomId])

    useEffect(() => {

        if (newMessage) {
            const addNewMessage = async () => {
                //handleMessageRead(1);
                const messageInfo: IChatMessageInfo = {
                    date: new Date(),
                    text: newMessage!,
                    isRead: false,
                    userId: "",
                };

                setMessages((messages) => [
                    ...messages, // Spread the previous state
                    messageInfo, // Add the new message to the array
                ]);

                //await getMessageSignalR(info?.chatRoomId);

                /*if (info.chatRoomId)
                    await dispatch(
                        setMessagesReadtByChatId(info.chatRoomId)
                    );*/
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

    /*const startListeningPost = async (roomId: string) => {
        if (connection.state === signalR.HubConnectionState.Connected) {
            await connection
                .invoke("JoinRoomForListening", { roomId })
                .then(async (data) => {
                    console.log("JoinRoomForListening", roomId);
                    console.log("send_message", data);
                    setMessages(data);
                    // Remove any previous listener before adding a new one
                    connection.off("send_notify");
                    // Add the new listener
                    connection.on("send_message", async (m) => {
                        console.log("send_message", m);
                        // setMessages(m)
                    });
                });
        } else {
            await connection.start().then(() => {
                connection
                    .invoke("JoinRoomForListening", { roomId })
                    .then(async (data) => {
                        console.log("roomId", roomId);
                        setMessages(data);
                        // Remove any previous listener before adding a new one
                        connection.off("send_notify");
                        // Add the new listener
                        connection.on("send_message", async (m) => {
                            console.log("send_message", m);
                            // setMessages(m)
                        });
                    });
            });
        }
    };*/

    const getMessageSignalR = async (chatId: any) => {
        if (connection.state === signalR.HubConnectionState.Connected) {
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


    return (
        <div id="chat-room">
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
                        </div>
                    </div>
                    <div className="chat-room-messages" onClick={handleMessageRead}>
                        <div className="messages" ref={messagesRef}>
                            {messages.length > 0
                                ? messages.map((item) => (
                                    <Message
                                        key={item.id} // Додайте унікальний ключ для кожного повідомлення
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
