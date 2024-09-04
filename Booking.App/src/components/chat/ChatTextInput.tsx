import { styled } from "@mui/system";
import { TextField, Button } from "@mui/material";
import SendIcon from "../../assets/DashboardIcons/send.svg";

const WrapForm = styled("form")(({ theme }) => ({
    display: "flex",
    justifyContent: "center",
    width: "95%",
    margin: `${theme.spacing(0)} auto`,
}));

const WrapText = styled(TextField)({
    width: "100%",
    
});

 

export const ChatTextInput = () => {
    return (
        <WrapForm noValidate autoComplete="off">
            <WrapText
                id="standard-text"
                label="Enter your message"
            /> 
           <button className="sendIcon">
                <img src={SendIcon} alt="" />
           </button>
        </WrapForm>
    );
};
