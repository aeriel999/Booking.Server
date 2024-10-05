import '../../../css/HistoryOfFeedbacksByClient/index.scss';
import { useEffect, useState } from "react";
import { useAppSelector } from "../../../hooks/redux";
import { AppDispatch, RootState } from "../../../store";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getHistoryOfFeedbacksByClient } from "../../../store/post/post.actions";
import { IFetchData } from "../../../interfaces/post";
import { Feedback } from "../../../components/common/Feedback/Feedback";
import { APP_ENV } from "../../../env";
import { Pagination } from '../../../components/common/Pagination/Pagination';
import { Status } from '../../../utils/enum';
import { Loading } from '../../../components/common/Loading/Loading';
import { setIdOfSelectedFeedback } from '../../../store/post/post.slice';


export const HistoryOfFeedbacksPage = () => {

    const navigate = useNavigate();

    const historyOfFeedbacks = useAppSelector((state: RootState) => state.post.historyOfFeedbacksByClient);
    const status = useAppSelector((state: RootState) => state.post.status);
    const user = useAppSelector((state: RootState) => state.account.user);

    const dispatch = useDispatch<AppDispatch>();

    const [currentPage, setCurrentPage] = useState<number>(1);
    const [avatar, setAvatar] = useState<string | null>(null);

    const getHistoryOfFeedbacks = async () => {
        const firstPage: IFetchData = {
            page: currentPage,
            sizeOfPage: 6
        }
        await dispatch(getHistoryOfFeedbacksByClient(firstPage));
    }
    useEffect(() => {
        getHistoryOfFeedbacks();
    }, [])
    useEffect(() => {
        console.log(historyOfFeedbacks);
    }, [historyOfFeedbacks])
    useEffect(() => {
        if (user) {

            if (user?.avatar != null) {
                if (user?.avatar.slice(0, 5) == "https") {
                    setAvatar(user?.avatar);
                }
                else {
                    setAvatar(APP_ENV.BASE_URL + user?.avatar);
                }

            }
        }
    }, [user])
    const changePage = async () => {
        const page: IFetchData = {
            page: currentPage,
            sizeOfPage: 6
        }
        await dispatch(getHistoryOfFeedbacksByClient(page));
    }
    useEffect(() => {
        changePage();
    }, [currentPage])
    return (
        <div id="history-of-feedbacks">
            {status == Status.LOADING ? <Loading /> : ""}
            {historyOfFeedbacks ? historyOfFeedbacks.items.$values.map((item) => (
                <div
                    tabIndex={0}
                    className="history-of-feedbacks-item"
                    key={item.feedbackId}
                    onClick={() => {
                        navigate(`/posts/post/${item.postId}`);
                        dispatch(setIdOfSelectedFeedback(item.feedbackId))
                    }}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            navigate(`/posts/post/${item.postId}`);
                            dispatch(setIdOfSelectedFeedback(item.feedbackId))
                        }
                    }}
                >
                    <div className='history-of-feedbacks-item-post-details'>
                        <img src={`${APP_ENV.BASE_URL}/images/posts/${item.imageOfPost}`} alt="Image of post" />
                        <div className='location'>
                            <p>{item.nameOfPost}</p>
                            <p>{item.city}, {item.country}</p>
                        </div>
                    </div>
                    <Feedback
                        userName={user!.firstName && user!.lastName ? `${user!.firstName} ${user!.lastName}` : user!.email}
                        avatar={avatar}
                        message={item.textOfFeedback}
                        rating={item.rating}
                        date={item.feedbackAt}
                    />

                </div>

            )) : ""}
            {historyOfFeedbacks && historyOfFeedbacks.totalCount > 6 ?
                <Pagination page={currentPage} sizeOfPage={6} countOfPosts={historyOfFeedbacks.totalCount} changePage={setCurrentPage} /> : ""}
        </div>
    )
}