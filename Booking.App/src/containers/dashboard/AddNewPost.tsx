import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Breadcrumbs, Grid, LinearProgress } from "@mui/material";
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
} from "../../store/post/post.actions.ts";
import ErrorHandler from "../../components/common/ErrorHandler.ts";
import OutlinedErrorAlert from "../../components/common/ErrorAlert.tsx";
import {
    ICategory,
    ICity,
    ICountry,
    IImage,
    IListForCombobox,
    IPostCreate,
} from "../../interfaces/post";
import InputGroup from "../../components/common/InputGroup.tsx";
import {
    addPostResolver,
    CityNameValidator,
    ImagesValidator,
    PostNameValidator,
    PriceValidator,
    StreetNameValidator,
    ZipCodeValidator,
} from "../../validations/post";
import { ImageValidator } from "../../validations/post";
import Button from "@mui/material/Button";
import * as React from "react";
import { joinForPostListening } from "../../SignalR";
import DefaultImg from "../../assets/images.png";
import { maxImagesCount } from "../../constants/index.ts";
import FileUploader from "../../components/common/FileUploader.tsx";
import InputField from "../../components/common/InputField.tsx";
import { useForm } from "react-hook-form";
import "../../css/DashBoardRealtorClasses/index.scss";
import { parseNumber } from "libphonenumber-js";
import ImageUploader from "../../components/realtorDashboard/ImageUploader.tsx";
import "../../css/DashBoardAnonymousClasses/index.scss";
import ListImageUploader from "../../components/realtorDashboard/ListImagesUploader.tsx";

