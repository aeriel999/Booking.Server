import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch } from "../../../hooks/redux";
import { useEffect, useState } from "react";
import { IChangeEmail } from "../../../interfaces/account";
import { changeEmail } from "../../../store/accounts/account.actions.ts";
import { unwrapResult } from "@reduxjs/toolkit";
import ErrorHandler from "../../../components/common/ErrorHandler.ts";
import OutlinedErrorAlert from "../../../components/common/ErrorAlert.tsx";
import { Box, Button, Container, TextField } from "@mui/material";

export default function ChangeEmailPage() {
    const { userId, email, token } = useParams();
    const dispatch = useAppDispatch();
    const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);
    const navigate = useNavigate();



    const confirmEmailAction = async () => {
        try {
            const changeEmailInfo: IChangeEmail = {
                email: email,
                token: token,
                userId: userId,
            }

            console.log("changeEmailInfo", changeEmailInfo)
            const response = await dispatch(changeEmail(changeEmailInfo));
            unwrapResult(response);

            navigate(`/authentication/login`);
        } catch (error) {

            setErrorMessage(ErrorHandler(error));
        }
    }

    useEffect(() => {


        confirmEmailAction();
    }, [userId, email, token]);

    return (
        <Container fixed >
            {errorMessage && <OutlinedErrorAlert message={errorMessage} />}

        </Container>
    );
}