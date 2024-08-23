import { useParams } from "react-router-dom";
import ComboBox from "../../components/common/ComboBox.tsx";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { unwrapResult } from "@reduxjs/toolkit";
import {
    editPost,
    // editPost,
    getListOfCategories,
    getListOfCitiesByCountryId,
    getListOfCountries,
    getListOfServices,
    getListOfStreetsByCityId,
    getListOfTypesOfRest,
    getPostById,
    getPostForEditById,
} from "../../store/post/post.actions.ts";
import ErrorHandler from "../../components/common/ErrorHandler.ts";
import OutlinedErrorAlert from "../../components/common/ErrorAlert.tsx";
import {
    ICategory,
    ICity,
    ICountry,
    IDeleteImage,
    IPostEdit,
    IRoom,
    IService,
    ITypeOfRest,
} from "../../interfaces/post";
import {
    editPostResolver,
    ImagesValidator,
    ImageValidator,
} from "../../validations/post";
import { APP_ENV } from "../../env/index.ts";
import { useForm } from "react-hook-form";
import InputField from "../../components/common/InputField.tsx";
import CheckboxList from "../../components/realtorDashboard/CheckBoxList.tsx";
import ImageUploader from "../../components/realtorDashboard/ImageUploader.tsx";
import ListImageUploader from "../../components/realtorDashboard/ListImagesUploader.tsx";
import Room from "../../components/realtorDashboard/Room.tsx";
import Plus from "../../assets/DashboardIcons/iconamoon_sign-plus-fill.svg";
import "../../css/DashBoardRealtorClasses/index.scss";
import EditImageUploader from "../../components/realtorDashboard/EditImageUploader.tsx";
import EditListImagesUploader from "../../components/realtorDashboard/EditListImagesUploader.tsx";

