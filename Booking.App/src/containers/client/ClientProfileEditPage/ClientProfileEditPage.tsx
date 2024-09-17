
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { useEffect, useState } from "react";
import {
    changePasswordResolver,
    editClientProfileResolver
} from "../../../validations/account";
import { checkPasswordIsNotNull, editUserProfile, forgotPassword } from "../../../store/accounts/account.actions.ts";
import { unwrapResult } from "@reduxjs/toolkit";
import ErrorHandler from "../../../components/common/ErrorHandler.ts";
import { useNavigate } from "react-router-dom";
import OutlinedErrorAlert from "../../../components/common/ErrorAlert.tsx";
import CustomizedDialogs from "../../..//components/common/Dialog.tsx";
//import "../../../css/DashBoardAnonymousClasses/index.scss";
import { useForm } from "react-hook-form";
import InputField from "../../../components/common/InputField.tsx";
import { IChangePassword, IEditClientProfile } from "../../../interfaces/user/index.ts";
import { changePassword } from "../../../store/users/user.action.ts";
import { logout } from "../../../store/accounts/account.slice.ts";
import { changeDashboardMenuItem } from "../../../store/settings/settings.slice.ts";
import { Status } from "../../../utils/enum/index.ts";
import { Loading } from "../../../components/common/Loading/Loading.tsx";

export const ClientProfileEditPage = () => {
    const { user, isUserHasPassword } = useAppSelector((state) => state.account);
    const status = useAppSelector((state) => state.account.status)
    const dispatch = useAppDispatch();
    const [errorMessage, setErrorMessage] = useState<string | undefined>(
        undefined
    );
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
    } = useForm<IEditClientProfile>({ resolver: editClientProfileResolver });

    const {
        register: registerPassword,
        handleSubmit: handleSubmitPassword,
        formState: { errors: errorsPassword },
        setValue: setValuePassword,
    } = useForm<IChangePassword>({ resolver: changePasswordResolver });


    useEffect(() => {
        dispatch(checkPasswordIsNotNull());
    }, [])
    useEffect(() => {
        console.log("Has password - ", isUserHasPassword);
    }, [isUserHasPassword])

    const onProfileDataSubmit = async (data: IEditClientProfile) => {

        try {
            const response = await dispatch(editUserProfile(data));
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

    const onCreatePassword = async () => {
        try {
            const response = await dispatch(forgotPassword({ email: user?.email! }));
            dispatch(logout());
            unwrapResult(response);

            navigate(
                `/authentication/forgot-password-information/${user?.email!}`
            );

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

            <div className="twoColumnsContainer" style={{ position: "relative" }}>
                {status == Status.LOADING ? <Loading /> : <>
                    {open && (
                        <CustomizedDialogs
                            message={message}
                            isOpen={open}
                            setOpen={setOpen}
                            navigate={"/dashboard/profile"}
                            menuItem="Profile" lable={""} />
                    )}

                    <div className="textInputsContainer">
                        <div className="title">Edit Profile</div>

                        <form
                            onSubmit={handleSubmitProfile(onProfileDataSubmit)}
                            className="formContainer"
                        >
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
                                    defaultValue={user?.lastName ? user.lastName : ""}
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
                                    defaultValue={user?.firstName ? user.firstName : ""}
                                />
                                {errorsProfile.firstName && (
                                    <div className="error">
                                        <p>*</p>
                                        {errorsProfile.firstName.message}
                                    </div>
                                )}
                            </div>
                            <button type="submit" className="button">
                                Update
                            </button>
                        </form>
                    </div>
                    {isUserHasPassword ? <div className="textInputsContainer">
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
                    </div> : <div className="textInputsContainer">
                        <div className="title">Create Password</div>



                        <button onClick={() => onCreatePassword()} className="button">
                            Create
                        </button>
                    </div>}
                </>}

            </div>
        </>
    );
}
