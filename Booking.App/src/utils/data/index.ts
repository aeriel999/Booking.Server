import AddNewPost from "../../assets/DashboardIcons/add-square-03.svg";
import AddNewPostActive from "../../assets/DashboardIcons/Active/add-square-03.svg";
import Archive from "../../assets/DashboardIcons/box.svg";
import Inbox from "../../assets/DashboardIcons/inbox-01.svg";
import Reviews from "../../assets/DashboardIcons/user-profile-square.svg";
import Settings from "../../assets/DashboardIcons/gear.svg";
import ActiveUserProfiler from "../../assets/DashboardIcons/Active/user-profile-03.svg";
import UserProfiler from "../../assets/DashboardIcons/user-profile-03.svg";
import AllPost from "../../assets/DashboardIcons/AllPost.svg";
import { IDashboardMenuItem } from "../../interfaces/common";
import ActiveSettings from "../../assets/DashboardIcons/Active/Active_Settings.svg";
import ActiveReviews from "../../assets/DashboardIcons/Active/user-profile-square.svg";
import ActiveArchive from "../../assets/DashboardIcons/Active/ActiveArchive.svg";
import ActiveInbox from "../../assets/DashboardIcons/Active/ActiveInbox.svg";
import ActiveAllPost from "../../assets/DashboardIcons/Active/ActiveAllPost.svg";

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
        activeImage: ActiveAllPost,
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
        activeImage: ActiveArchive,
        link: "/dashboard/archive",
    },
    {
        name: "Inbox",
        isActive: false,
        image: Inbox,
        activeImage: ActiveInbox,
        link: "/dashboard/chat",
        counterOfMsg: true,
    },
    {
        name: "Reviews",
        isActive: false,
        image: Reviews,
        activeImage: ActiveReviews,
        link: "/dashboard/reviews",
    },
    {
        name: "Settings",
        isActive: false,
        image: Settings,
        activeImage: ActiveSettings,
        link: "/dashboard/profile/edit",
    },
];
export const adminInitialMenuData: IDashboardMenuItem[] = [
    {
        name: "Moderation",
        isActive: false,
        image: AllPost,
        activeImage: ActiveAllPost,
        link: "/admin/moderation",
    },
    {
        name: "Users",
        isActive: false,
        image: UserProfiler,
        activeImage: ActiveUserProfiler,
        link: "/admin/users",
    },
    {
        name: "Realtors",
        isActive: false,
        image: UserProfiler,
        activeImage: ActiveUserProfiler,
        link: "/admin/realtors",
        counterOfMsg: true,
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
        activeImage: ActiveReviews,
        link: "/dashboard/profile/history-of-feedbacks",
    },
    {
        name: "Messages",
        isActive: false,
        image: Inbox,
        activeImage: ActiveInbox,
        link: "/dashboard/profile/page-of-messages",
        counterOfMsg: true,
    },
    {
        name: "Settings",
        isActive: false,
        image: Settings,
        activeImage: ActiveSettings,
        link: "/dashboard/profile/edit",
    },
];

export function cutNumber(num: number) {
    let number = num;
    if (num % 1 < 0.09) {
        number = parseFloat(num.toFixed(0));
    } else {
        number = parseFloat(num.toFixed(1));
    }
    return number;
}
