import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import InputGroup from "../../../components/common/InputGroup.tsx";
import {
    AvatarValidator,
    ConfirmPasswordValidator,
    EmailValidator,
    FirstNameValidator,
    LastNameValidator,
    PasswordValidator,
    realtorRegisterResolver,
} from "../../../validations/account";
import { useRef, useState } from "react";
import { IRealtorRegister } from "../../../interfaces/account";
import { unwrapResult } from "@reduxjs/toolkit";
import { useAppDispatch } from "../../../hooks/redux";
import { realtorRegister } from "../../../store/accounts/account.actions.ts";
import OutlinedErrorAlert from "../../../components/common/ErrorAlert.tsx";
import { useNavigate } from "react-router-dom";
import ErrorHandler from "../../../components/common/ErrorHandler.ts";
import MuiPhoneNumber from "mui-phone-number";
import { isValidPhoneNumber } from "libphonenumber-js";

import FileUploader from "../../../components/common/FileUploader.tsx";
import Header from "../../../components/authentification/Header.tsx";
import { useForm } from "react-hook-form";
import InputField from "../../../components/common/InputField.tsx";
import { realtorRegisterFirstStep } from "../../../store/accounts/account.slice.ts";



export default function RealtorRegisterPage() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
     
    const [errorMessage, setErrorMessage] = useState<string | undefined>(
        undefined
    );

    const [isPhoneValid, setIsPhoneValid] = useState(true);
   
    const [phone, setPhone] = useState<string>("");

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm<IRealtorRegister>({ resolver: realtorRegisterResolver });

    const onSubmit = async (data: IRealtorRegister) => {
        try {
            const response = await dispatch(realtorRegisterFirstStep(data));
            unwrapResult(response);

            navigate(`/authentication/realtor-register-add-avatar`);
        } catch (error) {
            setErrorMessage(ErrorHandler(error));
        }
    };

    // const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    //     event.preventDefault();
    //     const data = new FormData(event.currentTarget);

    //     if (Object.values(formValid.current).every((isValid) => isValid)) {
    //         const model: IRealtorRegister = {
    //             email: data.get("email") as string,
    //             password: data.get("password") as string,
    //             confirmPassword: data.get("confirmPassword") as string,
    //             firstName: data.get("firstName") as string,
    //             lastName: data.get("lastName") as string,
    //             phoneNumber: phone,
    //             avatar: images[0],
    //         };

    //         try {
    //             const response = await dispatch(realtorRegister(model));
    //             unwrapResult(response);

    //             navigate(`/authentication/register-information/${model.email}`);
    //         } catch (error) {
    //             setErrorMessage(ErrorHandler(error));
    //         }
    //     }
    // };

    return (
        <div className="content">
            <Header />

            <div className="regiterMaimContainer">
                {errorMessage && <OutlinedErrorAlert message={errorMessage} />}

                <div id="authCenterContainer">
                    <h1> Register</h1>

                    <div id="loginForm">
                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            id="loginFormTop"
                        >
                            <div className="loginFields">
                                <InputField
                                    placeholder="First name"
                                    type="text"
                                    name="firstName"
                                    register={register}
                                    setValue={setValue}
                                    className={
                                        errors.firstName
                                            ? "errorFormInput"
                                            : "formInput"
                                    }
                                />
                                {errors.firstName && (
                                    <p className="error">
                                        <p>*</p>
                                        {errors.firstName.message}
                                    </p>
                                )}

                                <InputField
                                    placeholder="Last name"
                                    type="text"
                                    name="lastName"
                                    register={register}
                                    setValue={setValue}
                                    className={
                                        errors.lastName
                                            ? "errorFormInput"
                                            : "formInput"
                                    }
                                />
                                {errors.lastName && (
                                    <p className="error">
                                        <p>*</p>
                                        {errors.lastName.message}
                                    </p>
                                )}

                                <Grid className="formInput">
                                    <MuiPhoneNumber
                                     
                                        defaultCountry={"ua"}
                                        onChange={(e) => {
                                            setIsPhoneValid(
                                                isValidPhoneNumber(e as string)
                                            );
                                            setPhone(e as string);
                                        }
                                    }
                                        error={!isPhoneValid}
                                    />
                                </Grid>
 
                                <InputField
                                    placeholder="Email"
                                    type="email"
                                    name="email"
                                    register={register}
                                    setValue={setValue}
                                    className={
                                        errors.email
                                            ? "errorFormInput"
                                            : "formInput"
                                    }
                                />
                                {errors.email && (
                                    <p className="error">
                                        <p>*</p>
                                        {errors.email.message}
                                    </p>
                                )}

                                <InputField
                                    placeholder="Password"
                                    type="password"
                                    name="password"
                                    register={register}
                                    setValue={setValue}
                                    className={
                                        errors.password
                                            ? "errorFormInput"
                                            : "formInput"
                                    }
                                />
                                {errors.password && (
                                    <p className="error">
                                        <p>*</p>
                                        {errors.password.message}
                                    </p>
                                )}

                                <InputField
                                    placeholder="Confirm Password"
                                    type="password"
                                    name="confirmPassword"
                                    register={register}
                                    setValue={setValue}
                                    className={
                                        errors.confirmPassword
                                            ? "errorFormInput"
                                            : "formInput"
                                    }
                                />
                                {errors.password && (
                                    <p className="error">
                                        {errors.confirmPassword && <p>*</p>}

                                        {errors.confirmPassword?.message}
                                    </p>
                                )}
                            </div>

                            <div id="loginFormBottom">
                                <button type="submit" className="authButton">
                                    Submit
                                </button>

                                <div id="secondaryRegisterText">
                                    <a
                                        href="/authentication/forgot-password"
                                        className="linkConfirmation"
                                    >
                                        Already have an account? Sign in
                                    </a>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        // <Container component="main" maxWidth="xs">
        //     <CssBaseline />
        //     <Box
        //         sx={{
        //             marginTop: 8,
        //             display: "flex",
        //             flexDirection: "column",
        //             alignItems: "center",
        //         }}
        //     >
        //         {errorMessage && <OutlinedErrorAlert message={errorMessage} />}

        //         <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
        //             <LockOutlinedIcon />
        //         </Avatar>
        //         <Typography component="h1" variant="h5">
        //             Register
        //         </Typography>
        //         <Box
        //             component="form"
        //             noValidate
        //             onSubmit={handleSubmit}
        //             sx={{ mt: 3 }}
        //             onChange={handleChange}
        //         >
        //             <Grid container spacing={2}>
        //                 <Grid item xs={12}>
        //                     <InputGroup
        //                         label="First name"
        //                         field="firstName"
        //                         validator={FirstNameValidator}
        //                         onChange={(isValid) =>
        //                             (formValid.current.firstName = isValid)
        //                         }
        //                     />
        //                 </Grid>
        //                 <Grid item xs={12}>
        //                     <InputGroup
        //                         label="Last name"
        //                         field="lastName"
        //                         validator={LastNameValidator}
        //                         onChange={(isValid) =>
        //                             (formValid.current.lastName = isValid)
        //                         }
        //                     />
        //                 </Grid>
        //                 <Grid item xs={12}>
        //                     <MuiPhoneNumber
        //                         defaultCountry={"ua"}
        //                         onChange={(e) => {
        //                             formValid.current.phoneNumber =
        //                                 isValidPhoneNumber(e as string);
        //                             setIsPhoneValid(
        //                                 isValidPhoneNumber(e as string)
        //                             );
        //                             setPhone(e as string);
        //                             handleChange();
        //                         }}
        //                         error={!isPhoneValid}
        //                     />
        //                 </Grid>
       
        //                 <Grid item xs={12}>
        //                     <InputGroup
        //                         label="Email"
        //                         field="email"
        //                         type="email"
        //                         validator={EmailValidator}
        //                         onChange={(isValid) =>
        //                             (formValid.current.email = isValid)
        //                         }
        //                     />
        //                 </Grid>
        //                 <Grid item xs={12}>
        //                     <InputGroup
        //                         label="Password"
        //                         field="password"
        //                         type="password"
        //                         validator={PasswordValidator}
        //                         onChange={(isValid) =>
        //                             (formValid.current.password = isValid)
        //                         }
        //                         setIncomeValue={setPassword}
        //                     />
        //                 </Grid>
        //                 <Grid item xs={12}>
        //                     <InputGroup
        //                         label="Confirm Password"
        //                         field="confirmPassword"
        //                         type="password"
        //                         validator={confirmPassValidator}
        //                         onChange={(isValid) =>
        //                             (formValid.current.confirmPassword =
        //                                 isValid)
        //                         }
        //                     />
        //                 </Grid>
        //             </Grid>

        //             <Button
        //                 type="submit"
        //                 fullWidth
        //                 variant="contained"
        //                 sx={{ mt: 3, mb: 2 }}
        //                 disabled={!isFormValid}
        //             >
        //                 Register
        //             </Button>
        //             <Grid container justifyContent="flex-end">
        //                 <Grid item>
        //                     <Link href="/authentication/login" variant="body2">
        //                         Already have an account? Sign in
        //                     </Link>
        //                 </Grid>
        //             </Grid>
        //         </Box>
        //     </Box>
        // </Container>
    );
}
