import "../../../css/AuthenticationClasses/index.scss"; 
import { userRegisterResolver } from "../../../validations/account";
import { useState } from "react";
import { IGoogleLogin, IUserRegister } from "../../../interfaces/account";
import { unwrapResult } from "@reduxjs/toolkit";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import {
    googleLogin,
    userRegister,
} from "../../../store/accounts/account.actions.ts";
import OutlinedErrorAlert from "../../../components/common/ErrorAlert.tsx";
import { useNavigate } from "react-router-dom";
import ErrorHandler from "../../../components/common/ErrorHandler.ts";
import Header from "../../../components/authentification/Header.tsx";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import InputField from "../../../components/common/InputField.tsx";
import { useForm } from "react-hook-form";

export default function UserRegisterPage() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { user } = useAppSelector((state) => state.account);
    const [errorMessage, setErrorMessage] = useState<string | undefined>(
        undefined
    );

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm<IUserRegister>({ resolver: userRegisterResolver });

    const onSubmit = async (data: IUserRegister) => {
        try {
            const response = await dispatch(userRegister(data));
            unwrapResult(response);

            navigate(`/authentication/register-information/${data.email}`);
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

            if (!resp.payload.isAlreadyRegister) {
                navigate(`/authentication/register-information/${user?.email}`);
            } else {
                navigate("/dashboard/profile");
            }
        } catch (error) {
            setErrorMessage(ErrorHandler(error));
        }
    };

    return (
        <div className="content">
            <Header />

            <div className="regiterMaimContainer">
                {errorMessage && <OutlinedErrorAlert message={errorMessage} />}

                <div id="authCenterContainer">
                    <h1> Register</h1>

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

                            <div className="authFormBottom">
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

                        <div id="googleLogin">
                            <p>or</p>
                            <GoogleLogin
                                onSuccess={handleLoginSuccess}
                                size="medium"
                                text="signup_with"
                            />
                            <div className="googleButton"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
