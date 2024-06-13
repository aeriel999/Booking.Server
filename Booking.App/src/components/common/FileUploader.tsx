import React, { useState } from 'react';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import CancelIcon from '@mui/icons-material/Cancel';
import { Grid } from '@mui/material';
import IMG from "../../assets/avatar-profile-icon-vector-illustration_276184-165.jpg";
import OutlinedErrorAlert from "./ErrorAlert.tsx";

type FileUploadProps = {
    images: File[];
    setImages: (arg: File[]) => void;
    maxImagesUpload: number;
    defaultImages?: string[]; // Updated to an array of strings for multiple default images
    validator: (value: File[]) => string | false | undefined;
    onChange: (isValid: boolean) => void;
    onDelete: () => void;
};

const FileUploader = (props: FileUploadProps) => {
    const { maxImagesUpload, defaultImages = [IMG], images, setImages, validator, onChange, onDelete } = props;
    const inputId = Math.random().toString(32).substring(2);
    const [error, setError] = useState<string | false | undefined>(false);

    const handleOnAddImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;
        const files: File[] = Array.from(e.target.files);

        const errorMessage = validator(files);
        setError(errorMessage);
        onChange(!errorMessage);

        setImages([...images, ...files]);
        e.target.value = '';
    };

    const handleOnRemoveImage = (index: number) => {
        const newImages = [...images];
        newImages.splice(index, 1);
        setImages(newImages);

        const errorMessage = validator(newImages);
        setError(errorMessage);
        onChange(!errorMessage);

        onDelete();
    };

    return (
        <>
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 8, sm: 12, md: 12 }}>
                {error && <OutlinedErrorAlert message={error} />}
                {images.map((image, i) => (
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
            {images.length === 0 && defaultImages.map((image, i) => ( // Display default images if no images are uploaded
                <img
                    key={i}
                    src={image}
                    alt='Default'
                    style={{
                        width: '100%',
                        height: "200px",
                        objectFit: 'contain',
                        aspectRatio: '1 / 1',
                        margin: '8px 0'
                    }}
                />
            ))}
            <label htmlFor={inputId}>
                <Button variant='contained' disabled={images.length >= maxImagesUpload} component='span' sx={{ mt: 4 }}>
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
            </label>
        </>
    );
};

export default FileUploader;
