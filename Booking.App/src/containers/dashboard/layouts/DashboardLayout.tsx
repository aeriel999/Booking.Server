import "../../../css/DashBoardRealtorClasses/index.scss";
import Logo from "../../../assets/Logo/tripbook 1.svg";
import TestImg from "../../../assets/Test/image 20.svg";
import ActiveUserProfiler from "../../../assets/DashboardIcons/Active/user-profile-03.svg";
import UserProfiler from "../../../assets/DashboardIcons/user-profile-03.svg";
import AllPost from "../../../assets/DashboardIcons/image-01.svg";
import LogOut from "../../../assets/Icons/logout-03.svg";
import AddNewPost from "../../../assets/DashboardIcons/add-square-03.svg";
import Archive from "../../../assets/DashboardIcons/box.svg";
import Inbox from "../../../assets/DashboardIcons/inbox-01.svg";
import Reviews from "../../../assets/DashboardIcons/user-profile-square.svg";
import Settings from "../../../assets/DashboardIcons/gear.svg";
import { Outlet, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { logout } from "../../../store/accounts/account.slice";
import { endListening } from "../../../SignalR";
import { useEffect, useState } from "react";
import { APP_ENV } from "../../../env";

interface IDashboardMenuItem {
    name: string;
    isActive: boolean;
    image: string;
    activeImage: string;
    link: string;
}

const initialMenuData: IDashboardMenuItem[] = [
    {
        name: "Profile",
        isActive: true,
        image: UserProfiler,
        activeImage: ActiveUserProfiler,
        link: "/dashboard/profile",
    },
    {
        name: "All Posts",
        isActive: false,
        image: AllPost,
        activeImage: AllPost,
        link: "/dashboard/show-all-post",
    },
    {
        name: "Add New Post",
        isActive: false,
        image: AddNewPost,
        activeImage: AddNewPost,
        link: "/dashboard/show-all-post",
    },
    {
        name: "Archive",
        isActive: false,
        image: Archive,
        activeImage: Archive,
        link: "/dashboard/show-all-post",
    },
    {
        name: "Inbox",
        isActive: false,
        image: Inbox,
        activeImage: Inbox,
        link: "/dashboard/show-all-post",
    },
    {
        name: "Reviews",
        isActive: false,
        image: Reviews,
        activeImage: Reviews,
        link: "/dashboard/show-all-post",
    },
    {
        name: "Settings",
        isActive: false,
        image: Settings,
        activeImage: Settings,
        link: "/dashboard/profile/edit",
    },
];

export default function DashboardLayout() {
    const { user } = useAppSelector((state) => state.account);
    const dispatch = useAppDispatch();
    const [menuData, setMenuData] =
        useState<IDashboardMenuItem[]>(initialMenuData);
    const navigate = useNavigate();
    const [currentMenuItem, setCurrentMenuItem] = useState<string>("Profile");
    const [avatarUrl, setAvatarUrl] = useState<string>();

    useEffect(() => {
        if (user) {
            setAvatarUrl(APP_ENV.BASE_URL + user?.avatar);
        }
    }, [user]);

    const handleMenuClick = (index: number) => {
        const updatedMenuData = menuData.map((item, i) => ({
            ...item,
            isActive: i === index,
        }));
        setMenuData(updatedMenuData);
        navigate(menuData[index].link);
        setCurrentMenuItem(menuData[index].name);
    };

    return (
        <div className="dashboardMainContainer">
            <div className="dashboardHeaderContainer">
                <div id="headerMainPart">
                    <div id="logo">
                        <img src={Logo} alt="Logo" />
                    </div>

                    <div id="userInfo">
                        <div
                            id="avatar"
                            style={{
                                background: `url(${avatarUrl}) center / cover no-repeat`,
                            }}
                        />
                        <div id="name">{user?.lastName + " " + user?.firstName}</div>
                    </div>
                </div>
            </div>
            <div className="breadcrumbs">
                <a href="/">Main / </a>
                <p>{currentMenuItem}</p>
            </div>
            <div className="mainContainer">
                <div className="sideMenu">
                    <div id="items">
                        {menuData.map((item, index) => (
                            <div
                                key={index}
                                className={`menuItem ${
                                    item.isActive ? "active" : ""
                                }`}
                                onClick={() => handleMenuClick(index)}
                            >
                                <div className="text">
                                    <img
                                        src={
                                            item.isActive
                                                ? item.activeImage
                                                : item.image
                                        }
                                        alt={item.name}
                                    />
                                    <p>{item.name}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div
                        id="footer"
                        onClick={async () => {
                            dispatch(logout());
                            await endListening();
                            navigate("/authentication/login");
                        }}
                    >
                        <div id="line"></div>
                        <div id="button">
                            <img src={LogOut} alt="logOut" />
                            <p>Log Out</p>
                        </div>
                    </div>
                </div>
                <div className="outlet">
                    <Outlet />
                </div>
            </div>
            {/* <div className="dashboardFooter">
                <p> </p>
            </div> */}
        </div>
    );
}
