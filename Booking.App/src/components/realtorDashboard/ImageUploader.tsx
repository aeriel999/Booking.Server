import React, { useState } from "react";
import ImageTemplate from "../../assets/Templates/Vector.webp";
import OutlinedErrorAlert from "../common/ErrorAlert";
import "../../css/DashBoardRealtorClasses/index.scss";

type ImageUploader = {
    image: File | null | undefined;
    setImage: (file: File) => void;
    validator: (value: File) => string | false | undefined;
    label: string;
};

const ImageUploader = (props: ImageUploader) => {
    const [error, setError] = useState<string | false | undefined>(false);

    const handleOnAddImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log("label", props.label)
        if (!e.target.files) return;

        const file = e.target.files[0];
        const errorMessage = props.validator(file);

        setError(errorMessage);

        if (!errorMessage) {
            props.setImage(file);
        }
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLAnchorElement>) => {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault(); // Prevent default action for Enter and Space keys
            document.getElementById(props.label)?.click(); // Trigger click on the hidden file input
        }
    };

    const displayImage = props.image
        ? URL.createObjectURL(props.image)
        : ImageTemplate;

    return (
        <>
            {error && <OutlinedErrorAlert message={error} textColor="#000"/>}
            <div className="mainImage">
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
                        onKeyDown={handleKeyDown} // Handle key down events for accessibility
                        tabIndex={0}>
                        Upload Main Image
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

export default ImageUploader;
