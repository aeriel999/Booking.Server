
import './style.scss';

interface IPostCard {
    post: string;
    image: string;
    rating: number;
    city: string;
    country: string
}

export const PostCard = (info: IPostCard) => {
    return (
        <div className="card">
            <img src={info.image}></img>
            <div className="location">
                <p>{info.post}</p>
                <p>{info.country}, {info.city}</p>
            </div>
            <div className="rating">
                {info.rating}
            </div>
        </div>
    )
}