import { useForm } from "react-hook-form";
import { IEditRoom } from "../../interfaces/post";
import { editRoomResolver, ImageValidator } from "../../validations/post";
import "../../css/DashBoardAnonymousClasses/index.scss";
import InputField from "../common/InputField";
import { useState } from "react";
import OutlinedErrorAlert from "../common/ErrorAlert";
import { EditRoomsProps } from "../../utils/types";
import EditImageUploader from "./EditImageUploader";
import { APP_ENV } from "../../env";

export default function EditRoom(props: EditRoomsProps) {
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
    } = useForm<IEditRoom>({ resolver: editRoomResolver });

    //Add new room in list
    const onSubmit = async (data: IEditRoom) => {
        console.log("data", data);
        setErrorMessage(undefined);

        const model: IEditRoom = {
            ...data,
            id: props.roomId,
            mainImage: mainImage ?? null,
        };

        props.setRooms([...(props.rooms || []), model]);

        setIsSubmit(true);
    };

    //deleted room from list of default rooms and set it in delRoom list
    const onDelete = () => {
        if (props.roomId && props.setDefaultRoomList && props.defaultRoomList) {
            // Filter out the room to be deleted
            const updatedRoomList = props.defaultRoomList.filter(
                (room) => room.id !== props.roomId
            );
            // Update the state with the new room list
            props.setDefaultRoomList(updatedRoomList);

            if (props.deletedRooms && props.setDeletedRooms) {
                // Update the state with the new deleted rooms list
                const updatedDeletedRooms = [
                    ...props.deletedRooms,
                    props.roomId,
                ];
                props.setDeletedRooms(updatedDeletedRooms);
            }
        }
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
                        id={props.formName}
                    >
                        <div className="fieldContainer">
                            <div className="filedTitle">Number of Guests </div>

                            <InputField
                                placeholder="Number of Guests*"
                                type="number"
                                name="numberOfGuests"
                                register={register}
                                setValue={setValue}
                                defaultValue={props.defaultRoom?.numberOfGuests}
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
                                defaultValue={props.defaultRoom?.numberOfRooms}
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
                                defaultValue={props.defaultRoom?.price}
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
                                defaultValue={props.defaultRoom?.discount ?? 0}
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
                    <EditImageUploader
                        image={mainImage}
                        setImage={setMainImage}
                        validator={ImageValidator}
                        label={props.label}
                        defaultImageUrl={`${
                            APP_ENV.BASE_URL
                        }${"/images/posts/"}${props.defaultRoom?.mainImage}`}
                    />
                </div>
            </div>
         <div className="editRoomButtonContainer">
         <button
                type="submit"
                className="roomButton"
                form={props.formName}
                disabled={isSubmit}
            >
                Save
            </button>
            <button
                    type="button"
                    className="roomButton"
                    onClick={onDelete} // Trigger onDelete
                >
                    Delete
                </button>
         </div>
        </div>
    );
}
