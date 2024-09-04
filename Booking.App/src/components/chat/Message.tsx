//import { Avatar } from "@mui/material";
import { styled } from "@mui/system";

import { IUserMessage } from "../../interfaces/chat";
const MessageRow = styled("div")({
    display: "flex",
    flexDirection: "column",
});

const MessageRowRight = styled("div")({
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
});

const MessageBlue = styled("div")({
    position: "relative",
    marginLeft: "20px",
    marginBottom: "10px",
    padding: "10px",
    backgroundColor: "#00C2C1",
    width: "60%",
    textAlign: "left",
    font: "400 .9em 'Open Sans', sans-serif",
    border: "1px solid #97C6E3",
    borderRadius: "10px",
    
    color:"#ffff",
    "&:after": {
        content: '""',
        position: "absolute",
        width: "0",
        height: "0",
        borderTop: "15px solid #00C2C1",
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
    alignSelf:"end",
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
 //  position: "absolute",
    alignSelf:"start",
    fontSize: ".85em",
    fontWeight: "300",
    marginTop: "10px",
    marginBo: "10px",
    bottom: "-3px",
    right: "5px",
});
const MessageTimeStampLeft = styled("div")({
 //  position: "absolute",
    alignSelf:"end",
    fontSize: ".85em",
    fontWeight: "300",
    marginTop: "10px",
    marginBo: "10px",
    bottom: "-3px",
    right: "5px",
});

 

// MessageLeft component
export const MessageLeft = (userMsg: IUserMessage) => {
    return (
        <MessageRow>
            <MessageBlue>
                <MessageContent>{userMsg.message}</MessageContent>
            </MessageBlue>

             <MessageTimeStampRight>{userMsg.sentAt}</MessageTimeStampRight>
        </MessageRow>
    );
};

// MessageRight component
export const MessageRight = (userMsg: IUserMessage) => {
    return (
        <MessageRowRight>
           
            <MessageOrange>
                <MessageContent>{userMsg.message}</MessageContent>
            </MessageOrange>

            <MessageTimeStampLeft>{userMsg.sentAt}</MessageTimeStampLeft>

        </MessageRowRight>
    );
};
