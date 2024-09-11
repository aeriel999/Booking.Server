import { styled } from "@mui/system";
import { IChatRoom, IPostChatItem, IUserMessage } from "../../interfaces/chat";
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

const StyledAvatar = styled(Avatar)({
    color: "#fff",
    backgroundColor: "#23a1a0",
    width: "32px",
    height: "32px",
});

const testMsg: IUserMessage[] = [
    {
        id: "test1",
        userId: "test1",
        message:
            "Situated in Puerto de la Cruz, 1.2 km from San Telmo Beach, Hotel Tigaiga features accommodation with an outdoor swimming pool, private parking, a garden and a shared lounge. With free WiFi, this 4-star hotel offers room service and a 24-hour front desk. The hotel has a terrace and sea views, and guests can enjoy a meal at the restaurant or a drink at the bar.",
        chatRoomId: "testRoom1",
        sentAt: "2024-05-22T10:00:00Z",
        isRead: true,
    },
    {
        id: "test2",
        userId: "4919263b-1da2-49e7-b7c8-ea84a64005db",
        message: "test message 2",
        chatRoomId: "testRoom2",
        sentAt: "2024-05-22T10:05:00Z",
        isRead: true,
    },
    {
        id: "test1",
        userId: "test1",
        message:
            "Situated in Puerto de la Cruz, 1.2 km from San Telmo Beach, Hotel Tigaiga features accommodation with an outdoor swimming pool, private parking, a garden and a shared lounge. With free WiFi, this 4-star hotel offers room service and a 24-hour front desk. The hotel has a terrace and sea views, and guests can enjoy a meal at the restaurant or a drink at the bar.",
        chatRoomId: "testRoom1",
        sentAt: "2024-05-22T10:00:00Z",
        isRead: true,
    },
    {
        id: "test2",
        userId: "4919263b-1da2-49e7-b7c8-ea84a64005db",
        message: "test message 2",
        chatRoomId: "testRoom2",
        sentAt: "2024-05-22T10:05:00Z",
        isRead: true,
    },
    {
        id: "test1",
        userId: "test1",
        message:
            "Situated in Puerto de la Cruz, 1.2 km from San Telmo Beach, Hotel Tigaiga features accommodation with an outdoor swimming pool, private parking, a garden and a shared lounge. With free WiFi, this 4-star hotel offers room service and a 24-hour front desk. The hotel has a terrace and sea views, and guests can enjoy a meal at the restaurant or a drink at the bar.",
        chatRoomId: "testRoom1",
        sentAt: "2024-05-22T10:00:00Z",
        isRead: true,
    },
    {
        id: "test2",
        userId: "4919263b-1da2-49e7-b7c8-ea84a64005db",
        message: "test message 2",
        chatRoomId: "testRoom2",
        sentAt: "2024-05-22T10:05:00Z",
        isRead: true,
    },
    {
        id: "test1",
        userId: "test1",
        message:
            "Situated in Puerto de la Cruz, 1.2 km from San Telmo Beach, Hotel Tigaiga features accommodation with an outdoor swimming pool, private parking, a garden and a shared lounge. With free WiFi, this 4-star hotel offers room service and a 24-hour front desk. The hotel has a terrace and sea views, and guests can enjoy a meal at the restaurant or a drink at the bar.",
        chatRoomId: "testRoom1",
        sentAt: "2024-05-22T10:00:00Z",
        isRead: false,
    },
    {
        id: "test2",
        userId: "4919263b-1da2-49e7-b7c8-ea84a64005db",
        message: "test message 2",
        chatRoomId: "testRoom2",
        sentAt: "2024-05-22T10:05:00Z",
        isRead: false,
    },
];

const props: IChatRoom = {
    chatRoomId: "test",
    clientId: "test",
    realtorId: "test",
    postId: "test",
    postName: "Luxury Villas with Beach Access by VB Homes",
    postImage: UAvatar,
    sendUserName: "test1",
    sendUserAvatar: "test1",
    userMessages: testMsg,
};

export default function ChatRoom() {
    //  const { roomId } = useParams();
    const { user } = useAppSelector((state) => state.account);
    const dispatch = useDispatch<AppDispatch>();
    const [errorMessage, setErrorMessage] = useState<string | undefined>(
        undefined
    );
    const [postChatList, setPostChatList] = useState<IPostChatItem[]>([]);
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
            console.log("(data?.payload", data?.payload.$values)
            if (data?.payload.$values) {
                
                setPostChatList(data.payload.$values);
            }
        });
    }, []);

    function deleteChat(): void {
        throw new Error("Function not implemented.");
    }

    return (
        <div className="chatRoom">
            <div className="chatList">
            {postChatList && postChatList.map((item, id) => (
                <ChatPostList
                    key={id} 
                    postId={item.postId}
                    postName={item.postName}
                    image={APP_ENV.BASE_URL + "/images/posts/" + item.image}
                    numberOfUnreadMessages={item.numberOfUnreadMessages}
                />
            ))}

            </div>

            <div className="chatContainer">
                <div className="chatGroupName">
                    <img src={props.postImage} alt="post" />
                    <p>{props.postName}</p>
                </div>
                <div className="chatUserContainer">
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
                        <Button onClick={deleteChat}>
                            <img src={Trash} alt="delete" />
                        </Button>
                    </div>
                    <div className="messageContainer">
                        <div className="messages">
                            {props.userMessages.map((msg, index) =>
                                msg.userId === user?.id ? (
                                    <MessageRight key={index} {...msg} />
                                ) : (
                                    <MessageLeft key={index} {...msg} />
                                )
                            )}
                        </div>
                        <ChatTextInput roomId={""} />
                    </div>
                </div>
            </div>
        </div>
    );
}
