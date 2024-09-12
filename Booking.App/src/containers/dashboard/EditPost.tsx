import { useNavigate, useParams } from "react-router-dom";
import ComboBox from "../../components/common/ComboBox.tsx";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { unwrapResult } from "@reduxjs/toolkit";
import {
    createRoom,
    editPost,
    editRoom,
    getListOfCategories,
    getListOfCitiesByCountryId,
    getListOfCountries,
    getListOfServices,
    getListOfStreetsByCityId,
    getListOfTypesOfRest,
    getPostForEditById,
} from "../../store/post/post.actions.ts";
import ErrorHandler from "../../components/common/ErrorHandler.ts";
import OutlinedErrorAlert from "../../components/common/ErrorAlert.tsx";
import {
    ICategory,
    ICity,
    ICountry,
    IDeleteImage,
    IEditRoom,
    IPostEdit,
    IRoom,
    IRoomInfo,
    IService,
    ITypeOfRest,
} from "../../interfaces/post";
import {
    EditImagesValidator,
    EditImageValidator,
    editPostResolver,
} from "../../validations/post";
import { APP_ENV } from "../../env/index.ts";
import { useForm } from "react-hook-form";
import InputField from "../../components/common/InputField.tsx";
import CheckboxList from "../../components/realtorDashboard/CheckBoxList.tsx";
import Room from "../../components/realtorDashboard/Room.tsx";
import Plus from "../../assets/DashboardIcons/iconamoon_sign-plus-fill.svg";
import "../../css/DashBoardRealtorClasses/index.scss";
import EditImageUploader from "../../components/realtorDashboard/EditImageUploader.tsx";
import EditListImagesUploader from "../../components/realtorDashboard/EditListImagesUploader.tsx";
import EditRoom from "../../components/realtorDashboard/EditRoom.tsx";
import { changeDashboardMenuItem } from "../../store/settings/settings.slice.ts";

