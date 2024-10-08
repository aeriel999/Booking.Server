import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { APP_ENV } from "../../env";
import { useEffect, useState } from "react";
import HeaderImg from "../../assets/Templates/Rectangle-50.webp";
import Upload from "../../assets/DashboardIcons/camera-01.svg";
import HeaderUpload from "../../assets/DashboardIcons/mdi_pencil-outline.svg";
import { Rating } from "@mui/material";
import { AvatarValidator } from "../../validations/account";
import OutlinedErrorAlert from "../../components/common/ErrorAlert";
import {
    reloadAvatar,
    reloadProfileHeaderImage,
} from "../../store/accounts/account.actions";
import { IReloadAvatar, IReloadImage } from "../../interfaces/account";
import { unwrapResult } from "@reduxjs/toolkit";
import ErrorHandler from "../../components/common/ErrorHandler";

export default function RealtorProfilePage() {
    const { user } = useAppSelector((state) => state.account);
    const [avatarUrl, setAvatarUrl] = useState<string>();
    const [rating, setRating] = useState<number>(user?.rating ?? 0);
    const dispatch = useAppDispatch();
    const [image, setImage] = useState<File | null>(null);
    const [headerUrl, setHeaderUrl] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | undefined>(
        undefined
    );

    useEffect(() => {
        if (user) {
            setAvatarUrl(APP_ENV.BASE_URL + user.avatar);

            setRating(user?.rating ?? 0);

            console.log("user.profileHeaderImage", user.profileHeaderImage);
            if (user.profileHeaderImage !== null) {
                setHeaderUrl(APP_ENV.BASE_URL + user.profileHeaderImage);
            } else {
                setHeaderUrl(HeaderImg);
            }
        }
    }, [user]);

    const handleOnAddImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;

        const file = e.target.files[0];

        const errorMessage = AvatarValidator(file);

        if (!errorMessage) {
            setErrorMessage(undefined);

            setImage(file);

            const avatar: IReloadAvatar = { avatar: file };

            try {
                const response = await dispatch(reloadAvatar(avatar));
                unwrapResult(response);
            } catch (error) {
                setErrorMessage(ErrorHandler(error));
            }
        } else {
            setErrorMessage(errorMessage);
        }
    };

    const handleOnReloadHeaderImage = async (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        if (!e.target.files) return;

        const file = e.target.files[0];

        if (!errorMessage) {
            setErrorMessage(undefined);

            const headerImage: IReloadImage = { profileHeaderImage: file };

            try {
                const response = await dispatch(
                    reloadProfileHeaderImage(headerImage)
                );
                unwrapResult(response);
            } catch (error) {
                setErrorMessage(ErrorHandler(error));
            }
        } else {
            setErrorMessage(errorMessage);
        }
    };

    return (
        <div className="profileMainContainer">
            {errorMessage && (
                <div className="errorContainer">
                    <OutlinedErrorAlert
                        message={errorMessage}
                        textColor="#000"
                    />
                </div>
            )}

            <div
                className="header"
                style={{
                    background: `url(${headerUrl}) center / cover no-repeat`,
                }}
            >
                <div id="reload">
                    <label
                        htmlFor="header-upload"
                        tabIndex={0}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                document
                                    .getElementById("header-upload")
                                    ?.click();
                            }
                        }}
                    >
                        <img src={HeaderUpload} alt="HeaderUpload" />
                    </label>
                    <input
                        id="header-upload"
                        type="file"
                        accept="image/*,.png,.jpg,.jpeg,.gif"
                        onChange={handleOnReloadHeaderImage}
                        style={{ display: "none" }}
                    />
                </div>
            </div>

            <div
                className="avatar"
                style={{
                    background: `url(${
                        image === null ? avatarUrl : URL.createObjectURL(image)
                    }) center / cover no-repeat`,
                }}
            >
                <label
                    className="uploadIcon"
                    htmlFor="avatar-upload"
                    tabIndex={0}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            document.getElementById("avatar-upload")?.click();
                        }
                    }}
                >
                    <img id="logo" src={Upload} alt="Upload" />
                </label>
                <input
                    id="avatar-upload"
                    type="file"
                    accept="image/*,.png,.jpg,.jpeg,.gif"
                    onChange={handleOnAddImage}
                    style={{ display: "none" }}
                />
            </div>
            <div className="userInfoContainer">
                <div id="name">{user?.lastName + " " + user?.firstName}</div>
                <div id="rating">
                    <div id="text">Rate</div>
                    <Rating name="read-only" value={rating} readOnly />
                </div>
                <div id="infoContainer">
                    <div id="info">
                        <div className="textContainer">
                            <div className="name">Email: </div>
                            <div className="value">{user?.email}</div>
                        </div>
                        <div className="textContainer">
                            <div className="name">Phone: </div>
                            <div className="value">{user?.phoneNumber}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
