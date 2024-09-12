import { styled } from "@mui/system";
import {
 
    IChatItem,
 
    IChatInfo,
    IChatMessageInfo,
    ISendMessage,
} from "../../interfaces/chat";
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
import { getListOfPostInfoForChatsForRealtor } from "../../store/chat/chat.action";
import { unwrapResult } from "@reduxjs/toolkit";
import { APP_ENV } from "../../env";
import { connection } from "../../SignalR";
import * as signalR from "@microsoft/signalr";

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
    const [textMessage, setTextMessage] = useState<ISendMessage>();

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

    useEffect(() => {
        startListeningPost(chatInfo?.chatId!);
    }, [chatInfo]);


  
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
                                    {chatInfo!.chatMessages?.map((msg, index) =>
                                        msg.userId === user?.id ? (
                                            <MessageRight
                                                key={index}
                                                {...msg}
                                            />
                                        ) : (
                                            <MessageLeft key={index} {...msg} />
                                        )
                                    )}
                                </div>
                                <ChatTextInput 
                                    roomId={chatInfo?.chatId!} 
                                    setMessage={setTextMessage} />
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
