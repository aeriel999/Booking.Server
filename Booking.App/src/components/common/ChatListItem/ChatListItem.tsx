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
import { CheckChatIsExist } from "../../../store/chat/chat.action";

interface IChatListItem {
    chatItem: {
        name: string,
        avatar: string | null
        chats: IChatRoomForClient[]
    },
    countOfUnreadMessages: number | null,
    changeChatRoom: React.Dispatch<React.SetStateAction<string | null>>;
    setCountOfUnreadedMessages: React.Dispatch<React.SetStateAction<number>>;
    setPostId: React.Dispatch<React.SetStateAction<string | null>>;
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
        setCountOfUnreadMessages(info.countOfUnreadMessages);
        setChats(info.chatItem.chats);
        if (info.chatItem.chats.find((element) => element.chatRoomId == savedChatRoom)) {
            setIsOpen(true);
            dispatch(savePostIdForChat(""));
        }
    }, [])
    useEffect(() => {
        if (getingMessageInfo && info.chatItem.chats && info.chatItem.chats.find((element) => element.chatRoomId == getingMessageInfo.chatRoomId)) {
            if (!countOfUnreadMessages) {
                setCountOfUnreadMessages(1)
            }
            else setCountOfUnreadMessages(countOfUnreadMessages + 1)


            if (chats) {
                setChats(chats.map((element) => {
                    if (element.chatRoomId == getingMessageInfo.chatRoomId) {
                        return {
                            ...element,
                            hasUnreadMessages: true,
                            unreadMessages: element.unreadMessages ? element.unreadMessages + 1 : 1
                        };
                    }
                    return element;
                }

                ));
            }
        }
    }, [getingMessageInfo])

    useEffect(() => {
        if (readedMessages && chats && chats.find((element) => element.chatRoomId == readedMessages.chatRoomId)) {
            if (countOfUnreadMessages && countOfUnreadMessages - readedMessages.countReadedMessages >= 0)
                setCountOfUnreadMessages(countOfUnreadMessages - readedMessages.countReadedMessages);
            else
                setCountOfUnreadMessages(0);
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
    const chechIsChatExist = async (postId: string) => {
        if (postId) {

            await dispatch(CheckChatIsExist(postId));
        }
    }


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
                        info.setPostId(item.postId);
                        //chechIsChatExist(item.postId);
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