import { Avatar } from "@mui/material";
import { styled } from "@mui/system";
import { deepOrange } from "@mui/material/colors";
import { IUserMessage } from "../../interfaces/chat";
import UAvatar from "../../assets/avatar-profile-icon-vector-illustration_276184-165.jpg";
const MessageRow = styled("div")({
    display: "flex",
});

const MessageRowRight = styled("div")({
    display: "flex",
    justifyContent: "flex-end",
});

const MessageBlue = styled("div")({
    position: "relative",
    marginLeft: "20px",
    marginBottom: "10px",
    padding: "10px",
    backgroundColor: "#A8DDFD",
    width: "60%",
    textAlign: "left",
    font: "400 .9em 'Open Sans', sans-serif",
    border: "1px solid #97C6E3",
    borderRadius: "10px",
    "&:after": {
        content: '""',
        position: "absolute",
        width: "0",
        height: "0",
        borderTop: "15px solid #A8DDFD",
        borderLeft: "15px solid transparent",
        borderRight: "15px solid transparent",
        top: "0",
        left: "-15px",
    },
    "&:before": {
        content: '""',
        position: "absolute",
        width: "0",
        height: "0",
        borderTop: "17px solid #97C6E3",
        borderLeft: "16px solid transparent",
        borderRight: "16px solid transparent",
        top: "-1px",
        left: "-17px",
    },
});

const MessageOrange = styled("div")({
    position: "relative",
    marginRight: "20px",
    marginBottom: "10px",
    padding: "10px",
    backgroundColor: "#f8e896",
    width: "60%",
    textAlign: "left",
    font: "400 .9em 'Open Sans', sans-serif",
    border: "1px solid #dfd087",
    borderRadius: "10px",
    "&:after": {
        content: '""',
        position: "absolute",
        width: "0",
        height: "0",
        borderTop: "15px solid #f8e896",
        borderLeft: "15px solid transparent",
        borderRight: "15px solid transparent",
        top: "0",
        right: "-15px",
    },
    "&:before": {
        content: '""',
        position: "absolute",
        width: "0",
        height: "0",
        borderTop: "17px solid #dfd087",
        borderLeft: "16px solid transparent",
        borderRight: "16px solid transparent",
        top: "-1px",
        right: "-17px",
    },
});

const MessageContent = styled("p")({
    padding: 0,
    margin: 0,
});

const MessageTimeStampRight = styled("div")({
    position: "absolute",
    fontSize: ".85em",
    fontWeight: "300",
    marginTop: "10px",
    bottom: "-3px",
    right: "5px",
});

const StyledAvatar = styled(Avatar)({
    color: "#fff",
    backgroundColor: deepOrange[500],
    width: "32px",
    height: "32px",
});

const DisplayName = styled("div")({
    marginLeft: "20px",
});

// MessageLeft component
export const MessageLeft = (userMsg: IUserMessage) => {
    return (
        <MessageRow>
            <StyledAvatar
                alt={userMsg.user.email}
                src={
                    userMsg.user.avatar == null ? UAvatar : userMsg.user.avatar
                }
            />
            <div>
                <DisplayName>{userMsg.user.email}</DisplayName>
                <MessageBlue>
                    <div>
                        <MessageContent>{userMsg.message}</MessageContent>
                    </div>
                    <MessageTimeStampRight>
                        {userMsg.sentAt}
                    </MessageTimeStampRight>
                </MessageBlue>
            </div>
        </MessageRow>
    );
};

// MessageRight component
export const MessageRight = ({ message = "no message", timestamp = "" }) => {
    return (
        <MessageRowRight>
            <MessageOrange>
                <MessageContent>{message}</MessageContent>
                <MessageTimeStampRight>{timestamp}</MessageTimeStampRight>
            </MessageOrange>
        </MessageRowRight>
    );
};
