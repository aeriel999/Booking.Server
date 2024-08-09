import React, { useState } from "react";
import ImageTemplate from "../../assets/Templates/Vector.webp";
import OutlinedErrorAlert from "../common/ErrorAlert";
import "../../css/DashBoardRealtorClasses/index.scss";

type ListImageUploaderProps = {
    images: File[];
    setImages: (files: File[]) => void;
    maxImagesUpload: number;
    defaultImage?: string;
    validator: (value: File[]) => string | false | undefined;
    // onChange: (isValid: boolean) => void;
    // onDelete: () => void;
};

const ListImageUploader = (props: ListImageUploaderProps) => {
    const maxImagesUpload = props.maxImagesUpload;
    const inputId = Math.random().toString(32).substring(2);
    const defaultIMG = props.defaultImage ?? ImageTemplate;
    const [error, setError] = useState<string | false | undefined>(false);

    const handleOnAddImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;
        const files = Array.from(e.target.files);

        const errorMessage = props.validator(files);
        setError(errorMessage);
        if (!errorMessage) {
            props.setImages([...props.images, ...files]);
        }

        e.target.value = "";
    };

    const handleOnRemoveImage = (index: number) => {
        const newImages = [...props.images];
        newImages.splice(index, 1);
        props.setImages(newImages);

        const errorMessage = props.validator(newImages);
        setError(errorMessage);
    };

    return (
        <>
            {error && <OutlinedErrorAlert message={error} />}
            <div className="blockImageContainer">
                {props.images.map((image, i) => (
                    <div key={i} className="image-container">
                        <button
                            className="delete-button"
                            onClick={() => handleOnRemoveImage(i)}
                        >
                            &#x2715;
                        </button>
                        <img
                            src={URL.createObjectURL(image)}
                            className="uploaded-image"
                            alt=""
                        />
                    </div>
                ))}
                {props.images.length === 0 && (
                    <img
                        src={defaultIMG}
                        alt="Default"
                        className="default-image"
                    />
                )}
            </div>
            <label htmlFor={inputId} className="upload-label">
                <button
                    type="button"
                    disabled={props.images.length >= maxImagesUpload}
                    className="upload-button"
                >
                    Upload Files
                </button>
                <input
                    id={inputId}
                    type="file"
                    multiple
                    accept="image/*,.png,.jpg,.jpeg,.gif"
                    onChange={handleOnAddImage}
                    style={{ display: "none" }}
                />
            </label>
        </>
    );
};

export default ListImageUploader;
