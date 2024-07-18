import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { Outlet, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";


import './style.scss';
import logo from './logo.png';
import { HomePage } from '../../client/HomePage/HomePage';

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

export default function AnonymousDashboardLayout() {
    // const [open, setOpen] = React.useState(false);
    const navigate = useNavigate();

    return (

        <div className='head'>
            <div className="shapka">
                <div className="auth">
                    <img src={logo} />

                    <button onClick={() => {
                        navigate("/authentication/user-register");
                    }}>��������������</button>
                    <button onClick={() => {
                        navigate("/authentication/login");
                    }}>�����</button>
                </div>
                <div className="searching">
                    <div>Travel, visit new places with TripBook!</div>
                    <div>
                        <input placeholder="̳��� �������?" />
                        <input type="date" placeholder="���� ������ - �����" />
                        <input placeholder="ʳ������ ��� - �����" />
                        <button>������</button>
                    </div>
                </div>
            </div>
            <Outlet />
        </div>


    );
}
/*

<header>
            <div className="shapka">
                <div className="auth">
                    <img src={logo} />

                    <button onClick={() => {
                        navigate("/authentication/user-register");
                    }}>��������������</button>
                    <button onClick={() => {
                        navigate("/authentication/login");
                    }}>�����</button>
                </div>
                <div className="searching">
                    <div>Travel, visit new places with TripBook!</div>
                    <div>
                        <input placeholder="̳��� �������?" />
                        <input type="date" placeholder="���� ������ - �����" />
                        <input placeholder="ʳ������ ��� - �����" />
                        <button>������</button>
                    </div>
                </div>
            </div>
        </header>

 <Box sx={{ display: "flex" }}>
            <CssBaseline />
            <AppBar position="fixed" open={false}>
                <Toolbar sx={{ backgroundColor: "#BD8BE7" }}>
                    <Button
                        sx={{ marginLeft: "auto" }}
                        onClick={() => {
                            navigate("/authentication/login");
                        }}
                        color={"inherit"}
                    >
                        Login
                    </Button>
                    <Button
                        onClick={() => {
                            navigate("/authentication/user-register");
                        }}
                        color={"inherit"}
                    >
                        Register
                    </Button>
                </Toolbar>
            </AppBar>

            <Main open={false}>
                <DrawerHeader />
                <Outlet />
            </Main>
        </Box>
*/