export function EditPost() {
    const { postId } = useParams();
    const { postForEdit } = useAppSelector((state) => state.post);
    const dispatch = useAppDispatch();
    const [errorMessage, setErrorMessage] = useState<string | undefined>(
        undefined
    );
    const [numberOfRooms, setNumberOfRooms] = useState<number>(0); //default value of numberOfRooms
    const navigate = useNavigate();
    const [isHotel, setIsHotel] = useState<boolean>(false);

    //Work with category
    const [categoryList, setCategoryList] = useState<ICategory[]>([]);
    const [category, setCategory] = useState<ICategory | null>(null); //Set also as default value
    const [isCategoryValid, setIsCategoryValid] = useState<boolean>(true);

    //Work with country
    const [countryList, setCountryList] = useState<ICountry[]>([]);
    const [country, setCountry] = useState<ICountry | null>(null); //Set also as default value
    const [isCountryValid, setIsCountryValid] = useState<boolean>(true);

    //Work with city
    const [cityList, setCityList] = useState<ICity[]>([]);
    const [city, setCity] = useState<ICity | null>(null); //Set also as default value
    const [isCityValid, setIsCityValid] = useState<boolean>(true);
    const [isCityExist, setIsCityExist] = useState<boolean>(false);

    //Work with street
    const [streetList, setStreetList] = useState<ICity[]>([]);
    const [street, setStreet] = useState<ICity | null>(null); //Set also as default value
    const [isStreetValid, setIsStreetValid] = useState<boolean>(true);
    const [isStreetExist, setIsStreetExist] = useState<boolean>(false);

    //Work with images
    const [mainImage, setMainImage] = useState<File>();
    const [images, setImages] = useState<File[]>([]);
    const [defaultImagesUrlList, setDefaultImagesUrlList] =
        useState<string[]>();
    const [defaultMainImageUrl, setDefaultMainImageUrl] = useState<string>();
    const [deleteImages, setDeleteImages] = useState<IDeleteImage[]>();

    //Work with types
    const [typeOfRestList, setTypeOfRestList] = useState<ITypeOfRest[]>([]);
    const [typeOfRest, setTypeOfRest] = useState<string[] | null>([]);
    const [defaultTypeOfRest, setDefaultTypeOfRest] = useState<string[] | null>(
        []
    );

    //Work with services
    const [servicesList, setServicesList] = useState<IService[]>([]);
    const [service, setService] = useState<string[] | null>([]);
    const [defaultService, setDefaultService] = useState<string[] | null>([]);

    //Work with rooms
    const [rooms, setRooms] = useState<IRoom[] | null>([]);
    const [editRooms, setEditRooms] = useState<IEditRoom[] | null>([]);
    const [defaultRooms, setDefaultRooms] = useState<IRoomInfo[] | null>([]);
    const [deletedRooms, setDeletedRooms] = useState<string[] | null>([]);

    useEffect(() => {
        console.log("defaultRooms", defaultRooms);
    }, [defaultRooms]);

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

    //Get and set default values
    useEffect(() => {
        //Get post info for default values
        getPost(postId as string).then((history) => {
            console.log(history?.payload);

            //Set data for category
            if (history?.payload.categoryId && history?.payload.categoryName) {
                setCategory({
                    id: history?.payload.categoryId,
                    name: history?.payload.categoryName,
                });

                //Set if it is hotel
                if (history?.payload.categoryName.toLowerCase() === "hotel") {
                    setIsHotel(true);
                }
            }

            //Get list of cities for country id by default country
            if (history?.payload.countryId) {
                getCityList(history?.payload.countryId).then((history) => {
                    if (history?.payload.$values != null) {
                        setCityList(history?.payload.$values);
                    }
                });

                //Set data for country
                if (history?.payload.countryName)
                    setCountry({
                        id: history?.payload.countryId,
                        name: history?.payload.countryName,
                    });
            }

            //Get list of streets for city id by default city
            if (history?.payload.cityId) {
                getStreetList(history?.payload.cityId).then((history) => {
                    if (history?.payload.$values != null) {
                        setStreetList(history?.payload.$values);
                    }
                });

                //Set data for city
                if (history?.payload.cityName)
                    setCity({
                        id: history?.payload.cityId,
                        name: history?.payload.cityName,
                    });
            }

            //Set data for street
            if (history?.payload.streetId && history?.payload.streetName) {
                setStreet({
                    id: history?.payload.streetId,
                    name: history?.payload.streetName,
                });
            }

            //Set list of default values for combobox
            if (history?.payload.typesOfRest.$values) {
                setTypeOfRest(history?.payload.typesOfRest.$values);
                setDefaultTypeOfRest(history?.payload.typesOfRest.$values);
            }

            if (history?.payload.services.$values) {
                setService(history?.payload.services.$values);
                setDefaultService(history?.payload.services.$values);
            }

            //Create Url for main image
            setDefaultMainImageUrl(
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

            setDefaultImagesUrlList(fullImageUrls);

            //Set default room list
            if (history?.payload.roomList) {
                setDefaultRooms(history.payload.roomList.$values);
            }
        });
    }, [postId]);

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
        } else {
            setStreetList([]);
            setStreet(null);
        }
    }, [city]);

    const onSubmit = async (data: IPostEdit) => {
        console.log("model", data);

        if (!category) {
            setIsCategoryValid(false);
            return;
        } //set error if category doesnt choosen

        if (!country) {
            setIsCountryValid(false);
            return;
        } //set error if country doesnt choosen

        if (!city && !isCityExist) {
            setIsCityValid(false);
            return;
        } //set error if city doesnt choosen and doesnt type in textinput

        if (!street && !isStreetExist) {
            setIsStreetValid(false);
            return;
        } //set error if street doesnt choosen and doesnt type in textinput

        if (
            isCategoryValid &&
            isCountryValid &&
            (isCityValid || isCityExist) &&
            (isStreetValid || isStreetExist)
        ) {
            const model: IPostEdit = {
                ...data,
                id: postId!,
                categoryId: category.id!,
                countryId: country.id!,
                cityId: city === undefined || city === null ? null : city.id!,
                cityName:
                    city === undefined || city === null ? data.cityName : null,
                streetId:
                    street === undefined || street === null ? null : street.id,
                streetName:
                    street === undefined || street === null
                        ? data.streetName
                        : null,
                mainImage: mainImage ?? mainImage!,
                images: images,
                postTypesOfRest: typeOfRest!.filter(
                    (id) => !defaultTypeOfRest!.includes(id)
                ),
                deletedPostTypesOfRest: defaultTypeOfRest!.filter(
                    (id) => !typeOfRest!.includes(id)
                ),
                services: service!.filter(
                    (item) => !defaultService!.includes(item)
                ),
                deletedServices: defaultService!.filter(
                    (item) => !service!.includes(item)
                ),
                deleteImages: deleteImages ?? deleteImages!,
                deleteRooms: deletedRooms!,
                price: data.price ?? 100,
            };

            try {
                const response = await dispatch(editPost(model));

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

                if (editRooms) {
                    for (const room of editRooms) {
                        try {
                            await dispatch(editRoom(room));
                        } catch (error) {
                            setErrorMessage(ErrorHandler(error));
                        }
                    }
                }

                dispatch(changeDashboardMenuItem("All Posts")); //set menu item
                navigate("/dashboard/show-all-post");
            } catch (error) {
                setErrorMessage(ErrorHandler(error));
            }
        }
    };

    return (
        postForEdit &&
        cityList &&
        streetList &&
        defaultImagesUrlList &&
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
                                                postForEdit?.numberOfGuests ?? 1
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
                                            defaultValue={
                                                postForEdit?.price ?? 100
                                            }
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
                            validator={EditImageValidator}
                            label={defaultMainImageUrl!.split("/").pop()!}
                            defaultImageUrl={defaultMainImageUrl!}
                            onImageDelete={setDeleteImages}
                        />

                        <EditListImagesUploader
                            images={images}
                            setImages={setImages}
                            validator={EditImagesValidator}
                            defaultImageUrls={defaultImagesUrlList}
                            setDefaultImagesUrl={setDefaultImagesUrlList}
                            onImageDelete={setDeleteImages}
                        />
                    </div>
                </div>

                {/* Rooms */}
                {isHotel && defaultRooms && (
                    <div className="roomsContainer">
                        <div className="title">Edit Rooms</div>
                        {defaultRooms.map((room, i) => (
                            <EditRoom
                                key={room.id}
                                rooms={editRooms}
                                setRooms={setEditRooms}
                                label={"room" + i}
                                formName={"form" + i}
                                defaultRoom={room}
                                setDefaultRoomList={setDefaultRooms}
                                defaultRoomList={defaultRooms}
                                setDeletedRooms={setDeletedRooms}
                                deletedRooms={deletedRooms}
                                roomId={room.id}
                            />
                        ))}
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
        )
    );
}
