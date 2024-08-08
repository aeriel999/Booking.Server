import { useEffect, useState } from "react"
import "../../../css/DashBoardAnonymousForPostsClasses/index.scss"
import logo from "../../../assets/Logo/tripbook 1.svg";
import globe from "../../../assets/Icons/globe-01.svg";
import facebook from "../../../assets/Icons/ic_baseline-facebook.svg";
import instagram from "../../../assets/Icons/ri_instagram-fill.svg";
import telegram from "../../../assets/Icons/ic_outline-telegram.svg";
import { Outlet, useNavigate } from "react-router-dom";
import { FindPostInput } from "../../../components/common/FindPostInput/FindPostInput";
import { IFetchDataByName, IFilter, IFilteredRequest, IFilteredRequestName } from "../../../interfaces/post";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store";
import { getFilteredListByType, getListOfPostsByName, getListOfPostsName } from "../../../store/post/post.actions";

export const AnonymousDashboardLayoutForPosts = () => {

    const navigate = useNavigate();
    const filter = useSelector((state: RootState) => state.post.filter);
    const dispatch = useDispatch<AppDispatch>();
    const [searchingText, setSearchingText] = useState<string | null>(null);
    const listOfPostsName = useSelector((state: RootState) => state.post.searchPost);

    const changeText = async (text: string | null) => {
        const currentFilter: IFilter = {
            category: filter.category ? filter.category : "",
            country: filter.country ? filter.country : "",
            city: filter.city ? filter.city : "",
            realtor: filter.realtor ? filter.realtor : "",
        };
        const payload: IFilteredRequestName = {
            filter: currentFilter,
            name: text != null ? text : ""
        }

        await dispatch(getListOfPostsName(payload));
        console.log(listOfPostsName);
    }
    const onBlur = () => {
        changeText(null);
    }
    const onFocus = async () => {
        changeText(searchingText);
    }

    const findPost = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (searchingText == null || searchingText == "") {
            const currentFilter: IFilter = {
                category: filter.category == null ? "" : filter.category,
                country: filter.country == null ? "" : filter.country,
                city: filter.city == null ? "" : filter.city,
                realtor: filter.realtor == null ? "" : filter.realtor,
            };
            const payload: IFilteredRequest = {
                filter: currentFilter,
                pages: {
                    page: 1,
                    sizeOfPage: 9
                }
            }
            await dispatch(getFilteredListByType(payload));
        }
        else {
            const currentFilter: IFilter = {
                category: filter.category == null ? "" : filter.category,
                country: filter.country == null ? "" : filter.country,
                city: filter.city == null ? "" : filter.city,
                realtor: filter.realtor == null ? "" : filter.realtor,
            };
            const payload: IFetchDataByName = {
                filter: currentFilter,
                name: searchingText,
                pages: {
                    page: 1,
                    sizeOfPage: 9
                }
            }
            await dispatch(getListOfPostsByName(payload));
        }
    }

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    useEffect(() => {
        changeText(searchingText);
    }, [searchingText])
    return (
        <div id="mainDashboardForPosts">
            <header>
                <div className="auth">
                    <img src={logo} onClick={() => navigate("/")} alt="logo" />

                    <button
                        onClick={() => {
                            navigate("/authentication/user-register");
                        }}
                    >
                        Register
                    </button>
                    <button
                        onClick={() => {
                            navigate("/authentication/login");
                        }}
                    >
                        Login
                    </button>
                </div>
                <div className="searching">
                    <form onSubmit={findPost}>
                        <FindPostInput
                            onFocus={onFocus}
                            onBlur={onBlur}
                            postsName={listOfPostsName ? listOfPostsName : []}
                            setText={setSearchingText}
                        ></FindPostInput>
                        <button type="submit" >Find</button>
                    </form>
                </div>
            </header>
            <Outlet />

            <footer>
                <img src={logo} />

                <div className="information">
                    <div>
                        <h6>Company</h6>
                        <a>About the company</a>
                        <a>Vacancies</a>
                        <a>Mobile applications</a>
                        <a>How we work</a>
                    </div>
                    <div>
                        <h6>Connection</h6>
                        <a>Help and FAQ</a>
                        <a>Affiliate programs</a>
                        <a>Hotel owners</a>
                        <a>To partners</a>
                    </div>
                    <div>
                        <h6>Explore</h6>
                        <a>Countries</a>
                        <a>Regions</a>
                        <a>Cities</a>
                        <a>Districts</a>
                        <a>Airports</a>
                        <a>Hotels</a>
                        <a>Attractions</a>
                    </div>
                    <div>
                        <h6>Support</h6>
                        <a>Reference center</a>
                        <a>Anti-discrimination</a>
                        <a>Support for people with disabilities</a>
                        <a>Options for canceling reservations</a>
                        <a>Send a complaint from neighbors</a>
                    </div>
                </div>
                <div className="social-networks">
                    <img src={globe} alt="globe" />
                    <p>English (UK)</p>
                    <img src={facebook} alt="facebook" />
                    <img src={instagram} alt="instagram" />
                    <img src={telegram} alt="telegram" />
                </div>
            </footer>

        </div>
    )
}
/*
<form>
                        <img src={dot} />
                        <input placeholder="Place of travel?" />
                        <img src={calendar} />
                        <input
                            type="text"
                            placeholder="Date of arrival - departure"
                            onFocus={(event) => {
                                event.target.type = "date";
                            }}
                            onBlur={(event) => {
                                event.target.type = "text";
                            }}
                        />
                        <img src={human} />
                        <input placeholder="Count of people - number" />
                        <button>Find</button>
                    </form>
*/