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

export default function RealtorRegisterAvatarPage() {
    const { registerData } = useAppSelector((state) => state.account);
    const dispatch = useAppDispatch();
    const [image, setImage] = useState<File | null>();
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState<string | undefined>(
        undefined
    );

    const handleSubmit = async () => {
        if (registerData) {
            const model: IRealtorRegister = {
                ...registerData,
                avatar: image,
            };

            try {
                const response = await dispatch(realtorRegister(model));
                unwrapResult(response);

                navigate(`/authentication/register-information/${model.email}`);
            } catch (error) {
                setErrorMessage(ErrorHandler(error));
            }
        }
    };

    return (
        <div className="content">
            <Header />
            <div id="addAavatarContainer">
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
                    <button
                        className="backArrow"
                        onClick={() => {
                            navigate(`/authentication/realtor-register`);
                        }}
                    >
                        <div id="arrow">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="30"
                                height="30"
                                viewBox="0 0 30 30"
                                fill="none"
                            >
                                <path
                                    d="M6.5625 14.0625H25.3125C25.5611 14.0625 25.7996 14.1613 25.9754 14.3371C26.1512 14.5129 26.25 14.7514 26.25 15C26.25 15.2486 26.1512 15.4871 25.9754 15.6629C25.7996 15.8387 25.5611 15.9375 25.3125 15.9375H6.5625C6.31386 15.9375 6.0754 15.8387 5.89959 15.6629C5.72377 15.4871 5.625 15.2486 5.625 15C5.625 14.7514 5.72377 14.5129 5.89959 14.3371C6.0754 14.1613 6.31386 14.0625 6.5625 14.0625Z"
                                    fill="white"
                                />
                                <path
                                    d="M6.95084 15.0002L14.7265 22.774C14.9025 22.95 15.0014 23.1888 15.0014 23.4377C15.0014 23.6867 14.9025 23.9254 14.7265 24.1015C14.5504 24.2775 14.3117 24.3764 14.0627 24.3764C13.8138 24.3764 13.575 24.2775 13.399 24.1015L4.96146 15.664C4.87415 15.5769 4.80489 15.4734 4.75763 15.3595C4.71036 15.2456 4.68604 15.1235 4.68604 15.0002C4.68604 14.8769 4.71036 14.7548 4.75763 14.6409C4.80489 14.527 4.87415 14.4235 4.96146 14.3365L13.399 5.89896C13.575 5.72292 13.8138 5.62402 14.0627 5.62402C14.3117 5.62402 14.5504 5.72292 14.7265 5.89896C14.9025 6.07499 15.0014 6.31375 15.0014 6.56271C15.0014 6.81166 14.9025 7.05042 14.7265 7.22646L6.95084 15.0002Z"
                                    fill="white"
                                />
                            </svg>
                        </div>
                    </button>

                    <button
                        onClick={handleSubmit}
                        className={`endRegisterButton ${image ? "active" : ""}`}
                    >
                        Complete Registration
                    </button>
                </div>
            </div>
        </div>
    );
}
