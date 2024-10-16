import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { AppDispatch, RootState } from "../../../store";
import { getFeedbacksByPost, getPageOfSelectedFeedback, getPostById, sendFeedback } from "../../../store/post/post.actions";
import { useAppSelector } from "../../../hooks/redux";
import '../../../css/PostOfPageClasses/index.scss';
import { Loading } from "../../../components/common/Loading/Loading";
import { APP_ENV } from "../../../env";
import { PageOfImages } from "../../../components/common/PageOfImages/PageOfImages";
import heart from '../../../assets/Icons/heart.svg';
import light_shair from '../../../assets/Icons/material-symbols-light_share-outline.svg';
import marker from '../../../assets/Icons/marker-02.svg';
import { Rating } from "../../../components/common/Rating/Rating";
import { Feedback } from "../../../components/common/Feedback/Feedback";
import { IGetFeedbacksRequest, ISendFeedback } from "../../../interfaces/post";
import { Pagination } from "../../../components/common/Pagination/Pagination";
import { FeedbackTextArea } from "../../../components/common/FeedbackTextArea/FeedbackTextArea";
import { savePath, savePostIdForChat } from "../../../store/settings/settings.slice";
import { RoomCard } from "../../../components/common/RoomCard/RoomCard";
import { clearPost, setIdOfSelectedFeedback } from "../../../store/post/post.slice";
import { cutNumber } from "../../../utils/data";
import { unwrapResult } from "@reduxjs/toolkit";
import ErrorHandler from "../../../components/common/ErrorHandler";
import OutlinedErrorAlert from "../../../components/common/ErrorAlert";
import { joinNewPostChatByUser } from "../../../SignalR";


