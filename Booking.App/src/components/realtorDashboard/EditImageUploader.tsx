import React, { useState, useEffect } from "react";
import OutlinedErrorAlert from "../common/ErrorAlert";
import "../../css/DashBoardRealtorClasses/index.scss";
import { IDeleteImage } from "../../interfaces/post";
import { EditImageUploaderType } from "../../utils/types";

const EditImageUploader = (props: EditImageUploaderType) => {
    const [error, setError] = useState<string | false | undefined>(false);
    const [displayImage, setDisplayImage] = useState<string>(
        props.defaultImageUrl
    );

    useEffect(() => {
        setDisplayImage(
            props.image
                ? URL.createObjectURL(props.image)
                : props.defaultImageUrl
        );
    }, [props.image, props.defaultImageUrl]);

    const handleOnAddImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;

        const file = e.target.files[0];
        const errorMessage = props.validator(file);

        setError(errorMessage);

        if (!errorMessage) {
            props.setImage(file);

            const deleteImageInfo: IDeleteImage = {
                name: props.label,
                index: 1,
            };
            console.log("deleteImageInfo", deleteImageInfo);

            // Trigger the onImageDelete callback
            if( props.onImageDelete)
                 props.onImageDelete([deleteImageInfo]);
        }
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLAnchorElement>) => {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            document.getElementById(props.label)?.click();
        }
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
                        Change Main image
                    </a>
                    <input
                        id={props.label}
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

export default EditImageUploader;
