import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { useState } from "react";
import {
    realtorEditProfileResolver,
    changePasswordResolver,
} from "../../validations/account";
import MuiPhoneNumber from "mui-phone-number";
import { isValidPhoneNumber } from "libphonenumber-js";
import { IEditRealtorInfo } from "../../interfaces/account";
import { editProfile } from "../../store/accounts/account.actions.ts";
import { unwrapResult } from "@reduxjs/toolkit";
import ErrorHandler from "../../components/common/ErrorHandler.ts";
import { useNavigate } from "react-router-dom";
import OutlinedErrorAlert from "../../components/common/ErrorAlert.tsx";
import CustomizedDialogs from "../../components/common/Dialog.tsx";
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
                dispatch(changeDashboardMenuItem("Profile"));
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
        <>
                {errorMessage && 
                     <div className="errorContainer">
                    <OutlinedErrorAlert
                        message={errorMessage}
                        textColor="#000"
                    /></div>}
           
            <div className="twoColumnsContainer">
                {open && (
                    <CustomizedDialogs
                        message={message}
                        isOpen={open}
                        setOpen={setOpen}
                        navigate={"/dashboard/profile"}
                    />
                )}

                <div className="textInputsContainer">
                    <div className="title">Edit Profile</div>

                    <form
                        onSubmit={handleSubmitProfile(onProfileDataSubmit)}
                        className="formContainer"
                    >
                        <div className="fieldContainer">
                            <div className="filedTitle">Last name</div>

                            <InputField
                                placeholder="Last name"
                                type="text"
                                name="lastName"
                                register={registerProfile}
                                setValue={setValueProfile}
                                className={
                                    errorsProfile.lastName
                                        ? "errorFormInput"
                                        : "field"
                                }
                                defaultValue={user?.lastName!}
                            />
                            {errorsProfile.lastName && (
                                <div className="error">
                                    <p>*</p>
                                    {errorsProfile.lastName.message}
                                </div>
                            )}
                        </div>
                        <div className="fieldContainer">
                            <div className="filedTitle">First name</div>
                            <InputField
                                placeholder="First name"
                                type="text"
                                name="firstName"
                                register={registerProfile}
                                setValue={setValueProfile}
                                className={
                                    errorsProfile.firstName
                                        ? "errorFormInput"
                                        : "field"
                                }
                                defaultValue={user?.firstName!}
                            />
                            {errorsProfile.firstName && (
                                <div className="error">
                                    <p>*</p>
                                    {errorsProfile.firstName.message}
                                </div>
                            )}
                        </div>
                        <div className="fieldContainer">
                            <div className="filedTitle">Phone number</div>
                            <div className="field">
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
                        </div>
                        <div className="fieldContainer">
                            <div className="filedTitle">Email</div>
                            <InputField
                                placeholder="Email"
                                type="email"
                                name="email"
                                register={registerProfile}
                                setValue={setValueProfile}
                                className={
                                    errorsProfile.email
                                        ? "errorFormInput"
                                        : "field"
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
                        <div className="fieldContainer">
                            <div className="filedTitle">New password</div>
                            <InputField
                                placeholder="New Password"
                                type="password"
                                name="newPassword"
                                register={registerPassword}
                                setValue={setValuePassword}
                                className={
                                    errorsPassword.newPassword
                                        ? "errorFormInput"
                                        : "field"
                                }
                            />
                            {errorsPassword.newPassword && (
                                <div className="error">
                                    <p>*</p>
                                    {errorsPassword.newPassword.message}
                                </div>
                            )}
                        </div>
                        <div className="fieldContainer">
                            <div className="filedTitle">
                                Confirm new password
                            </div>
                            <InputField
                                placeholder="Confirm Password"
                                type="password"
                                name="confirmPassword"
                                register={registerPassword}
                                setValue={setValuePassword}
                                className={
                                    errorsPassword.confirmNewPassword
                                        ? "errorFormInput"
                                        : "field"
                                }
                            />
                            {errorsPassword.confirmNewPassword && (
                                <div className="error">
                                    {errorsPassword.confirmNewPassword && (
                                        <p>*</p>
                                    )}

                                    {errorsPassword.confirmNewPassword?.message}
                                </div>
                            )}
                        </div>
                        <div className="fieldContainer">
                            <div className="filedTitle">Current password</div>
                            <InputField
                                placeholder="Current Password"
                                type="password"
                                name="currentPassword"
                                register={registerPassword}
                                setValue={setValuePassword}
                                className={
                                    errorsPassword.currentPassword
                                        ? "errorFormInput"
                                        : "field"
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
        </>
    );
}
