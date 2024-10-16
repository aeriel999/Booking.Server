import "../../../App.scss";
import Logo from "../../../assets/Logo/tripbook 1.svg";
import LogOut from "../../../assets/Icons/logout-03.svg";
import ArrowBack from "../../../assets/DashboardIcons/chevron-left.svg";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { logout } from "../../../store/accounts/account.slice";
import { endListening } from "../../../SignalR";
import { useEffect, useState } from "react";
import { APP_ENV } from "../../../env";
import { changeDashboardMenuItem, savePath } from "../../../store/settings/settings.slice";
import { IDashboardMenuItem } from "../../../interfaces/common";
import { clientMenuData } from "../../../utils/data";
import { Badge } from "@mui/material";
import avatar from "../../../assets/Auth/image20.svg";

export default function ClientDashboardLayout() {
    const { user } = useAppSelector((state) => state.account);
    const unreadMessages = useAppSelector((state) => state.chat.generalNumberOfUnreadMessages);
    const savedChatRoom = useAppSelector((state) => state.settings.savedPostIdForChat);
    const { currentBreadcrumbsItem } = useAppSelector(
        (state) => state.settings
    );
    const location = useLocation();

    const dispatch = useAppDispatch();
    // for set and get active menu item in side menu
    const [menuData, setMenuData] =
        useState<IDashboardMenuItem[]>(clientMenuData); //initial data in data file
    const navigate = useNavigate();
    const [currentMenuItem, setCurrentMenuItem] = useState<string>(
        currentBreadcrumbsItem
    ); //Item name for Breadcrumbs navigate
    const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
    const [isExpanded, setIsExpanded] = useState(false); //set and get menu expanded

    //Get and set avatar
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

    //Get current menu iten and set it ti side menu
    useEffect(() => {
        if (currentBreadcrumbsItem) {
            const menuIndex = menuData.findIndex(
                (item) => item.name === currentBreadcrumbsItem
            );
            if (menuIndex !== -1) {
                handleMenuClick(menuIndex);
            }
        }
    }, [currentBreadcrumbsItem]);

    //Menu navigate
    const handleMenuClick = (index: number) => {
        //set new data with active item
        const updatedMenuData = menuData.map((item, i) => ({
            ...item,
            isActive: i === index,
        }));

        setMenuData(updatedMenuData);
        navigate(menuData[index].link);
        setCurrentMenuItem(menuData[index].name);
        setIsExpanded(true);
        dispatch(changeDashboardMenuItem(menuData[index].name));
        dispatch(savePath(location.pathname));
    };

    useEffect(() => {
        if (savedChatRoom?.length != 0) {
            handleMenuClick(2);
        }
    }, [savedChatRoom])


    return (
        <div className="dashboardMainContainer">
            <div className="dashboardHeaderContainer">
                {/* Header */}
                <div id="headerMainPart">
                    <a
                        id="headerLogo"
                        onClick={() => {
                            navigate("/");
                        }}
                    >
                        <img src={Logo} alt="Logo" />
                    </a>
                    {/* User Info */}
                    <div id="userInfo">

                        <div
                            id="avatar"
                            style={{
                                background: `url(${avatarUrl === null ? avatar : avatarUrl}) center / cover no-repeat`,
                            }}
                        />


                        <div id="name">
                            {user?.firstName && user?.lastName
                                ? `${user?.firstName} ${user?.lastName}`
                                : user?.email}
                        </div>
                    </div>
                </div>
            </div>
            <div className="breadcrumbs">
                <a href="/">Main / </a>
                <p>{currentMenuItem}</p>
            </div>
            <div className="mainContainer">
                {/* Side Menu */}
                <div className={`sideMenu ${isExpanded ? "expanded" : ""}`}>
                    <div id="items">
                        {/* Menu Items from Menu Data */}
                        {menuData.map((item, index) => (
                            <button
                                key={index}
                                className={`menuItem ${item.isActive ? "active" : ""
                                    }`}
                                onClick={() => handleMenuClick(index)}
                            >
                                <div className="text">
                                    <Badge
                                        badgeContent={
                                            item.counterOfMsg &&
                                            unreadMessages
                                        }
                                        sx={{
                                            "& .MuiBadge-badge": {
                                                backgroundColor: "#FF6347",
                                                color: "white",
                                            },
                                        }}
                                    >
                                        <img
                                            src={
                                                item.isActive
                                                    ? item.activeImage
                                                    : item.image
                                            }
                                            alt={item.name}
                                        />
                                    </Badge>
                                    <p className="menuItemsText">{item.name}</p>
                                </div>
                                {isExpanded &&
                                    currentMenuItem === item.name && (
                                        <div
                                            className="outIcon"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setIsExpanded(false);
                                            }}
                                        >
                                            <img
                                                src={ArrowBack}
                                                alt="Collapes"
                                            />
                                        </div>
                                    )}
                            </button>
                        ))}
                    </div>
                    {/* Logout Button */}
                    <button
                        id="footer"
                        onClick={async () => {
                            dispatch(logout());
                            await endListening();
                            navigate("/authentication/login");
                        }}
                    >
                        <>
                            <div id="line"></div>
                            <div id="logOutButton">
                                <img src={LogOut} alt="logOut" />
                                <p>Log Out</p>
                            </div>
                        </>
                    </button>
                </div>

                {/* Dashboard Container */}
                <div className="outlet">
                    <Outlet />
                </div>
            </div>
        </div>
    );
}