export function EditPost() {
    const { postId } = useParams();
    const { postForEdit } = useAppSelector((state) => state.post);
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
    const [images, setImages] = useState<File[]>([]);
    const [postImagesUrl, setPostImagesUrl] = useState<string[]>();
    const [mainImageUrl, setMainImageUrl] = useState<string>();
    const [deleteImages, setDeleteImages] = useState<IDeleteImage[]>();

    const [typeOfRestList, setTypeOfRestList] = useState<ITypeOfRest[]>([]);
    const [typeOfRest, setTypeOfRest] = useState<string[] | null>([]);

    const [servicesList, setServicesList] = useState<IService[]>([]);
    const [service, setService] = useState<string[] | null>([]);

    const [rooms, setRooms] = useState<IRoom[] | null>([]);
    const [numberOfRooms, setNumberOfRooms] = useState<number>(1);

    //const navigate = useNavigate();
    const [isHotel, setIsHotel] = useState<boolean>(false);

    // const [categoryList, setCategoryList] = useState<ICategory[]>([]);
    // const [category, setCategory] = useState<ICategory>();
    // const [countryList, setCountryList] = useState<ICountry[]>([]);
    // const [country, setCountry] = useState<ICountry>();
    // const [cityList, setCityList] = useState<ICity[]>([]);
    // const [city, setCity] = useState<ICity>();
    // const [streetList, setStreetList] = useState<ICity[]>([]);
    // const [street, setStreet] = useState<ICity>();
    // const formValid = useRef({
    //     cityName: false,
    //     streetName: false,
    //     name: false,
    //     description: false,
    //     buildingNumber: false,
    //     numberOfRooms: false,
    //     city: false,
    //     street: false,
    //     area: false,
    //     price: false,
    //     images: false,
    // });
    // const [images, setImages] = useState<File[]>([]);
    // const [isFormValid, setIsFormValid] = useState(false);
    // const navigate = useNavigate();

    // const [deleteImg, setDeleteImg] = useState<string[]>();

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm<IPostEdit>({ resolver: editPostResolver });

    const getPost = async (id: string) => {
        try {
            const response = await dispatch(getPostForEditById(id));
            unwrapResult(response);
            return response;
        } catch (error) {
            setErrorMessage(ErrorHandler(error));
        }
    };

    //Methods for geting data for comboboxes and checkboxes
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

    const getTypeofRestList = async () => {
        try {
            const response = await dispatch(getListOfTypesOfRest());
            unwrapResult(response);
            return response;
        } catch (error) {
            setErrorMessage(ErrorHandler(error));
        }
    };

    const getServicesList = async () => {
        try {
            const response = await dispatch(getListOfServices());
            unwrapResult(response);
            return response;
        } catch (error) {
            setErrorMessage(ErrorHandler(error));
        }
    };

    //Set comboboxes and checkboxes
    useEffect(() => {
        getCategoryList().then((history) => {
            setCategoryList(history?.payload.$values);
        });

        getCountryList().then((history) => {
            setCountryList(history?.payload.$values);
        });

        getTypeofRestList().then((history) => {
            setTypeOfRestList(history?.payload.$values);
        });

        getServicesList().then((history) => {
            setServicesList(history?.payload.$values);
        });
    }, []);

    useEffect(() => {
        //Get post info for default values
        getPost(postId as string).then((history) => {
            console.log(history?.payload);

            //Get list of cities for country id by default country
            if (history?.payload.countryId) {
                getCityList(history?.payload.countryId).then((history) => {
                    if (history?.payload.$values != null) {
                        setCityList(history?.payload.$values);
                    }
                });
            }

            //Get list of streets for city id by default city
            if (history?.payload.cityId) {
                getStreetList(history?.payload.cityId).then((history) => {
                    if (history?.payload.$values != null) {
                        setStreetList(history?.payload.$values);
                    }
                });
            }

            //Set list of default values for combobox
            if (history?.payload.typesOfRest.$values) {
                setTypeOfRest(history?.payload.typesOfRest.$values);
            }

            if (history?.payload.services.$values) {
                setService(history?.payload.services.$values);
            }

            //Create Url for main image
            setMainImageUrl(
                `${APP_ENV.BASE_URL}${"/images/posts/"}${
                    history?.payload.imagePostList.$values[0]
                }`
            );

            //Create and set list of URLs for default images
            const fullImageUrls: string[] =
                history?.payload.imagePostList.$values
                    .slice(1)
                    .map(
                        (image: string) =>
                            `${APP_ENV.BASE_URL}${"/images/posts/"}${image}`
                    );

            setPostImagesUrl(fullImageUrls);
        });
    }, [postId]);

    //Get list of cities for country id after change country
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

    //Get list of streets for city id after change city
    useEffect(() => {
        if (city) {
            getStreetList(city.id).then((history) => {
                if (history?.payload.$values != null) {
                    setStreetList(history?.payload.$values);
                }
            });
        }else {
            setStreetList([]);
            setStreet(null);
        }
    }, [city]);

    // const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    //     event.preventDefault();

    //     const data = new FormData(event.currentTarget);

    //     // const numberOfRoomsResult =
    //     //     (data.get("numberOfRooms") as string) == ""
    //     //         ? null
    //     //         : parseInt(data.get("numberOfRooms") as string, 10);

    //     // const areaResult =
    //     //     (data.get("area") as string) == ""
    //     //         ? null
    //     //         : parseInt(data.get("area") as string, 10);

    //     // const model: IPostEdit = {
    //     //     id: postId as string,
    //     //     name: data.get("name") as string,
    //     //     categoryId: category?.id ?? null,
    //     //     countryId: country?.id ?? null,
    //     //     cityId: city?.id ?? null,
    //     //     cityName: data.get("cityName") as string,
    //     //     streetId: street?.id ?? null,
    //     //     streetName: data.get("streetName") as string,
    //     //     price: parseFloat(data.get("price") as string),

    //     //     images: images,
    //     //     deleteImages: deleteImg,
    //     // };
    //     // console.log("model", model);

    //     // try {
    //     //     const response = await dispatch(editPost(model));
    //     //     unwrapResult(response);

    //     //     navigate("/dashboard/show-all-post");
    //     // } catch (error) {
    //     //     setErrorMessage(ErrorHandler(error));
    //     // }
    // };

    const onSubmit = async (data: IPostEdit) => {

        console.log("data", data)
        console.log("deleteImages", deleteImages)
        console.log("images", images)
    };

    return (
        postForEdit &&
        cityList &&
        streetList &&
        postImagesUrl &&
        typeOfRest && (
            <div className="mainContainerForForm">
                {errorMessage && (
                    <OutlinedErrorAlert
                        message={errorMessage}
                        textColor="#000"
                    />
                )}

                <div className="title">Edit Post</div>

                <div className="twoColumnsContainer">
                    <div className="textInputsContainer">
                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            className="formContainer"
                            id="addNewPostForm"
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
                                    defaultValue={postForEdit?.name}
                                    className={
                                        errors.name ? "errorFormInput" : "field"
                                    }
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
                                    defaultValue={postForEdit!.categoryName}
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
                                    defaultValue={postForEdit!.countryName}
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
                                    {!city && (
                                        <div className="instructionText">
                                            Select City from the list or enter
                                            it in a field.*
                                        </div>
                                    )}
                                    <ComboBox
                                        options={cityList}
                                        onChange={setCity}
                                        label={"City"}
                                        isValid={setIsCityValid}
                                        defaultValue={postForEdit!.cityName}
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
                                            errors.name
                                                ? "errorFormInput"
                                                : "field"
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
                                    {!street && (
                                        <div className="instructionText">
                                            Select Street from the list or enter
                                            it in a field. *
                                        </div>
                                    )}
                                    <ComboBox
                                        options={streetList}
                                        onChange={setStreet}
                                        label={"Street"}
                                        isValid={setIsStreetValid}
                                        defaultValue={postForEdit!.streetName}
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
                                            errors.name
                                                ? "errorFormInput"
                                                : "field"
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
                                    className={
                                        errors.zipCode
                                            ? "errorFormInput"
                                            : "field"
                                    }
                                    defaultValue={postForEdit?.zipCode}
                                />
                                {errors.zipCode && (
                                    <div className="dashboardError">
                                        * {errors.zipCode.message}
                                    </div>
                                )}
                            </div>

                            {!isHotel && (
                                <>
                                    {/*  Number of Guests */}
                                    <div className="fieldContainer">
                                        <div className="filedTitle">
                                            Number of Guests{" "}
                                        </div>

                                        <InputField
                                            placeholder="Number of Guests*"
                                            type="number"
                                            name="numberOfGuests"
                                            register={register}
                                            setValue={setValue}
                                            defaultValue={
                                                postForEdit?.numberOfGuests!
                                            }
                                            className={
                                                errors.numberOfGuests
                                                    ? "errorFormInput"
                                                    : "field"
                                            }
                                        />
                                        {errors.numberOfGuests && (
                                            <div className="dashboardError">
                                                *{" "}
                                                {errors.numberOfGuests.message}
                                            </div>
                                        )}
                                    </div>
                                    {/* Price */}
                                    <div className="fieldContainer">
                                        <div className="filedTitle">Price </div>

                                        <InputField
                                            placeholder="Price*"
                                            type="number"
                                            name="price"
                                            register={register}
                                            setValue={setValue}
                                            defaultValue={postForEdit?.price}
                                            className={
                                                errors.price
                                                    ? "errorFormInput"
                                                    : "field"
                                            }
                                        />
                                        {errors.price && (
                                            <div className="dashboardError">
                                                * {errors.price.message}
                                            </div>
                                        )}
                                    </div>
                                    {/* Discount */}
                                    <div className="fieldContainer">
                                        <div className="filedTitle">
                                            Discount{" "}
                                        </div>

                                        <InputField
                                            placeholder="Discount"
                                            type="number"
                                            name="discount"
                                            register={register}
                                            setValue={setValue}
                                            defaultValue={
                                                postForEdit?.discount === null
                                                    ? 0
                                                    : postForEdit?.discount
                                            }
                                            className={
                                                errors.discount
                                                    ? "errorFormInput"
                                                    : "field"
                                            }
                                        />
                                        {errors.discount && (
                                            <div className="dashboardError">
                                                * {errors.discount.message}
                                            </div>
                                        )}
                                    </div>
                                </>
                            )}

                            {/* Types of Rest */}
                            <div className="checkBoxListContainer">
                                <div className="filedTitle">Types of Rest </div>
                                <CheckboxList
                                    options={typeOfRestList}
                                    selectedOptions={typeOfRest}
                                    onChange={setTypeOfRest}
                                />
                            </div>
                            {/* Services */}

                            <div className="checkBoxListContainer">
                                <div className="filedTitle">Services </div>
                                <CheckboxList
                                    options={servicesList}
                                    selectedOptions={service}
                                    onChange={setService}
                                />
                            </div>
                        </form>
                    </div>
                    <div className="addImagesContainer">
                        <EditImageUploader
                            image={mainImage}
                            setImage={setMainImage}
                            validator={ImageValidator}
                            label={postForEdit?.imagePostList[1]}
                            defaultImageUrl={mainImageUrl!}
                            onImageDelete={setDeleteImages}
                        />

                         <EditListImagesUploader
                            images={images}
                            setImages={setImages}
                            validator={ImagesValidator}
                            defaultImageUrls={postImagesUrl}
                            onImageDelete={setDeleteImages}

                        />  

                        {/* <ListImageUploader
                            images={images}
                            setImages={setImages}
                            validator={ImagesValidator}
                        /> */}
                    </div>
                </div>

                {isHotel && (
                    <div className="roomsContainer">
                        <div className="title">Add New Post</div>
                        {Array.from({
                            length: numberOfRooms,
                        }).map((_, i) => (
                            <Room
                                key={i}
                                rooms={rooms}
                                setRooms={setRooms}
                                label={"room" + i}
                                formName={"form" + i}
                            />
                        ))}
                        <div
                            className="linkButton"
                            onClick={() => {
                                setNumberOfRooms(numberOfRooms + 1);
                            }}
                        >
                            <div className="text">Add Room</div>
                            <img className="icon" src={Plus}></img>
                        </div>
                    </div>
                )}

                <button
                    type="submit"
                    className="postAddButton"
                    form="addNewPostForm"
                >
                    Submit
                </button>
            </div>
        )
    );
}

