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
    defaultImage?: string | undefined; // New prop for default image
    validator: (value: File[]) => string | false | undefined;
    setImageList: React.Dispatch<React.SetStateAction<IImage[]>>;
};

const ListImageUploader = (props: ListImageUploaderProps) => {
    const maxImagesUpload = 4;
    let numberOfBlocks = 1;
    const [inputId, setInputId] = useState<number>(2);
    const defaultIMG = props.defaultImage ?? ImageTemplate;
    const [error, setError] = useState<string | false | undefined>(false);

    // const handleOnAddImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    //     if (!e.target.files) return
    //     const files: File[] = [];

    //     for (const file of e.target.files) {
    //         files.push(file);
    //     }

    //     const errorMessage = props.validator(files);

    //     setError(errorMessage);
    //   //  props.onChange(!errorMessage);

    //   const newMainImage: IImage = {
    //         id: 1,
    //         image: files[],
    //     };
    //     props.setImageList((prevImageList) => [
    //         ...prevImageList,
    //         newMainImage,
    //     ]);

    //     props.setImages([...props.images, ...files])
    //     e.target.value = ''
    // }

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
    };

    const handleOnRemoveImage = (index: number) => {
        // Remove the image from the images array
        const newImages = [...props.images];
        newImages.splice(index, 1);
        props.setImages(newImages);

        // Remove the corresponding image from the imageList array
        console.log(index);
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
                {Array.from({ length: maxImagesUpload * numberOfBlocks }).map(
                    (_, i) => (
                        <div
                            key={i}
                            className="image"
                            style={{
                                background: `url(${
                                    props.images[i]
                                        ? URL.createObjectURL(props.images[i])
                                        : defaultIMG
                                }) center / cover no-repeat`,
                                position: "relative",
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
                                    onClick={() => handleOnRemoveImage(i)}
                                >
                                    <CancelIcon />
                                </IconButton>
                            )}
                        </div>
                    )
                )}
            </div>

            <div className="buttonContainer">
                <label htmlFor="images-upload">
                    <a type="button" className="imageUploadButton">
                        Upload Images
                    </a>
                    <input
                        id="images-upload"
                        type="file"
                        accept="image/*,.png,.jpg,.jpeg,.gif"
                        onChange={handleOnAddImage}
                        style={{ display: "none" }}
                    />
                </label>
            </div>

            {/* <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 8, sm: 12, md: 12 }}>
                {props.images.map((image, i) => (
                    <Grid
                        item
                        xs={4}
                        sm={4}
                        md={4}
                        key={i}
                        sx={{
                            display: 'flex',
                            justifyContent: 'start',
                            alignItems: 'center',
                            position: 'relative'
                        }}
                    >
                        <IconButton
                            aria-label='delete image'
                            style={{
                                position: 'absolute',
                                top: 10,
                                right: 0,
                                color: '#aaa'
                            }}
                            onClick={() => handleOnRemoveImage(i)}
                        >
                             <CancelIcon />
                        </IconButton>
                        <img
                            src={URL.createObjectURL(image)}
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'contain',
                                aspectRatio: '1 / 1'
                            }}
                            alt=''
                        />
                    </Grid>
                ))}
            </Grid>
            {props.images.length === 0 && ( // Display default image if no images are uploaded
                <img
                    src={defaultIMG}
                    alt='Default'
                    style={{
                        width: '100%',
                        height: "200px",
                        objectFit: 'contain',
                        aspectRatio: '1 / 1'
                    }}

                />
            )}
            <label htmlFor={inputId}>
                <Button variant='contained' disabled={props.images.length >= maxImagesUpload} component='span' sx={{ mt: 4 }}>
                    Upload Files
                </Button>
                <input
                    id={inputId}
                    type='file'
                    multiple
                    accept='image/*,.png,.jpg,.jpeg,.gif'
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleOnAddImage(e)}
                    style={{ display: 'none' }}

                />
            </label> */}
        </div>
    );
};

export default ListImageUploader;