export function AddNewPost() {
    const dispatch = useAppDispatch();
    const [errorMessage, setErrorMessage] = useState<string | undefined>(
        undefined
    );
    const [categoryList, setCategoryList] = useState<ICategory[]>([]);
    const [category, setCategory] = useState<ICategory | null>(null);
    const [isCategoryValid, setIsCategoryValid] = useState<boolean>(true);

    const [countryList, setCountryList] = useState<ICountry[]>([]);
    const [country, setCountry] = useState<ICountry | null>(null);
    const [isCountryValid, setIsCountryValid] = useState<boolean>(true);

    const [cityList, setCityList] = useState<ICity[]>([]);
    const [city, setCity] = useState<ICity | null>(null);
    const [isCityValid, setIsCityValid] = useState<boolean>(true);
    const [isCityExist, setIsCityExist] = useState<boolean>(false);

    const [streetList, setStreetList] = useState<ICity[]>([]);
    const [street, setStreet] = useState<ICity | null>(null);
    const [isStreetValid, setIsStreetValid] = useState<boolean>(true);
    const [isStreetExist, setIsStreetExist] = useState<boolean>(false);

    const [mainImage, setMainImage] = useState<File>();
    const [imageList, setImageList] = useState<IImage[]>([]);

    const [images, setImages] = useState<File[]>([]);
    const navigate = useNavigate();
    const [upload, setUpload] = useState<boolean>(false);
    const [isHotel, setIsHotel] = useState<boolean>(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm<IPostCreate>({ resolver: addPostResolver });

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
        getCategoryList().then((history) => {
            setCategoryList(history?.payload.$values);
        });

        getCountryList().then((history) => {
            setCountryList(history?.payload.$values);
        });
    }, []);

    useEffect(() => {
        if (category) {
            if (category.name.toLowerCase() === "hotel") {
                setIsHotel(true);
            } else {
                setIsHotel(false);
            }
        }
    }, [category]);

    useEffect(() => {
        if (country) {
            getCityList(country.id).then((history) => {
                if (history?.payload.$values != null) {
                    setCityList(history?.payload.$values);
                }
            });
        } else {
            setCityList([]);
            setStreetList([]);
            setCity(null);
            setStreet(null);
        }
    }, [country]);

    useEffect(() => {
        if (city) {
            getStreetList(city.id).then((history) => {
                if (history?.payload.$values != null) {
                    setStreetList(history?.payload.$values);
                }
            });
        } else {
            setStreetList([]);
            setStreet(null);
        }
    }, [city]);

    const onSubmit = async (data: IPostCreate) => {
        console.log("data", data);

        if (!category) {
            setIsCategoryValid(false);
            return;
        }
        if (!country) {
            setIsCountryValid(false);
            return;
        }
        if (!city && !isCityExist) {
            setIsCityValid(false);
            return;
        }
        if (!street && !isStreetExist) {
            setIsStreetValid(false);
            return;
        }

        if (imageList.length === 0) {
            setErrorMessage(ErrorHandler("Choose at least main image"));
            return;
        }  

        if (
            isCategoryValid &&
            isCountryValid &&
            (isCityValid || isCityExist) &&
            (isStreetValid || isStreetExist)
        ) {
            const model: IPostCreate = {
                ...data,
                categoryId: category?.id!,
                countryId: category?.id!,
                cityId: city === undefined || city === null ? null : city?.id!,
                cityName:
                    city === undefined || city === null ? data.cityName : null!,
                streetId:
                    street === undefined || street === null
                        ? null
                        : street?.id!,
                streetName:
                    street === undefined || street === null
                        ? data.streetName
                        : null,
                images: imageList,
            };
            console.log("model", model);
        } else {
            console.log("HELLO");
        }

        // try {
        //     const response = await dispatch(login(data));
        //     unwrapResult(response);
        //     await afterLogin(response.payload);
        // } catch (error) {
        //     setErrorMessage(ErrorHandler(error));
        // }
    };

    // console.log("TestValid", formValid.current);

    // const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    //     event.preventDefault();

    //     setUpload(true);

    //     const data = new FormData(event.currentTarget);

    //     const model: IPostCreate = {
    //         name: data.get("name") as string,
    //         categoryId: category!.id,
    //         countryId: country!.id,
    //         cityId: city === undefined ? null : city.id,
    //         cityName: data.get("cityName") as string,
    //         streetId: street === undefined ? null : street.id,
    //         streetName: data.get("streetName") as string,

    //         price: parseFloat(data.get("price") as string),
    //         description: data.get("description") as string,
    //         images: images,
    //     };

    //     try {
    //         const response = await dispatch(createPost(model));
    //         unwrapResult(response);

    //         await joinForPostListening(response.payload.id);

    //         navigate("/dashboard/show-all-post");
    //     } catch (error) {
    //         setErrorMessage(ErrorHandler(error));

    //         console.log("Add error", error);
    //     }
    // };
    return (
        <div className="twoColumnsContainer">
            <div className="textInputsContainer">
                <div className="title">Add New Post</div>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="formContainer"
                >
                    {/* Title */}
                    <div className="fieldContainer">
                        <div className="filedTitle">Title </div>
                        <InputField
                            placeholder="Title*"
                            type="text"
                            name="name"
                            register={register}
                            setValue={setValue}
                            className={errors.name ? "errorFormInput" : "field"}
                        />
                        {errors.name && (
                            <div className="dashboardError">
                                * {errors.name.message}
                            </div>
                        )}
                    </div>
                    {/* Category */}
                    <div className="fieldContainer">
                        <ComboBox
                            options={categoryList}
                            onChange={setCategory}
                            label={"Category*"}
                            isValid={setIsCategoryValid}
                        />
                        {!isCategoryValid && (
                            <div className="dashboardError">
                                *This field is required
                            </div>
                        )}
                    </div>

                    {/* Country */}
                    <div className="fieldContainer">
                        <ComboBox
                            options={countryList}
                            onChange={setCountry}
                            label={"Country*"}
                            isValid={setIsCountryValid}
                        />
                        {!isCountryValid && (
                            <div className="dashboardError">
                                *This field is required
                            </div>
                        )}
                    </div>

                    {/* City */}
                    {cityList.length > 0 && (
                        <div className="fieldContainer">
                            <div className="instructionText">
                                Select City from the list or enter it in a
                                field.*
                            </div>
                            <ComboBox
                                options={cityList}
                                onChange={setCity}
                                label={"City"}
                                isValid={setIsCityValid}
                            />
                            {!isCityValid && (
                                <div className="dashboardError">
                                    *This field is required
                                </div>
                            )}
                        </div>
                    )}

                    {!city && (
                        <div className="fieldContainer">
                            <div className="filedTitle">City </div>

                            <InputField
                                placeholder="City*"
                                type="text"
                                name="cityName"
                                register={register}
                                setValue={setValue}
                                className={
                                    errors.name ? "errorFormInput" : "field"
                                }
                                isExist={setIsCityExist}
                            />
                            {errors.cityName && (
                                <div className="dashboardError">
                                    * {errors.cityName.message}
                                </div>
                            )}
                        </div>
                    )}

                    {/* Street */}
                    {streetList.length > 0 && (
                        <div className="fieldContainer">
                            <div className="instructionText">
                                Select Street from the list or enter it in a
                                field. *
                            </div>
                            <ComboBox
                                options={streetList}
                                onChange={setStreet}
                                label={"Street"}
                                isValid={setIsStreetValid}
                            />
                            {!isStreetValid && (
                                <div className="dashboardError">
                                    *This field is required
                                </div>
                            )}
                        </div>
                    )}

                    {!street && (
                        <div className="fieldContainer">
                            <div className="filedTitle">Street </div>

                            <InputField
                                placeholder="Street*"
                                type="text"
                                name="streetName"
                                register={register}
                                setValue={setValue}
                                className={
                                    errors.name ? "errorFormInput" : "field"
                                }
                                isExist={setIsStreetExist}
                            />
                            {errors.streetName && (
                                <div className="dashboardError">
                                    * {errors.streetName.message}
                                </div>
                            )}
                        </div>
                    )}

                    {/* zipCode */}
                    <div className="fieldContainer">
                        <div className="filedTitle">Zip Code </div>

                        <InputField
                            placeholder="Zip Code*"
                            type="number"
                            name="zipCode"
                            register={register}
                            setValue={setValue}
                            className={errors.name ? "errorFormInput" : "field"}
                        />
                        {errors.zipCode && (
                            <div className="dashboardError">
                                * {errors.zipCode.message}
                            </div>
                        )}
                    </div>

                    {/*  Number of Guests */}
                    {!isHotel && (
                        <div className="fieldContainer">
                            <div className="filedTitle">Number of Guests </div>

                            <InputField
                                placeholder="Number of Guests*"
                                type="number"
                                name="numberOfGuests"
                                register={register}
                                setValue={setValue}
                                defaultValue={1}
                                className={
                                    errors.name ? "errorFormInput" : "field"
                                }
                            />
                            {errors.numberOfGuests && (
                                <div className="dashboardError">
                                    * {errors.numberOfGuests.message}
                                </div>
                            )}
                        </div>
                    )}

                    {/* Price */}
                    <div className="fieldContainer">
                        <div className="filedTitle">Price </div>

                        <InputField
                            placeholder="Price*"
                            type="number"
                            name="price"
                            register={register}
                            setValue={setValue}
                            className={errors.name ? "errorFormInput" : "field"}
                        />
                        {errors.price && (
                            <div className="dashboardError">
                                * {errors.price.message}
                            </div>
                        )}
                    </div>

                    {/* Discount */}
                    <div className="fieldContainer">
                        <div className="filedTitle">Discount </div>

                        <InputField
                            placeholder="Discount"
                            type="number"
                            name="discount"
                            register={register}
                            setValue={setValue}
                            className={errors.name ? "errorFormInput" : "field"}
                        />
                        {errors.discount && (
                            <div className="dashboardError">
                                * {errors.discount.message}
                            </div>
                        )}
                    </div>

                    <button type="submit" className="button">
                        Submit
                    </button>
                </form>
            </div>
            <div className="addImagesContainer">
                {errorMessage && (
                    <OutlinedErrorAlert
                        message={errorMessage}
                        textColor="#000"
                    />
                )}

                <ImageUploader
                    image={mainImage}
                    setImage={setMainImage}
                    validator={ImageValidator}
                    setImageList={setImageList}
                />

            <ListImageUploader
                    images={images}
                    setImages={setImages}
                    validator={ImagesValidator}
                    setImageList={setImageList}
                />
            </div>
        </div>
    );
}