{
    /* <>
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
        Edit Post
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
                            options={categoryList}
                            onChange={setCategory}
                            label={"Category"}
                            defaultValue={post!.categoryName}
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
                                defaultValue={post!.streetName}
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

                    {/* <Grid item xs={12}>
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
                    </Grid> */
}

{
    /* <Grid item xs={12}>
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
                    </Grid> */
}

//                     <Grid item xs={12}>
//                         <InputGroup
//                             label="Price"
//                             field="price"
//                             type="number"
//                             validator={PriceValidator}
//                             onChange={(isValid) =>
//                                 (formValid.current.price = isValid)
//                             }
//                             defaultValue={post?.price}
//                         />
//                     </Grid>

//                     <Grid item xs={12}>
//                         <InputGroup
//                             label="Description"
//                             field="description"
//                             type="text"
//                             validator={DescriptionValidator}
//                             onChange={(isValid) =>
//                                 (formValid.current.description =
//                                     isValid)
//                             }
//                             rowsCount={7}
//                             isMultiline={true}
//                             defaultValue={
//                                 post?.description == null
//                                     ? null
//                                     : post?.description
//                             }
//                         />
//                     </Grid>

//                     {postImages.map((img, index) => (
//                         <Grid item xs={12} key={index}>
//                             <Typography
//                                 variant="subtitle1"
//                                 color="text.primary"
//                             >
//                                 {" "}
//                                 Image # {index + 1}
//                             </Typography>

