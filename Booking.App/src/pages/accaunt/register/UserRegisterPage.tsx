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
import {ConfirmPasswordValidator, EmailValidator, PasswordValidator} from "../../../validations/accaunt";
import { useRef, useState} from "react";
import {IUserRegister} from "../../../interfaces/account";
import {unwrapResult} from "@reduxjs/toolkit";
import {useAppDispatch} from "../../../hooks/redux";
import {userRegister} from "../../../store/accounts/account.actions.ts";
import OutlinedErrorAlert from "../../../components/common/ErrorAlert.tsx";
import {useNavigate} from "react-router-dom";
import ErrorHandler from "../../../components/common/ErrorHandler.ts";

export default function UserRegisterPage() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState<string | undefined >(undefined);
    const [isFormValid, setIsFormValid] = useState(false);
    const formValid = useRef({ email: false,  password: false, confirmPassword: false});

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
            const model : IUserRegister = {
                email: data.get("email") as string,
                password: data.get("password")  as string,
                confirmPassword: data.get("confirmPassword")  as string
            }

            try {
                const response = await dispatch(userRegister(model));
                unwrapResult(response);

                navigate(`/authentication/register-information/${model.email}`);

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
                        Register
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }} onChange={handleChange}>
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
                            Register
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link href="/authentication/login" variant="body2">
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>

            </Container>

    );
}