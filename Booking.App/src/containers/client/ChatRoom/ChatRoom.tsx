import { useEffect, useState } from 'react';
import { ChatTextArea } from '../../../components/common/ChatTextArea/ChatTextArea';
import '../../../css/ChatRoom/index.scss';
import { Message } from '../Message/Message';
import { useAppDispatch } from '../../../hooks/redux';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { getChatRoomById } from '../../../store/chat/chat.action';
import { connection } from '../../../SignalR';
import { IChatMessageInfo } from '../../../interfaces/chat';
import * as signalR from "@microsoft/signalr";
import { APP_ENV } from '../../../env';
interface IChatRoom {
    /*postImage: string,
    postName: string,
    realtorAvatar: string,
    realtorName: string*/
    chatRoomId: string | null
}

export const ChatRoom = (info: IChatRoom) => {
    const dispatch = useAppDispatch();
    const chatRoom = useSelector((state: RootState) => state.chat.chatRoomInfoForClient);
    const user = useSelector((state: RootState) => state.account.user);
    const [messages, setMessages] = useState<IChatMessageInfo[]>([]);

    useEffect(() => {
        if (info.chatRoomId)
            dispatch(getChatRoomById((info.chatRoomId)));
    }, [info.chatRoomId])

    useEffect(() => {
        if (info.chatRoomId && chatRoom)
            startListeningPost(info.chatRoomId)
    }, [chatRoom])
    const startListeningPost = async (roomId: string) => {
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
    };

    return (
        <div id="chat-room">
            {
                chatRoom != null && info.chatRoomId != null ? <>
                    <div className="chat-room-header">
                        <div className="post">
                            <img src={`${APP_ENV.BASE_URL}/images/posts/${chatRoom.postImage}`} />
                            <p>{chatRoom.postName}</p>
                        </div>
                        <div className="realtor">
                            <img src={`${APP_ENV.BASE_URL}/images/avatars/${chatRoom.realtorAvatar}`} />
                            <p>{chatRoom.realtorName}</p>
                        </div>
                    </div>
                    <div className='chat-room-messages'>
                        <div className='messages'>
                            {messages.length > 0 ? messages.map((item) =>
                                <Message
                                    text={item.text}
                                    myMessage={user?.id === item.userId ? true : false}
                                    date={new Date(item.date)}
                                    isRead={item.isUnread}
                                />) : ""}

                        </div>
                        <div className='send-message'>
                            <ChatTextArea maxLength={4000} roomId={info.chatRoomId} addNewMessage={setMessages} messages={messages} />
                        </div>
                    </div>
                </>
                    :
                    ""
            }

        </div>
    )
}
/*
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