//                             <FileEditUploader
//                                 images={images}
//                                 setImages={setImages}
//                                 maxImagesUpload={maxImagesCount}
//                                 validator={ImageValidator}
//                                 defaultImage={img}
//                                 onChange={(isValid) =>
//                                     (formValid.current.images =
//                                         isValid)
//                                 }
//                                 onDelete={handleChange}
//                                 setDeleteImages={setDeleteImg}
//                             />
//                         </Grid>
//                     ))}

//                     {Array.from({
//                         length: maxImagesCount - postImages.length,
//                     }).map((_, index) => (
//                         <Grid item xs={12} key={index}>
//                             <Typography
//                                 variant="subtitle1"
//                                 color="text.primary"
//                             >
//                                 {" "}
//                                 Image #{" "}
//                                 {postImages.length + index + 1}
//                             </Typography>

//                             <FileEditUploader
//                                 images={images}
//                                 setImages={setImages}
//                                 maxImagesUpload={maxImagesCount}
//                                 validator={ImageValidator}
//                                 defaultImage={DefaultImg}
//                                 onChange={(isValid) =>
//                                     (formValid.current.images =
//                                         isValid)
//                                 }
//                                 onDelete={handleChange}
//                                 setDeleteImages={setDeleteImg}
//                             />
//                         </Grid>
//                     ))}
//                 </Grid>
//                 <Button
//                     type="submit"
//                     fullWidth
//                     variant="contained"
//                     sx={{ mt: 3, mb: 2 }}
//                     // disabled={!isFormValid}
//                 >
//                     Edit post
//                 </Button>
//             </Box>
//         </Box>
//     </Container>
// ) : (
//     <LinearProgress />
// )}
// </> */}
