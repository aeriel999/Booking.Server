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
import { useEffect, useState } from "react";
import ErrorHandler from "../common/ErrorHandler";
import {
    getListOfPostInfoForChatsForRealtor,
    пetMessageListByChatId,
} from "../../store/chat/chat.action";
import { unwrapResult } from "@reduxjs/toolkit";
import { APP_ENV } from "../../env";
import { setChatRoomId } from "../../store/chat/chat.slice";

const StyledAvatar = styled(Avatar)({
    color: "#fff",
    backgroundColor: "#23a1a0",
    width: "32px",
    height: "32px",
});

export default function ChatRoom() {
    //  const { roomId } = useParams();
    const { user } = useAppSelector((state) => state.account);
    const dispatch = useDispatch<AppDispatch>();
    const [errorMessage, setErrorMessage] = useState<string | undefined>(
        undefined
    );
    const [postChatList, setPostChatList] = useState<IChatItem[]>([]);
    const [chatInfo, setChatInfo] = useState<IChatInfo | null>(null);
    const [messages, setMessages] = useState<IChatMessageInfo[]>([]);
    const [message, setMessage] = useState<IChatMessageInfo>();
    const { newMessage } = useAppSelector((state) => state.chat);

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
            const response = await dispatch(пetMessageListByChatId(roomId));
            unwrapResult(response);
            return response;
        } catch (error) {}
    };

    useEffect(() => {
        getChatList().then((data) => {
            console.log("(data?.payload", data?.payload.$values);
            if (data?.payload.$values) {
                setPostChatList(data.payload.$values);
            }
        });
    }, []);

    function deleteChat(): void {
        throw new Error("Function not implemented.");
    }

    useEffect(() => {
        if (chatInfo?.chatId) {
            dispatch(setChatRoomId(chatInfo?.chatId));
            getMessageList(chatInfo?.chatId).then((data) => {
                console.log("data", data);
                if (data?.payload) {
                    setMessages(data?.payload.$values);
                }
            });
        }
    }, [chatInfo]);

    useEffect(() => {
        console.log("send_message use", newMessage);

        const messageInfo: IChatMessageInfo = {
            sentAt: new Date().toUTCString(),
            text: newMessage!,
            isRead: false,
            userId: user?.id!,
        };

        const newMessageList: IChatMessageInfo[] = [...messages!, messageInfo];

        setMessages(newMessageList);
    }, [newMessage]);

    return (
        <div className="chatRoom">
            <div className="chatList">
                {postChatList &&
                    postChatList.map((item, id) => (
                        <ChatPostList
                            key={id}
                            id={item.id}
                            name={item.name}
                            image={
                                APP_ENV.BASE_URL + "/images/posts/" + item.image
                            }
                            numberOfUnreadMessages={item.numberOfUnreadMessages}
                            setChatInfo={setChatInfo}
                        />
                    ))}
            </div>

            <div className="chatContainer">
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
                            <div className="messageContainer">
                                <div className="messages">
                                    {messages && messages.length > 0 ? (
                                        messages.map((msg, index) =>
                                            msg && msg.userId ? (
                                                msg.userId === user?.id ? (
                                                    <MessageRight
                                                        key={index}
                                                        {...msg}
                                                    />
                                                ) : (
                                                    <MessageLeft
                                                        key={index}
                                                        {...msg}
                                                    />
                                                )
                                            ) : (
                                                <div key={index}>
                                                    Invalid message data
                                                </div>
                                            )
                                        )
                                    ) : (
                                        <div>No messages available</div>
                                    )}
                                </div>
                                <ChatTextInput
                                    roomId={chatInfo?.chatId!}
                                    setMessage={setMessage}
                                    userId={user?.id!}
                                />
                            </div>
                        </div>
                    </>
                ) : (
                    <>Please Coose Chat </>
                )}
            </div>
        </div>
    );
}
