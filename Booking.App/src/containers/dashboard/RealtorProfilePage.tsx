import { useAppSelector } from "../../hooks/redux";
import { APP_ENV } from "../../env";
import { useEffect, useState } from "react";
import HeaderImg from "../../assets/Templates/Rectangle-50.webp";
import Upload from "../../assets/DashboardIcons/camera-01.svg";
import Edit from "../../assets/DashboardIcons/Icon.svg";
import Lock from "../../assets/DashboardIcons/lock-02.svg";
import { Rating } from "@mui/material";
import { useNavigate } from "react-router-dom";

// APP
export default function RealtorProfilePage() {
    const { user } = useAppSelector((state) => state.account);
    const [avatarUrl, setAvatarUrl] = useState<string>();
    const [rating, setRating] = useState<number>(user?.rating ?? 0);
    const navigate = useNavigate();
    
    useEffect(() => {
        if (user) {
            setAvatarUrl(APP_ENV.BASE_URL + user?.avatar);
            setRating(user?.rating ?? 0);
        }
    }, [user]);

    return (
        <div className="profileMainContainer">
            <div
                className="header"
                style={{
                    background: `url(${HeaderImg}) center / cover no-repeat`,
                }}
            ></div>
            <div
                className="avatar"
                style={{
                    background: `url(${avatarUrl}) center / cover no-repeat`,
                }}
            >
                <div className="uploadIcon">
                    <img id="logo" src={Upload} alt="Upload" />
                </div>
            </div>
            <div className="userInfoContainer">
                <div id="name">{user?.lastName + " " + user?.firstName}</div>
                <div id="rating">
                    <div id="text">Rate</div>
                    <Rating name="read-only" value={rating} readOnly />
                </div>
                <div id="infoContainer">
                    <div id="info">
                        <div className="textContainer">
                            <div className="name">Email: </div>
                            <div className="value">{user?.email}</div>
                        </div>
                        <div className="textContainer">
                            <div className="name">Phone: </div>
                            <div className="value">{user?.phoneNumber}</div>
                        </div>
                    </div>
                    <div id="buttons">
                    <button className="button colorButton"
                        onClick={()=>{navigate("/dashboard/profile/edit")}}> 
                        <img src={Edit} alt="Edit" />
                        <p>Edit Profile</p>
                        </button>
                    <button className="button witeButton"
                         onClick={()=>{navigate("/dashboard/profile/change-password")}}> 
                        <img src={Lock} alt="Edit"></img>
                        <p>Change Password</p>
                    </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

