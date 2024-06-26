import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {ILogin} from "../../../interfaces/account";
import {googleLogin, login} from "../../../store/accounts/account.actions.ts";
import {unwrapResult} from "@reduxjs/toolkit";
import ErrorHandler from "../../../components/common/ErrorHandler.ts";
import {useAppDispatch} from "../../../hooks/redux";
import {useRef, useState} from "react";
import OutlinedErrorAlert from "../../../components/common/ErrorAlert.tsx";
import {useNavigate} from "react-router-dom";
import {jwtDecode} from "jwt-decode";
import InputGroup from "../../../components/common/InputGroup.tsx";
import {EmailValidator, PasswordValidator} from "../../../validations/account";

import {CredentialResponse, GoogleLogin} from "@react-oauth/google";
import {startListening} from "../../../SignalR";
import {getListOfChatRooms} from "../../../store/chat/chat.action.ts";

export interface IGoogleLogin{
    googleToken: string
}

export default function SignInPage() {
    const dispatch = useAppDispatch();
    const [errorMessage, setErrorMessage] = useState<string | undefined >(undefined);
    const formValid = useRef({ email: false,  password: false});
    const navigate = useNavigate();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const data = new FormData(event.currentTarget);

        const model : ILogin = {
            email: data.get("email") as string,
            password: data.get("password")  as string,
        }


        try {
            const response = await dispatch(login(model));
            unwrapResult(response);

            await  afterLogin(response.payload)

        } catch (error ) {
            setErrorMessage(ErrorHandler(error));

        }
    };

    const handleLoginSuccess =  async (response: CredentialResponse) => {
        // Handle successful login (e.g., store user data)
        console.log('Logged in successfully:', response);

        const token : IGoogleLogin = {
            googleToken: response.credential as string
        }
        try {
            const resp = await dispatch(googleLogin(token));

            unwrapResult(resp);

            await  afterLogin(resp.payload);

        } catch (error ) {
            setErrorMessage(ErrorHandler(error));
        }
    };

     const  afterLogin  = async (token : string) =>{

        await startListening();

        const decodedToken: { [key: string]: string } = jwtDecode(token);

        const role = decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]

        if (role.toLowerCase().includes('realtor'))
        {
            navigate("/dashboard/profile");
        }else if(role.toLowerCase().includes('user'))
        {
            navigate("/profile");
        }else if(role.toLowerCase().includes('admin'))
        {
            navigate("/dashboard/profile");
        }else {
            navigate("/#");
        }

        try {
            const response = await dispatch(getListOfChatRooms());
            unwrapResult(response);
        }catch (error)                 {
             setErrorMessage(ErrorHandler(error));
        }
    }

    return (
        <Container component="main" maxWidth="md">
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                {errorMessage && <OutlinedErrorAlert message={errorMessage} />}
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <Grid container spacing={2} sx={{ mt: 1 }}>
                    <Grid item xs={12} md={6}>
                        <Box
                            component="form"
                            onSubmit={handleSubmit}
                            noValidate
                            sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
                        >
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <InputGroup
                                        label="Email"
                                        field="email"
                                        type="email"
                                        validator={EmailValidator}
                                        onChange={(isValid) => (formValid.current.email = isValid)}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <InputGroup
                                        label="Password"
                                        field="password"
                                        type="password"
                                        validator={PasswordValidator}
                                        onChange={(isValid) => (formValid.current.password = isValid)}
                                    />
                                </Grid>
                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Sign In
                            </Button>
                            <Grid container>
                                <Grid item xs>
                                    <Link href="/authentication/forgot-password" variant="body2">
                                        Forgot password?
                                    </Link>
                                </Grid>
                                <Grid item>
                                    <Link href="/authentication/reconfirm-email" variant="body2">
                                        {"Don't get a confirmation letter?"}
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <GoogleLogin
                            onSuccess={handleLoginSuccess}
                        />
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
}