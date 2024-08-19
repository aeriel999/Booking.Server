import '../../../css/RatingClasses/index.scss'
import { useEffect, useState } from 'react';
import starEmpty from '../../../assets/Icons/star-01.svg';
import starFull from '../../../assets/Icons/star-02.svg';
import starHalf from '../../../assets/Icons/star-03.svg';

interface IRating {
    rating: number;
    //countOfRating: number;
}

export const Rating = (info: IRating) => {

    const [fullStars, setFullStars] = useState(0);
    const [emptyStars, setEmptyStars] = useState(0);
    const [isHalf, setIsHalf] = useState(false);

    useEffect(() => {
        let half = info.rating - Math.floor(info.rating) == 0;
        let full = Math.floor(info.rating);
        let empty = 5 - full - (half ? 0 : 1);
        setIsHalf(half);
        setFullStars(full);
        setEmptyStars(empty);
    }, [info.rating])
    return (
        <div className="card-rating">
            {[...Array(fullStars)].map((_, index) => (
                <div className='star' key={`full-star-${index}`}>
                    <img src={starFull} alt="" />
                </div>
            ))}
            {!isHalf ? <div className='star'>
                <img src={starHalf} alt="" />
            </div> : ""}
            {[...Array(emptyStars)].map((_, index) => (
                <div className='star' key={`empty-star-${index}`}>
                    <img src={starEmpty} alt="" />
                </div>
            ))}

        </div>
    )
}
//<p>({info.countOfRating})</p>