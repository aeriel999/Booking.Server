import { useState } from "react";
import { useAppDispatch } from "../../hooks/redux";
import { useNavigate } from "react-router-dom";
import { IReconfirmEmail } from "../../interfaces/account";
import {
     
    reconfirmEmail,
} from "../../store/accounts/account.actions.ts";
import { unwrapResult } from "@reduxjs/toolkit";
import ErrorHandler from "../../components/common/ErrorHandler.ts";
import OutlinedErrorAlert from "../../components/common/ErrorAlert.tsx";
import { reconfirmemaildResolver } from "../../validations/account";
import Header from "../../components/authentification/Header.tsx";
import InputField from "../../components/common/InputField.tsx";
import { useForm } from "react-hook-form";

export default function ReConfirmEmailPage() {
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
    } = useForm<IReconfirmEmail>({ resolver: reconfirmemaildResolver });

    const onSubmit = async (data: IReconfirmEmail) => {
        try {
            const response = await dispatch(reconfirmEmail(data));
            unwrapResult(response);

            navigate(`/authentication/register-information/${data.email}`);
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
                    <h1> Reconfirm Email </h1>
                    <div id="instructionText">
                        Please enter the email address that you used to
                        register, and we will send you a confirmation link.
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
