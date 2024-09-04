import AddNewPost from "../../assets/DashboardIcons/add-square-03.svg";
import AddNewPostActive from "../../assets/DashboardIcons/Active/add-square-03.svg";
import Archive from "../../assets/DashboardIcons/box.svg";
import Inbox from "../../assets/DashboardIcons/inbox-01.svg";
import Reviews from "../../assets/DashboardIcons/user-profile-square.svg";
import Settings from "../../assets/DashboardIcons/gear.svg";
import ActiveUserProfiler from "../../assets/DashboardIcons/Active/user-profile-03.svg";
import UserProfiler from "../../assets/DashboardIcons/user-profile-03.svg";
import AllPost from "../../assets/DashboardIcons/image-01.svg";
import { IDashboardMenuItem } from "../../interfaces/common";

export const initialMenuData: IDashboardMenuItem[] = [
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
        activeImage: AddNewPostActive,
        link: "/dashboard/post/add",
    },
    {
        name: "Archive",
        isActive: false,
        image: Archive,
        activeImage: Archive,
        link: "/dashboard/archive",
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

export const clientMenuData: IDashboardMenuItem[] = [
    {
        name: "Profile",
        isActive: true,
        image: UserProfiler,
        activeImage: ActiveUserProfiler,
        link: "/dashboard/profile",
    },
    {
        name: "My feedbacks",
        isActive: false,
        image: Reviews,
        activeImage: Reviews,
        link: "/dashboard/profile/history-of-feedbacks",
    },
    {
        name: "Messages",
        isActive: false,
        image: Inbox,
        activeImage: Inbox,
        link: "/dashboard/profile/page-of-messages",
    },
    {
        name: "Settings",
        isActive: false,
        image: Settings,
        activeImage: Settings,
        link: "/dashboard/profile/edit",
    },
];

export function cutNumber(num: number) {
    let number = num;
    if (num % 1 < 0.09) {
        number = parseFloat(num.toFixed(0));
    }
    else {
        number = parseFloat(num.toFixed(1));
    }
    return number
}