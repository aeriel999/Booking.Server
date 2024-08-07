import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { useEffect, useRef, useState } from "react";
import { APP_ENV } from "../../env";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import InputGroup from "../../components/common/InputGroup.tsx";
import {
    ImageValidator,
    EmailValidator,
    FirstNameValidator,
    LastNameValidator,
    realtorEditProfileResolver,
    changePasswordResolver,
    PhoneNumberValidator,
} from "../../validations/account";
import MuiPhoneNumber from "mui-phone-number";
import { isValidPhoneNumber } from "libphonenumber-js";
import FileEditUploader from "../../components/common/FileEditUploader.tsx";
import Button from "@mui/material/Button";
import * as React from "react";
import { IEditRealtorInfo } from "../../interfaces/account";
import { editProfile } from "../../store/accounts/account.actions.ts";
import { unwrapResult } from "@reduxjs/toolkit";
import ErrorHandler from "../../components/common/ErrorHandler.ts";
import { Link, useNavigate } from "react-router-dom";
import OutlinedErrorAlert from "../../components/common/ErrorAlert.tsx";
import { Breadcrumbs } from "@mui/material";
import Typography from "@mui/material/Typography";
import CustomizedDialogs from "../../components/common/Dialog.tsx";
import Divider from "@mui/material/Divider";
import IMG from "../../assets/Auth/image 20.svg";
import "../../css/DashBoardAnonymousClasses/index.scss";
import { useForm } from "react-hook-form";
import InputField from "../../components/common/InputField.tsx";
import { IChangePassword } from "../../interfaces/user/index.ts";
import { changePassword } from "../../store/users/user.action.ts";
import { logout } from "../../store/accounts/account.slice.ts";
import { changeDashboardMenuItem } from "../../store/settings/settings.slice.ts";

export default function RealtorProfileEditPage() {
    const { user } = useAppSelector((state) => state.account);
    const dispatch = useAppDispatch();
    const [errorMessage, setErrorMessage] = useState<string | undefined>(
        undefined
    );
    const [isPhoneValid, setIsPhoneValid] = useState(true);
    const [phone, setPhone] = useState<string>(user?.phoneNumber ?? "");
    const [open, setOpen] = useState<boolean>(false);
    const message =
        "Please note that your email will be changed once you confirm the update. " +
        "We'll send a confirmation link to your new email address shortly. Thank you for your patience.";
    const navigate = useNavigate();
    console.log("user", user);
    const {
        register: registerProfile,
        handleSubmit: handleSubmitProfile,
        formState: { errors: errorsProfile },
        setValue: setValueProfile,
    } = useForm<IEditRealtorInfo>({ resolver: realtorEditProfileResolver });

    const {
        register: registerPassword,
        handleSubmit: handleSubmitPassword,
        formState: { errors: errorsPassword },
        setValue: setValuePassword,
    } = useForm<IChangePassword>({ resolver: changePasswordResolver });

    const onProfileDataSubmit = async (data: IEditRealtorInfo) => {
        if (!isPhoneValid) {
            console.log("isPhoneValid", isPhoneValid);
            return;
        }

        const model: IEditRealtorInfo = {
            ...data,
            phoneNumber: phone,
        };

        try {
            const response = await dispatch(editProfile(model));
            unwrapResult(response);

            const { isEmailChanged } = response.payload;

            if (isEmailChanged) {
                setOpen(isEmailChanged);
            } else {
                navigate("/dashboard/profile");
            }
        } catch (error) {
            setErrorMessage(ErrorHandler(error));
        }
    };

    const onPasswordChangeSubmit = async (data: IChangePassword) => {
        try {
            const response = await dispatch(changePassword(data));
            unwrapResult(response);

            dispatch(logout());

            navigate(`/authentication/login`);
        } catch (error) {
            setErrorMessage(ErrorHandler(error));
        }
    };

    return (
        <div className="twoColumnsContainer">
            <CustomizedDialogs
                message={message}
                isOpen={open}
                setOpen={setOpen}
                navigate={"/dashboard/profile"}
            />

            {errorMessage && <OutlinedErrorAlert message={errorMessage} />}

            <div className="textInputsContainer">
                <div className="title">Edit Profile</div>

                <form
                    onSubmit={handleSubmitProfile(onProfileDataSubmit)}
                    className="formContainer"
                >
                    <div className="authFields">
                        <InputField
                            placeholder="Last name"
                            type="text"
                            name="lastName"
                            register={registerProfile}
                            setValue={setValueProfile}
                            className={
                                errorsProfile.lastName
                                    ? "errorFormInput"
                                    : "formInput"
                            }
                            defaultValue={user?.lastName!}
                        />
                        {errorsProfile.lastName && (
                            <div className="error">
                                <p>*</p>
                                {errorsProfile.lastName.message}
                            </div>
                        )}

                        <InputField
                            placeholder="First name"
                            type="text"
                            name="firstName"
                            register={registerProfile}
                            setValue={setValueProfile}
                            className={
                                errorsProfile.firstName
                                    ? "errorFormInput"
                                    : "formInput"
                            }
                            defaultValue={user?.firstName!}
                        />
                        {errorsProfile.firstName && (
                            <div className="error">
                                <p>*</p>
                                {errorsProfile.firstName.message}
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

                        <InputField
                            placeholder="Email"
                            type="email"
                            name="email"
                            register={registerProfile}
                            setValue={setValueProfile}
                            className={
                                errorsProfile.email
                                    ? "errorFormInput"
                                    : "formInput"
                            }
                            defaultValue={user?.email}
                        />
                        {errorsProfile.email && (
                            <div className="error">
                                <p>*</p>
                                {errorsProfile.email.message}
                            </div>
                        )}
                    </div>
                    <button type="submit" className="button">
                        Update
                    </button>
                </form>
            </div>

            <div className="textInputsContainer">
                <div className="title">Change Password</div>

                <form
                    onSubmit={handleSubmitPassword(onPasswordChangeSubmit)}
                    className="formContainer"
                >
                    <div className="authFields">
                        <InputField
                            placeholder="New Password"
                            type="password"
                            name="newPassword"
                            register={registerPassword}
                            setValue={setValuePassword}
                            className={
                                errorsPassword.newPassword
                                    ? "errorFormInput"
                                    : "formInput"
                            }
                        />
                        {errorsPassword.newPassword && (
                            <div className="error">
                                <p>*</p>
                                {errorsPassword.newPassword.message}
                            </div>
                        )}
                        <InputField
                            placeholder="Confirm Password"
                            type="password"
                            name="confirmPassword"
                            register={registerPassword}
                            setValue={setValuePassword}
                            className={
                                errorsPassword.confirmNewPassword
                                    ? "errorFormInput"
                                    : "formInput"
                            }
                        />
                        {errorsPassword.confirmNewPassword && (
                            <div className="error">
                                {errorsPassword.confirmNewPassword && <p>*</p>}

                                {errorsPassword.confirmNewPassword?.message}
                            </div>
                        )}

                        <InputField
                            placeholder="Current Password"
                            type="password"
                            name="currentPassword"
                            register={registerPassword}
                            setValue={setValuePassword}
                            className={
                                errorsPassword.currentPassword
                                    ? "errorFormInput"
                                    : "formInput"
                            }
                        />
                        {errorsPassword.currentPassword && (
                            <div className="error">
                                <p>*</p>
                                {errorsPassword.currentPassword.message}
                            </div>
                        )}
                    </div>
                    <button type="submit" className="button">
                        Change
                    </button>
                </form>
            </div>
        </div>
    );
}
