import React, {useState} from 'react'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import CancelIcon from '@mui/icons-material/Cancel'
import { Grid } from '@mui/material'
import IMG from  "../../assets/avatar-profile-icon-vector-illustration_276184-165.jpg"
import OutlinedErrorAlert from "./ErrorAlert.tsx";

type FileUploadProps = {
    images: File[];
    setImages: (arg: File[]) => void;
    maxImagesUpload: number;
    defaultImage?: string | undefined; // New prop for default image
    validator: (value: File[]) => string | false | undefined,
    onChange: (isValid: boolean) => void,
    onDelete: () => void
}

const FileUploader = (props: FileUploadProps) => {
    const maxImagesUpload = props.maxImagesUpload;
    const inputId = Math.random().toString(32).substring(2)
    const defaultIMG = props.defaultImage ?? IMG;
    const [error, setError] = useState<string | false | undefined>(false);

    const handleOnAddImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return
        const files: File[] = [];

        for (const file of e.target.files) {
            files.push(file);
        }

        const errorMessage = props.validator(files);

        setError(errorMessage);
        props.onChange(!errorMessage);

        props.setImages([...props.images, ...files])
        e.target.value = ''
    }

    const handleOnRemoveImage = (index: number) => {
        const newImages = [...props.images]
        newImages.splice(index, 1)
        props.setImages(newImages)

        const errorMessage = props.validator(newImages);

        setError(errorMessage);
        props.onChange(!errorMessage);

        props.onDelete();
    }

    return (
        <>
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 8, sm: 12, md: 12 }}>
                {error && <OutlinedErrorAlert message={error} />}
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
            </label>
        </>
    )
}

export default FileUploader
