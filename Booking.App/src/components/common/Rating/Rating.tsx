import '../../../css/RatingClasses/index.scss'
import { useEffect, useState } from 'react';
import starEmpty from '../../../assets/Icons/star-01.svg';
import starFull from '../../../assets/Icons/star-02.svg';
import starHalf from '../../../assets/Icons/star-03.svg';

interface IRating {
    rating: number;
    isSelecting: boolean;
    selectedRating: React.Dispatch<React.SetStateAction<number | null>> | null
}

export const Rating = (info: IRating) => {

    const [fullStars, setFullStars] = useState(0);
    const [isHalf, setIsHalf] = useState(false);
    const [enteredStar, setEnteredStar] = useState<number | null>(null);
    const [selectedStar, setSelectedStar] = useState<number | null>(null);


    useEffect(() => {
        let half = info.rating - Math.floor(info.rating) != 0;
        let full = Math.floor(info.rating);
        setIsHalf(half);
        setFullStars(full);
    }, [info.rating])

    useEffect(() => {
        if (info.isSelecting == true && enteredStar != null) {
            let half = enteredStar - Math.floor(enteredStar) != 0;
            let full = Math.floor(enteredStar);
            setIsHalf(half);
            setFullStars(full);
        }
    }, [enteredStar])

    const mouseEnter = (index: number) => {
        if (info.isSelecting) {
            setEnteredStar(index + 1)
        }
    }
    const mouseLeave = () => {
        if (info.isSelecting) {
            setEnteredStar(selectedStar != null ? selectedStar : 0)
        }
    }
    const onClick = (index: number) => {
        if (info.isSelecting) {
            setSelectedStar(isHalf ? index + 0.5 : index + 1);

            if (info.selectedRating)
                info.selectedRating(isHalf ? index + 0.5 : index + 1);
        }
    }
    const onMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, index: number) => {
        if (info.isSelecting) {
            const offsetX = e.nativeEvent.offsetX;
            const width = e.currentTarget.offsetWidth;
            setEnteredStar(offsetX < width / 2 ? index + 0.5 : index + 1);
        }
    }
    return (
        <div className="card-rating" onMouseLeave={() => mouseLeave()}>
            {[...Array(5)].map((_, index) => {
                const isFull = (index + 1) <= fullStars;
                const isHalfStar = !isFull && isHalf && index === fullStars;

                return (
                    <div className='star' key={`star-${index}`} >
                        <img
                            style={{ cursor: info.isSelecting ? "pointer" : "default" }}
                            src={isFull ? starFull : isHalfStar ? starHalf : starEmpty}
                            alt="star"
                            onClick={() => onClick(index)}
                            onMouseEnter={() => mouseEnter(index)}
                            onMouseMove={(e) => onMove(e, index)} />

                    </div>
                )
            })}


        </div>
    )
}
//<p>({info.countOfRating})</p>
/*
<div className="card-rating" onMouseLeave={() => mouseLeave()}>
            {[...Array(fullStars)].map((_, index) => (
                <div className='star' key={`full-star-${index}`} >
                    <img src={starFull} alt="" onClick={() => onClick(index)} onMouseEnter={() => mouseEnter(index)} />
                </div>
            ))}
            {!isHalf ? <div className='star'>
                <img src={starHalf} alt="" />
            </div> : ""}
            {[...Array(emptyStars)].map((_, index) => (
                <div className='star' key={`empty-star-${index}`}>
                    <img
                        src={starEmpty}
                        alt=""
                        onMouseEnter={() => mouseEnter(index)}


                    />
                </div>
            ))}

        </div>
*/