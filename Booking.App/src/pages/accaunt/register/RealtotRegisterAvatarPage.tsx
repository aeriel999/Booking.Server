import "../../../css/AuthenticationClasses/index.scss";
import Header from "../../../components/authentification/Header";
import { AvatarValidator } from "../../../validations/account";
import { useState } from "react";
import AvatarUploader from "../../../components/common/AvatarUploader";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { IRealtorRegister } from "../../../interfaces/account";
import { realtorRegister } from "../../../store/accounts/account.actions";
import { unwrapResult } from "@reduxjs/toolkit";
import ErrorHandler from "../../../components/common/ErrorHandler";
import OutlinedErrorAlert from "../../../components/common/ErrorAlert";
import BackArrowButton from "../../../components/common/BackArrowButton";

export default function RealtorRegisterAvatarPage() {
    const { registerData } = useAppSelector((state) => state.account);
    const dispatch = useAppDispatch();
    const [image, setImage] = useState<File | null>();
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState<string | undefined>(
        undefined
    );

    const handleSubmit = async () => {
        setErrorMessage(undefined);
        console.log("Avatar");
        if (image) {
            if (registerData) {
                const model: IRealtorRegister = {
                    ...registerData,
                    avatar: image,
                };

                try {
                    const response = await dispatch(realtorRegister(model));
                    unwrapResult(response);

                    navigate(
                        `/authentication/register-information/${model.email}`
                    );
                } catch (error) {
                    setErrorMessage(ErrorHandler(error));
                }
            } else {
                setErrorMessage(
                    "Looks like something went wrong. Please go back and try again."
                );
            }
        } else {
            setErrorMessage("Please upload an avatar.");
        }
    };

    return (
        <div className="content">
            <Header />
            <div className="addAavatarContainer">
                {errorMessage && <OutlinedErrorAlert message={errorMessage} />}
                <div id="avatarContainer">
                    <AvatarUploader
                        image={image}
                        setImage={setImage}
                        validator={AvatarValidator}
                    ></AvatarUploader>

                    <div id="uploadAvatarText">
                        Please upload your profile photo to complete the
                        registration.
                    </div>
                </div>

                <div className="endRegisterArea">
                    <BackArrowButton link="/authentication/realtor-register" />

                    <button
                        onClick={handleSubmit}
                        disabled={image !== null}
                        className={`endRegisterButton ${image ? "active" : ""}`}
                    >
                        Complete Registration
                    </button>
                </div>
            </div>
        </div>
    );
}
