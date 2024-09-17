import { useDispatch } from 'react-redux';
import { ChatListItem } from '../../../components/common/ChatListItem/ChatListItem';
import '../../../css/PageOfMessages/index.scss';
import { AppDispatch, RootState } from '../../../store';
import { useAppSelector } from '../../../hooks/redux';
import { useEffect, useState } from 'react';
import { getListOfChatRoomsForClient } from '../../../store/chat/chat.action';
import "../../../css/DashBoardRealtorClasses/index.scss";
import { ChatRoom } from '../ChatRoom/ChatRoom';
import { Loading } from '../../../components/common/Loading/Loading';




export const PageOfMessages = () => {

    const listOfChatRoomsForClient = useAppSelector((state: RootState) => state.chat.chatRoomsForClient);
    const savedChatRoom = useAppSelector((state) => state.settings.savedPostIdForChat);
    const dispatch = useDispatch<AppDispatch>();

    const [chatRoomId, setChatRoomId] = useState<string | null>(null);

    const getChats = async () => {
        await dispatch(getListOfChatRoomsForClient());
    }

    useEffect(() => {

        getChats();
    }, [])
    useEffect(() => {

        console.log(listOfChatRoomsForClient)
    }, [listOfChatRoomsForClient])
    useEffect(() => {
        if (savedChatRoom?.length != 0) {
            console.log(savedChatRoom);
            setChatRoomId(savedChatRoom);
            //dispatch(savePostIdForChat(""));
        }
    }, [savedChatRoom])
    return (
        <div className="page-of-messages-container">
            <div className='first-container'>
                {listOfChatRoomsForClient ?
                    <div className="chat-list" >

                        {listOfChatRoomsForClient.map((item) => (
                            <ChatListItem
                                countOfUnreadMessages={item.unreadMessages}
                                chatItem={
                                    {
                                        name: item.realtorName,
                                        avatar: item.realtorAvatar,
                                        chats: item.chatsForClient.$values!
                                    }
                                }
                                changeChatRoom={setChatRoomId}
                            />
                        ))}
                    </div>
                    : <Loading />}
            </div>
            <ChatRoom
                chatRoomId={chatRoomId} />

        </div>)
}
/*
 <ChatListItem
                        chatItem={
                            {
                                name: "Zubar Maxim",
                                avatar: "https://cdn-icons-png.flaticon.com/512/3177/3177440.png",
                                chats: [{
                                    name: "Hotel Boulevard, Autograph Collection",
                                    avatar: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/518332246.jpg?k=852d9e83009ac082a7bb8366d5e27fb1f21801ea9cb6dde9c14e1aa99c49ea63&o=&hp=1",
                                    countOfUnreadMessages: null
                                }, {
                                    name: "Атлас Делюкс Готель",
                                    avatar: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/585364794.jpg?k=9efa57e0a316aa1c4a0661edd8103e5f670b8af21cd17b851c75d0ce21e74a1c&o=&hp=1",
                                    countOfUnreadMessages: null
                                },
                                {
                                    name: "Carinya Park",
                                    avatar: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/154543781.jpg?k=868ff54aa25ef6a79bf336d10a70cbb0460e9200740fc7686e3f5b050bd41af0&o=&hp=1",
                                    countOfUnreadMessages: null
                                }]
                            }

                        }
                        countOfUnreadMessages={null}
                    />
                    <ChatListItem
                        chatItem={
                            {
                                name: "Zubar Nazariy",
                                avatar: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
                                chats: [{
                                    name: "Harbor View",
                                    avatar: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/261566046.jpg?k=4cfe859b080369303ee8124fece054c1012ff0e1b7a2850c7aa462a3f0827ba1&o=&hp=1",
                                    countOfUnreadMessages: 2
                                }, {
                                    name: "Готель Україна",
                                    avatar: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/579719496.jpg?k=1d8db7b66c669227f9efa5ecc1643a15d52974dccb920ae11090cd29bbab1963&o=&hp=1",
                                    countOfUnreadMessages: 1
                                }]
                            }
                        }
                        countOfUnreadMessages={3}
                    />


<div className="chatContainer">
                <div className="chatHeader">
                    <div className="chatGroupName">
                        <img src={props.postImage} alt="post" />
                        <p>{props.postName}</p>
                    </div>
                    <div className="chatInfo">
                        <div className="userInfo">
                            <StyledAvatar
                                alt={props.sendUserName}
                                src={
                                    props.sendUserAvatar == null
                                        ? UAvatar
                                        : props.sendUserAvatar
                                }
                            />
                            <p>{props.sendUserName}</p>
                        </div>
                        <Button className='deleteButton'>Delete chat</Button>
                    </div>
                </div>
                
                <StyledPaper elevation={2} style={{ maxHeight: 650 }}>
                    <MessagesBody id="style-1" style={{ flex: 1 }}>
                        {props.userMessages.map((msg, index) =>
                            msg.userId === user?.id ? (
                                <MessageRight key={index} {...msg} />
                            ) : (
                                <MessageLeft key={index} {...msg} />
                            )
                        )}
                    </MessagesBody>
                    <ChatTextInput></ChatTextInput>
                </StyledPaper>
            </div>
*/