// <Container component="main" maxWidth="xs">
// <Box
//     sx={{
//         marginTop: 8,
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "center",
//     }}
// >
//     <Typography component="h1" variant="h5">
//         Add New Post
//     </Typography>
//     <Box
//         component="form"
//         onSubmit={handleSubmit}
//         noValidate
//         sx={{ mt: 1 }}
//     >
//         <Grid container spacing={2}>
//             <Grid item xs={12}>
//                 <InputGroup
//                     label="Enter title for your post *"
//                     field="name"
//                     type="text"
//                     validator={PostNameValidator}
//                     onChange={(isValid) =>
//                         (formValid.current.name = isValid)
//                     }
//                 />
//             </Grid>

//             <Grid item xs={12}>
//                 <ComboBox
//                     options={categoryList}
//                     onChange={setCategory}
//                     label={"Category *"}
//                 />
//             </Grid>

//             <Grid item xs={12}>
//                 <ComboBox
//                     options={countryList}
//                     onChange={setCountry}
//                     label={"Country *"}
//                 />
//             </Grid>

// {cityList.length > 0 && (
//     <Grid item xs={12}>
//         <Typography
//             variant="subtitle1"
//             color="text.primary"
//         >
//             Select City from the list or enter it in
//             a field. *
//         </Typography>
//         <ComboBox
//             options={cityList}
//             onChange={setCity}
//             label={"City*"}
//         />
//     </Grid>
// )}

