import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { useEffect, useRef, useState } from "react";
import { APP_ENV } from "../../env";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import InputGroup from "../../components/common/InputGroup.tsx";
import {
    AvatarValidator,
    EmailValidator,
    FirstNameValidator,
    LastNameValidator,
} from "../../validations/account";
import MuiPhoneNumber from "mui-phone-number";
import { isValidPhoneNumber } from "libphonenumber-js";
import FileUploader from "../../components/common/FileUploader.tsx";
import Button from "@mui/material/Button";
import * as React from "react";
import { IEditRealtorInfo } from "../../interfaces/account";
import { editProfile } from "../../store/accounts/account.actions.ts";
import { unwrapResult } from "@reduxjs/toolkit";
import ErrorHandler from "../../components/common/ErrorHandler.ts";
import { Link, useNavigate } from "react-router-dom";
import OutlinedErrorAlert from "../../components/common/ErrorAlert.tsx";
import { Breadcrumbs } from "@mui/material";
import Typography from "@mui/material/Typography";
import CustomizedDialogs from "../../components/common/Dialog.tsx";
import Divider from "@mui/material/Divider";
import IMG from "../../assets/avatar-profile-icon-vector-illustration_276184-165.jpg";

export default function RealtorProfileEditPage() {
    const { user } = useAppSelector((state) => state.account);
    const dispatch = useAppDispatch();
    const [avatarUrl, setAvatarUrl] = useState<string>();
    const [errorMessage, setErrorMessage] = useState<string | undefined>(
        undefined
    );
    const [isFormValid, setIsFormValid] = useState(false);
    const formValid = useRef({
        email: true,
        firstName: true,
        lastName: true,
        avatar: true,
        phoneNumber: true,
    });
    const [isPhoneValid, setIsPhoneValid] = useState(true);
    const [images, setImages] = useState<File[]>([]);
    const [phone, setPhone] = useState<string>(user?.phoneNumber ?? "");
    const [open, setOpen] = useState<boolean>(false);
    const message =
        "Please note that your email will be changed once you confirm the update. " +
        "We'll send a confirmation link to your new email address shortly. Thank you for your patience.";
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            setAvatarUrl(APP_ENV.BASE_URL + user?.avatar);
        }
    }, [user]);

    function handleChange() {
        setIsFormValid(
            Object.values(formValid.current).every((isValid) => isValid)
        );
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        if (Object.values(formValid.current).every((isValid) => isValid)) {
            const model: IEditRealtorInfo = {
                email: data.get("email") as string,
                firstName: data.get("firstName") as string,
                lastName: data.get("lastName") as string,
                phoneNumber: phone,
                avatar: images[0],
            };
            try {
                const response = await dispatch(editProfile(model));
                unwrapResult(response);

                const { isEmailChanged } = response.payload;

                if (isEmailChanged) {
                    setOpen(isEmailChanged);
                } else {
                    navigate("/dashboard/profile");
                }
            } catch (error) {
                setErrorMessage(ErrorHandler(error));
            }
        }
    };

    return (
        <>
            <CustomizedDialogs
                message={message}
                isOpen={open}
                setOpen={setOpen}
                navigate={"/dashboard/profile"}
            />

            <Breadcrumbs
                aria-label="breadcrumb"
                style={{ marginBottom: "20px" }}
            >
                <Link to={"/dashboard/profile"}>
                    <Typography variant="h6" color="text.primary">
                        Dashboard
                    </Typography>
                </Link>
                <Link to={"/dashboard/profile"}>
                    <Typography variant="h6" color="text.primary">
                        Profile
                    </Typography>
                </Link>
                <Typography variant="h6" color="text.primary">
                    Edit
                </Typography>
            </Breadcrumbs>
            <Divider />
            {errorMessage && <OutlinedErrorAlert message={errorMessage} />}
            <Box
                component="form"
                noValidate
                onSubmit={handleSubmit}
                sx={{ mt: 3 }}
                onChange={handleChange}
            >
                <Grid container spacing={2}>
                    <Grid container spacing={2} item xs={6}>
                        <Grid item xs={5}>
                            <FileUploader
                                images={images}
                                setImages={setImages}
                                maxImagesUpload={1}
                                defaultImages={[avatarUrl ?? IMG]}
                                validator={AvatarValidator}
                                onChange={(isValid) =>
                                    (formValid.current.avatar = isValid)
                                }
                                onDelete={handleChange}
                            ></FileUploader>
                        </Grid>
                    </Grid>
                    <Grid item container spacing={4} xs={6}>
                        <Grid item xs={12}>
                            <InputGroup
                                label="First name"
                                field="firstName"
                                validator={FirstNameValidator}
                                onChange={(isValid) =>
                                    (formValid.current.firstName = isValid)
                                }
                                defaultValue={user?.firstName}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <InputGroup
                                label="Last name"
                                field="lastName"
                                validator={LastNameValidator}
                                onChange={(isValid) =>
                                    (formValid.current.lastName = isValid)
                                }
                                defaultValue={user?.lastName}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <MuiPhoneNumber
                                defaultCountry={"ua"}
                                value={phone}
                                onChange={(e) => {
                                    formValid.current.phoneNumber =
                                        isValidPhoneNumber(e as string);
                                    setIsPhoneValid(
                                        isValidPhoneNumber(e as string)
                                    );
                                    setPhone(e as string);
                                    handleChange();
                                }}
                                error={!isPhoneValid}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <InputGroup
                                label="Email"
                                field="email"
                                type="email"
                                validator={EmailValidator}
                                onChange={(isValid) =>
                                    (formValid.current.email = isValid)
                                }
                                defaultValue={user?.email}
                            />
                        </Grid>
                    </Grid>
                </Grid>

                <Grid container spacing={1} sx={{ mt: 5 }}>
                    <Grid item xs={6}>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            disabled={!isFormValid}
                        >
                            Save
                        </Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Link to={"/dashboard/profile"}>
                            <Button
                                type="button"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                color="error"
                            >
                                Cancel
                            </Button>
                        </Link>
                    </Grid>
                </Grid>
            </Box>
        </>
    );
}
