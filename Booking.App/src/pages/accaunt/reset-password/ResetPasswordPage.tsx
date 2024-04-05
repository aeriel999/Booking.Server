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
import InputGroup from "../../../components/common/InputGroup.tsx";
import {ConfirmPasswordValidator, PasswordValidator} from "../../../validations/accaunt";
import { useRef, useState} from "react";
import {IResetPassword} from "../../../interfaces/account";
import {unwrapResult} from "@reduxjs/toolkit";
import {useAppDispatch} from "../../../hooks/redux";
import {resetPassword} from "../../../store/accounts/account.actions.ts";
import OutlinedErrorAlert from "../../../components/common/ErrorAlert.tsx";
import {useNavigate, useParams} from "react-router-dom";
import ErrorHandler from "../../../components/common/ErrorHandler.ts";

export default function ResetPasswordPage() {
    const{email, token} = useParams();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState<string | undefined >(undefined);
    const [isFormValid, setIsFormValid] = useState(false);
    const formValid = useRef({ password: false, confirmPassword: false});

    const confirmPassValidator = (value: string): string | false | undefined => {
        return ConfirmPasswordValidator(password, value);
    };

    function handleChange() {
        setIsFormValid(Object.values(formValid.current).every(isValid => isValid));
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        if (Object.values(formValid.current).every(isValid => isValid)) {
            const model : IResetPassword = {
                email: email,
                token: token,
                password: data.get("password")  as string,
                confirmPassword: data.get("confirmPassword")  as string
            }
    console.log("model", model)
            try {
                const response = await dispatch(resetPassword(model));
                unwrapResult(response);

                navigate(`/authentication/login`);

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
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }} onChange={handleChange}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <InputGroup
                                label="Password"
                                field="password"
                                type= "password"
                                validator={PasswordValidator}
                                onChange={isValid => (formValid.current.password = isValid)}
                                setIncomeValue={setPassword}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <InputGroup
                                label="Confirm Password"
                                field="confirmPassword"
                                type= "password"
                                validator={confirmPassValidator}
                                onChange={isValid => (formValid.current.confirmPassword = isValid)}
                            />

                        </Grid>
                    </Grid>

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        disabled={!isFormValid}
                    >
                        Reset
                    </Button>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Link href="/authentication/login" variant="body2">
                                Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>

        </Container>

    );
}