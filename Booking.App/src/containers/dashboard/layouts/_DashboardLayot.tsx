import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
//import MailIcon from "@mui/icons-material/Mail";
import { Outlet, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import Avatar from "@mui/material/Avatar";
import { useEffect, useState } from "react";
import { APP_ENV } from "../../../env";
import { Collapse, Rating } from "@mui/material";
import Button from "@mui/material/Button";
import { logout } from "../../../store/accounts/account.slice.ts";
import LogoutIcon from "@mui/icons-material/Logout";
import { endListening, startListening } from "../../../SignalR";
// import {getListOfChatRooms} from "../../../store/chat/chat.action.ts";
// import { unwrapResult} from "@reduxjs/toolkit";
import { DotBadge } from "../../common/Badge.tsx";

import AccountBoxTwoToneIcon from "@mui/icons-material/AccountBoxTwoTone";
import DynamicFeedTwoToneIcon from "@mui/icons-material/DynamicFeedTwoTone";
import AddBoxTwoToneIcon from "@mui/icons-material/AddBoxTwoTone";
import Inventory2TwoToneIcon from "@mui/icons-material/Inventory2TwoTone";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
//import StarBorder from "@mui/icons-material/StarBorder";
import {
    IChatRoomInfo,
    IChatRoomList,
    IPostChatsInfo,
} from "../../../interfaces/chat/index.ts";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
    open?: boolean;
}>(({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
        transition: theme.transitions.create("margin", {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    }),
}));

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
    transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(["margin", "width"], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
}));

export interface IActive {
    setIsActive: (setIsActive: boolean) => void;
}