//             {city === undefined && (
//                 <Grid item xs={12}>
//                     <InputGroup
//                         label="City"
//                         field="cityName"
//                         type="text"
//                         validator={CityNameValidator}
//                         onChange={(isValid) =>
//                             (formValid.current.city =
//                                 city === undefined
//                                     ? isValid
//                                     : true)
//                         }
//                     />
//                 </Grid>
//             )}

// {streetList.length > 0 && (
//     <Grid item xs={12}>
//         <Typography
//             variant="subtitle1"
//             color="text.primary"
//         >
//             Select Street from the list or enter it
//             in a field. *
//         </Typography>
//         <ComboBox
//             options={streetList}
//             onChange={setStreet}
//             label={"Street"}
//         />
//     </Grid>
// )}

// {street === undefined && (
//     <Grid item xs={12}>
//         <InputGroup
//             label="Street *"
//             field="streetName"
//             type="text"
//             validator={StreetNameValidator}
//             onChange={(isValid) =>
//                 (formValid.current.street =
//                     street === undefined
//                         ? isValid
//                         : true)
//             }
//         />
//     </Grid>
// )}

// <Grid item xs={12}>
//     <InputGroup
//         label="ZipCode *"
//         field="zipCode"
//         type="number"
//         validator={ZipCodeValidator}
//         onChange={(isValid) =>
//             (formValid.current.buildingNumber =
//                 isValid)
//         }
//     />
// </Grid>

// {!isHotel && (
//     <Grid item xs={12}>
//         <InputGroup
//             label="Number of Guests"
//             field="numberOfGuests"
//             type="number"
//             //ToDo Validation
//             validator={ZipCodeValidator}
//             onChange={(isValid) =>
//                 (formValid.current.numberOfRooms =
//                     isValid)
//             }
//         />
//     </Grid>
// )}

// <Grid item xs={12}>
//     <InputGroup
//         label="Price *"
//         field="price"
//         type="number"
//         validator={PriceValidator}
//         onChange={(isValid) =>
//             (formValid.current.price = isValid)
//         }
//     />
// </Grid>

// <Grid item xs={12}>
//     <InputGroup
//         label="Discount"
//         field="discount"
//         type="number"
//         validator={PriceValidator}
//         onChange={(isValid) =>
//             (formValid.current.price = isValid)
//         }
//     />
// </Grid>

// <Grid item xs={12}>
//     <InputGroup
//         label="Description"
//         field="description"
//         type="text"
//         validator={DescriptionValidator}
//         onChange={(isValid) =>
//             (formValid.current.description =
//                 isValid)
//         }
//         rowsCount={7}
//         isMultiline={true}
//     />
// </Grid>
//             <Grid item xs={12}>
//                 <Typography
//                     variant="subtitle1"
//                     color="text.primary"
//                 >
//                     You must select at least 1 photo *
//                 </Typography>
//                 <Typography
//                     variant="subtitle1"
//                     color="text.primary"
//                 >
//                     Max count of images - 10
//                 </Typography>
//             </Grid>

