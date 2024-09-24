import chewronTop from "../../../assets/Icons/chevron-top.svg";
import chewronDown from "../../../assets/Icons/chevron-down.svg";
import { Avatar } from "../Avatar/Avatar";
import '../../../css/ChatListItem/index.scss';
import { useEffect, useState } from "react";
import { IChatRoomForClient } from "../../../interfaces/chat";
import { APP_ENV } from "../../../env";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { savePostIdForChat } from "../../../store/settings/settings.slice";
import { setChatRoomId } from "../../../store/chat/chat.slice";

interface IChatListItem {
    chatItem: {
        name: string,
        avatar: string | null
        chats: IChatRoomForClient[]
    },
    countOfUnreadMessages: number | null,
    changeChatRoom: React.Dispatch<React.SetStateAction<string | null>>;
    setCountOfUnreadedMessages: React.Dispatch<React.SetStateAction<number>>;
}

export const ChatListItem = (info: IChatListItem) => {
    const savedChatRoom = useAppSelector((state) => state.settings.savedPostIdForChat);
    const getingMessageInfo = useAppSelector((state) => state.chat.getingMessageInfo);
    const readedMessages = useAppSelector((state) => state.chat.readedMessages);
    const dispatch = useAppDispatch();

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [countOfUnreadMessages, setCountOfUnreadMessages] = useState<number | null>(null);
    const [chats, setChats] = useState<IChatRoomForClient[] | null>(null);

    useEffect(() => {
        console.log("Count of unread messages - ", info.countOfUnreadMessages);
        setCountOfUnreadMessages(info.countOfUnreadMessages);
        setChats(info.chatItem.chats);
        if (info.chatItem.chats.find((element) => element.chatRoomId == savedChatRoom)) {
            setIsOpen(true);
            dispatch(savePostIdForChat(""));
        }



    }, [])
    useEffect(() => {
        console.log("Chats", chats);
    }, [chats])

    useEffect(() => {
        if (getingMessageInfo && info.chatItem.chats.find((element) => element.chatRoomId == getingMessageInfo.chatRoomId)) {
            if (!countOfUnreadMessages) {
                setCountOfUnreadMessages(1)
            }
            else setCountOfUnreadMessages(countOfUnreadMessages + 1)

            console.log(chats);

            if (chats) {
                setChats(chats.map((element) => {
                    if (element.chatRoomId == getingMessageInfo.chatRoomId) {
                        return {
                            ...element,
                            hasUnreadMessages: true,
                            unreadMessages: element.unreadMessages ? element.unreadMessages + 1 : 1
                        };
                        /*if (element.unreadMessages && element.hasUnreadMessages == true)
                            element.unreadMessages += 1;
                        else if (element.hasUnreadMessages == false) {
                            element.hasUnreadMessages = true;
                            element.unreadMessages = 1;
                        }*/
                    }
                    return element;
                }

                ));
            }
        }
    }, [getingMessageInfo])

    useEffect(() => {
        if (readedMessages && chats && chats.find((element) => element.chatRoomId == readedMessages.chatRoomId)) {
            console.log("I'm read")
            if (countOfUnreadMessages)
                setCountOfUnreadMessages(countOfUnreadMessages - readedMessages.countReadedMessages);


            setChats((chats) =>
                chats!.map((element) => {
                    if (element.chatRoomId == readedMessages.chatRoomId) {
                        return {
                            ...element,
                            hasUnreadMessages: false,
                            unreadMessages: 0
                        };
                    }
                    return element;
                }

                ));

        }
    }, [readedMessages])
    useEffect(() => {
        if (chats) {
            console.log("Chats - ", chats)
        }
    }, [chats])



    return (
        <>

            <div className="chat-list-item" onClick={() => { setIsOpen(!isOpen) }}>
                {info.chatItem.avatar ?
                    <img id="chat-list-item-avatar" src={`${APP_ENV.BASE_URL}/images/avatars/${info.chatItem.avatar}`} alt="" />
                    : <Avatar userName={info.chatItem.name} />
                }
                <p className="chat-list-item-name">{info.chatItem.name}</p>
                {countOfUnreadMessages ? <div className="count-of-unread-messages"><p>{countOfUnreadMessages}</p></div> : ""}
                <img id="chewron" src={isOpen ? chewronTop : chewronDown} alt="" />

            </div>
            <div className="chat" style={{ display: isOpen ? 'inline-block' : 'none', padding: 15, boxSizing: "border-box" }} >
                {chats ? chats.map((item) => (
                    <div key={item.chatRoomId} className="chat-list-lower-item" onClick={() => {
                        info.changeChatRoom(item.chatRoomId)
                        item.hasUnreadMessages == true ?
                            info.setCountOfUnreadedMessages(item.unreadMessages ? item.unreadMessages : 0) :
                            0
                    }}>
                        <img id="chat-list-item-avatar" src={`${APP_ENV.BASE_URL}/images/posts/${item.postImage}`} alt="" />

                        <p className="chat-list-item-name">{item.postName}</p>
                        {item.hasUnreadMessages == true ? <div className="count-of-unread-messages"><p>{item.unreadMessages}</p></div> : ""}
                    </div>
                )) : ""}

            </div>
        </>

    )
}