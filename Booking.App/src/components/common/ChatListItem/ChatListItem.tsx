import chewronTop from "../../../assets/Icons/chevron-top.svg";
import chewronDown from "../../../assets/Icons/chevron-down.svg";
import { Avatar } from "../Avatar/Avatar";
import '../../../css/ChatListItem/index.scss';
import { useState } from "react";

interface IChatListItem {
    chatItem: {
        name: string,
        avatar: string | null
        chats: {
            name: string,
            avatar: string,
            countOfUnreadMessages: number | null
        }[]
    },
    countOfUnreadMessages: number | null
}

export const ChatListItem = (info: IChatListItem) => {

    const [isOpen, setIsOpen] = useState<boolean>(false);


    return (
        <>

            <div className="chat-list-item" onClick={() => { setIsOpen(!isOpen) }}>
                {info.chatItem.avatar ?
                    <img id="chat-list-item-avatar" src={info.chatItem.avatar} alt="" />
                    : <Avatar userName={info.chatItem.name} />
                }
                <p className="chat-list-item-name">{info.chatItem.name}</p>
                {info.countOfUnreadMessages ? <div className="count-of-unread-messages"><p>{info.countOfUnreadMessages}</p></div> : ""}
                <img id="chewron" src={isOpen ? chewronTop : chewronDown} alt="" />

            </div>
            <div className="chat" style={{ display: isOpen ? 'inline-block' : 'none', padding: 15, boxSizing: "border-box" }} >
                {info.chatItem.chats.map((item) => (
                    <div className="chat-list-lower-item">
                        <img id="chat-list-item-avatar" src={item.avatar} alt="" />

                        <p className="chat-list-item-name">{item.name}</p>
                        {item.countOfUnreadMessages ? <div className="count-of-unread-messages"><p>{item.countOfUnreadMessages}</p></div> : ""}
                    </div>
                ))}

            </div>
        </>

    )
}