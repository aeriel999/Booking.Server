import { styled } from "@mui/system";
import { IChatRoom, IUserMessage } from "../../interfaces/chat";
import { Avatar, Button } from "@mui/material";
import { useAppSelector } from "../../hooks/redux";
import { MessageLeft, MessageRight } from "./Message";
import { ChatTextInput } from "./ChatTextInput";
import UAvatar from "../../assets/Templates/Rectangle-50.webp";
import "../../css/DashBoardAnonymousClasses/index.scss";
import { ChatPostList } from "./ChatPostList";
import Trash from "../../assets/DashboardIcons/mdi_trash-outline.svg";


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

    function deleteChat(): void {
        throw new Error("Function not implemented.");
    }

    return (
        <div className="chatRoom">
            <div className="chatList">
                <ChatPostList
                    postChatItem={{
                        name: "Luxury Villas with Beach Access by VB Homes",
                        mainImage:
                            "https://cf.bstatic.com/xdata/images/hotel/max1024x768/518332246.jpg?k=852d9e83009ac082a7bb8366d5e27fb1f21801ea9cb6dde9c14e1aa99c49ea63&o=&hp=1",
                        chats: [
                            {
                                clientName:
                                    "Hotel Boulevard, Autograph Collection",
                                avatar: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/518332246.jpg?k=852d9e83009ac082a7bb8366d5e27fb1f21801ea9cb6dde9c14e1aa99c49ea63&o=&hp=1",
                                countOfUnreadMessages: null,
                                chatId: "",
                            },
                            {
                                clientName: "Атлас Делюкс Готель",
                                avatar: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/585364794.jpg?k=9efa57e0a316aa1c4a0661edd8103e5f670b8af21cd17b851c75d0ce21e74a1c&o=&hp=1",
                                countOfUnreadMessages: null,
                                chatId: "",
                            },
                            {
                                clientName: "Carinya Park",
                                avatar: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/154543781.jpg?k=868ff54aa25ef6a79bf336d10a70cbb0460e9200740fc7686e3f5b050bd41af0&o=&hp=1",
                                countOfUnreadMessages: null,
                                chatId: "",
                            },
                        ],
                    }}
                    countOfUnreadMessages={null}
                />
                <ChatPostList
                    postChatItem={{
                        name: "Luxury Villas with Beach Access by VB Homes",
                        mainImage:
                            "https://cdn-icons-png.flaticon.com/512/149/149071.png",
                        chats: [
                            {
                                clientName: "Harbor View",
                                avatar: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/261566046.jpg?k=4cfe859b080369303ee8124fece054c1012ff0e1b7a2850c7aa462a3f0827ba1&o=&hp=1",
                                countOfUnreadMessages: 2,
                                chatId: "",
                            },
                            {
                                clientName: "Готель Україна",
                                avatar: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/579719496.jpg?k=1d8db7b66c669227f9efa5ecc1643a15d52974dccb920ae11090cd29bbab1963&o=&hp=1",
                                countOfUnreadMessages: 1,
                                chatId: "",
                            },
                        ],
                    }}
                    countOfUnreadMessages={3}
                />
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
                        <ChatTextInput chatId={""} />
                    </div>
                </div>
            </div>
        </div>
    );
}
