import { resetPasswordResolver } from "../../../validations/account";
import { useState } from "react";
import { IResetPassword } from "../../../interfaces/account";
import { unwrapResult } from "@reduxjs/toolkit";
import { useAppDispatch } from "../../../hooks/redux";
import { resetPassword } from "../../../store/accounts/account.actions.ts";
import OutlinedErrorAlert from "../../../components/common/ErrorAlert.tsx";
import { useNavigate, useParams } from "react-router-dom";
import ErrorHandler from "../../../components/common/ErrorHandler.ts";
import Header from "../../../components/authentification/Header.tsx";
import InputField from "../../../components/common/InputField.tsx";
import { useForm } from "react-hook-form";
import "../../../css/AuthenticationClasses/index.scss";

export default function ResetPasswordPage() {
    const { email, token } = useParams();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [errorMessage, setErrorMessage] = useState<string | undefined>(
        undefined
    );

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm<IResetPassword>({ resolver: resetPasswordResolver });

    const onSubmit = async (data: IResetPassword) => {
        if (email && token) {
            const model: IResetPassword = {
                ...data,
                email: email,
                token: token,
            };

            try {
                const response = await dispatch(resetPassword(model));
                unwrapResult(response);

                navigate(`/authentication/login`);
            } catch (error) {
                setErrorMessage(ErrorHandler(error));
            }
        } else {
            setErrorMessage(
                "Looks like something went wrong. Please try again."
            );
        }
    };

    return (
        <div className="content">
            <Header />

            <div className="enterNewPasswordMaimContainer">
                {errorMessage && <OutlinedErrorAlert message={errorMessage} />}

                <div id="authCenterContainer">
                    <h1> Reset Password</h1>

                    <div className="authFormContainer">
                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            className="authForm"
                        >
                            <div className="authFields">
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
                                    Reset
                                </button>

                                <div id="secondaryAuthText">
                                    <a
                                        href="/authentication/login"
                                        className="linkConfirmation"
                                    >
                                        Sign In
                                    </a>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
