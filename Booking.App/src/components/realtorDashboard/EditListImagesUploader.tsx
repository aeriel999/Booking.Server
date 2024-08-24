import React, { useState, useEffect } from "react";
import ImageTemplate from "../../assets/Templates/Vector.webp";
import OutlinedErrorAlert from "../common/ErrorAlert";
import "../../css/DashBoardRealtorClasses/index.scss";
import { IconButton } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import { IDeleteImage } from "../../interfaces/post";
import Plus from "../../assets/DashboardIcons/iconamoon_sign-plus-fill.svg";

export type EditListImagesUploaderProps = {
    images: File[];
    setImages: (arg: File[]) => void;
    defaultImageUrls: string[]; // List of default images
    onImageDelete: (deletedImages: IDeleteImage[]) => void;
    validator: (value: File[]) => string | false | undefined;
};

const EditListImagesUploader = (props: EditListImagesUploaderProps) => {
    const numberOfImagesUpload = 6;
    const [numberOfBlocks, setNumberOfBlocks] = useState<number>(1);
    const [error, setError] = useState<string | false | undefined>(false);
    const [deletedImages, setDeletedImages] = useState<IDeleteImage[]>([]);
    const [activeUploadIndex, setActiveUploadIndex] = useState<number | null>(
        null
    ); // Track the index for replacement

    useEffect(() => {
        props.onImageDelete(deletedImages);
    }, [deletedImages]);

    const handleOnAddImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || activeUploadIndex === null) return;
        const file = e.target.files[0];
        const errorMessage = props.validator([file]);
        setError(errorMessage);

        if (!errorMessage) {
            const newImages = [...props.images];

            if (activeUploadIndex < props.defaultImageUrls.length) {
                // Replacing a default image
                const deletedImageInfo: IDeleteImage = {
                    name: props.defaultImageUrls[activeUploadIndex],
                    index: activeUploadIndex,
                };
                setDeletedImages([...deletedImages, deletedImageInfo]);
            }

            // Replace or add the new image at the correct index for correct showing in UI
            newImages[activeUploadIndex] = file;
            props.setImages(newImages);
        }
        e.target.value = ""; // Reset input value

        if (
            numberOfBlocks > 1 &&
            (props.images.length + 1) /
                (numberOfImagesUpload * numberOfBlocks) >=
                1
        ) {
            setNumberOfBlocks(numberOfBlocks + 1);
        }

        setActiveUploadIndex(null); // Reset active index after upload
    };

    const handleOnRemoveImage = (index: number) => {
        const newImages = [...props.images];
        newImages.splice(index, 1);

        if (index < props.defaultImageUrls.length) {
            const deletedImageInfo: IDeleteImage = {
                name: props.defaultImageUrls[index],
                index,
            };
            setDeletedImages([...deletedImages, deletedImageInfo]);
        }

        props.setImages(newImages);
        const errorMessage = props.validator(newImages);
        setError(errorMessage);
    };

    const handleKeyDown = (
        event: React.KeyboardEvent<HTMLAnchorElement>,
        index: number
    ) => {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            setActiveUploadIndex(index); // Set index for replacement
            document.getElementById("images-upload")?.click();
        }
    };

    return (
        <div className="blockImagesContainer">
            {error && <OutlinedErrorAlert message={error} />}

            <div className="imagesContainer">
                {Array.from({
                    length: numberOfImagesUpload * numberOfBlocks,
                }).map((_, i) => (
                    <label
                        htmlFor="images-upload"
                        key={i}
                        className="image"
                        onClick={() => setActiveUploadIndex(i)} // Set index for replacement
                    >
                        <div
                            style={{
                                background: `url(${
                                    props.images[i]
                                        ? URL.createObjectURL(props.images[i])
                                        : props.defaultImageUrls[i] ||
                                          ImageTemplate
                                }) center / cover no-repeat`,
                                position: "relative",
                                width: "100%",
                                height: "100%",
                            }}
                        >
                            {(props.images[i] || props.defaultImageUrls[i]) &&
                                numberOfBlocks > 1 && (
                                    <IconButton
                                        aria-label="delete image"
                                        style={{
                                            position: "absolute",
                                            top: 10,
                                            right: 10,
                                            color: "#fff",
                                            backgroundColor: "#00000080",
                                            borderRadius: "50%",
                                        }}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            handleOnRemoveImage(i);
                                        }}
                                    >
                                        <CancelIcon />
                                    </IconButton>
                                )}
                        </div>
                    </label>
                ))}
            </div>

            <button style={{ marginLeft: "auto" }}
                        className="linkButton"
                        onClick={() => {
                            setNumberOfBlocks(numberOfBlocks + 1);
                        }}
                    >
                        <div className="text">Add More Images</div>
                        <img className="icon" src={Plus}></img>
                    </button>

            <div className="buttonContainer">
                <label htmlFor="images-upload">
                    <a
                        type="button"
                        className="imageUploadButton"
                        onKeyDown={(e) =>
                            handleKeyDown(e, activeUploadIndex || 0)
                        }
                        tabIndex={0}
                    >
                        Upload Image
                    </a>
                </label>
                <input
                    id="images-upload"
                    type="file"
                    accept="image/*,.png,.jpg,.jpeg,.gif"
                    onChange={handleOnAddImage}
                    style={{ display: "none" }}
                />
            </div>
        </div>
    );
};

export default EditListImagesUploader;
