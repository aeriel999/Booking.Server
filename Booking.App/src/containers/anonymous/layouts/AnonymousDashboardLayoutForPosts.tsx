import { useEffect, useState } from "react"
import "../../../css/DashBoardRealtorClasses/index.scss";
import "../../../css/DashBoardAnonymousForPostsClasses/index.scss"
import logo from "../../../assets/Logo/tripbook 1.svg";
import globe from "../../../assets/Icons/globe-01.svg";
import facebook from "../../../assets/Icons/ic_baseline-facebook.svg";
import instagram from "../../../assets/Icons/ri_instagram-fill.svg";
import telegram from "../../../assets/Icons/ic_outline-telegram.svg";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { FindPostInput } from "../../../components/common/FindPostInput/FindPostInput";
import { IFetchDataByName, IFilter, IFilteredRequestName } from "../../../interfaces/post";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store";
import { getListOfPostsName, getPostByName } from "../../../store/post/post.actions";
import { setTextForSearching } from "../../../store/post/post.slice";
import { changeLoaderIsLoading, changePaginationPage, savePath } from "../../../store/settings/settings.slice";
import { Avatar } from "../../../components/common/Avatar/Avatar";
import { APP_ENV } from "../../../env";

export const AnonymousDashboardLayoutForPosts = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const filter = useSelector((state: RootState) => state.post.filter);
    const searchingPost = useSelector((state: RootState) => state.post.searchingPost);
    const dispatch = useDispatch<AppDispatch>();
    const [searchingText, setSearchingText] = useState<string | null>(null);
    const listOfPostsName = useSelector((state: RootState) => state.post.searchPost);
    const isLogin = useSelector((state: RootState) => state.account.isLogin);
    const user = useSelector((state: RootState) => state.account.user);
    const [avatarUrl, setAvatarUrl] = useState<string>();
    //const [isBlur, setIsBlur] = useState<boolean>(true);
    /*
    <div id="userInfo">
                        {user!.avatar != null ? <div
                            id="avatar"
                            style={{
                                background: `url(${avatarUrl}) center / cover no-repeat`,
                            }}
                        /> :
                            <Avatar userName={user?.email!} />}

                        <div id="name">
                            {user?.firstName && user?.lastName ? `${user?.firstName} ${user?.lastName}` : user?.email}
                        </div>
                    </div>
    */

    const changeText = async (text: string | null) => {
        const currentFilter: IFilter = {
            category: filter.category,
            country: filter.country,
            city: filter.city,
            realtor: filter.realtor
        };
        const payload: IFilteredRequestName = {
            filter: currentFilter,
            name: text
        }

        await dispatch(getListOfPostsName(payload));
    }
    const onBlur = () => {
        changeText(null);

    }


    const onFocus = async () => {
        changeText(searchingText);
    }

    const findPost = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        dispatch(changeLoaderIsLoading(true));
        if (searchingText == null || searchingText == "") {
            /*const currentFilter: IFilter = {
                category: filter.category,
                country: filter.country,
                city: filter.city,
                realtor: filter.realtor
            };
            const payload: IFilteredRequest = {
                filter: currentFilter,
                pages: {
                    page: 1,
                    sizeOfPage: 9
                }
            }
            await dispatch(getFilteredListByType(payload));*/
        }
        else {
            const currentFilter: IFilter = {
                category: filter.category,
                country: filter.country,
                city: filter.city,
                realtor: filter.realtor
            };
            const payload: IFetchDataByName = {
                filter: currentFilter,
                name: searchingText,
            }
            await dispatch(getPostByName(payload));
            dispatch(changePaginationPage(1))
        }
    }

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    useEffect(() => {
        if (searchingPost != null) {
            navigate(`/posts/post/${searchingPost}`);
        }
    }, [searchingPost])



    useEffect(() => {
        changeText(searchingText);
        dispatch(setTextForSearching(searchingText));
    }, [searchingText])

    useEffect(() => {
        if (user) {

            if (user?.avatar != null) {
                if (user?.avatar.slice(0, 5) == "https") {
                    setAvatarUrl(user?.avatar);
                }
                else {
                    setAvatarUrl(APP_ENV.BASE_URL + user?.avatar);
                }
            }
        }
    }, [user]);

    function nameButtonHandle(): void {
        if(user?.role.toLowerCase().includes("admin")){
           console.log("nameButtonHandle", user?.role.toLowerCase())
           navigate("/admin/moderation")
        }else{
           navigate("/dashboard/profile")
        }
   }

    return (
        <div id="mainDashboardForPosts">
            <header>
                <div className="auth">
                    <img tabIndex={0} src={logo} onClick={() => navigate("/")} alt="logo" />
                    {isLogin ? <><div id="userInfo">
                        {user!.avatar != null ? <div
                            id="avatar"
                            style={{
                                background: `url(${avatarUrl}) center / cover no-repeat`,
                            }}
                        /> :
                            <Avatar userName={user?.email!} />}

                        <div id="name" onClick={nameButtonHandle}>
                            {user?.firstName && user?.lastName ? `${user?.firstName} ${user?.lastName}` : user?.email}
                        </div>
                    </div></> : <><button
                        onClick={() => {
                            navigate("/authentication/user-register");
                        }}
                        tabIndex={1}
                    >
                        Register
                    </button>
                        <button
                            onClick={() => {
                                //console.log(location);
                                dispatch(savePath(location.pathname))
                                navigate("/authentication/login");

                            }}
                            tabIndex={2}
                        >
                            Login
                        </button></>}

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
                        <a tabIndex={3}>About the company</a>
                        <a tabIndex={4}>Vacancies</a>
                        <a tabIndex={5}>Mobile applications</a>
                        <a tabIndex={6}>How we work</a>
                    </div>
                    <div>
                        <h6>Connection</h6>
                        <a tabIndex={7}>Help and FAQ</a>
                        <a tabIndex={8}>Affiliate programs</a>
                        <a tabIndex={9}>Hotel owners</a>
                        <a tabIndex={10}>To partners</a>
                    </div>
                    <div>
                        <h6>Explore</h6>
                        <a tabIndex={11}>Countries</a>
                        <a tabIndex={12}>Regions</a>
                        <a tabIndex={13}>Cities</a>
                        <a tabIndex={14}>Districts</a>
                        <a tabIndex={15}>Airports</a>
                        <a tabIndex={16}>Hotels</a>
                        <a tabIndex={17}>Attractions</a>
                    </div>
                    <div>
                        <h6>Support</h6>
                        <a tabIndex={18}>Reference center</a>
                        <a tabIndex={19}>Anti-discrimination</a>
                        <a tabIndex={20}>Support for people with disabilities</a>
                        <a tabIndex={21}>Options for canceling reservations</a>
                        <a tabIndex={22}>Send a complaint from neighbors</a>
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
