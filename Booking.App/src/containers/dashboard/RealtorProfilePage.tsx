import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { APP_ENV } from "../../env";
import { useEffect, useState } from "react";
import HeaderImg from "../../assets/Templates/Rectangle-50.webp";
import Upload from "../../assets/DashboardIcons/camera-01.svg";
import Edit from "../../assets/DashboardIcons/Icon.svg";
import Lock from "../../assets/DashboardIcons/lock-02.svg";
import { Rating } from "@mui/material";
import { useNavigate } from "react-router-dom";

import { AvatarValidator, ImageValidator } from "../../validations/account";
import OutlinedErrorAlert from "../../components/common/ErrorAlert";
import { reloadAvatar } from "../../store/accounts/account.actions";
import { IReloadAvatar } from "../../interfaces/account";
import { unwrapResult } from "@reduxjs/toolkit";
import ErrorHandler from "../../components/common/ErrorHandler";

// APP
export default function RealtorProfilePage() {
    const { user } = useAppSelector((state) => state.account);
    const [avatarUrl, setAvatarUrl] = useState<string>();
    const [rating, setRating] = useState<number>(user?.rating ?? 0);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [image, setImage] = useState<File | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | undefined>(
        undefined
    );

    useEffect(() => {
        if (user) {
            if (user.avatar) {
                setAvatarUrl(APP_ENV.BASE_URL + user.avatar);

                console.log("avatarUrl", avatarUrl);
            }
            setRating(user?.rating ?? 0);
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

    return (
        <div className="profileMainContainer">
            <div id="errorContainer">
                {errorMessage && (
                    <OutlinedErrorAlert
                        message={errorMessage}
                        textColor="#000"
                    />
                )}
            </div>
            <div
                className="header"
                style={{
                    background: `url(${HeaderImg}) center / cover no-repeat`,
                }}
            ></div>

            <div
                className="avatar"
                style={{
                    background: `url(${
                        image === null ? avatarUrl : URL.createObjectURL(image)
                    }) center / cover no-repeat`,
                }}
            >
                <label className="uploadIcon" htmlFor="avatar-upload">
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
                    <div id="buttons">
                        <button
                            className="button colorButton"
                            onClick={() => navigate("/dashboard/profile/edit")}
                        >
                            <img src={Edit} alt="Edit" />
                            <p>Edit Profile</p>
                        </button>
                        <button
                            className="button witeButton"
                            onClick={() =>
                                navigate("/dashboard/profile/change-password")
                            }
                        >
                            <img src={Lock} alt="Edit" />
                            <p>Change Password</p>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
