import React, { useState } from "react";
import ImageTemplate from "../../assets/Templates/Vector.webp";
import OutlinedErrorAlert from "../common/ErrorAlert";
import "../../css/DashBoardRealtorClasses/index.scss";

type ImageUploader = {
    image: File | null | undefined;
    setImage: (file: File) => void;
    validator: (value: File) => string | false | undefined;
};

const ImageUploader = (props: ImageUploader) => {
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
        : ImageTemplate;

    return (
        <>
            {error && <OutlinedErrorAlert message={error} />}
            <div className="mainImage">
                <div
                    style={{
                        width: "394px",
                        height: "394px",
                        
                        background: `url(${displayImage}) center / cover no-repeat`,
                        alignSelf: "stretch",
                    }}
                />

                <label htmlFor="image-upload">
                  
                <a 
                        type="button"
                        className="imageUploadButton"
                    >
                        Submit Main Image
                    </a>
                    <input
                        id="image-upload"
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
