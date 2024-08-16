import "../../../css/DashBoardRealtorClasses/index.scss";
import Logo from "../../../assets/Logo/tripbook 1.svg";
import LogOut from "../../../assets/Icons/logout-03.svg";
import ArrowBack from "../../../assets/DashboardIcons/chevron-left.svg";
import { Outlet, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { logout } from "../../../store/accounts/account.slice";
import { endListening } from "../../../SignalR";
import { useEffect, useState } from "react";
import { APP_ENV } from "../../../env";
import { changeDashboardMenuItem } from "../../../store/settings/settings.slice";
import { IDashboardMenuItem } from "../../../interfaces/common";
import { initialMenuData } from "../../../utils/data";

export default function DashboardLayout() {
    const { user } = useAppSelector((state) => state.account);
    const { currentBreadcrumbsItem } = useAppSelector(
        (state) => state.settings
    );
    const dispatch = useAppDispatch();
    const [menuData, setMenuData] =
        useState<IDashboardMenuItem[]>(initialMenuData);
    const navigate = useNavigate();
    const [currentMenuItem, setCurrentMenuItem] = useState<string>(
        currentBreadcrumbsItem
    );
    const [avatarUrl, setAvatarUrl] = useState<string>();
    const [isExpanded, setIsExpanded] = useState(false);

    useEffect(() => {
        if (user) {
            setAvatarUrl(APP_ENV.BASE_URL + user?.avatar);
        }
    }, [user]);

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

    const handleMenuClick = (index: number) => {
        const updatedMenuData = menuData.map((item, i) => ({
            ...item,
            isActive: i === index,
        }));

        setMenuData(updatedMenuData);
        navigate(menuData[index].link);
        setCurrentMenuItem(menuData[index].name);
        setIsExpanded(true);
        dispatch(changeDashboardMenuItem(menuData[index].name));
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
                        <div id="name">
                            {user?.lastName + " " + user?.firstName}
                        </div>
                    </div>
                </div>
            </div>
            <div className="breadcrumbs">
                <a href="/">Main / </a>
                <p>{currentMenuItem}</p>
            </div>
            <div className="mainContainer">
                <div className={`sideMenu ${isExpanded ? "expanded" : ""}`}>
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
        </div>
    );
}
