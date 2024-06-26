import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Breadcrumbs, Grid } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import Divider from "@mui/material/Divider";
import ComboBox from "../../components/common/ComboBox.tsx";
import { useEffect, useRef, useState } from "react";
import { useAppDispatch } from "../../hooks/redux";
import { unwrapResult } from "@reduxjs/toolkit";
import {
    createPost,
    getListOfCategories,
    getListOfCitiesByCountryId,
    getListOfCountries,
    getListOfStreetsByCityId,
    getTypesOfRentList,
} from "../../store/post/post.actions.ts";
import ErrorHandler from "../../components/common/ErrorHandler.ts";
import OutlinedErrorAlert from "../../components/common/ErrorAlert.tsx";
import {
    ICategory,
    ICity,
    ICountry,
    IPostCreate,
    ITypeOfRent,
} from "../../interfaces/post";
import InputGroup from "../../components/common/InputGroup.tsx";
import {
    AreaValidator,
    BuildingNumberValidator,
    CityNameValidator,
    DescriptionValidator,
    NumberOfRoomsValidator,
    PostNameValidator,
    PriceValidator,
    StreetNameValidator,
} from "../../validations/post";
import FileUploader from "../../components/common/FileUploader.tsx";
import { AvatarValidator } from "../../validations/account";
import Button from "@mui/material/Button";
import * as React from "react";
import { joinForPostListening } from "../../SignalR";
import IMG from "../../assets/avatar-profile-icon-vector-illustration_276184-165.jpg";

