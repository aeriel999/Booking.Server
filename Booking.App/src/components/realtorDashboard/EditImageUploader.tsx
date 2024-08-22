import React, { useState, useEffect } from "react";
import ImageTemplate from "../../assets/Templates/Vector.webp";
import OutlinedErrorAlert from "../common/ErrorAlert";
import "../../css/DashBoardRealtorClasses/index.scss";
import { IconButton } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import { IDeleteImage } from "../../containers/dashboard/EditPost";

type ImageUploader = {
    image: File | null | undefined;
    setImage: (file: File) => void;
    validator: (value: File) => string | false | undefined;
    label: string;
    defaultImageUrl: string;
    onImageDelete: (images: IDeleteImage[]) => void;
    buttonText: string;
};

const EditImageUploader = (props: ImageUploader) => {
    const [error, setError] = useState<string | false | undefined>(false);
    const [displayImage, setDisplayImage] = useState<string>(props.defaultImageUrl);

    useEffect(() => {
        setDisplayImage(props.image ? URL.createObjectURL(props.image) : props.defaultImageUrl);
    }, [props.image, props.defaultImageUrl]);

    const handleOnAddImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;

        const file = e.target.files[0];
        const errorMessage = props.validator(file);

        setError(errorMessage);

        if (!errorMessage) {
            props.setImage(file);

            const deleteImageInfo: IDeleteImage = { name: props.label, index: 0 };
        
            // Trigger the onImageDelete callback
            props.onImageDelete([deleteImageInfo]);
        }
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLAnchorElement>) => {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            document.getElementById(props.label)?.click();
        }
    };

    const handleDeleteImage = () => {
        setDisplayImage(ImageTemplate);
        const deleteImageInfo: IDeleteImage = { name: props.label, index: 0 };
        
        // Trigger the onImageDelete callback
        props.onImageDelete([deleteImageInfo]);
    };

    return (
        <>
            {error && <OutlinedErrorAlert message={error} textColor="#000" />}
            <div className="mainImage" style={{ position: "relative" }}>
                <label htmlFor={props.label}>
                    <div
                        style={{
                            width: "40vh",
                            height: "40vh",
                            minHeight: "250px",
                            minWidth: "250px",
                            background: `url(${displayImage}) center / cover no-repeat`,
                            alignSelf: "stretch",
                        }}
                    />
                </label>
                <label htmlFor={props.label}>
                    <a
                        type="button"
                        className="imageUploadButton"
                        onKeyDown={handleKeyDown}
                        tabIndex={0}
                    >
                        {props.buttonText}
                    </a>
                    <input
                        id={props.label}
                        type="file"
                        accept="image/*,.png,.jpg,.jpeg,.gif"
                        onChange={handleOnAddImage}
                        style={{ display: "none" }}
                    />
                </label>
                {displayImage !== ImageTemplate && (
                    <IconButton
                        aria-label="delete image"
                        style={{
                            position: "absolute",
                            top: 10,
                            right: 0,
                            color: "#fff",
                        }}
                        onClick={handleDeleteImage}
                    >
                        <CancelIcon />
                    </IconButton>
                )}
            </div>
        </>
    );
};

export default EditImageUploader;
