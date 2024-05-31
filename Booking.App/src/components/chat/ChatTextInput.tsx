import { styled } from "@mui/system";
import { TextField, Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

const WrapForm = styled("form")(({ theme }) => ({
    display: "flex",
    justifyContent: "center",
    width: "95%",
    margin: `${theme.spacing(0)} auto`,
}));

const WrapText = styled(TextField)({
    width: "100%",
});

const StyledButton = styled(Button)(({ theme }) => ({
     margin: theme.spacing(1),
}));

export const ChatTextInput = () => {
    return (
        <WrapForm noValidate autoComplete="off">
            <WrapText
                id="standard-text"
                label="Enter your message"
            /> 
            <StyledButton variant="contained" color="primary">
                <SendIcon />
            </StyledButton>
        </WrapForm>
    );
};