const PageOfPost = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch<AppDispatch>();

    const post = useAppSelector((state: RootState) => state.post.post);
    const feedbacks = useAppSelector((state: RootState) => state.post.feedbacks);
    const isLogin = useAppSelector((state: RootState) => state.account.isLogin);
    const selectedFeedback = useAppSelector((state: RootState) => state.post.idOfSelectedFeedback);
    const pageOfSelectedFeedback = useAppSelector((state: RootState) => state.post.pageOfSelectedFeedback);
    const loaderIsLoading = useAppSelector((state: RootState) => state.settings.loaderIsLoading);
    const role = useAppSelector((state: RootState) => state.account.user?.role);

    const { postId } = useParams<string>();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isOpenPageOfImages, setIsOpenPageOfImages] = useState<boolean>(false);
    const [isFeedbacksLoading, setIsFeedbacksLoading] = useState<boolean>(true);
    const [pageOfFeedbacks, setPageOfFeedbacks] = useState<number>(1);
    const [selectedRating, setSelectedRating] = useState<number | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [postImages, setPostImages] = useState<string[]>([]);
    const [rating, setRating] = useState<number>(0);
    const [totalCountOfFeedbacks, setTotalCountOfFeedbacks] = useState<number>(0);


    const getPost = async (id: string) => {
        try {
            var result = await dispatch(getPostById(id));
            unwrapResult(result);
        } catch (error) {
            setErrorMessage(ErrorHandler(error))
        }

    }
    const getFeedbacks = async () => {
        const response: IGetFeedbacksRequest = {
            id: postId!,
            page: pageOfFeedbacks,
            sizeOfPage: 2
        }

        try {
            var result = await dispatch(getFeedbacksByPost(response));
            unwrapResult(result);
        } catch (error) {
            setErrorMessage(ErrorHandler(error))
        }
    }
    const getFeedbackByPage = async () => {

        try {
            var result = await dispatch(getPageOfSelectedFeedback({
                feedbackId: selectedFeedback!,
                postId: postId!
            }));
            unwrapResult(result);
        } catch (error) {
            setErrorMessage(ErrorHandler(error))
        }
    }
    useEffect(() => {
        if (postImages.length > 0) setPostImages([]);

        getPost(postId!);
        if (selectedFeedback) {
            getFeedbackByPage();
            dispatch(setIdOfSelectedFeedback(null));
        }
        else {
            getFeedbacks();
        }
    }, [postId])
    useEffect(() => {
        setPageOfFeedbacks(pageOfSelectedFeedback);

    }, [pageOfSelectedFeedback])
    useEffect(() => {
        if (post)
            setRating(post?.rate ? post?.rate : 0)
    }, [post])

    useEffect(() => {
        if (post && post.id.toString() == postId!) {
            setIsLoading(false);
            setPostImages(post!.imagePostList!.$values!);
            if (post.categoryName == "Hotel") {
                post.roomList?.$values!.forEach((item) => {
                    setPostImages(prevImages => [...prevImages, item.mainImage]);
                });
            }
        }
    }, [post])
    useEffect(() => {
        if (feedbacks != null) {
            setTotalCountOfFeedbacks(feedbacks.totalCount != null ? feedbacks.totalCount : 0);
            setIsFeedbacksLoading(false);
        }
    }, [feedbacks])
    useEffect(() => {
        getFeedbacks();
        setIsFeedbacksLoading(true);
    }, [pageOfFeedbacks])
    useEffect(() => {
        if (error) {
            setError(null);
        }
    }, [selectedRating])

    const sendFeedbackAsync = async (text: string) => {
        if (selectedRating == null) setError("Choose a rating from 1 to 5!")
        else {
            setRating((rating + selectedRating) / 2);
            try {
                const payload: ISendFeedback = {
                    text: text,
                    rating: selectedRating!,
                    postId: postId!
                }
                console.log(payload);
                const response = await dispatch(sendFeedback(payload));
                unwrapResult(response);

                setIsFeedbacksLoading(true);
                if (totalCountOfFeedbacks > 2 && totalCountOfFeedbacks % 2 == 0) {
                    setTotalCountOfFeedbacks(totalCountOfFeedbacks + 1);
                }
                getFeedbacks();
            } catch (error) {
                setErrorMessage(ErrorHandler(error));
            }
        }



    }
    useEffect(() => {
        if (postId != null) {
            getPost(postId!);
        }
    }, [postId])
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])
    useEffect(() => {
        return (() => {
            dispatch(clearPost())
        })
    }, [])

    return (
        <>
            <div id="post-page-container">
                {isOpenPageOfImages ?
                    <PageOfImages setIsOpen={setIsOpenPageOfImages} images={postImages} />
                    :
                    ""
                }
                {post == null || isLoading || loaderIsLoading == true ?
                    <div className="post-page-loading"><Loading /></div>
                    :
                    <>
                        <div className="navigation">
                            <a tabIndex={0}
                                onClick={() => navigate("/")}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        navigate("/");
                                    }
                                }}
                            >Home Page / </a>
                            <a tabIndex={0}
                                onClick={() => navigate("/posts/")}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        navigate("/posts/");
                                    }
                                }}
                            >View Accommodation / </a>
                            <p>{post?.name}</p>
                        </div>
                        {errorMessage && <OutlinedErrorAlert message={errorMessage} />}
                        <div className="post-page-container-image-list">
                            {postImages.length < 7 ? (
                                postImages.map((item, index) => (
                                    <div key={index}>
                                        <img src={`${APP_ENV.BASE_URL}/images/posts/${item}`} alt={item} />
                                    </div>
                                ))
                            ) : (
                                postImages.slice(0, 7).map((item, index) => (
                                    index === 6 ? (
                                        <div
                                            tabIndex={0}
                                            className="morePhoto"
                                            onClick={() => setIsOpenPageOfImages(!isOpenPageOfImages)}
                                            key={index}
                                            onKeyDown={(e) => {
                                                if (e.key === 'Enter') {
                                                    setIsOpenPageOfImages(!isOpenPageOfImages)
                                                }
                                            }}
                                        >
                                            <img src={`${APP_ENV.BASE_URL}/images/posts/${item}`} alt={item} />
                                            <div>
                                                + {postImages.length - 6} photo
                                            </div>
                                        </div>
                                    ) : (
                                        <div key={index}>
                                            <img src={`${APP_ENV.BASE_URL}/images/posts/${item}`} alt={item} />
                                        </div>
                                    )
                                ))
                            )}
                        </div>
                        <div className="post-page-conatainer-central">
                            <div className="booking-and-feedbacks">
                                <div className="booking">
                                    <div className="booking-post-name">{post?.name}</div>
                                    <div className="booking-icons">
                                        <img src={heart} alt="Heart" />
                                        <img src={light_shair} alt="Light Shair" />
                                    </div>
                                    <div className="booking-rating">
                                        <Rating
                                            rating={rating}
                                            isSelecting={false}
                                            selectedRating={null}
                                        />

                                    </div>
                                    {post?.categoryName != "Hotel" && isLogin == true && role === "user" ? <button
                                        tabIndex={0}
                                        onClick={async () => {
                                            await joinNewPostChatByUser(postId!)
                                                .then((id) => {
                                                    dispatch(savePostIdForChat(id));
                                                    navigate("/dashboard/profile/page-of-messages");
                                                });
                                        }}
                                    >Booking</button> : <div></div>}
                                    <div className="booking-location">
                                        <img src={marker} alt="Marker" />
                                        <p>{post?.streetName}, {post?.cityName}, {post?.countryName}</p>
                                    </div>
                                </div>
                                <div className="feedbacks">
                                    <div className="feedbacks-count">
                                        <p>Guest's feedbacks</p>
                                        <p>{feedbacks?.totalCount} feedbacks</p>
                                    </div>
                                    <div className="feedbacks-list">
                                        {isFeedbacksLoading == true ? <Loading /> :
                                            feedbacks?.items.$values.map((item, index) => (
                                                <Feedback
                                                    key={index}
                                                    userName={item.client}
                                                    rating={item.rating}
                                                    message={item.text}
                                                    date={new Date(item.feedbackAt)}
                                                    avatar={item.clientAvatar}
                                                ></Feedback>
                                            ))}
                                        {isLogin == true && (feedbacks?.totalCount == null || feedbacks?.totalCount == 0) ? <div className="leave-a-feedback">Leave a feedback</div> : ""}
                                        {totalCountOfFeedbacks > 2 ? (
                                            <Pagination
                                                page={pageOfFeedbacks}
                                                sizeOfPage={feedbacks!.sizeOfPage}
                                                countOfPosts={totalCountOfFeedbacks}
                                                changePage={setPageOfFeedbacks}
                                            />) : ""}
                                    </div>
                                    <div className="send-feedback">
                                        {isLogin ?
                                            role === "user" ?
                                                <>
                                                    <p>
                                                        Rate from 1 to 5
                                                    </p>
                                                    <div className="send-feedback-rating">
                                                        <Rating
                                                            rating={0}
                                                            isSelecting={true}
                                                            selectedRating={setSelectedRating}
                                                        />
                                                        {error ? <div id="error-message">
                                                            {error}
                                                        </div> : ""}
                                                    </div>
                                                    <div className="send-feedback-text-area">
                                                        <FeedbackTextArea
                                                            maxLength={300}
                                                            onClickSend={sendFeedbackAsync} />
                                                    </div>
                                                </>
                                                : <p>
                                                    You are realtor, and you can't send feedbacks
                                                </p>
                                            :
                                            <>
                                                <p>
                                                    To write a feedback, you must log in or register
                                                </p>
                                                <div className="buttons">
                                                    <button tabIndex={0} onClick={() => {
                                                        dispatch(savePath(location.pathname))
                                                        navigate("/authentication/login")

                                                    }}>
                                                        Login
                                                    </button>
                                                    <button tabIndex={0} onClick={() => navigate("/authentication/user-register")}>
                                                        Register
                                                    </button>
                                                </div>
                                            </>
                                        }

                                    </div>
                                </div>
                            </div>
                            <div className="more-information">
                                <div className="more-information-rating">
                                    <p>{cutNumber(post?.rate ? post.rate : 0)}/5 {post?.rate == 5 ? "Excelent" : (post?.rate! >= 3 && post?.rate! < 5) ? "Good" : "Bad"}</p>
                                    <p>Based on {post?.countOfFeedbacks} verified feedbacks</p>
                                </div>
                                <div className="more-information-services">
                                    <p>Services</p>
                                    {post && post.services ? post.services.$values.map((item, index) => (
                                        <div className="service-card" key={`service-${index}`}>
                                            <img src={`${APP_ENV.BASE_URL}/images/icons/${item.icon}`} alt="Icon" />
                                            <p>{item.name}</p>
                                        </div>
                                    )) : ""}

                                </div>
                                <div className="more-information-details">
                                    <p>Details</p>
                                    <div className="details">

                                        <p>Realtor : </p>
                                        <p
                                            id="hovered"
                                            onClick={() => navigate(`/posts/realtor/${post?.userId!}`)}>
                                            {post?.userName}
                                        </p>
                                        {post?.categoryName == "Hotel" ? ""
                                            :
                                            <>
                                                <p>Price : </p>
                                                <p>{post?.price} UAH</p>
                                                <p>Number of guests:</p>
                                                <p>{post?.numberOfGuests}</p>
                                                {post?.discount ?
                                                    <>
                                                        <p>Discount:</p>
                                                        <p>{post?.discount} %</p>
                                                    </>
                                                    :
                                                    ""}

                                            </>
                                        }
                                        <p>Category:</p>
                                        <p>{post?.categoryName}</p>
                                    </div>
                                    <div className="important">
                                        Please inform {post?.name} of your expected arrival time in advance. To do this, you can use the special requests box when booking. Bachelorette parties, hen parties and similar parties are not allowed in this property.
                                    </div>
                                </div>
                            </div>

                        </div>
                        {post?.categoryName == "Hotel" ?
                            <div className="post-page-room-list">
                                {post.roomList?.$values.map((item) => (
                                    <RoomCard
                                        key={item.id}
                                        id={item.id}
                                        postId={postId!}
                                        image={item.mainImage}
                                        discount={item.discount}
                                        price={item.price}
                                        numberOfGuests={item.numberOfGuests}
                                        numberOfRooms={item.numberOfRooms}
                                    />
                                ))}

                            </div>
                            : ""}

                    </>
                }

            </div>
        </>)
}

export default PageOfPost;
