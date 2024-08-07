import "../../../css/AuthenticationClasses/index.scss";
import Grid from "@mui/material/Grid";
import { PhoneNumberValidator, realtorRegisterResolver } from "../../../validations/account";
import { useState } from "react";
import { IRealtorRegister } from "../../../interfaces/account";
import { unwrapResult } from "@reduxjs/toolkit";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import OutlinedErrorAlert from "../../../components/common/ErrorAlert.tsx";
import { useNavigate } from "react-router-dom";
import ErrorHandler from "../../../components/common/ErrorHandler.ts";
import MuiPhoneNumber from "mui-phone-number";
import { isValidPhoneNumber } from "libphonenumber-js";
import Header from "../../../components/authentification/Header.tsx";
import { useForm } from "react-hook-form";
import InputField from "../../../components/common/InputField.tsx";
import { realtorRegisterFirstStep } from "../../../store/accounts/account.slice.ts";

export default function RealtorRegisterPage() {
    const { registerData } = useAppSelector((state) => state.account);
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
        const model: IRealtorRegister = {
            ...data,
            phoneNumber: phone,
            avatar: null,
        };
        try {
            const response = await dispatch(realtorRegisterFirstStep(model));
            unwrapResult(response);

            navigate(`/authentication/realtor-register-add-avatar`);
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
                                    defaultValue={registerData?.firstName}
                                />
                                {errors.firstName && (
                                    <div className="error">
                                        <p>*</p>
                                        {errors.firstName.message}
                                    </div>
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
                                    defaultValue={registerData?.lastName}
                                />
                                {errors.lastName && (
                                    <div className="error">
                                        <p>*</p>
                                        {errors.lastName.message}
                                    </div>
                                )}

                                <div className="formInput">
                                    <MuiPhoneNumber
                                        defaultCountry={"ua"}
                                        onChange={(e) => {
                                            setIsPhoneValid(
                                                isValidPhoneNumber(e as string)
                                            );
                                            setPhone(e as string);
                                        }}
                                        error={!isPhoneValid}
                                    />
                                   
                                </div>
                                {PhoneNumberValidator(phone) !== undefined && (
                                        <div className="error">
                                            <p>*</p>
                                            {PhoneNumberValidator(phone)}
                                        </div>
                                    )}

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
                                    defaultValue={registerData?.email}
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
                                    <div className="error">
                                        {errors.confirmPassword && <p>*</p>}

                                        {errors.confirmPassword?.message}
                                    </div>
                                )}
                            </div>

                            <div className="authFormBottom">
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
    );
}
