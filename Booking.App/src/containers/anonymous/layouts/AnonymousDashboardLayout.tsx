import { Outlet, useNavigate } from "react-router-dom";
import "../../../css/DashBoardAnonymousClasses/index.scss";
import logo from "../../../assets/Logo/tripbook 1.svg";
import dot from "../../../assets/Icons/mingcute_map-pin-line.svg";
import calendar from "../../../assets/Icons/calendar-06.svg";
import human from "../../../assets/Icons/user-profile-03.svg";

export default function AnonymousDashboardLayout() {
    const navigate = useNavigate();

    return (
        <div className="mainDashboard">
            <header>
                <div className="shapka">
                    <div className="auth">
                        <img src={logo} />

                        <button
                            onClick={() => {
                                navigate("/authentication/user-register");
                            }}
                        >
                            Register
                        </button>
                        <button
                            onClick={() => {
                                navigate("/authentication/login");
                            }}
                        >
                            Login
                        </button>
                    </div>
                    <div className="searching">
                        <div>Travel, visit new places with TripBook!</div>
                        <form>
                            <img src={dot} />
                            <input placeholder="Place of travel?" />
                            <img src={calendar} />
                            <input
                                type="text"
                                placeholder="Date of arrival - departure"
                                onFocus={(event) => {
                                    event.target.type = "date";
                                }}
                                onBlur={(event) => {
                                    event.target.type = "text";
                                }}
                            />
                            <img src={human} />
                            <input placeholder="Count of people - number" />
                            <button>Find</button>
                        </form>
                    </div>
                </div>
            </header>
            <Outlet />
            <footer>
                <img src={logo} />
                <div className="explore">
                    <p>Explore</p>
                    <div>
                        <a>Countries</a> <a>Regions</a> <a>Cities</a>{" "}
                        <a>Districts</a> <a>Attractions</a> <a>Airports</a>{" "}
                        <a>Hotels</a>
                    </div>
                </div>
            </footer>
        </div>
    );
}
/*
 


*/
