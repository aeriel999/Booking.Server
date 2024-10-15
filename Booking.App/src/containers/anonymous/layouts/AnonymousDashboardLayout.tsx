import { Outlet, useLocation, useNavigate } from "react-router-dom";
import "../../../css/DashBoardRealtorClasses/index.scss";
import "../../../css/DashBoardAnonymousClasses/index.scss";
import logo from "../../../assets/Logo/tripbook 1.svg";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { useEffect, useState } from "react";
import { APP_ENV } from "../../../env";
import avatar from "../../../assets/Auth/image20.svg";
import { useAppDispatch } from "../../../hooks/redux";
import { savePath } from "../../../store/settings/settings.slice";

export default function AnonymousDashboardLayout() {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const location = useLocation();
    const isLogin = useSelector((state: RootState) => state.account.isLogin);
    const user = useSelector((state: RootState) => state.account.user);
    const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

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
                                    <div
                                        id="avatar"
                                        style={{
                                            background: `url(${avatarUrl === null ? avatar : avatarUrl}) center / cover no-repeat`,
                                        }}
                                    />

                                    <div tabIndex={0}
                                        id="name"
                                        onClick={nameButtonHandle}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') {
                                                nameButtonHandle();
                                            }
                                        }}
                                    >
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
                                    tabIndex={0}
                                >
                                    Register
                                </button>
                                <button
                                    onClick={() => {
                                        dispatch(savePath(location.pathname))
                                        navigate("/authentication/login");
                                    }}
                                    tabIndex={0}
                                >
                                    Login
                                </button>
                            </>
                        )}
                    </div>
                    <div className="searching">
                        <div>Travel, visit new places with TripBook!</div>
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
                            tabIndex={0}
                        >
                            Create Realtor Account
                        </a>
                        <a tabIndex={0}>Send Message to Administrator</a>
                        <a tabIndex={0}>On issues of advertising</a>
                    </div>
                </div>
            </footer>
        </div>
    );
}
