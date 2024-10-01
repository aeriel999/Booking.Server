import { Outlet, useNavigate } from "react-router-dom";
import "../../../css/DashBoardRealtorClasses/index.scss";
import "../../../css/DashBoardAnonymousClasses/index.scss";
import logo from "../../../assets/Logo/tripbook 1.svg";
// import dot from "../../../assets/Icons/mingcute_map-pin-line.svg";
// import calendar from "../../../assets/Icons/calendar-06.svg";
// import human from "../../../assets/Icons/user-profile-03.svg";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { useEffect, useState } from "react";
import { APP_ENV } from "../../../env";
import { Avatar } from "../../../components/common/Avatar/Avatar";

export default function AnonymousDashboardLayout() {
    const navigate = useNavigate();
    const isLogin = useSelector((state: RootState) => state.account.isLogin);
    const user = useSelector((state: RootState) => state.account.user);
    const [avatarUrl, setAvatarUrl] = useState<string>();

    useEffect(() => {
        if (user) {
            if (user?.avatar != null) {
                if (user?.avatar.slice(0, 5) == "https") {
                    setAvatarUrl(user?.avatar);
                } else {
                    setAvatarUrl(APP_ENV.BASE_URL + user?.avatar);
                }
            }
        }
    }, [user]);

    function nameButtonHandle(): void {
        if (user?.role.toLowerCase().includes("admin")) {
            console.log("nameButtonHandle", user?.role.toLowerCase());
            const nam = "/admin/moderation";
            console.log("nam", nam);
            navigate(nam);
        } else {
            navigate("/dashboard/profile");
        }
    }

    return (
        <div id="mainDashboard">
            <header>
                <div className="shapka">
                    <div className="auth">
                        <img tabIndex={0} src={logo} alt="Logo" />

                        {isLogin ? (
                            <>
                                <div id="userInfo">
                                    {user!.avatar != null ? (
                                        <div
                                            id="avatar"
                                            style={{
                                                background: `url(${avatarUrl}) center / cover no-repeat`,
                                            }}
                                        />
                                    ) : (
                                        <Avatar userName={user?.email!} />
                                    )}

                                    <div id="name" onClick={nameButtonHandle}>
                                        {user?.firstName && user?.lastName
                                            ? `${user?.firstName} ${user?.lastName}`
                                            : user?.email}
                                    </div>
                                </div>
                            </>
                        ) : (
                            <>
                                <button
                                    onClick={() => {
                                        navigate(
                                            "/authentication/user-register"
                                        );
                                    }}
                                    tabIndex={1}
                                >
                                    Register
                                </button>
                                <button
                                    onClick={() => {
                                        navigate("/authentication/login");
                                    }}
                                    tabIndex={2}
                                >
                                    Login
                                </button>
                            </>
                        )}
                    </div>
                    <div className="searching">
                        <div>Travel, visit new places with TripBook!</div>
                        {/* <form>
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
                        </form> */}
                    </div>
                </div>
            </header>
            <Outlet />
            <footer>
                <img src={logo} />

                <div className="explore">
                    <p>For partners</p>
                    <div>
                        <a
                            onClick={() => {
                                navigate("/authentication/realtor-register");
                            }}
                            tabIndex={3}
                        >
                            Create Realtor Account
                        </a>
                        <a tabIndex={4}>Send Message to Administrator</a>
                        <a tabIndex={5}>On issues of advertising</a>
                        {/* <a tabIndex={6}>Districts</a>{" "}
                        <a tabIndex={7}>Attractions</a>{" "}
                        <a tabIndex={8}>Airports</a> <a tabIndex={9}>Hotels</a> */}
                    </div>
                </div>
            </footer>
        </div>
    );
}
