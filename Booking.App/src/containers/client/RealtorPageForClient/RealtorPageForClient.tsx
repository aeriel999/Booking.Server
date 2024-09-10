import "../../../css/RealtorPageForClientClasses/index.scss";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { useNavigate, useParams } from "react-router-dom";
import { APP_ENV } from "../../../env";
import OutlinedErrorAlert from "../../../components/common/ErrorAlert";
import Write from "../../../assets/DashboardIcons/Icon.svg";
import { Rating } from "../../../components/common/Rating/Rating";
import { getRealtorById } from "../../../store/users/user.action";
import HeaderImg from "../../../assets/Templates/Rectangle-50.webp";
import { Status } from "../../../utils/enum";
import { Loading } from "../../../components/common/Loading/Loading";
import { unwrapResult } from "@reduxjs/toolkit";
import ErrorHandler from "../../../components/common/ErrorHandler";

export const RealtorPageForClient = () => {
    const { realtorId } = useParams();
    const navigate = useNavigate();
    const realtor = useAppSelector((state) => state.user.realtor);
    const status = useAppSelector((state) => state.user.status);
    const isLogin = useAppSelector((state) => state.account.isLogin);
    const [avatarUrl, setAvatarUrl] = useState<string>();
    // const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [headerUrl, setHeaderUrl] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | undefined>(
        undefined
    );
    const getRealtor = async () => {
        try {
            var response = await dispatch(getRealtorById(realtorId!));
            unwrapResult(response);
        } catch (error) {
            setErrorMessage(ErrorHandler(error));
        }

    }
    useEffect(() => {
        getRealtor();

    }, []);
    useEffect(() => {
        if (realtor) {

            if (realtor?.avatar != null) {
                if (realtor?.avatar.slice(0, 5) == "https") {
                    setAvatarUrl(realtor?.avatar);
                }
                else {
                    setAvatarUrl(APP_ENV.BASE_URL + '/images/avatars/' + realtor?.avatar);
                }

            }
            if (realtor.headerImage !== null) {
                setHeaderUrl(APP_ENV.BASE_URL + '/images/avatars/' + realtor.headerImage);
            } else {
                setHeaderUrl(HeaderImg);
            }
        }
    }, [realtor]);




    return (

        <div className="profileOfRealtorContainer">
            <div className="profileOfRealtorContainer-content">
                {status == Status.LOADING ? <Loading /> : <>
                    {errorMessage && (
                        <div className="errorContainer">
                            <OutlinedErrorAlert
                                message={errorMessage}
                                textColor="#000"
                            />
                        </div>
                    )}

                    <div
                        className="header"
                        style={{
                            background: `url(${headerUrl}) center / cover no-repeat`,
                        }}
                    >

                    </div>

                    <div
                        className="avatar"
                        style={{
                            background: `url(${avatarUrl
                                }) center / cover no-repeat`,
                        }}
                    >

                    </div>
                    <div className="userInfoContainer">
                        <div id="name">{realtor?.name}</div>
                        <div id="rating">
                            <div id="text">Rate</div>
                            <Rating isSelecting={false} rating={realtor?.rating ? realtor.rating : 0} selectedRating={null} />
                        </div>
                        <div id="infoContainer">
                            <div id="info">
                                <div className="textContainer">
                                    <div className="name">Email: </div>
                                    <div className="value">{realtor?.email}</div>
                                </div>
                                <div className="textContainer">
                                    <div className="name">Phone: </div>
                                    <div className="value">{realtor?.phone}</div>
                                </div>
                            </div>
                            <div id="buttons">
                                {isLogin ? <button
                                    className="button colorButton"
                                    onClick={() => navigate("/dashboard/profile/edit")}
                                >
                                    <img src={Write} alt="Edit" />
                                    <p>Send message</p>
                                </button> : ""}


                            </div>
                        </div>
                    </div>
                </>}
            </div>



        </div>
    );
}