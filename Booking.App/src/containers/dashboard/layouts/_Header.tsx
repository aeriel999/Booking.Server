import "../../../css/DashBoardRealtorClasses/index.scss";
import Logo from "../../../assets/Logo/tripbook 1.svg";
import TestImg from "../../../assets/Test/image 20.svg";

export default function DashboardHeader() {
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
                                background: `url(${TestImg}) center / cover no-repeat`,
                            }}
                        />
                        <div id="name">Tania Sunny</div>
                    </div>
                </div>
            </div>

            <div className="dashboardFooter">
                <p> </p>
            </div>
        </div>
    );
}
