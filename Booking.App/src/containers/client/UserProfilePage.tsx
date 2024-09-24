import { useEffect, useState } from "react";
import { getListOfChatRooms } from "../../store/chat/chat.action.ts";
import { unwrapResult } from "@reduxjs/toolkit";
 
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import {
    Avatar,
    Box,
    Breadcrumbs,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Typography,
} from "@mui/material";
import { APP_ENV } from "../../env/index.ts";
import { logout } from "../../store/accounts/account.slice.ts";
import { Link, useNavigate } from "react-router-dom";
import { deleteUserAccount } from "../../store/users/user.action.ts";

export default function UserProfilePage() {
    const { user } = useAppSelector((state) => state.account);
    const dispatch = useAppDispatch();
    const [avatarUrl, setAvatarUrl] = useState<string>("#");
    const [deleteAlertIsOpen, setDeleteAlertIsOpen] = useState(false);
    const navigate = useNavigate();
    // const {listChats} = useAppSelector(state => state.chat);

    useEffect(() => {
        if (user) {
            setAvatarUrl(APP_ENV.BASE_URL + user?.avatar);
            const getRooms = async () => {
                try {
                    const response = await dispatch(getListOfChatRooms());
                    unwrapResult(response);
                } catch (e) {
                    console.log(e);
                }
            };

            getRooms();
            connectForRealtorToSignalR();
        }
    }, [user]);

    const handleClose = () => {
        setDeleteAlertIsOpen(false);
    };
    const deleteAccount = async () => {
        await dispatch(deleteUserAccount());
        await dispatch(logout());
        navigate("/");
    };
    return (
        <>
            <Box>
                <Breadcrumbs
                    aria-label="breadcrumb"
                    style={{ marginBottom: "20px" }}
                >
                    <Link to={"/dashboard"}>
                        <Typography variant="h6" color="text.primary">
                            Dashboard
                        </Typography>
                    </Link>
                    <Typography variant="h6" color="text.primary">
                        Profile
                    </Typography>
                </Breadcrumbs>
                <Dialog
                    open={deleteAlertIsOpen}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title-delete-account"
                    aria-describedby="alert-dialog-description-delete-account"
                >
                    <DialogTitle id="alert-dialog-title-delete-account">
                        {"Do you want to delete your account?"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description-delete-account">
                            If you will delete your account, you will no longer
                            be able to recover it
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Disagree</Button>
                        <Button onClick={deleteAccount}>Agree</Button>
                    </DialogActions>
                </Dialog>
                {avatarUrl && (
                    <Avatar
                        sx={{
                            margin: "auto",
                            marginTop: 10,
                            marginBottom: 10,
                            width: "20%",
                            height: 300,
                            fontSize: 50,
                        }}
                        alt={user?.email}
                        src={avatarUrl}
                    />
                )}
                <Box sx={{ border: "1px solid black", padding: 10, margin: 5 }}>
                    <Typography sx={{ textAlign: "center" }} variant="h5">
                        {user?.email}
                    </Typography>
                </Box>
                <Box sx={{ display: "flex", columnGap: 10 }}>
                    <Button
                        sx={{ flex: 1 }}
                        variant="contained"
                        onClick={() => navigate("edit")}
                    >
                        Edit email
                    </Button>
                    <Button
                        sx={{ flex: 1 }}
                        variant="contained"
                        onClick={() => navigate("change-password")}
                    >
                        Change Password
                    </Button>
                    <Button
                        sx={{ flex: 1 }}
                        variant="contained"
                        onClick={() => setDeleteAlertIsOpen(true)}
                    >
                        Delete
                    </Button>
                </Box>
            </Box>
        </>
    );
}
function connectForRealtorToSignalR() {
    throw new Error("Function not implemented.");
}

