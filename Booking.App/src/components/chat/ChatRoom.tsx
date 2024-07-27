import { styled } from "@mui/system";
import Paper from "@mui/material/Paper";
import { IChatRoom, IUserMessage } from "../../interfaces/chat";
import { Avatar, Breadcrumbs, Button, Divider, Typography } from "@mui/material";
import { useAppSelector } from "../../hooks/redux";
import { MessageLeft, MessageRight } from "./Message";
import { ChatTextInput } from "./ChatTextInput";
import { Link } from "react-router-dom";
import UAvatar from "../../assets/Auth/image 20.svg";
import { deepOrange } from "@mui/material/colors";
const Container = styled("div")({
    width: "100vw",
    minHeight: "20vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "20px",
});

const StyledPaper = styled(Paper)({
    width: "80vw",
    minHeight: "20vh",
    maxWidth: "500px",
    maxHeight: "700px",
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

const TopChat = styled("div")({
    marginBottom: "20px",
    display: "flex",
    flexDirection: "row",
});

const testMsg: IUserMessage[] = [
    {
        id: "test1",
        userId: "test1",
        message: "test message 1",
        chatRoomId: "testRoom1",
        sentAt: "2024-05-22T10:00:00Z",
        isRead: false,
    },
    {
        id: "test2",
        userId: "4a7e76c2-8227-407b-8597-f8112a781b47",
        message: "test message 2",
        chatRoomId: "testRoom2",
        sentAt: "2024-05-22T10:05:00Z",
        isRead: true,
    },
];

const props: IChatRoom = {
    chatRoomId: "test",
    clientId: "test",
    realtorId: "test",
    postId: "test",
    postName: "test",
    sendUserName: "test1",
    sendUserAvatar: "test1",
    userMessages: testMsg,
};

export default function ChatRoom() {
  //  const { roomId } = useParams();
    const { user } = useAppSelector((state) => state.account);

    return (
        <>
            <Breadcrumbs
                aria-label="breadcrumb"
                style={{ marginBottom: "20px" }}
            >
                <Link to={"/dashboard/profile"}>
                    <Typography variant="h6" color="text.primary">
                        Dashboard
                    </Typography>
                </Link>
                <Link to={"/dashboard/profile"}>
                    <Typography variant="h6" color="text.primary">
                        Chats
                    </Typography>
                </Link>
                <Typography variant="h6" color="text.primary">
                    {props.postName}
                </Typography>
            </Breadcrumbs>
            <Divider />
            <Container>
                <TopChat>
                    <StyledAvatar
                        alt={props.sendUserName}
                        src={
                            props.sendUserAvatar == null
                                ? UAvatar
                                : props.sendUserAvatar
                        }
                    />

                    <Typography variant="h6" color="text.primary">
                        {props.sendUserName}
                    </Typography>

                    <Button>Delete chat</Button>
                </TopChat>

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
            </Container>
        </>
    );
}
