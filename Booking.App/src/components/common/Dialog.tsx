import * as React from "react";
import Button from "@mui/material/Button";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { CustomizedDialogsProps } from "../../interfaces/common";
import { BootstrapDialog } from "../../utils/styles";
import { useAppDispatch } from "../../hooks/redux";
import { changeDashboardMenuItem } from "../../store/settings/settings.slice";

export default function CustomizedDialogs(props: CustomizedDialogsProps) {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const handleClick = async () => {
        if (props.action) {
            await props.action();
        }

        props.setOpen(false);

        if(props.menuItem){
            dispatch(changeDashboardMenuItem(props.menuItem));
        }

        if(props.navigate){
             navigate(props.navigate);
        }
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
                    {props.lable}
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
                        Yes
                    </Button>
                    <Button
                        autoFocus
                        onClick={() => {
                            props.setOpen(false);
                        }}
                    >
                        No
                    </Button>
                </DialogActions>
            </BootstrapDialog>
        </React.Fragment>
    );
}
