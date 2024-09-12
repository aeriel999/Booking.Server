import chewronTop from "../../assets/Icons/chevron-top.svg";
import chewronDown from "../../assets/Icons/chevron-down.svg";
import "../../css/DashBoardAnonymousClasses/index.scss";
import { useState } from "react";
import { IChatInfo, IChatItem, IChatMessageInfo } from "../../interfaces/chat";
import { useAppDispatch } from "../../hooks/redux";
import { getListOfChatsByPostInfoForRealtor } from "../../store/chat/chat.action";
import { unwrapResult } from "@reduxjs/toolkit";
import ErrorHandler from "../common/ErrorHandler";
import { connection, IListeningChat } from "../../SignalR";
import * as signalR from "@microsoft/signalr";


export const ChatPostList = (info: IChatItem) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const dispatch = useAppDispatch();
    const [errorMessage, setErrorMessage] = useState<string | undefined>(
        undefined
    );
    const [chatList, setChatList] = useState<IChatItem[]>([]);
    const [messages, setMessages] = useState<IChatMessageInfo[]>([]);

    const getChatList = async (postId: string) => {
        try {
            const response = await dispatch(
                getListOfChatsByPostInfoForRealtor(postId)
            );
            unwrapResult(response);
            return response.payload.$values;
        } catch (error) {
            setErrorMessage(ErrorHandler(error));
        }
    };

    function handleCllick(postId: string) {
        getChatList(postId).then((data) => {
            setChatList(data);
        });
    }

    
 const startListeningPost = async (roomId: string) => {
    if (connection.state === signalR.HubConnectionState.Connected) {
        await connection
            .invoke("JoinRoomForListening", {roomId})
            .then(async (data) => {
                console.log("JoinRoomForListening", roomId);
                console.log("send_message", data);

                // Remove any previous listener before adding a new one
                connection.off("send_notify");
                // Add the new listener
                connection.on("send_message", async (m) => {
                    console.log("send_message", m);
                   // setMessages(m)
                });
            });
    }else{
        await connection
        .start()
        .then(()=>{
            connection
            .invoke("JoinRoomForListening", {roomId})
            .then(async () => {
                console.log("roomId", roomId);
                // Remove any previous listener before adding a new one
                connection.off("send_notify");
                // Add the new listener
                connection.on("send_message", async (m) => {
                    console.log("send_message", m);
                   // setMessages(m)
                });
            });
        })
    }
};
    return (
        <div className="chatMainItem">
            <div
                className="chatListItem"
                onClick={() => {
                    setIsOpen(!isOpen);
                    handleCllick(info.id);
                }}
            >
                <img id="postImage" src={info.image} alt="" />

                <div className="postName">{info.name}</div>

                {info.numberOfUnreadMessages ? (
                    <div className="countOfUnreadMessages">
                        <div>{info.numberOfUnreadMessages}</div>
                    </div>
                ) : (
                    ""
                )}
                <img
                    id="chewron"
                    src={isOpen ? chewronTop : chewronDown}
                    alt=""
                />
            </div>
            <div
                className="chat"
                style={{
                    display: isOpen ? "inline-block" : "none",
                    padding: 15,
                    boxSizing: "border-box",
                }}
            >
                {chatList.map((item, index) => (
                    <div
                        className="chatUseritem"
                        key={item.id || index}
                        onClick={async () => {
                            const startListeningProps: IListeningChat = {
                                roomId: info.id,
                                setMessages: setMessages,
                            };

                            await startListeningPost(info.id,);

                            const chatInfo: IChatInfo = {
                                chatId: info.id,
                                postImage: info.image,
                                postName: info.name,
                                userAvatar: item.image,
                                userName: item.name,
                                chatMessages: messages,
                            };

                            info.setChatInfo(chatInfo);
                        }}
                    >
                        <img id="postImage" src={item.image} alt="" />

                        <div className="postName">{item.name}</div>
                        {item.numberOfUnreadMessages ? (
                            <div className="countOfUnreadMessages">
                                <div>{item.numberOfUnreadMessages}</div>
                            </div>
                        ) : (
                            ""
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};
