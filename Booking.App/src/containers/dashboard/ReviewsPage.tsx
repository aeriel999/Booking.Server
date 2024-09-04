import "../../css/DashBoardAnonymousClasses/index.scss";
import Test from "../../assets/Templates/Rectangle-50.webp";
import { Rating } from "@mui/material";

export function ReviewsPage() {
    return (
        <div className="rewievContainer">
            <h1>Rewiews</h1>
            <div className="revievedCard">
                <div className="postInfoHeader">
                    <div className="postInfo">
                        <img src={Test} alt="" />
                        <div className="postGeneralInfo">
                            <div className="name">Smart House Apartments</div>
                            <div className="address">Lviv, Ukraine</div>
                        </div>
                    </div>
                    <div className="rating">
                        <Rating name="read-only" value={3.4} readOnly />
                    </div>
                </div>

                <div className="rewiev">
                    <div
                        className="lefRewievtContainer"
                        style={{
                            background: `url(${Test}) lightgray 50% / cover no-repeat`,
                        }}
                    ></div>

                    <div className="rightRewievContainer">
                        <div className="topPart">
                            <div className="leftPart">
                                <div className="name">Mark Stanly</div>
                                <div className="date">2 год тому</div>
                            </div>
                            <div className="rightPart"></div>
                        </div>
                        <div className="reviewText">
                            If you specify a different root, remember that
                            __dirname will still be the folder of your
                            vite.config.js file when resolving the input paths.
                            Therefore, you will need to add your root entry to
                            the arguments for
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
