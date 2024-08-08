import '../../../css/PostCard/index.scss'
import { APP_ENV } from '../../../env';
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
}

export const PostCard = (info: IPostCardInformation) => {

    return (
        <div className="post-card">
            <div className="post-card-image">
                <img src={`${APP_ENV.BASE_URL}/images/posts/${info.image}`} alt="" />
            </div>
            <div className="post-card-information">
                <div className="post-card-name">
                    <p>{info.name}</p>
                </div>
                <div className="post-card-location">
                    <p>{info.city}, {info.country}</p>
                </div>
                <Rating rating={info.rating} countOfRating={info.countOfRating}></Rating>
                <div className="post-card-price">
                    <p>{info.price} UAH</p>
                </div>
                <div className="post-card-details">
                    <div><p>Category - </p><p>{info.category}</p></div>
                    <div><p>Type of rest - </p><p>{info.typeOfRest}</p></div>
                    <div><p>Realtor - </p><p>{info.realtor}</p></div>
                </div>
            </div>

        </div>
    )
}