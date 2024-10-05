import { useNavigate, useParams } from "react-router-dom";
import { IConfirmEmail } from "../../../interfaces/account";
import { useAppDispatch } from "../../../hooks/redux";
import { confirmEmail } from "../../../store/accounts/account.actions.ts";
import { unwrapResult } from "@reduxjs/toolkit";
import { useEffect, useState } from "react";
import ErrorHandler from "../../../components/common/ErrorHandler.ts";
import OutlinedErrorAlert from "../../../components/common/ErrorAlert.tsx";
import Header from "../../../components/authentification/Header.tsx";
import BackArrowButton from "../../../components/common/BackArrowButton.tsx";

export default function ConfirmEmailPage() {
    const { userId, token } = useParams();
    const dispatch = useAppDispatch();
    const [errorMessage, setErrorMessage] = useState<string | undefined>(
        undefined
    );
    const navigate = useNavigate();

    const confirmEmailInfo: IConfirmEmail = {
        userId: userId,
        token: token,
    };

    const confirmEmailAction = async (confirmEmailInfo: IConfirmEmail) => {
        try {
            const response = await dispatch(confirmEmail(confirmEmailInfo));
            unwrapResult(response);

            navigate(`/instructions`);
        } catch (error) {
            setErrorMessage(ErrorHandler(error));
        }
    };

    useEffect(() => {
        if (userId && token) {
            confirmEmailAction(confirmEmailInfo);
        }
    }, [userId, token, confirmEmailInfo]);

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
