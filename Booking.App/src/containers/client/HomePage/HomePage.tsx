import { useEffect } from "react";
import "../../../css/HomePageClasses/index.scss";
import point from "../../../assets/Icons/ph_map-pin.svg";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { points } from "./pointsAnimation";
import earth from "../../../assets/Icons/earth.svg";
import { PostCardForHomePage } from "../../../components/common/PostCardForHomePage/PostCardForHomePage";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store";
import {
    getPostsWithMostDiscount,
    getPostsWithMostRating,
    getTypesOfRest,
} from "../../../store/post/post.actions";
import { APP_ENV } from "../../../env";
import { useLocation, useNavigate } from "react-router-dom";
import { Loading } from "../../../components/common/Loading/Loading";
import { savePath } from "../../../store/settings/settings.slice";

export const HomePage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const typesOfRest = useSelector(
        (state: RootState) => state.post.typesOfRest
    );
    const mostRating = useSelector(
        (state: RootState) => state.post.postMostRating
    );
    const mostDiscount = useSelector(
        (state: RootState) => state.post.postMostDiscount
    );
    const dispatch = useDispatch<AppDispatch>();

    const getAllTypesOfRest = async () => {
        await dispatch(getTypesOfRest());
    };
    const getPostsRating = async () => {
        await dispatch(getPostsWithMostRating());
    };
    const getPostsDiscount = async () => {
        await dispatch(getPostsWithMostDiscount());
    };

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
        points.map((item) => {
            gsap.to(`.point${item.number}`, {
                scrollTrigger: {
                    trigger: `.point${item.number}`,
                    start: "top 70%",
                    toggleActions: "play none none none",
                },
                top: item.coord,
                duration: item.number / 10,
            });
        });

        gsap.to(".eco-block", {
            scrollTrigger: {
                trigger: ".eco-block",
                start: "top 70%",
                toggleActions: "play none none none",
            },
            scale: 1,
            duration: 1,
        });

        getAllTypesOfRest();
        getPostsRating();
        getPostsDiscount();
    }, []);

    return (
        <>
            <main>
                <div className="popular-places">
                    <h2>Visit unique places!</h2>
                    <h5>The most popular tourist places</h5>

                    <div className="places">
                        {typesOfRest != null ? (
                            typesOfRest.map((item) => (
                                <div
                                    className="place-item"
                                    tabIndex={0}
                                    key={item.id}
                                    onClick={() =>
                                        navigate(`posts/post/${item.postId}`)
                                    }
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                            navigate(
                                                `posts/post/${item.postId}`
                                            );
                                        }
                                    }}
                                >
                                    <div
                                        className="place-image"
                                        style={{
                                            backgroundImage: `url(${APP_ENV.BASE_URL}/uploads/posts/${item.image})`,
                                            backgroundSize: "cover",
                                            backgroundPosition: "center",
                                        }}
                                    ></div>
                                    <div className="place-name">
                                        <p>{item.name}</p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <Loading />
                        )}
                    </div>
                </div>
                <div className="find-dwelling">
                    <div>
                        <p>Find a home for your new journey!</p>
                        <button tabIndex={0} onClick={() => navigate("/posts")}>
                            View properties
                        </button>
                    </div>
                    <div>
                        <img
                            src={earth}
                            alt="Earth"
                            style={{ height: "100%", width: "100%" }}
                        />
                        <img className="point1" src={point}></img>
                        <img className="point2" src={point}></img>
                        <img className="point3" src={point}></img>
                        <img className="point4" src={point}></img>
                        <img className="point5" src={point}></img>
                        <img className="point6" src={point}></img>
                        <img className="point7" src={point}></img>
                        <img className="point8" src={point}></img>
                        <img className="point9" src={point}></img>
                        <img className="point10" src={point}></img>
                    </div>
                </div>
                <div className="bestPosts">
                    <div className="text">
                        <p>Book our accommodation</p>
                        <p>
                            The most popular villas, castles and luxury hotels
                            around the world!
                        </p>
                    </div>
                    <div className="posts">
                        {mostRating != null ? (
                            mostRating.map((item) => (
                                <PostCardForHomePage
                                    id={item.id}
                                    key={item.id}
                                    post={item.name}
                                    rating={item.rating}
                                    city={item.city}
                                    country={item.country}
                                    image={item.image}
                                />
                            ))
                        ) : (
                            <Loading />
                        )}
                    </div>
                </div>
                <div className="eco">
                    <div className="eco-block">ECO</div>
                    <div className="eco-block">ECO</div>
                    <div className="eco-block">ECO</div>
                    <div className="eco-block">ECO</div>
                    <div className="eco-block">ECO</div>
                    <div className="eco-block">ECO</div>
                    <div className="eco-block">ECO</div>
                    <div className="eco-block">ECO</div>

                    <div className="text">
                        <p>Get discounts</p>
                        <p>
                            Log in to your TripBook account and look for the
                            green Eco logo to save!
                        </p>
                    </div>
                    <div className="buttons">
                        <button
                            tabIndex={0}
                            onClick={() => {
                                dispatch(savePath(location.pathname));
                                navigate("/authentication/login");
                            }}
                        >
                            Login
                        </button>
                        <button
                            tabIndex={0}
                            onClick={() => {
                                navigate("/authentication/user-register");
                            }}
                        >
                            Register
                        </button>
                    </div>
                </div>

                <div className="discounts">
                    <div className="text">
                        <p>Choose the best offer</p>
                        <p>Book accommodation at a reduced price</p>
                    </div>
                    <div className="posts">
                        {mostDiscount != null ? (
                            mostDiscount.map((item) => (
                                <PostCardForHomePage
                                    key={item.id}
                                    id={item.id}
                                    post={item.name}
                                    rating={item.rating}
                                    city={item.city}
                                    country={item.country}
                                    discount={item.discount}
                                    image={item.image}
                                />
                            ))
                        ) : (
                            <Loading />
                        )}
                    </div>
                </div>
                <div className="other-places">
                    <div className="text">Plan your trip now</div>
                    <div className="places">
                        <div>
                            <p>Lviv region</p>
                            <p>3 815 apartments</p>
                        </div>
                        <div>
                            <p>Antalya</p>
                            <p>4 324 apartments</p>
                        </div>
                        <div>
                            <p>Transcarpathia</p>
                            <p>1 219 apartments</p>
                        </div>
                        <div>
                            <p>Tenerife</p>
                            <p>9 621 apartments</p>
                        </div>
                        <div>
                            <p>Balaton</p>
                            <p>5 496 apartments</p>
                        </div>
                        <div>
                            <p>Transcarpathia</p>
                            <p>1 219 apartments</p>
                        </div>
                        <div>
                            <p>Santorini</p>
                            <p>1 768 apartments</p>
                        </div>
                        <div>
                            <p>Odesa region</p>
                            <p>6 190 apartments</p>
                        </div>
                        <div>
                            <p>Maldives</p>
                            <p>810 apartments</p>
                        </div>
                        <div>
                            <p>Halkidiki</p>
                            <p>4299 apartments</p>
                        </div>
                        <div>
                            <p>Arabat arrow</p>
                            <p>165 apartments</p>
                        </div>
                        <div>
                            <p>Maldives</p>
                            <p>810 apartments</p>
                        </div>
                        <div>
                            <p>Crete</p>
                            <p>10 025 apartments</p>
                        </div>
                        <div>
                            <p>Kemer</p>
                            <p>377 apartments</p>
                        </div>
                        <div>
                            <p>Tasos</p>
                            <p>1 343 apartments</p>
                        </div>
                        <div>
                            <p>Shatsky lakes</p>
                            <p>172 apartments</p>
                        </div>
                        <div>
                            <p>Kyiv region</p>
                            <p>549 apartments</p>
                        </div>
                        <div>
                            <p>Tasos</p>
                            <p>1 343 apartments</p>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
};