export default function DashboardLayout() {
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const { user } = useAppSelector((state) => state.account);
    const [avatarUrl, setAvatarUrl] = useState<string>("#");
    const [rating, setRating] = useState<number>(user?.rating ?? 0);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    // const [isActive, setIsActive] = useState<IActive | undefined>();
    const { hasNewPosts } = useAppSelector((state) => state.chat);
    const [openPostChatList, setOpenPostChatList] = useState(false);
    const [openPosts, setOpenPosts] = useState<Record<string, boolean>>({});

    const handleClick = () => {
        setOpenPostChatList(!openPostChatList);
    };

    const handlePostClick = (postName: string) => {
        setOpenPosts((prevOpenPosts) => ({
            ...prevOpenPosts,
            [postName]: !prevOpenPosts[postName],
        }));
    };

    const testChatRoomInfo1: IChatRoomInfo[] = [
        {
            hasNewMsg: true,
            chatRoomName: "Bob",
            chatRoomId: "string",
        },
        {
            hasNewMsg: false,
            chatRoomName: "Ann",
            chatRoomId: "string",
        },
    ];

    const testChatRoomInfo2: IChatRoomInfo[] = [
        {
            hasNewMsg: false,
            chatRoomName: "Mary",
            chatRoomId: "string",
        },
        {
            hasNewMsg: false,
            chatRoomName: "Alex",
            chatRoomId: "string",
        },
    ];

    const testPostChatsInfo: IPostChatsInfo[] = [
        {
            hasNewMsg: true,
            postName: "Hotel",
            postId: "string",
            chatRoomsInfoList: testChatRoomInfo1,
             
        },
        {
            hasNewMsg: false,
            postName: "Room",
            postId: "string",
            chatRoomsInfoList: testChatRoomInfo2,
             
        },
    ];

    const testInfo: IChatRoomList = {
        hasNewMsg: true,
        postChatRoomsInfoList: testPostChatsInfo,
    };

    useEffect(() => {
        if (user) {
            setAvatarUrl(APP_ENV.BASE_URL + user?.avatar);
            setRating(user?.rating ?? 0);

            // const getRooms = async ()=>{
            //     try {
            //         const response = await dispatch(getListOfChatRooms());
            //         unwrapResult(response);
            //     }catch (e)
            //     {
            //         console.log(e)
            //     }
            // }
            //
            // getRooms()
        }
    }, [dispatch, user]);

    useEffect(() => {
        startListening();
    }, []);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    // const handleClick = () => {
    //     setOpenPostChatList(!openPostChatList);
    // };

    // const handlePostClick = (postName: string) => {
    //     setOpenPosts((prevOpenPosts) => ({
    //       ...prevOpenPosts,
    //       [postName]: !prevOpenPosts[postName],
    //     }));
    //   };

    // const addConnection = async () =>{
    //     console.log("Connect ///////////////")
    //    await joinForPostListening("f3623e21-2163-4716-bf32-13f8ba10101e")

    //   await  startListening();
    // }

    // const  disconnect = async () =>{

    //    // await leave("5c57dae8-39f3-41da-9bc8-521221e4bf44");

    //     await endListening();
    // }

    return (
        <Box sx={{ display: "flex" }}>
            <CssBaseline />
            <AppBar position="fixed" open={open}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{ mr: 2, ...(open && { display: "none" }) }}
                    >
                        <MenuIcon />
                    </IconButton>

                    {avatarUrl && <Avatar alt="Remy Sharp" src={avatarUrl} />}

                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        style={{ marginLeft: "25px", marginRight: "25px" }}
                    >
                        {user?.firstName + " " + user?.lastName}
                    </Typography>

                    <Rating name="read-only" value={rating} readOnly />

                    <Button
                        onClick={async () => {
                            dispatch(logout());
                            await endListening();
                            navigate("/authentication/login");
                        }}
                        startIcon={<LogoutIcon />}
                        color={"inherit"}
                    >
                        logout
                    </Button>

                    <DotBadge isActive={hasNewPosts} />

                    {/* <Button onClick={addConnection} color={"inherit"}>Add connection</Button>
                    <Button onClick={disconnect} color={"inherit"}>End connection</Button> */}
                </Toolbar>
            </AppBar>
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    "& .MuiDrawer-paper": {
                        width: drawerWidth,
                        boxSizing: "border-box",
                    },
                }}
                variant="persistent"
                anchor="left"
                open={open}
            >
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === "ltr" ? (
                            <ChevronLeftIcon />
                        ) : (
                            <ChevronRightIcon />
                        )}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <ListItem disablePadding>
                    <ListItemButton
                        onClick={() => {
                            navigate("/dashboard/profile");
                        }}
                    >
                        <ListItemIcon>
                            <AccountBoxTwoToneIcon />
                        </ListItemIcon>
                        <ListItemText primary={"Profile"} />
                    </ListItemButton>
                </ListItem>
                <Divider />

                <List>
                    <ListItem disablePadding>
                        <ListItemButton
                            onClick={() => {
                                navigate("/dashboard/profile");
                            }}
                        >
                            <ListItemIcon>
                                <DynamicFeedTwoToneIcon />
                            </ListItemIcon>
                            <ListItemText primary={"All Posts"} />
                        </ListItemButton>
                    </ListItem>

                    <ListItem disablePadding>
                        <ListItemButton
                            onClick={() => {
                                navigate("/dashboard/post/add");
                            }}
                        >
                            <ListItemIcon>
                                <AddBoxTwoToneIcon />
                            </ListItemIcon>
                            <ListItemText primary={"Add New Post"} />
                        </ListItemButton>
                    </ListItem>

                    <ListItem disablePadding>
                        <ListItemButton
                            onClick={() => {
                                navigate("/dashboard/profile");
                            }}
                        >
                            <ListItemIcon>
                                <Inventory2TwoToneIcon />
                            </ListItemIcon>
                            <ListItemText primary={"Archive"} />
                        </ListItemButton>
                    </ListItem>
                </List>
                <Divider />

                <List>
                    <ListItemButton onClick={handleClick}>
                        <ListItemIcon>
                            <InboxIcon />
                        </ListItemIcon>
                        <ListItemText primary="Inbox" />
                        {openPostChatList ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>

                    <Collapse
                        in={openPostChatList}
                        timeout="auto"
                        unmountOnExit
                    >
                        <List component="div" disablePadding>
                            {testInfo.postChatRoomsInfoList.map((post) => (
                                <React.Fragment key={post.postName}>
                                    <ListItemButton
                                        onClick={() =>
                                            handlePostClick(post.postName)
                                        }
                                    >
                                        <ListItemIcon>
                                            <DotBadge
                                                isActive={post.hasNewMsg}
                                            />
                                        </ListItemIcon>
                                        <ListItemText primary={post.postName} />
                                        {openPosts[post.postName] ? (
                                            <ExpandLess />
                                        ) : (
                                            <ExpandMore />
                                        )}
                                    </ListItemButton>

                                    <Collapse
                                        in={!!openPosts[post.postName]}
                                        timeout="auto"
                                        unmountOnExit
                                    >
                                        <List component="div" disablePadding>
                                            {post.chatRoomsInfoList.map(
                                                (chat) => (
                                                    <ListItem
                                                        key={chat.chatRoomName}
                                                        disablePadding
                                                    >
                                                        <ListItemButton
                                                            onClick={() =>
                                                                navigate("#")
                                                            }
                                                        >
                                                            <ListItemIcon>
                                                                <DotBadge
                                                                    isActive={
                                                                        chat.hasNewMsg
                                                                    }
                                                                />
                                                            </ListItemIcon>
                                                            <ListItemText
                                                                primary={
                                                                    chat.chatRoomName
                                                                }
                                                            />
                                                        </ListItemButton>
                                                    </ListItem>
                                                )
                                            )}
                                        </List>
                                    </Collapse>
                                </React.Fragment>
                            ))}
                        </List>
                    </Collapse>
                </List>
            </Drawer>
            <Main open={open}>
                <DrawerHeader />
                <Outlet />
            </Main>
        </Box>
    );
}
