import { useForm } from "react-hook-form";
import { IRoom } from "../../interfaces/post";
import { addRoomResolver, ImageValidator } from "../../validations/post";
import "../../css/DashBoardAnonymousClasses/index.scss";
import InputField from "../common/InputField";
import { useState } from "react";
import OutlinedErrorAlert from "../common/ErrorAlert";
import ImageUploader from "./ImageUploader";

type RoomsProps = {
    rooms: IRoom[] | null;
    setRooms: (rooms: IRoom[]) => void;
    label: string;
};

export default function Room(props: RoomsProps) {
    const [errorMessage, setErrorMessage] = useState<string | undefined>(
        undefined
    );
    const [mainImage, setMainImage] = useState<File | null>();
    const [isSubmit, setIsSubmit] = useState<boolean>(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm<IRoom>({ resolver: addRoomResolver });

    const onSubmit = async (data: IRoom) => {
        if (!mainImage) {
            setErrorMessage("Upload images");

            return;
        }

        setErrorMessage(undefined);

        const model: IRoom = {
            ...data,
            mainImage: mainImage!,
        };

        props.setRooms([...(props.rooms || []), model]);

        setIsSubmit(true);
    };

    return (
        <div className="roomContainer">
            {errorMessage && (
                <OutlinedErrorAlert message={errorMessage} textColor="#000" />
            )}

            <div className="twoColumnsContainer">
                <div className="textInputsContainer">
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="formContainer"
                        id="addNewRoomForm"
                    >
                        <div className="fieldContainer">
                            <div className="filedTitle">Number of Guests </div>

                            <InputField
                                placeholder="Number of Guests*"
                                type="number"
                                name="numberOfGuests"
                                register={register}
                                setValue={setValue}
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
                        <div className="fieldContainer">
                            <div className="filedTitle">Number of Rooms </div>

                            <InputField
                                placeholder="Number of Rooms*"
                                type="number"
                                name="numberOfRooms"
                                register={register}
                                setValue={setValue}
                                className={
                                    errors.numberOfRooms
                                        ? "errorFormInput"
                                        : "field"
                                }
                            />
                            {errors.numberOfRooms && (
                                <div className="dashboardError">
                                    * {errors.numberOfRooms.message}
                                </div>
                            )}
                        </div>
                        <div className="fieldContainer">
                            <div className="filedTitle">Price </div>

                            <InputField
                                placeholder="Price*"
                                type="number"
                                name="price"
                                register={register}
                                setValue={setValue}
                                className={
                                    errors.price ? "errorFormInput" : "field"
                                }
                            />
                            {errors.price && (
                                <div className="dashboardError">
                                    * {errors.price.message}
                                </div>
                            )}
                        </div>
                        <div className="fieldContainer">
                            <div className="filedTitle">Discount </div>

                            <InputField
                                placeholder="Discount"
                                type="number"
                                name="discount"
                                register={register}
                                setValue={setValue}
                                className={
                                    errors.discount ? "errorFormInput" : "field"
                                }
                            />
                            {errors.discount && (
                                <div className="dashboardError">
                                    * {errors.discount.message}
                                </div>
                            )}
                        </div>
                    </form>
                </div>
                <div className="addImagesContainer">
                    <ImageUploader
                        image={mainImage}
                        setImage={setMainImage}
                        validator={ImageValidator}
                        label={props.label}
                    />
                </div>
            </div>
            <button
                type="submit"
                className="roomButton"
                form="addNewRoomForm"
                disabled={isSubmit}
            >
                Submit
            </button>
        </div>
    );
}
