import chewronTop from "../../../assets/Icons/chevron-top.svg";
import chewronDown from "../../../assets/Icons/chevron-down.svg";
import { Avatar } from "../Avatar/Avatar";
import '../../../css/ChatListItem/index.scss';
import { useEffect, useState } from "react";
import { IChatRoomForClient } from "../../../interfaces/chat";
import { APP_ENV } from "../../../env";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { savePostIdForChat } from "../../../store/settings/settings.slice";

interface IChatListItem {
    chatItem: {
        name: string,
        avatar: string | null
        chats: IChatRoomForClient[]
    },
    countOfUnreadMessages: number | null,
    changeChatRoom: React.Dispatch<React.SetStateAction<string | null>>;
}

export const ChatListItem = (info: IChatListItem) => {
    const savedChatRoom = useAppSelector((state) => state.settings.savedPostIdForChat);
    const dispatch = useAppDispatch();

    const [isOpen, setIsOpen] = useState<boolean>(false);

    useEffect(() => {
        if (info.chatItem.chats.find((element) => element.chatRoomId == savedChatRoom)) {
            setIsOpen(true);
            dispatch(savePostIdForChat(""));
        }
    }, [])

    return (
        <>

            <div className="chat-list-item" onClick={() => { setIsOpen(!isOpen) }}>
                {info.chatItem.avatar ?
                    <img id="chat-list-item-avatar" src={`${APP_ENV.BASE_URL}/images/avatars/${info.chatItem.avatar}`} alt="" />
                    : <Avatar userName={info.chatItem.name} />
                }
                <p className="chat-list-item-name">{info.chatItem.name}</p>
                {info.countOfUnreadMessages ? <div className="count-of-unread-messages"><p>{info.countOfUnreadMessages}</p></div> : ""}
                <img id="chewron" src={isOpen ? chewronTop : chewronDown} alt="" />

            </div>
            <div className="chat" style={{ display: isOpen ? 'inline-block' : 'none', padding: 15, boxSizing: "border-box" }} >
                {info.chatItem.chats.map((item) => (
                    <div className="chat-list-lower-item" onClick={() => info.changeChatRoom(item.chatRoomId)}>
                        <img id="chat-list-item-avatar" src={`${APP_ENV.BASE_URL}/images/posts/${item.postImage}`} alt="" />

                        <p className="chat-list-item-name">{item.postName}</p>
                        {item.hasUnreadMessages == true ? <div className="count-of-unread-messages"><p>{item.unreadMessages}</p></div> : ""}
                    </div>
                ))}

            </div>
        </>

    )
}