import '../../../css/FeedbackClasses/index.scss';
import { Avatar } from "../Avatar/Avatar";
import starFull from '../../../assets/Icons/star-02.svg';
import { formatDistanceToNow } from "date-fns";

interface IFeedback {
    userName: string,
    avatar: string | null,
    message: string,
    rating: number,
    date: Date
}

export const Feedback = (info: IFeedback) => {
    return (
        <div className="feedback">
            <div className="feedback-user-information">
                {info.avatar == null ? <Avatar userName={info.userName} /> : <img className="avatar" src={info.avatar!} alt="Avatar" />}
                <div className="feedback-user-information-username">
                    <p>{info.userName}</p>
                    <p>{formatDistanceToNow(info.date, { addSuffix: true })}</p>
                </div>
                <div className="feedback-user-information-rating">
                    <img src={starFull} alt="" />
                    <p>{info.rating}/5</p>
                </div>
            </div>
            <div className="feedback-message">
                {info.message}
            </div>
        </div>
    );
}