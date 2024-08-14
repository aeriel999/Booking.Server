import "../../../css/AuthenticationClasses/index.scss"; // Import your CSS file
import { useForm } from "react-hook-form";
import InputField from "../../../components/common/InputField";
import { IGoogleLogin, ILogin } from "../../../interfaces/account";
import { googleLogin, login } from "../../../store/accounts/account.actions.ts";
import { unwrapResult } from "@reduxjs/toolkit";
import ErrorHandler from "../../../components/common/ErrorHandler.ts";
import { useAppDispatch } from "../../../hooks/redux";
import { useState } from "react";
import OutlinedErrorAlert from "../../../components/common/ErrorAlert.tsx";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { loginResolver } from "../../../validations/account";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { startListening } from "../../../SignalR";
import { getListOfChatRooms } from "../../../store/chat/chat.action.ts";
import Header from "../../../components/authentification/Header.tsx";
import { changeDashboardMenuItem } from "../../../store/settings/settings.slice.ts";

export default function SignInPage() {
    const dispatch = useAppDispatch();
    const [errorMessage, setErrorMessage] = useState<string | undefined>(
        undefined
    );
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm<ILogin>({ resolver: loginResolver });

    const onSubmit = async (data: ILogin) => {
        try {
            const response = await dispatch(login(data));
            unwrapResult(response);
            await afterLogin(response.payload);
        } catch (error) {
            setErrorMessage(ErrorHandler(error));
        }
    };

    const handleLoginSuccess = async (response: CredentialResponse) => {
        const token: IGoogleLogin = {
            googleToken: response.credential as string,
        };
        try {
            const resp = await dispatch(googleLogin(token));
            unwrapResult(resp);
            await afterLogin(resp.payload.token);
        } catch (error) {
            setErrorMessage(ErrorHandler(error));
        }
    };

    const afterLogin = async (token: string) => {
         
        await startListening();
  
        const decodedToken: { [key: string]: string } = jwtDecode(token);

        const role =
            decodedToken[
                "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
            ];

        if (role.toLowerCase().includes("realtor")) {
            dispatch(changeDashboardMenuItem("Profile"));
            navigate("/dashboard/profile");
        } else if (role.toLowerCase().includes("user")) {
            navigate("/dashboard/profile");
        } else if (role.toLowerCase().includes("admin")) {
            navigate("/dashboard/profile");
        } else {
            navigate("/#");
        }

        try {
            const response = await dispatch(getListOfChatRooms());
            unwrapResult(response);
        } catch (error) {
            setErrorMessage(ErrorHandler(error));
        }
    };

    return (
        <div className="content">
            <Header />

            <div className="loginMaimContainer">
                {errorMessage && <OutlinedErrorAlert message={errorMessage} />}

                <div id="authCenterContainer">
                    <h1> Sign in</h1>

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
                                    <div className="error">
                                        <p>*</p>
                                        {errors.email.message}
                                    </div>
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
                                    <div className="error">
                                        <p>*</p>
                                        {errors.password.message}
                                    </div>
                                )}
                            </div>

                            <div className="authFormBottom">
                                <button type="submit" className="authButton">
                                    Sign In
                                </button>

                                <div id="secondaryAuthText">
                                    <a
                                        href="/authentication/forgot-password"
                                        className="linkConfirmation"
                                    >
                                        Forgot password?
                                    </a>
                                    <a
                                        href="/authentication/reconfirm-email"
                                        className="linkConfirmation"
                                    >
                                        Didn't get a confirmation letter?
                                    </a>
                                </div>
                            </div>
                        </form>

                        <div id="googleLogin">
                            <p>or</p>
                            <GoogleLogin
                                onSuccess={handleLoginSuccess}
                                size="medium"
                            />
                            <div className="googleButton"></div>
                        </div>
                    </div>
                </div>
                <div id="authFoter">
                    <p>
                        By logging in or creating a new account, you agree to
                        our <a href="#">Terms and Conditions</a> and{" "}
                        <a href="#">Privacy Policy</a>.
                    </p>
                    <p>
                        Усі права захищено. <br />
                        Copyryight (2024 - 2024) - TripBook.com
                    </p>
                </div>
            </div>
        </div>
    );
}
