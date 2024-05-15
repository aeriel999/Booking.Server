import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import {Outlet, useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../../hooks/redux";
import Avatar from "@mui/material/Avatar";
import {useEffect, useState} from "react";
import {APP_ENV} from "../../../env";
import {Rating} from "@mui/material";
import Button from "@mui/material/Button";
import {logout} from "../../../store/accounts/account.slice.ts";
import LogoutIcon from '@mui/icons-material/Logout';
import {  startListening} from "../../../SignalR";
import {getListOfChatRooms} from "../../../store/chat/chat.action.ts";
import { unwrapResult} from "@reduxjs/toolkit";
import {DotBadge} from "../../common/Badge.tsx";
import {addNewPostState, deleteNewPostState} from "../../../store/chat/chat.slice";
import AccountBoxTwoToneIcon from '@mui/icons-material/AccountBoxTwoTone';
import DynamicFeedTwoToneIcon from '@mui/icons-material/DynamicFeedTwoTone';
import AddBoxTwoToneIcon from '@mui/icons-material/AddBoxTwoTone';
import Inventory2TwoToneIcon from '@mui/icons-material/Inventory2TwoTone';

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
    open?: boolean;
}>(({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
        transition: theme.transitions.create('margin', {
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
    shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));

export interface IActive {
    setIsActive: (setIsActive: boolean) => void,
}

export default function DashboardLayout() {
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const {user} = useAppSelector(state => state.account);
    const [avatarUrl, setAvatarUrl] = useState<string>("#");
    const [rating, setRating] = useState<number>(user?.rating ?? 0);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    // const [isActive, setIsActive] = useState<IActive | undefined>();
     const {hasNewPosts} = useAppSelector(state => state.chat);

    useEffect(() => {
        if(user)
        {
            setAvatarUrl( APP_ENV.BASE_URL + user?.avatar);
            setRating(user?.rating ?? 0);

            const getRooms = async ()=>{
                try {
                    const response = await dispatch(getListOfChatRooms());
                    unwrapResult(response);
                }catch (e)
                {
                    console.log(e)
                }
            }

            getRooms()
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

    const addConnection = async () =>{
        console.log("Connect ///////////////")
      // await joinForPostListening("5c57dae8-39f3-41da-9bc8-521221e4bf44");
        dispatch(addNewPostState());
    }

    const  disconnect = async () =>{

       // await leave("5c57dae8-39f3-41da-9bc8-521221e4bf44");

        dispatch(deleteNewPostState());
    }

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed" open={open}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{ mr: 2, ...(open && { display: 'none' }) }}
                    >
                        <MenuIcon />
                    </IconButton>

                    {avatarUrl && <Avatar   alt="Remy Sharp" src={avatarUrl} />}

                    <Typography variant="h6" noWrap component="div" style={{marginLeft: "25px", marginRight: "25px"}}>
                        {user?.firstName + " " + user?.lastName}
                    </Typography>

                    <Rating name="read-only" value={rating} readOnly/>

                    <Button
                        onClick={()=>{
                        dispatch(logout());
                        navigate("/authentication/login");
                    }}
                    startIcon={<LogoutIcon/>}
                            color={"inherit"}>logout</Button>


                    <DotBadge isActive={hasNewPosts}/>

                    <Button onClick={addConnection} color={"inherit"}>Add connection</Button>
                    <Button onClick={disconnect} color={"inherit"}>End connection</Button>

                </Toolbar>
            </AppBar>
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
                variant="persistent"
                anchor="left"
                open={open}
            >
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <ListItem disablePadding>
                    <ListItemButton onClick={()=>{navigate("/dashboard/profile")}}>
                        <ListItemIcon>
                            <AccountBoxTwoToneIcon/>
                        </ListItemIcon>
                        <ListItemText primary={"Profile"} />
                    </ListItemButton>
                </ListItem>
                <Divider />

                <List>
                    <ListItem disablePadding>
                        <ListItemButton onClick={()=>{navigate("/dashboard/profile")}}>
                            <ListItemIcon>
                                <DynamicFeedTwoToneIcon/>
                            </ListItemIcon>
                            <ListItemText primary={"All Posts"} />
                        </ListItemButton>
                    </ListItem>

                    <ListItem disablePadding>
                        <ListItemButton onClick={()=>{navigate("/dashboard/post/add")}}>
                            <ListItemIcon>
                                <AddBoxTwoToneIcon/>
                            </ListItemIcon>
                            <ListItemText primary={"Add New Post"} />
                        </ListItemButton>
                    </ListItem>

                    <ListItem disablePadding>
                        <ListItemButton onClick={()=>{navigate("/dashboard/profile")}}>
                            <ListItemIcon>
                                <Inventory2TwoToneIcon/>
                            </ListItemIcon>
                            <ListItemText primary={"Archive"} />
                        </ListItemButton>
                    </ListItem>
                </List>
                <Divider />
                <List>
                    {['All mail', 'Trash', 'Spam'].map((text, index) => (
                        <ListItem key={text} disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                                </ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Drawer>
            <Main open={open}>
                <DrawerHeader />
                <Outlet/>
            </Main>
        </Box>
    );
}
