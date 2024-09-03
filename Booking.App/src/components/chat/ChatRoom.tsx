import { styled } from "@mui/system";
import Paper from "@mui/material/Paper";
import { IChatRoom, IUserMessage } from "../../interfaces/chat";
import { Avatar, Button } from "@mui/material";
import { useAppSelector } from "../../hooks/redux";
import { MessageLeft, MessageRight } from "./Message";
import { ChatTextInput } from "./ChatTextInput";
import UAvatar from "../../assets/Templates/Rectangle-50.webp";
import { deepOrange } from "@mui/material/colors";
import "../../css/DashBoardAnonymousClasses/index.scss";

const StyledPaper = styled(Paper)({
    width: "98%",
    maxHeight: "80%",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    position: "relative",
    padding: "5px",
});

// const StyledPaper2 = styled(Paper)({
//   width: '80vw',
//   maxWidth: '500px',
//   display: 'flex',
//   alignItems: 'center',
//   flexDirection: 'column',
//   position: 'relative',
// });

const MessagesBody = styled("div")({
    width: "calc( 100% - 20px )",
    margin: 10,
    overflowY: "scroll",
    height: "calc( 100% - 80px )",
});

const StyledAvatar = styled(Avatar)({
    color: "#fff",
    backgroundColor: deepOrange[500],
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
        userName: undefined,
    },
    {
        id: "test2",
        userId: "4919263b-1da2-49e7-b7c8-ea84a64005db",
        message: "test message 2",
        chatRoomId: "testRoom2",
        sentAt: "2024-05-22T10:05:00Z",
        isRead: true,
        userName: undefined,
    },
    {
        id: "test1",
        userId: "test1",
        message:
            "Situated in Puerto de la Cruz, 1.2 km from San Telmo Beach, Hotel Tigaiga features accommodation with an outdoor swimming pool, private parking, a garden and a shared lounge. With free WiFi, this 4-star hotel offers room service and a 24-hour front desk. The hotel has a terrace and sea views, and guests can enjoy a meal at the restaurant or a drink at the bar.",
        chatRoomId: "testRoom1",
        sentAt: "2024-05-22T10:00:00Z",
        isRead: true,
        userName: undefined,
    },
    {
        id: "test2",
        userId: "4919263b-1da2-49e7-b7c8-ea84a64005db",
        message: "test message 2",
        chatRoomId: "testRoom2",
        sentAt: "2024-05-22T10:05:00Z",
        isRead: true,
        userName: undefined,
    },
    {
        id: "test1",
        userId: "test1",
        message:
            "Situated in Puerto de la Cruz, 1.2 km from San Telmo Beach, Hotel Tigaiga features accommodation with an outdoor swimming pool, private parking, a garden and a shared lounge. With free WiFi, this 4-star hotel offers room service and a 24-hour front desk. The hotel has a terrace and sea views, and guests can enjoy a meal at the restaurant or a drink at the bar.",
        chatRoomId: "testRoom1",
        sentAt: "2024-05-22T10:00:00Z",
        isRead: true,
        userName: undefined,
    },
    {
        id: "test2",
        userId: "4919263b-1da2-49e7-b7c8-ea84a64005db",
        message: "test message 2",
        chatRoomId: "testRoom2",
        sentAt: "2024-05-22T10:05:00Z",
        isRead: true,
        userName: undefined,
    },
    {
        id: "test1",
        userId: "test1",
        message:
            "Situated in Puerto de la Cruz, 1.2 km from San Telmo Beach, Hotel Tigaiga features accommodation with an outdoor swimming pool, private parking, a garden and a shared lounge. With free WiFi, this 4-star hotel offers room service and a 24-hour front desk. The hotel has a terrace and sea views, and guests can enjoy a meal at the restaurant or a drink at the bar.",
        chatRoomId: "testRoom1",
        sentAt: "2024-05-22T10:00:00Z",
        isRead: false,
        userName: undefined,
    },
    {
        id: "test2",
        userId: "4919263b-1da2-49e7-b7c8-ea84a64005db",
        message: "test message 2",
        chatRoomId: "testRoom2",
        sentAt: "2024-05-22T10:05:00Z",
        isRead: false,
        userName: undefined,
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

    return (
        <div className="chatRoom">
            <div className="chatList">Chat List</div>
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
                        <Button>Delete chat</Button>
                    </div>
                </div>

                <StyledPaper elevation={2}>
                    <MessagesBody id="style-1">
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
        </div>
    );
}
