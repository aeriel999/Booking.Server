import Test from "../../assets/Templates/Rectangle-50.webp";
import Rate from "../../assets/DashboardIcons/rate.svg";
import { Rating } from "@mui/material";
import { ReviewCardProps } from "../../utils/types";

export function ReviewCard(props: ReviewCardProps) {
    return (
        <div className="revievedCard">
            <div className="postInfoHeader">
                <div className="postInfo">
                    <img src={Test} alt="" />
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
                        background: `url(${props.postImage}) lightgray 50% / cover no-repeat`,
                    }}
                ></div>

                <div className="rightRewievContainer">
                    <div className="topPart">
                        <div className="leftPart">
                            <div className="name">{props.userName}</div>
                            <div className="date">{props.date}</div>
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
