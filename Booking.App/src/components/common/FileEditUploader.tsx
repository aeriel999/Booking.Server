import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import CancelIcon from "@mui/icons-material/Cancel";
import { Grid } from "@mui/material";
import OutlinedErrorAlert from "./ErrorAlert.tsx";

type FileUploadProps = {
    images: File[];
    setImages: (arg: File[]) => void;
    maxImagesUpload: number;
    defaultImage: string | undefined; // Single default image
    validator: (value: File[]) => string | false | undefined;
    onChange: (isValid: boolean) => void;
    onDelete: (image: string) => void; // Image for the image being deleted
    setDeleteImages?: (arg: string[]) => void; // Nullable
};

const FileEditUploader = (props: FileUploadProps) => {
    const {
        maxImagesUpload,
        defaultImage,
        images,
        setImages,
        validator,
        onChange,
        onDelete,
        setDeleteImages,
    } = props;

    const inputId = Math.random().toString(32).substring(2);
    const [defaultImages, setDefaultImages] = useState<string[]>([]);
    const [deleteImages, setDeleteImagesState] = useState<string[]>([]);
    const [error, setError] = useState<string | false | undefined>(false);
    const [currentImg, setCurrentImg] = useState<File | null>(null);

    useEffect(() => {
        if (defaultImage) {
            setDefaultImages([defaultImage]);
        }
    }, [defaultImage]);

    useEffect(() => {
        if (setDeleteImages) {
            setDeleteImages(deleteImages);
        }
    }, [deleteImages, setDeleteImages]);

    const handleOnAddImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;
        const files: File[] = Array.from(e.target.files);
        const errorMessage = validator(files);
        setError(errorMessage);
        onChange(!errorMessage);
        setImages([...images, ...files]);
        setCurrentImg(files[0]);
        e.target.value = "";
    };

    const handleOnRemoveImage = (index: number) => {
        const newImages = [...images];
        newImages.splice(index, 1);
        setImages(newImages);
        const errorMessage = validator(newImages);
        setError(errorMessage);
        onChange(!errorMessage);
    };

    const handleOnRemoveDefaultImage = (image: string) => {
        const newDefaultImages = defaultImages.filter((img) => img !== image);
        setDefaultImages(newDefaultImages);
        setDeleteImagesState([...deleteImages, image]);
        onDelete(image);
    };

    return (
        <>
            <Grid
                container
                spacing={{ xs: 2, md: 3 }}
                columns={{ xs: 8, sm: 12, md: 12 }}
            >
                {error && <OutlinedErrorAlert message={error} />}
                {currentImg && (
                    <Grid
                        item
                        xs={4}
                        sm={4}
                        md={4}
                        sx={{
                            display: "flex",
                            justifyContent: "start",
                            alignItems: "center",
                            position: "relative",
                        }}
                    >
                        <IconButton
                            aria-label="delete image"
                            style={{
                                position: "absolute",
                                top: 10,
                                right: 0,
                                color: "#aaa",
                            }}
                            onClick={() => handleOnRemoveImage(0)}
                        >
                            <CancelIcon />
                        </IconButton>
                        <img
                            src={URL.createObjectURL(currentImg)}
                            style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "contain",
                                aspectRatio: "1 / 1",
                            }}
                            alt=""
                        />
                    </Grid>
                )}
                {!currentImg &&
                    defaultImages.map((image, i) => (
                        <Grid
                            item
                            xs={4}
                            sm={4}
                            md={4}
                            key={i}
                            sx={{
                                display: "flex",
                                justifyContent: "start",
                                alignItems: "center",
                                position: "relative",
                            }}
                        >
                            <IconButton
                                aria-label="delete image"
                                style={{
                                    position: "absolute",
                                    top: 10,
                                    right: 0,
                                    color: "#aaa",
                                }}
                                onClick={() =>
                                    handleOnRemoveDefaultImage(image)
                                }
                            >
                                <CancelIcon />
                            </IconButton>
                            <img
                                src={image}
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "contain",
                                    aspectRatio: "1 / 1",
                                }}
                                alt="Default"
                            />
                        </Grid>
                    ))}
            </Grid>
            <label htmlFor={inputId}>
                <Button
                    variant="contained"
                    disabled={images.length >= maxImagesUpload}
                    component="span"
                    sx={{ mt: 4 }}
                >
                    Upload Files
                </Button>
                <input
                    id={inputId}
                    type="file"
                    multiple
                    accept="image/*,.png,.jpg,.jpeg,.gif"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        handleOnAddImage(e)
                    }
                    style={{ display: "none" }}
                />
            </label>
        </>
    );
};

export default FileEditUploader;
