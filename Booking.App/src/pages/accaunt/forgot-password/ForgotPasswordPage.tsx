import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import OutlinedErrorAlert from "../../../components/common/ErrorAlert.tsx";
import Avatar from "@mui/material/Avatar";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Container from "@mui/material/Container";
import {useRef, useState} from "react";
import InputGroup from "../../../components/common/InputGroup.tsx";
import {EmailValidator} from "../../../validations/account";
import * as React from "react";
import {forgotPassword} from "../../../store/accounts/account.actions.ts";
import {unwrapResult} from "@reduxjs/toolkit";
import ErrorHandler from "../../../components/common/ErrorHandler.ts";
import {useAppDispatch} from "../../../hooks/redux";
import {useNavigate} from "react-router-dom";
import {IForgotPassword} from "../../../interfaces/account";


export default function ForgotPasswordPage(){
    const formValid = useRef({ email: false});
    const [errorMessage, setErrorMessage] = useState<string | undefined >(undefined);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        if (Object.values(formValid.current).every(isValid => isValid)) {

            const model : IForgotPassword = {
                email: data.get("email") as string
            }

            try {
                const response = await dispatch(forgotPassword(model));
                unwrapResult(response);

                navigate(`/authentication/forgot-password-information/${model.email}`);

            } catch (error ) {

                setErrorMessage(ErrorHandler(error));
            }
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
                    Reset Password
                </Typography>
                <Typography variant="body1"  align={'center'}>
                    Please enter the email address that you used to register,
                    and we will send you a link to reset your password via Email.
                </Typography>
                <p></p>
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
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign In
                    </Button>
                    <Grid item>
                        <Link href="/authentication/login" variant="body2">
                            Back to Sign in
                        </Link>
                    </Grid>
                </Box>
            </Box>

        </Container>
    );
}