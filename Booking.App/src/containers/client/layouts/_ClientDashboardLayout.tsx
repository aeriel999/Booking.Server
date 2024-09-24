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
import MailIcon from "@mui/icons-material/Mail";
import { Outlet, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import Avatar from "@mui/material/Avatar";
import { useEffect, useState } from "react";
import { APP_ENV } from "../../../env";
import Button from "@mui/material/Button";
import { logout } from "../../../store/accounts/account.slice.ts";
import LogoutIcon from "@mui/icons-material/Logout";
import StarBorder from "@mui/icons-material/StarBorder";
 
import { getListOfChatRooms } from "../../../store/chat/chat.action.ts";
import { unwrapResult } from "@reduxjs/toolkit";
import { Collapse } from "@mui/material";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { getRealtorsByUserFeedbacks } from "../../../store/users/user.action.ts";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/index.ts";

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

export default function ClientDashboardLayout() {
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const { user } = useAppSelector((state) => state.account);
    const realtors = useSelector(
        (state: RootState) => state.user.realtorsByUserFeedbacks
    );
    const [avatarUrl, setAvatarUrl] = useState<string>("#");
    const [isOpenFeedbacks, setIsOpenFeedbacks] = useState(false);
    const [isOpenMessages, setIsOpenMessages] = useState(false);
    const [isMouseEnter, setIsMouseEnter] = useState(false);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    // const [isActive, setIsActive] = useState<IActive | undefined>();
    // const {listChats} = useAppSelector(state => state.chat);

    useEffect(() => {
        if (user) {
            setAvatarUrl(APP_ENV.BASE_URL + user?.avatar);
            const getRooms = async () => {
                try {
                    const response = await dispatch(getListOfChatRooms());
                    unwrapResult(response);
                } catch (e) {
                    console.log(e);
                }
            };

            getRooms();
        }
    }, [user]);

    useEffect(() => {
        connectForRealtorToSignalR();
        getRealtors();
    }, []);
    useEffect(() => {
        console.log("Realtors - " + realtors);
    }, [realtors]);
    const getRealtors = async () => {
        await dispatch(getRealtorsByUserFeedbacks());
    };
    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <Box sx={{ display: "flex" }}>
            <CssBaseline />
            <AppBar position="fixed" open={open}>
                <Toolbar sx={{ backgroundColor: "#BD8BE7" }}>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{ mr: 2, ...(open && { display: "none" }) }}
                    >
                        <MenuIcon />
                    </IconButton>

                    {avatarUrl && <Avatar alt={user?.email} src={avatarUrl} />}

                    <Typography
                        onMouseEnter={() => setIsMouseEnter(true)}
                        onMouseLeave={() => setIsMouseEnter(false)}
                        onClick={() => navigate("/dashboard/profile")}
                        variant="h6"
                        noWrap
                        component="div"
                        style={{
                            marginLeft: "25px",
                            marginRight: "25px",
                            textDecoration: isMouseEnter ? "underline" : "none",
                            cursor: isMouseEnter ? "pointer" : "default",
                        }}
                    >
                        {user?.email}
                    </Typography>

                    <Button
                        onClick={() => {
                            dispatch(logout());
                            navigate("/");
                        }}
                        startIcon={<LogoutIcon />}
                        color={"inherit"}
                    >
                        logout
                    </Button>

                    {/*<DotBadge isActive={false}/>*/}

                    <Button
                        onClick={() => navigate("/dashboard")}
                        color={"inherit"}
                    >
                        Posts
                    </Button>
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
                <List>
                    {["Inbox", "Starred", "Send email", "Drafts"].map(
                        (text, index) => (
                            <ListItem key={text} disablePadding>
                                <ListItemButton>
                                    <ListItemIcon>
                                        {index % 2 === 0 ? (
                                            <InboxIcon />
                                        ) : (
                                            <MailIcon />
                                        )}
                                    </ListItemIcon>
                                    <ListItemText primary={text} />
                                </ListItemButton>
                            </ListItem>
                        )
                    )}
                </List>
                <Divider />
                <List>
                    <ListItem key="feedbacks" disablePadding>
                        <ListItemButton
                            onClick={() => setIsOpenFeedbacks(!isOpenFeedbacks)}
                        >
                            <ListItemIcon>
                                <StarBorder />
                            </ListItemIcon>
                            <ListItemText primary={"Feedbacks"} />
                            {isOpenFeedbacks ? <ExpandLess /> : <ExpandMore />}
                        </ListItemButton>
                    </ListItem>
                    <Collapse in={isOpenFeedbacks} timeout="auto" unmountOnExit>
                        {realtors?.$values
                            ? realtors.$values.map((item) => (
                                  <List component="div" disablePadding>
                                      <ListItemButton
                                          sx={{ pl: 4 }}
                                          onClick={() =>
                                              navigate(`realtor/${item.id}`)
                                          }
                                      >
                                          <ListItemIcon>
                                              {APP_ENV.BASE_URL +
                                                  "/images/avatars/" +
                                                  item.avatar && (
                                                  <Avatar
                                                      alt={item.realtor}
                                                      src={
                                                          APP_ENV.BASE_URL +
                                                          "/images/avatars/" +
                                                          item.avatar
                                                      }
                                                  />
                                              )}
                                          </ListItemIcon>
                                          <ListItemText
                                              primary={item.realtor}
                                          />
                                      </ListItemButton>
                                  </List>
                              ))
                            : ""}
                    </Collapse>
                </List>
                <List>
                    <ListItem key="messages" disablePadding>
                        <ListItemButton
                            onClick={() => setIsOpenMessages(!isOpenMessages)}
                        >
                            <ListItemIcon>
                                <MailIcon />
                            </ListItemIcon>
                            <ListItemText primary={"Messages"} />
                            {isOpenMessages ? <ExpandLess /> : <ExpandMore />}
                        </ListItemButton>
                    </ListItem>
                    <Collapse
                        in={isOpenMessages}
                        timeout="auto"
                        unmountOnExit
                    ></Collapse>
                </List>
            </Drawer>
            <Main open={open}>
                <DrawerHeader />
                <Outlet />
            </Main>
        </Box>
    );
}
function connectForRealtorToSignalR() {
    throw new Error("Function not implemented.");
}

