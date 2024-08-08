import '../../../css/PostCardForHomePageClasses/index.scss';
import { APP_ENV } from '../../../env';

interface IPostCard {
    post: string;
    image: string;
    rating: number;
    city: string;
    country: string;
    discount?: number | null;
}

export const PostCardForHomePage = (info: IPostCard) => {
    return (
        <div className="card">
            <img src={`${APP_ENV.BASE_URL}/images/posts/${info.image}`}></img>
            {(info.discount != null && info.discount != 0) ? <div className='discount'>-{info.discount}%</div> : ""}
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
// ${APP_ENV.BASE_URL}/images/posts/${info.image}