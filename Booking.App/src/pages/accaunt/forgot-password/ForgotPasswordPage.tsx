import { useForm } from "react-hook-form";
import "../../../css/AuthenticationClasses/index.scss"; // Import your CSS file
import { IForgotPassword } from "../../../interfaces/account";
import { forgotPasswordResolver } from "../../../validations/account";
import { forgotPassword } from "../../../store/accounts/account.actions";
import { unwrapResult } from "@reduxjs/toolkit";
import ErrorHandler from "../../../components/common/ErrorHandler";
import { useAppDispatch } from "../../../hooks/redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Header from "../../../components/authentification/Header";
import OutlinedErrorAlert from "../../../components/common/ErrorAlert";
import InputField from "../../../components/common/InputField";

export default function ForgotPasswordPage() {
    const [errorMessage, setErrorMessage] = useState<string | undefined>(
        undefined
    );
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm<IForgotPassword>({ resolver: forgotPasswordResolver });

    const onSubmit = async (data: IForgotPassword) => {
        try {
            const response = await dispatch(forgotPassword(data));
            unwrapResult(response);

            navigate(
                `/authentication/forgot-password-information/${data.email}`
            );
        } catch (error) {
            setErrorMessage(ErrorHandler(error));
        }
    };

    return (
        <div className="content">
            <Header />
            <div className="resetPasswordMainContainer">
                {errorMessage && <OutlinedErrorAlert message={errorMessage} />}

                <div id="topContainer">
                    <h1> Reset Password</h1>
                    <div id="instructionText">
                        Please enter the email address you used for
                        registration, and we will send you a link to reset your
                        password via email.
                    </div>
                </div>

                <div className="authFormContainer">
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="authForm"
                    >
                        <div className="authFields">
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
                        </div>

                        <div className="authFormBottom">
                            <button type="submit" className="authButton">
                                Continue
                            </button>

                            <div id="secondaryAuthText">
                                <a
                                    href="/authentication/login"
                                    className="linkConfirmation"
                                >
                                    Back to Sign in
                                </a>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

// <Container component="main" maxWidth="xs">
//     <CssBaseline />
//     <Box
//         sx={{
//             marginTop: 8,
//             display: 'flex',
//             flexDirection: 'column',
//             alignItems: 'center',
//         }}
//     >
//         {errorMessage && <OutlinedErrorAlert message={errorMessage} />}

//         <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
//             <LockOutlinedIcon />
//         </Avatar>
//         <Typography component="h1" variant="h5">
//             Reset Password
//         </Typography>
//         <Typography variant="body1"  align={'center'}>
//             Please enter the email address that you used to register,
//             and we will send you a link to reset your password via Email.
//         </Typography>
//         <p></p>
//         <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
//             <Grid container spacing={2}>
//                 <Grid item xs={12}>
//                     <InputGroup
//                         label="Email"
//                         field="email"
//                         type= "email"
//                         validator={EmailValidator}
//                         onChange={isValid => (formValid.current.email = isValid)}
//                     />
//                 </Grid>
//             </Grid>
//             <Button
//                 type="submit"
//                 fullWidth
//                 variant="contained"
//                 sx={{ mt: 3, mb: 2 }}
//             >
//                 Sign In
//             </Button>
//             <Grid item>
//                 <Link href="/authentication/login" variant="body2">
//                     Back to Sign in
//                 </Link>
//             </Grid>
//         </Box>
//     </Box>

// </Container>
