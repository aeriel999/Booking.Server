import Rate from "../../assets/DashboardIcons/rate.svg";
import { Rating } from "@mui/material";
import { ReviewCardProps } from "../../utils/types";
import { APP_ENV } from "../../env";
import Avatar from "../../assets/Auth/image20.svg";
import { useEffect, useState } from "react";
import { formatDistanceToNow } from "date-fns";

export function ReviewCard(props: ReviewCardProps) {
    const [avatar, setAvatar] = useState<string>(Avatar);

    useEffect(() => {
        if (props.avatar) {
            if (props.avatar.slice(0, 5) == "https") {
                console.log("props.avatar", props.avatar);

                setAvatar(props.avatar);
            } else {
                setAvatar(
                    `${APP_ENV.BASE_URL}/uploads/avatars/${props.avatar}`
                );
            }
        }
    }, [props]);
    return (
        <div className="revievedCard">
            <div className="postInfoHeader">
                <div className="postInfo">
                    <img src={props.postImage} alt="зщіеШьфпу" />
                    <div className="postGeneralInfo">
                        <div className="name">{props.postName}</div>
                        <div className="address">
                            {props.cityName}, {props.countryName}
                        </div>
                    </div>
                </div>
                <div className="rating">
                    <Rating
                        name="read-only"
                        value={props.postRaiting}
                        readOnly
                    />
                </div>
            </div>

            <div className="rewiev">
                <div
                    className="leftRewievtContainer"
                    style={{
                        background: `url(${avatar}) lightgray 50% / cover no-repeat`,
                    }}
                ></div>
                <div className="rightRewievContainer">
                    <div className="topPart">
                        <div className="leftPart">
                            <div className="name">{props.userName}</div>
                            <div className="date">
                                {formatDistanceToNow(props.date, {
                                    addSuffix: true,
                                })}
                            </div>
                        </div>
                        <div className="rightPart">
                            <div className="rateContainer">
                                <img src={Rate} alt="rating" />
                                <div className="rateText">
                                    {props.givenRate}/5
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="reviewText">{props.reviewText}</div>
                    <button className="reply">Reply</button>
                </div>
            </div>
        </div>
    );
}
