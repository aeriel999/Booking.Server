import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import {useNavigate} from "react-router-dom";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

interface CustomizedDialogsProps {
    isOpen: boolean;
    message: string;
    setOpen: (arg: boolean) => void;
    navigate: string;
    action?: () => void;
}

export default function CustomizedDialogs ( props : CustomizedDialogsProps)  {
    const navigate = useNavigate();
    const handleClose = () => {
        props.setOpen(false);
        if(props.action)
            {
                props.action();
            }
        navigate(props.navigate)
    };

    return (
        <React.Fragment>

            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={props.isOpen}
            >
                <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                    Information
                </DialogTitle>
                <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
                <DialogContent dividers>
                    <Typography gutterBottom>
                        {props.message}
                    </Typography>

                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleClose}>
                        Ok
                    </Button>
                </DialogActions>
            </BootstrapDialog>
        </React.Fragment>
    );
}