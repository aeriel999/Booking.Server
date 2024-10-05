import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch } from "../../../hooks/redux";
import { useEffect, useState } from "react";
import { IChangeEmail } from "../../../interfaces/account";
import { changeEmail } from "../../../store/accounts/account.actions.ts";
import { unwrapResult } from "@reduxjs/toolkit";
import ErrorHandler from "../../../components/common/ErrorHandler.ts";
import OutlinedErrorAlert from "../../../components/common/ErrorAlert.tsx";
import Header from "../../../components/authentification/Header.tsx";
import BackArrowButton from "../../../components/common/BackArrowButton.tsx";
import { logout } from "../../../store/accounts/account.slice.ts";

export default function ChangeEmailPage() {
    const { userId, email, token } = useParams();
    const dispatch = useAppDispatch();
    const [errorMessage, setErrorMessage] = useState<string | undefined>(
        undefined
    );
    const navigate = useNavigate();

    const confirmEmailAction = async () => {
        try {
            const changeEmailInfo: IChangeEmail = {
                email: email,
                token: token,
                userId: userId,
            };

            const response = await dispatch(changeEmail(changeEmailInfo));
            unwrapResult(response);

            dispatch(logout());

            navigate(`/authentication/login`);
        } catch (error) {
            setErrorMessage(ErrorHandler(error));
        }
    };

    useEffect(() => {
        confirmEmailAction();
    }, [userId, email, token]);

    return (
        <div className="content">
            <Header />
            <div className="registerInformationContainer">
                {errorMessage && (
                    <>
                        <OutlinedErrorAlert message={errorMessage} />

                        <div className="buttonContainer">
                            <BackArrowButton link="/home" />
                            <button
                                className="authButton"
                                onClick={() => {
                                    navigate("/authentication/login");
                                }}
                            >
                                Log In
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
