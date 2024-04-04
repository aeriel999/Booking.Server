import {useNavigate, useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../../hooks/redux";
import {useEffect, useState} from "react";
import {IChangeEmail} from "../../../interfaces/account";
import {changeEmail} from "../../../store/accounts/account.actions.ts";
import {unwrapResult} from "@reduxjs/toolkit";
import ErrorHandler from "../../../components/common/ErrorHandler.ts";
import OutlinedErrorAlert from "../../../components/common/ErrorAlert.tsx";

export  default function ChangeEmailPage (){
    const { email, token } = useParams();
    const{user} = useAppSelector(state => state.account);
    const dispatch = useAppDispatch();
    const [errorMessage, setErrorMessage] = useState<string | undefined >(undefined);
    const navigate = useNavigate();

    const changeEmailInfo: IChangeEmail = {
        id: user?.id,
        email: email,
        token: token
    }

    const confirmEmailAction = async (changeEmailInfo : IChangeEmail) =>{
        try {
            const response = await dispatch(changeEmail(changeEmailInfo));
            unwrapResult(response);

            navigate(`/authentication/login`);
        } catch (error ){
           
            setErrorMessage(ErrorHandler(error));
        }
    }

    useEffect(() => {
        confirmEmailAction(changeEmailInfo);
    }, [changeEmailInfo]);

    return(
        <>
            {errorMessage && <OutlinedErrorAlert message={errorMessage} />}
        </>
    );
}