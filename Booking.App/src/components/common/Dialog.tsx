import * as React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    "& .MuiDialogContent-root": {
        padding: theme.spacing(2),
    },
    "& .MuiDialogActions-root": {
        padding: theme.spacing(1),
    },
}));

interface CustomizedDialogsProps {
    isOpen: boolean;
    message: string;
    setOpen: (arg: boolean) => void;
    navigate: string;
    action?: () => Promise<void>;
}

export default function CustomizedDialogs(props: CustomizedDialogsProps) {
    console.log("props", props);

    const navigate = useNavigate();

    const handleClick = async () => {
        if (props.action) {
            await props.action();
        }

        props.setOpen(false);

        navigate(props.navigate);
    };


    return (
        <React.Fragment>
            <BootstrapDialog
                onClose={() => {
                    props.setOpen(false);
                }}
                aria-labelledby="customized-dialog-title"
                open={props.isOpen}
            >
                <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                    Information
                </DialogTitle>
                <IconButton
                    aria-label="close"
                    onClick={() => {
                        props.setOpen(false);
                    }}
                    sx={{
                        position: "absolute",
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
                <DialogContent dividers>
                    <Typography gutterBottom>{props.message}</Typography>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleClick}>
                        Ok
                    </Button>
                </DialogActions>
            </BootstrapDialog>
        </React.Fragment>
    );
}
