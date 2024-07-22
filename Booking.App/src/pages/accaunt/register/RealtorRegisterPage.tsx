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
import IMG from "../../../assets/avatar-profile-icon-vector-illustration_276184-165.jpg";
import FileUploader from "../../../components/common/FileUploader.tsx";
import { useForm } from "react-hook-form";
import InputField from "../../../components/common/InputField.tsx";
import Header from "../../../components/authentification/Header.tsx";

export interface IUploadedFile {
    lastModified: number;
    lastModifiedDate: Date;
    name: string;
    originFileObj: File;
    percent: number;
    size: number;
    thumbUrl: string;
    type: string;
    uid: string;
}

export default function RealtorRegisterPage() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState<string | undefined>(
        undefined
    );
    const [isFormValid, setIsFormValid] = useState(false);
    const formValid = useRef({
        email: false,
        password: false,
        confirmPassword: false,
        firstName: false,
        lastName: false,
        phoneNumber: false,
        avatar: false,
    });
    const [isPhoneValid, setIsPhoneValid] = useState(true);
    const [images, setImages] = useState<File[]>([]);
    const [phone, setPhone] = useState<string>("");

    // const confirmPassValidator = (
    //     value: string
    // ): string | false | undefined => {
    //     return ConfirmPasswordValidator(password, value);
    // };

    // function handleChange() {
    //     setIsFormValid(
    //         Object.values(formValid.current).every((isValid) => isValid)
    //     );
    // }

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm<IRealtorRegister>({ resolver: realtorRegisterResolver });

    const onSubmit = async (data: IRealtorRegister) => {
        try {
            const response = await dispatch(realtorRegister(data));
            unwrapResult(response);

            navigate(`/authentication/register-information/${data.email}`);
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
    // console.log("isFormValidt", isFormValid);
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
                                    Register
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
        //                     <FileUploader
        //                         images={images}
        //                         setImages={setImages}
        //                         maxImagesUpload={1}
        //                         validator={AvatarValidator}
        //                         onChange={(isValid) =>
        //                             (formValid.current.avatar = isValid)
        //                         }
        //                         onDelete={handleChange}
        //                         defaultImage={IMG}
        //                     ></FileUploader>
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
