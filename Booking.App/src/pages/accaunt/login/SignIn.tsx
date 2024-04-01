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
import {login} from "../../../store/accounts/account.actions.ts";
import {unwrapResult} from "@reduxjs/toolkit";
import ErrorHandler from "../../../components/common/ErrorHandler.ts";
import {useAppDispatch} from "../../../hooks/redux";
import {useRef, useState} from "react";
import OutlinedErrorAlert from "../../../components/common/ErrorAlert.tsx";
import {useNavigate} from "react-router-dom";
import {jwtDecode} from "jwt-decode";
import InputGroup from "../../../components/common/InputGroup.tsx";
import {EmailValidator, PasswordValidator} from "../../../validations/accaunt";

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

            const decodedToken: { [key: string]: string } = jwtDecode(response.payload);

            const role = decodedToken["Roles"]

            if (role.toLowerCase().includes('realtor'))
            {
                navigate("/dashboard/profile");
            }else if(role.toLowerCase().includes('user'))
            {
                navigate("/profile");
            }else if(role.toLowerCase().includes('admin'))
            {
                navigate("/profile");
            }else {
                navigate("/#");
            }
        } catch (error ) {
            setErrorMessage(ErrorHandler(error));
        }
    };

    return (
        <Container component="main" maxWidth="xs">
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
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <InputGroup
                                label="Email"
                                field="email"
                                type= "email"
                                validator={EmailValidator}
                                onChange={isValid => (formValid.current.email = isValid)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <InputGroup
                                label="Password"
                                field="password"
                                type= "password"
                                validator={PasswordValidator}
                                onChange={isValid => (formValid.current.password = isValid)}

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
                            <Link href="#" variant="body2">
                                {"Don't get a confirmation letter?"}
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>

        </Container>
    );
}