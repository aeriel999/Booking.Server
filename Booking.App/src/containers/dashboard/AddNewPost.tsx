import { useNavigate } from "react-router-dom";
import ComboBox from "../../components/common/ComboBox.tsx";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../../hooks/redux";
import { unwrapResult } from "@reduxjs/toolkit";
import {
    createPost,
    createRoom,
    getListOfCategories,
    getListOfCitiesByCountryId,
    getListOfCountries,
    getListOfServices,
    getListOfStreetsByCityId,
    getListOfTypesOfRest,
} from "../../store/post/post.actions.ts";
import ErrorHandler from "../../components/common/ErrorHandler.ts";
import OutlinedErrorAlert from "../../components/common/ErrorAlert.tsx";
import {
    ICategory,
    ICity,
    ICountry,
    IPostCreate,
    IRoom,
    IService,
    ITypeOfRest,
} from "../../interfaces/post";
import { addPostResolver, ImagesValidator } from "../../validations/post";
import { ImageValidator } from "../../validations/post";
import InputField from "../../components/common/InputField.tsx";
import { useForm } from "react-hook-form";

import ImageUploader from "../../components/realtorDashboard/ImageUploader.tsx";
 
import ListImageUploader from "../../components/realtorDashboard/ListImagesUploader.tsx";
import CheckboxList from "../../components/realtorDashboard/CheckBoxList.tsx";
import { changeDashboardMenuItem } from "../../store/settings/settings.slice.ts";
import Room from "../../components/realtorDashboard/Room.tsx";
import Plus from "../../assets/DashboardIcons/iconamoon_sign-plus-fill.svg";

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
    const [images, setImages] = useState<File[]>([]);

    const [typeOfRestList, setTypeOfRestList] = useState<ITypeOfRest[]>([]);
    const [typeOfRest, setTypeOfRest] = useState<string[] | null>([]);

    const [servicesList, setServicesList] = useState<IService[]>([]);
    const [service, setService] = useState<string[] | null>([]);

    const [rooms, setRooms] = useState<IRoom[] | null>([]);
    const [numberOfRooms, setNumberOfRooms] = useState<number>(1);

    const navigate = useNavigate();
    const [isHotel, setIsHotel] = useState<boolean>(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm<IPostCreate>({ resolver: addPostResolver });

    //Methods for geting data for conboboxes and checkboxes
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

    //Get Data for comboboxes and checkboxes
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

    //Set Marker for changing form if it a hotel
    useEffect(() => {
        if (category) {
            if (category.name.toLowerCase() === "hotel") {
                setIsHotel(true);
            } else {
                setIsHotel(false);
            }
        }
    }, [category]);

    //Get list of cities for country id
    useEffect(() => {
        if (country) {
            console.log("country", country.id);

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

    //Get list of streets for city id
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
        if (!category) {
            setIsCategoryValid(false);
            return;
        }//set error if category doesnt choosen

        if (!country) {
            setIsCountryValid(false);
            return;
        }//set error if country doesnt choosen

        if (!city && !isCityExist) {
            setIsCityValid(false);
            return;
        }//set error if city doesnt choosen and doesnt type in textinput

        if (!street && !isStreetExist) {
            setIsStreetValid(false);
            return;
        }//set error if street doesnt choosen and doesnt type in textinput

        if (images.length < 6) {
            setErrorMessage(ErrorHandler("Choose at least main image"));
            return;
        }//set error if choosen less than 7 images

        if (
            isCategoryValid &&
            isCountryValid &&
            (isCityValid || isCityExist) &&
            (isStreetValid || isStreetExist)
        ) {
            const model: IPostCreate = {
                ...data,
                categoryId: category?.id!,
                countryId: country?.id!,
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
                mainImage: mainImage!,
                images: images,
                postTypesOfRest: typeOfRest,
                postServices: service,
            };

            try {
                setErrorMessage(undefined);

                const response = await dispatch(createPost(model));
                unwrapResult(response);

                //Create rooms if it existing
                if (rooms) {
                    for (const room of rooms) {
                        try {
                            const newRoom: IRoom = {
                                ...room,
                                postId: response.payload.id,
                            };

                            await dispatch(createRoom(newRoom));
                        } catch (error) {
                            setErrorMessage(ErrorHandler(error));
                        }
                    }
                }

                // await joinForPostListening(response.payload.id);
                dispatch(changeDashboardMenuItem("All Posts"));//set menu item
                navigate("/dashboard/show-all-post");
            } catch (error) {
                setErrorMessage(ErrorHandler(error));
            }
        }
    };
    return (
        <div className="mainContainerForForm">
            {errorMessage && (
                <OutlinedErrorAlert message={errorMessage} textColor="#000" />
            )}

            <div className="title">Add New Post</div>

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
                            {!category && (
                                <div className="filedTitle">Category </div>
                            )}
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
                            {!country && (
                                <div className="filedTitle">Country </div>
                            )}

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
                                {!city && (
                                    <div className="instructionText">
                                        Select City from the list or enter it in
                                        a field.*
                                    </div>
                                )}
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
                                {!street && (
                                    <div className="instructionText">
                                        Select Street from the list or enter it
                                        in a field. *
                                    </div>
                                )}
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
                                className={
                                    errors.zipCode ? "errorFormInput" : "field"
                                }
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
                                        defaultValue={1}
                                        className={
                                            errors.numberOfGuests
                                                ? "errorFormInput"
                                                : "field"
                                        }
                                    />
                                    {errors.numberOfGuests && (
                                        <div className="dashboardError">
                                            * {errors.numberOfGuests.message}
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
                                        defaultValue={100}
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
                                    <div className="filedTitle">Discount </div>

                                    <InputField
                                        placeholder="Discount"
                                        type="number"
                                        name="discount"
                                        register={register}
                                        setValue={setValue}
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
                    {/* Main Image */}
                    <ImageUploader
                        image={mainImage}
                        setImage={setMainImage}
                        validator={ImageValidator}
                        label="image-upload"
                    />

                {/* list of other images */}
                    <ListImageUploader
                        images={images}
                        setImages={setImages}
                        validator={ImagesValidator}
                    />
                </div>
            </div>

            {/* Rooms */}
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
                    <button
                        className="linkButton"
                        onClick={() => {
                            setNumberOfRooms(numberOfRooms + 1);
                        }}
                    >
                        <div className="text">Add Room</div>
                        <img className="icon" src={Plus}></img>
                    </button>
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
    );
}
