import '../../../css/FeedbackClasses/index.scss';
import { Avatar } from "../Avatar/Avatar";
import starFull from '../../../assets/Icons/star-02.svg';
import { formatDistanceToNow } from "date-fns";
import { useEffect, useState } from 'react';
import { APP_ENV } from '../../../env';

interface IFeedback {
    userName: string,
    avatar: string | null,
    message: string,
    rating: number,
    date: Date
}

export const Feedback = (info: IFeedback) => {

    const [avatar, setAvatar] = useState<string | null>(null);

    useEffect(() => {
        if (info.avatar != null && info.avatar.trim() != "") {
            if (info.avatar.slice(0, 4) == "http") {
                setAvatar(info.avatar);
            }
            else {
                setAvatar(APP_ENV.BASE_URL + "/images/avatars/" + info.avatar);
            }
        }
    }, [info])

    return (
        <div className="feedback">
            <div className="feedback-user-information">
                {avatar == null ? <Avatar userName={info.userName} /> : <img className="avatarImg" src={avatar} alt="Avatar" />}
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