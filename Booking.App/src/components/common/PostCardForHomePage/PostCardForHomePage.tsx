import { useNavigate } from 'react-router-dom';
import '../../../css/PostCardForHomePageClasses/index.scss';
import { APP_ENV } from '../../../env';
import { cutNumber } from '../../../utils/data';

interface IPostCard {
    id: string;
    post: string;
    image: string;
    rating: number;
    city: string;
    country: string;
    discount?: number | null;
}


export const PostCardForHomePage = (info: IPostCard) => {
    const navigate = useNavigate();
    return (
        <div className="card" onClick={() => navigate(`/posts/post/${info.id}`)}>
            <img src={`${APP_ENV.BASE_URL}/images/posts/${info.image}`}></img>
            {(info.discount != null && info.discount != 0) ? <div className='discount'>-{info.discount}%</div> : ""}
            <div className="location">
                <p>{info.post}</p>
                <p>{info.country}, {info.city}</p>
            </div>
            <div className="rating">
                {cutNumber(info.rating)}
            </div>
        </div>
    )
}