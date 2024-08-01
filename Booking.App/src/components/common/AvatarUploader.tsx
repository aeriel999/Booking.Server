import React, { useState } from "react";
import OutlinedErrorAlert from "./ErrorAlert.tsx";
import UserAvatar from "../../assets/Auth/image 20.svg";

type AvatarUploadProps = {
    image: File | null | undefined;
    setImage: (file: File | null) => void;
    validator: (value: File) => string | false | undefined;
};

const AvatarUploader = (props: AvatarUploadProps) => {
    const [error, setError] = useState<string | false | undefined>(false);

    const handleOnAddImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;

        const file = e.target.files[0];
        const errorMessage = props.validator(file);

        setError(errorMessage);
        if (!errorMessage) {
            props.setImage(file);
        }
    };

    const displayImage = props.image
        ? URL.createObjectURL(props.image)
        : UserAvatar;

    return (
        <>
            {error && <OutlinedErrorAlert message={error} />}
            <div id="avatarUpload">
            <div
                        style={{
                            width: "220px",
                            height: "220px",
                            borderRadius: "50%",
                            overflow: "hidden",
                            background: `url(${displayImage}) center / cover no-repeat`,
                            alignSelf: "stretch",
                        }}
                    />

                <label htmlFor="avatar-upload">
                    <a  id="uploadAvatarButton">
                        {props.image ? "Change Avatar" : "Upload Avatar"}
                    </a>
                    <input
                        id="avatar-upload"
                        type="file"
                        accept="image/*,.png,.jpg,.jpeg,.gif"
                        onChange={handleOnAddImage}
                        style={{ display: "none" }}
                    />
                </label>
            </div>
        </>
    );
};

export default AvatarUploader;