export function AddNewPost() {
    const dispatch = useAppDispatch();
    const [errorMessage, setErrorMessage] = useState<string | undefined>(
        undefined
    );
    const [typeOfRentList, setTypeOfRentList] = useState<ITypeOfRent[]>([]);
    const [typeOfRent, setTypeOfRent] = useState<ITypeOfRent>();
    const [categoryList, setCategoryList] = useState<ICategory[]>([]);
    const [category, setCategory] = useState<ICategory>();
    const [countryList, setCountryList] = useState<ICountry[]>([]);
    const [country, setCountry] = useState<ICountry>();
    const [cityList, setCityList] = useState<ICity[]>([]);
    const [city, setCity] = useState<ICity>();
    const [streetList, setStreetList] = useState<ICity[]>([]);
    const [street, setStreet] = useState<ICity>();
    const formValid = useRef({
        cityName: false,
        streetName: false,
        name: false,
        description: false,
        buildingNumber: false,
        numberOfRooms: false,
        city: false,
        street: false,
        area: false,
        price: false,
        images: false,
    });
    const [images, setImages] = useState<File[]>([]);
    const [isFormValid, setIsFormValid] = useState(false);
    const navigate = useNavigate();
    //ToDo make hasCountOfRooms and hasArea
    //ToDo request.CityId == null && request.CityName != null

    const getTypeOfRentList = async () => {
        try {
            const response = await dispatch(getTypesOfRentList());
            unwrapResult(response);
            return response;
        } catch (error) {
            setErrorMessage(ErrorHandler(error));
        }
    };

    const getCategoryList = async () => {
        try {
            const response = await dispatch(getListOfCategories());
            unwrapResult(response);
            return response;
        } catch (error) {
            setErrorMessage(ErrorHandler(error));
        }
    };

    const getCountryList = async () => {
        try {
            const response = await dispatch(getListOfCountries());
            unwrapResult(response);
            return response;
        } catch (error) {
            setErrorMessage(ErrorHandler(error));
        }
    };

    const getCityList = async (countryId: string) => {
        try {
            const response = await dispatch(
                getListOfCitiesByCountryId(countryId)
            );
            unwrapResult(response);
            return response;
        } catch (error) {
            setErrorMessage(ErrorHandler(error));
        }
    };

    const getStreetList = async (cityId: string) => {
        try {
            const response = await dispatch(getListOfStreetsByCityId(cityId));
            unwrapResult(response);
            return response;
        } catch (error) {
            setErrorMessage(ErrorHandler(error));
        }
    };

    useEffect(() => {
        getTypeOfRentList().then((history) => {
            setTypeOfRentList(history?.payload.$values);
        });

        getCategoryList().then((history) => {
            setCategoryList(history?.payload.$values);
        });

        getCountryList().then((history) => {
            setCountryList(history?.payload.$values);
        });
    }, []);

    useEffect(() => {
        if (country) {
            getCityList(country.id).then((history) => {
                if (history?.payload.$values != null) {
                    setCityList(history?.payload.$values);
                }
            });
        }
    }, [country]);

    useEffect(() => {
        if (city) {
            getStreetList(city.id).then((history) => {
                if (history?.payload.$values != null) {
                    setStreetList(history?.payload.$values);
                }
            });
        }
    }, [city]);

    function handleChange() {
        setIsFormValid(
            Object.values(formValid.current).every((isValid) => isValid)
        );
        console.log("isFormValid", isFormValid);
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const data = new FormData(event.currentTarget);

        const numberOfRoomsResult =
            (data.get("numberOfRooms") as string) == ""
                ? null
                : parseInt(data.get("numberOfRooms") as string, 10);

        const areaResult =
            (data.get("area") as string) == ""
                ? null
                : parseInt(data.get("area") as string, 10);

        const model: IPostCreate = {
            name: data.get("name") as string,
            postTypeOfRentId: typeOfRent!.id,
            categoryId: category!.id,
            countryId: country!.id,
            cityId: city === undefined ? null : city.id,
            cityName: data.get("cityName") as string,
            streetId: street === undefined ? null : street.id,
            streetName: data.get("streetName") as string,
            buildingNumber: data.get("buildingNumber") as string,
            numberOfRooms: numberOfRoomsResult,
            area: areaResult,
            price: parseFloat(data.get("price") as string),
            description: data.get("description") as string,
            images: images,
        };

        try {
            const response = await dispatch(createPost(model));
            unwrapResult(response);

            await joinForPostListening(response.payload.id);

            navigate("/dashboard/show-all-post");
        } catch (error) {
            setErrorMessage(ErrorHandler(error));
        }
    };
    return (
        <>
            <Breadcrumbs
                aria-label="breadcrumb"
                style={{ marginBottom: "20px" }}
            >
                <Link to={"/dashboard/profile"}>
                    <Typography variant="h6" color="text.primary">
                        Dashboard
                    </Typography>
                </Link>
                <Link to={"/dashboard/show-all-post"}>
                    <Typography variant="h6" color="text.primary">
                        All Posts
                    </Typography>
                </Link>
                <Typography variant="h6" color="text.primary">
                    Add New Post
                </Typography>
            </Breadcrumbs>
            <Divider />

            {errorMessage && <OutlinedErrorAlert message={errorMessage} />}

            <Container component="main" maxWidth="xs">
                <Box
                    sx={{
                        marginTop: 8,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <Typography component="h1" variant="h5">
                        Add New Post
                    </Typography>
                    <Box
                        component="form"
                        onSubmit={handleSubmit}
                        noValidate
                        sx={{ mt: 1 }}
                    >
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <InputGroup
                                    label="Enter title for your post"
                                    field="name"
                                    type="text"
                                    validator={PostNameValidator}
                                    onChange={(isValid) =>
                                        (formValid.current.name = isValid)
                                    }
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <ComboBox
                                    options={typeOfRentList}
                                    onChange={setTypeOfRent}
                                    label={"Type Of Rent"}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <ComboBox
                                    options={categoryList}
                                    onChange={setCategory}
                                    label={"Category"}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <ComboBox
                                    options={countryList}
                                    onChange={setCountry}
                                    label={"Country"}
                                />
                            </Grid>

                            {cityList.length > 0 && (
                                <Grid item xs={12}>
                                    <Typography
                                        variant="subtitle1"
                                        color="text.primary"
                                    >
                                        Select City from the list or enter it in
                                        a field.
                                    </Typography>
                                    <ComboBox
                                        options={cityList}
                                        onChange={setCity}
                                        label={"City"}
                                    />
                                </Grid>
                            )}

                            {city === undefined && (
                                <Grid item xs={12}>
                                    <InputGroup
                                        label="City"
                                        field="cityName"
                                        type="text"
                                        validator={CityNameValidator}
                                        onChange={(isValid) =>
                                            (formValid.current.city = isValid)
                                        }
                                    />
                                </Grid>
                            )}

                            {streetList.length > 0 && (
                                <Grid item xs={12}>
                                    <Typography
                                        variant="subtitle1"
                                        color="text.primary"
                                    >
                                        Select Street from the list or enter it
                                        in a field.
                                    </Typography>
                                    <ComboBox
                                        options={streetList}
                                        onChange={setStreet}
                                        label={"Street"}
                                    />
                                </Grid>
                            )}

                            {street === undefined && (
                                <Grid item xs={12}>
                                    <InputGroup
                                        label="Street"
                                        field="streetName"
                                        type="text"
                                        validator={StreetNameValidator}
                                        onChange={(isValid) =>
                                            (formValid.current.street = isValid)
                                        }
                                    />
                                </Grid>
                            )}

                            <Grid item xs={12}>
                                <InputGroup
                                    label="Bulding number"
                                    field="buildingNumber"
                                    type="text"
                                    validator={BuildingNumberValidator}
                                    onChange={(isValid) =>
                                        (formValid.current.buildingNumber =
                                            isValid)
                                    }
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <InputGroup
                                    label="Number of Rooms"
                                    field="numberOfRooms"
                                    type="number"
                                    validator={NumberOfRoomsValidator}
                                    onChange={(isValid) =>
                                        (formValid.current.numberOfRooms =
                                            isValid)
                                    }
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <InputGroup
                                    label="Area"
                                    field="area"
                                    type="number"
                                    validator={AreaValidator}
                                    onChange={(isValid) =>
                                        (formValid.current.area = isValid)
                                    }
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <InputGroup
                                    label="Price"
                                    field="price"
                                    type="number"
                                    validator={PriceValidator}
                                    onChange={(isValid) =>
                                        (formValid.current.price = isValid)
                                    }
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <InputGroup
                                    label="Description"
                                    field="description"
                                    type="text"
                                    validator={DescriptionValidator}
                                    onChange={(isValid) =>
                                        (formValid.current.description =
                                            isValid)
                                    }
                                    rowsCount={7}
                                    isMultiline={true}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <FileUploader
                                    images={images}
                                    setImages={setImages}
                                    maxImagesUpload={10}
                                    validator={AvatarValidator}
                                    onChange={(isValid) =>
                                        (formValid.current.images = isValid)
                                    }
                                    onDelete={handleChange}
                                    defaultImages={[IMG]}
                                ></FileUploader>
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            // disabled={!isFormValid}
                        >
                            Add new post
                        </Button>
                    </Box>
                </Box>
            </Container>
        </>
    );
}
