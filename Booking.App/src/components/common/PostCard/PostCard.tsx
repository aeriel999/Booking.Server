import "../../../css/PostCardClasses/index.scss";
import { APP_ENV } from "../../../env";
import { Rating } from "../Rating/Rating";

interface IPostCardInformation {
    id: string;
    name: string;
    city: string;
    country: string;
    image: string;
    rating: number;
    countOfRating: number;
    price: number;
    category: string;
    typeOfRest: string;
    realtor: string;
    onClick: () => void;
}

export const PostCard = (info: IPostCardInformation) => {
    return (
        <div
            className="post-card"
            onClick={info.onClick}
            tabIndex={0}
            onKeyDown={(e) => {
                if (e.key === "Enter") {
                    info.onClick();
                }
            }}
        >
            <div className="post-card-image">
                <img
                    src={`${APP_ENV.BASE_URL}/uploads/posts/${info.image}`}
                    alt=""
                />
            </div>
            <div className="post-card-information">
                <div className="post-card-name">
                    <p>{info.name}</p>
                </div>
                <div className="post-card-location">
                    <p>
                        {info.city}, {info.country}
                    </p>
                </div>
                <div className="post-card-rating">
                    <Rating
                        rating={info.rating}
                        isSelecting={false}
                        selectedRating={null}
                    ></Rating>
                    <div>({info.countOfRating})</div>
                </div>

                <div className="post-card-price">
                    <p>{info.price} UAH</p>
                </div>
                <div className="post-card-details">
                    <div>
                        <p>Category - </p>
                        <p>{info.category}</p>
                    </div>
                    <div>
                        <p>Type of rest - </p>
                        <p>{info.typeOfRest}</p>
                    </div>
                    <div>
                        <p>Realtor - </p>
                        <p>{info.realtor}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};
