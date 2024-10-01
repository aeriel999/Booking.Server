import '../../../css/RoomCardClasses/index.scss';
import { APP_ENV } from "../../../env"
import bankNote from '../../../assets/Icons/bank-note-05.svg';
import coinHand from '../../../assets/Icons/coin-hand.svg';
import x from '../../../assets/Icons/x-01 (1).svg';
import { joinNewPostChatByUser } from '../../../SignalR';
import { AppDispatch } from '../../../store';
import { useDispatch } from 'react-redux';
import { savePostIdForChat } from '../../../store/settings/settings.slice';
import { useNavigate } from 'react-router-dom';

interface IRoomCard {
    id: string,
    postId: string;
    image: string,
    discount: number | null,
    price: number,
    numberOfGuests: number,
    numberOfRooms: number
}
export const RoomCard = (info: IRoomCard) => {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    return (
        <div className="room-card">
            <img src={`${APP_ENV.BASE_URL}/images/posts/${info.image}`} alt="Main Photo" />
            <div className='room-card-info'>
                <p>Room for {info.numberOfGuests} people</p>
                {info.discount ?
                    <>
                        <p>Discount:</p>
                        <p>{info.discount} %</p>
                    </>
                    : ""}
                <p>Number of guests:</p>
                <p>{info.numberOfGuests}</p>
                <div className='room-card-info-details'>
                    <div>
                        <img src={bankNote} alt="Bank Note" />
                        <p>Includes taxes and fees</p>
                    </div>
                    <div>
                        <img src={coinHand} alt="Coin Hand" />
                        <p>Free cancellation</p>
                    </div>
                    <div>
                        <img src={x} alt="x" />
                        <p>No prepayment</p>
                    </div>
                </div>
            </div>
            <div className='room-card-booking'>
                <div className='room-card-booking-price'>
                    <p>{info.price} UAH</p>
                    <p>/ 1 day</p>
                </div>
                <button
                    onClick={async () => {
                        await joinNewPostChatByUser(info.postId)
                            .then((id) => {
                                dispatch(savePostIdForChat(id));
                                navigate("/dashboard/profile/page-of-messages");
                            });
                    }}
                >Booking</button>
                <div className='room-card-booking-details'>
                    <p>. It will only take 2 minutes</p>
                    <p>. Instant confirmation</p>
                </div>

            </div>
        </div>
    )
}