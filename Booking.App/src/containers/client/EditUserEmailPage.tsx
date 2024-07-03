import { Box, Breadcrumbs, Button, Container, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { editUserProfile } from "../../store/users/user.action";
import InputGroup from "../../components/common/InputGroup";
import { EmailValidator } from "../../validations/account";
import { unwrapResult } from "@reduxjs/toolkit";
import ErrorHandler from "../../components/common/ErrorHandler";
import CustomizedDialogs from "../../components/common/Dialog";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../store/accounts/account.slice";

export const EditUserEpailPage = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { user } = useAppSelector(state => state.account);
    const formValid = useRef({ email: true });
    const [message, setMessage] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [letterSend, setLetterSend] = useState(false);


    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        if ((data.get("email") as string).length == 0 || (data.get("email") as string) == user?.email) {
            navigate("/profile")
        }

        try {
            const response = await dispatch(editUserProfile({ Email: data.get("email") as string }));
            unwrapResult(response);
            setMessage(`We have sent a confirmation letter to the ${(data.get("email") as string)}`);
            setLetterSend(true);
            setIsOpen(true);

        } catch (error) {
            setMessage(ErrorHandler(error));
            setIsOpen(true);
        }
    }
    const Logout = async () => {
        setLetterSend(false);
        navigate("/");
        //setIsOpen(false);
        await dispatch(logout());
    }
    useEffect(() => {
        if (!isOpen && letterSend) {
            Logout();
        }
    }, [isOpen])
    return (
        <Container fixed sx={{ display: "flex", flexDirection: "column", rowGap: 15 }} >
            <Breadcrumbs aria-label="breadcrumb" style={{ marginBottom: "20px" }}>
                <Link to={"/dashboard"}>
                    <Typography variant="h6" color="text.primary">Dashboard</Typography>
                </Link>
                <Link to={"/dashboard/profile"}>
                    <Typography variant="h6" color="text.primary">Profile</Typography>
                </Link>
                <Typography variant="h6" color="text.primary">Edit Email</Typography>
            </Breadcrumbs>
            <CustomizedDialogs
                isOpen={isOpen}
                message={message}
                setOpen={function (): void {
                    /*if (letterSend) {
                        //Logout();
                        //setIsOpen(false);
                        navigate("/");
                    }*/
                    setIsOpen(false);

                }} navigate={""}
            ></CustomizedDialogs>
            <Box component="form" onSubmit={handleSubmit} sx={{ padding: 10 }}>
                <InputGroup
                    label="Email"
                    field="email"
                    type="email"
                    validator={EmailValidator}
                    onChange={isValid => (formValid.current.email = isValid)}
                    defaultValue={user?.email}

                />

                <Box sx={{ display: "flex", justifyContent: "space-between", margin: "auto", width: "50%", marginTop: 10 }}>
                    <Button type="submit" sx={{ width: "30%" }} variant="contained">Update</Button>
                    <Button sx={{ width: "30%" }} variant="contained" onClick={() => navigate("/dashboard/profile")}>Cancel</Button>
                </Box>
            </Box>
        </Container>
    );
}