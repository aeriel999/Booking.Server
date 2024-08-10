import React, { useState } from "react";
import ImageTemplate from "../../assets/Templates/Vector.webp";
import OutlinedErrorAlert from "../common/ErrorAlert";
import "../../css/DashBoardRealtorClasses/index.scss";
import { IconButton } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import { IImage } from "../../interfaces/post";

type ListImageUploaderProps = {
    images: File[];
    setImages: (arg: File[]) => void;
    validator: (value: File[]) => string | false | undefined;
    setImageList: React.Dispatch<React.SetStateAction<IImage[]>>;
};

const ListImageUploader = (props: ListImageUploaderProps) => {
    const numberOfImagesUpload = 4;
    const [numberOfBlocks, setNumberOfBlocks] = useState<number>(1);
    const [inputId, setInputId] = useState<number>(2);
    const [error, setError] = useState<string | false | undefined>(false);

    const handleOnAddImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;
        const files: File[] = Array.from(e.target.files);

        const errorMessage = props.validator(files);
        setError(errorMessage);

        if (!errorMessage) {
            const newImages = [...props.images, ...files];
            props.setImages(newImages);

            const newImageEntries: IImage[] = files.map((file) => ({
                id: inputId, // Unique ID based on current length
                image: file,
            }));

            setInputId(inputId + 1);

            props.setImageList((prevImageList) => [
                ...prevImageList,
                ...newImageEntries,
            ]);
        }
        e.target.value = "";

        if (
            (props.images.length + 1) /
                (numberOfImagesUpload * numberOfBlocks) ===
            1
        ) {
            setNumberOfBlocks(numberOfBlocks + 1);
        }
    };

    const handleOnRemoveImage = (index: number) => {
        const newImages = [...props.images];
        newImages.splice(index, 1);
        props.setImages(newImages);

        props.setImageList((prevImageList) =>
            prevImageList.filter((_, i) => i !== index + 1)
        );

        const errorMessage = props.validator(newImages);
        setError(errorMessage);
    };

    return (
        <div className="blockImagesContainer">
            {error && <OutlinedErrorAlert message={error} />}

            <div className="imagesContainer">
                {Array.from({
                    length: numberOfImagesUpload * numberOfBlocks,
                }).map((_, i) => (
                    <label htmlFor="images-upload" key={i} className="image">
                        <div
                            style={{
                                background: `url(${
                                    props.images[i]
                                        ? URL.createObjectURL(props.images[i])
                                        : ImageTemplate
                                }) center / cover no-repeat`,
                                position: "relative",
                                width: "100%",
                                height: "100%",
                            }}
                        >
                            {props.images[i] && (
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

            <div className="buttonContainer">
                <label htmlFor="images-upload">
                    <a type="button" className="imageUploadButton">
                        Add Image
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

export default ListImageUploader;
