import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Breadcrumbs, CircularProgress, Grid } from "@mui/material";
import { Link, useNavigate, useParams } from "react-router-dom";
import Divider from "@mui/material/Divider";
import ComboBox from "../../components/common/ComboBox.tsx";
import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { unwrapResult } from "@reduxjs/toolkit";
import {
    editPost,
    getListOfCategories,
    getListOfCitiesByCountryId,
    getListOfCountries,
    getListOfStreetsByCityId,
    getPostById,
    getTypesOfRentList,
} from "../../store/post/post.actions.ts";
import ErrorHandler from "../../components/common/ErrorHandler.ts";
import OutlinedErrorAlert from "../../components/common/ErrorAlert.tsx";
import {
    ICategory,
    ICity,
    ICountry,
    IPostEdit,
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
import { APP_ENV } from "../../env/index.ts";
import IMG from "../../assets/avatar-profile-icon-vector-illustration_276184-165.jpg";

export function EditPost() {
    const { postId } = useParams();

    const { post } = useAppSelector((state) => state.post);
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
    const [postImages, setPostImages] = useState<string[]>();
    const [deleteImg, setDeleteImg] = useState<string[]>();

    //ToDo make hasCountOfRooms and hasArea
    //ToDo request.CityId == null && request.CityName != null

    const getPost = async (id: string) => {
        try {
            const response = await dispatch(getPostById(id));
            unwrapResult(response);
            return response;
        } catch (error) {
            setErrorMessage(ErrorHandler(error));
        }
    };

    useEffect(() => {
        getPost(postId as string).then((history) => {
            if (history?.payload.countryId) {
                getCityList(history?.payload.countryId).then((history) => {
                    if (history?.payload.$values != null) {
                        setCityList(history?.payload.$values);
                    }
                });
            }

            if (history?.payload.cityId) {
                getStreetList(history?.payload.cityId).then((history) => {
                    if (history?.payload.$values != null) {
                        setStreetList(history?.payload.$values);
                    }
                });
            }

            console.log(history?.payload.imagePostList);

            const fullImageUrls: string[] = history?.payload.imagePostList.map(
                (image: string) =>
                    `${APP_ENV.BASE_URL}${"/images/posts/"}${image}`
            );

            setPostImages(fullImageUrls);
        });
    }, [postId]);

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

        const model: IPostEdit = {
            id: postId as string,
            name: data.get("name") as string,
            postTypeOfRentId: typeOfRent?.id ?? null,
            categoryId: category?.id ?? null,
            countryId: country?.id ?? null,
            cityId: city?.id ?? null,
            cityName: data.get("cityName") as string,
            streetId: street?.id ?? null,
            streetName: data.get("streetName") as string,
            buildingNumber: data.get("buildingNumber") as string,
            numberOfRooms: numberOfRoomsResult,
            area: areaResult,
            price: parseFloat(data.get("price") as string),
            description: data.get("description") as string,
            images: images,
            deleteImages: deleteImg,
        };
        console.log("model", model);

        try {
            const response = await dispatch(editPost(model));
            unwrapResult(response);

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
                <Link to={"/dashboard/profile"}>
                    <Typography variant="h6" color="text.primary">
                        Profile
                    </Typography>
                </Link>
                <Typography variant="h6" color="text.primary">
                    Add New Post
                </Typography>
            </Breadcrumbs>
            <Divider />

            {errorMessage && <OutlinedErrorAlert message={errorMessage} />}

            {post && cityList && streetList && postImages ? (
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
                            Edit Post
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
                                        defaultValue={post?.name}
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <ComboBox
                                        options={typeOfRentList}
                                        onChange={setTypeOfRent}
                                        label={"Type Of Rent"}
                                        defaultValue={post!.postTypeOfRent}
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <ComboBox
                                        options={categoryList}
                                        onChange={setCategory}
                                        label={"Category"}
                                        defaultValue={post!.category}
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <ComboBox
                                        options={countryList}
                                        onChange={setCountry}
                                        label={"Country"}
                                        defaultValue={post!.countryName}
                                    />
                                </Grid>

                                {cityList.length > 0 && (
                                    <Grid item xs={12}>
                                        <Typography
                                            variant="subtitle1"
                                            color="text.primary"
                                        >
                                            Select City from the list or enter
                                            it in a field.
                                        </Typography>
                                        <ComboBox
                                            options={cityList}
                                            onChange={setCity}
                                            label={"City"}
                                            defaultValue={post!.cityName}
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
                                                (formValid.current.city =
                                                    isValid)
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
                                            Select Street from the list or enter
                                            it in a field.
                                        </Typography>
                                        <ComboBox
                                            options={streetList}
                                            onChange={setStreet}
                                            label={"Street"}
                                            defaultValue={post!.street}
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
                                                (formValid.current.street =
                                                    isValid)
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
                                        defaultValue={post!.buildingNumber}
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
                                        defaultValue={
                                            post!.area == null
                                                ? null
                                                : post!.area
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
                                        defaultValue={
                                            post!.area == null
                                                ? null
                                                : post!.area
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
                                        defaultValue={post?.price}
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
                                        defaultValue={
                                            post?.description == null
                                                ? null
                                                : post?.description
                                        }
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <FileUploader
                                        images={images}
                                        setImages={setImages}
                                        maxImagesUpload={10}
                                        validator={AvatarValidator}
                                        defaultImages={postImages ?? [IMG]}
                                        onChange={(isValid) =>
                                            (formValid.current.images = isValid)
                                        }
                                        onDelete={handleChange}
                                        setDeleteImages={setDeleteImg}
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
            ) : (
                <CircularProgress />
            )}
        </>
    );
}