//             <Grid item xs={12}>
// <FileUploader
//     images={images}
//     setImages={setImages}
//     maxImagesUpload={maxImagesCount}
//     validator={ImageValidator}
//     defaultImage={DefaultImg}
//     onChange={(isValid) =>
//         (formValid.current.images = isValid)
//     }
//     onDelete={handleChange}
// />
//             </Grid>

//             {isHotel && (
//                 <>
//                     <Typography
//                         padding={2}
//                         variant="h5"
//                         color="text.primary"
//                     >
//                         <Divider />
//                         Add availible rooms
//                         <Divider />
//                     </Typography>

//                     <Grid item xs={12}>
//                         <InputGroup
//                             label="Number of Guests"
//                             field="numberOfGuests"
//                             type="number"
//                             validator={PriceValidator}
//                             onChange={(isValid) =>
//                                 (formValid.current.price =
//                                     isValid)
//                             }
//                         />
//                     </Grid>

//                     <Grid item xs={12}>
//                         <InputGroup
//                             label="Number of Rooms"
//                             field="numberOfrooms"
//                             type="number"
//                             validator={PriceValidator}
//                             onChange={(isValid) =>
//                                 (formValid.current.price =
//                                     isValid)
//                             }
//                         />
//                     </Grid>
//                     <Grid item xs={12}>
//                         <Typography
//                             variant="subtitle1"
//                             color="text.primary"
//                         >
//                             You must select at least 1 photo *
//                         </Typography>
//                         <Typography
//                             variant="subtitle1"
//                             color="text.primary"
//                         >
//                             Max count of images - 10
//                         </Typography>
//                     </Grid>

//                     <Grid item xs={12}>
//                         <FileUploader
//                             images={images}
//                             setImages={setImages}
//                             maxImagesUpload={maxImagesCount}
//                             validator={ImageValidator}
//                             defaultImage={DefaultImg}
//                             onChange={(isValid) =>
//                                 (formValid.current.images =
//                                     isValid)
//                             }
//                             onDelete={handleChange}
//                         />
//                         <Grid padding={3}>
//                             <Divider />
//                         </Grid>
//                     </Grid>

//                     <Grid item xs={12}>
//                         <InputGroup
//                             label="Number of Guests"
//                             field="numberOfGuests"
//                             type="number"
//                             validator={PriceValidator}
//                             onChange={(isValid) =>
//                                 (formValid.current.price =
//                                     isValid)
//                             }
//                         />
//                     </Grid>

//                     <Grid item xs={12}>
//                         <InputGroup
//                             label="Number of Rooms"
//                             field="numberOfrooms"
//                             type="number"
//                             validator={PriceValidator}
//                             onChange={(isValid) =>
//                                 (formValid.current.price =
//                                     isValid)
//                             }
//                         />
//                     </Grid>
//                     <Grid item xs={12}>
//                         <Typography
//                             variant="subtitle1"
//                             color="text.primary"
//                         >
//                             You must select at least 1 photo *
//                         </Typography>
//                         <Typography
//                             variant="subtitle1"
//                             color="text.primary"
//                         >
//                             Max count of images - 10
//                         </Typography>
//                     </Grid>

//                     <Grid item xs={12}>
//                         <FileUploader
//                             images={images}
//                             setImages={setImages}
//                             maxImagesUpload={maxImagesCount}
//                             validator={ImageValidator}
//                             defaultImage={DefaultImg}
//                             onChange={(isValid) =>
//                                 (formValid.current.images =
//                                     isValid)
//                             }
//                             onDelete={handleChange}
//                         />
//                         <Grid padding={3}>
//                             <Divider />
//                         </Grid>
//                     </Grid>
//                     <Button
//                         type="submit"
//                         fullWidth
//                         variant="contained"
//                         sx={{ mt: 3, mb: 2 }}
//                         //   disabled={!isFormValid}
//                     >
//                         Add rooms
//                     </Button>
//                     <Grid padding={3}>
//                         <Divider />
//                     </Grid>
//                 </>
//             )}
//         </Grid>
//         <Button
//             type="submit"
//             fullWidth
//             variant="contained"
//             sx={{ mt: 3, mb: 2 }}
//             //   disabled={!isFormValid}
//         >
//             Add new post
//         </Button>
//     </Box>
// </Box>

// {upload && <LinearProgress />}
// </Container>
