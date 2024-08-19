import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom"
import { AppDispatch, RootState } from "../../../store";
import { getPostById } from "../../../store/post/post.actions";
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


export const PostOfPage = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

    const post = useAppSelector((state: RootState) => state.post.post);

    const { postId } = useParams<string>();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isOpenPageOfImages, setIsOpenPageOfImages] = useState<boolean>(false);

    const getPost = async () => {
        await dispatch(getPostById(postId!));
    }
    useEffect(() => {
        getPost();
    }, [])

    useEffect(() => {
        if (post && post.id.toString() == postId!) {
            setIsLoading(false);
        }
    }, [post])

    return (
        <>
            <div id="post-page-container">
                {isOpenPageOfImages ?
                    <PageOfImages setIsOpen={setIsOpenPageOfImages} images={post?.imagePostList ? post?.imagePostList : []} />
                    :
                    ""
                }
                {isLoading == true ?
                    <Loading />
                    :
                    <>
                        <div className="navigation">
                            <a onClick={() => navigate("/")}>Home Page / </a>
                            <a onClick={() => navigate("/posts/")}>View Accommodation / </a>
                            <p>{post?.name}</p>
                        </div>
                        <div className="post-page-container-image-list">
                            {post?.imagePostList && post.imagePostList.values && post.imagePostList.values.length > 7 ? (
                                post?.imagePostList.map((item, index) => (
                                    <div key={index}>
                                        <img src={`${APP_ENV.BASE_URL}/images/posts/${item}`} alt={item} />
                                    </div>
                                ))
                            ) : (
                                post?.imagePostList.slice(0, 7).map((item, index) => (
                                    index === 6 ? (
                                        <div
                                            className="morePhoto"
                                            onClick={() => setIsOpenPageOfImages(!isOpenPageOfImages)}
                                            key={index}
                                        >
                                            <img src={`${APP_ENV.BASE_URL}/images/posts/${item}`} alt={item} />
                                            <div>
                                                + {post.imagePostList.length - 6} photo
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
                        <div className="post-page-conatainer-more-information">
                            <div className="booking-and-feedbacks">
                                <div className="booking">
                                    <div className="booking-post-name">{post?.name}</div>
                                    <div className="booking-icons">
                                        <img src={heart} alt="Heart" />
                                        <img src={light_shair} alt="Light Shair" />
                                    </div>
                                    <Rating rating={post?.rate ? post.rate : 0} />
                                    <button>Booking</button>
                                    <div className="booking-location">
                                        <img src={marker} alt="Marker" />
                                        <p>{post?.streetName}, {post?.cityName}, {post?.countryName}</p>
                                    </div>
                                </div>
                                <div className="feedbacks">
                                    <div className="feedbacks-count">
                                        <p>Guest's feedbacks</p>
                                        <p>167 feedbacks</p>
                                    </div>
                                    <Feedback
                                        userName="Ten3ee"
                                        rating={5}
                                        message="Дуже гарний чистий будинок у тихому красивому районі, ліжка були дуже хорошими, гарний душ і дуже гарно прикрашені різними дизайнерськими меблями Дуже гарний чистий будинок у тихому красивому районі, ліжка були дуже хорошими, гарний душ і дуже гарно прикрашені різними дизайнерськими меблями Дуже гар "

                                        date={new Date(Date.now())}
                                        avatar={null}
                                    ></Feedback>
                                    <Feedback
                                        userName="Maxum"
                                        rating={5}
                                        message="Дуже зручно, передача ключів і спілкування були дуже хорошими та простими"
                                        date={new Date(Date.now())}
                                        avatar={null}
                                    ></Feedback>
                                </div>
                            </div>
                        </div>
                    </>
                }

            </div>
        </>)
}