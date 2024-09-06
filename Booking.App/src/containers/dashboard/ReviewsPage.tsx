import { useEffect, useState } from "react";
import "../../css/DashBoardAnonymousClasses/index.scss";
import { ReviewCardProps } from "../../utils/types";
import { IFetchData } from "../../interfaces/post";
import { getListOfFeedbackForRealtor } from "../../store/post/post.actions";
import { useAppDispatch } from "../../hooks/redux";
import { unwrapResult } from "@reduxjs/toolkit";
import ErrorHandler from "../../components/common/ErrorHandler";
import { ReviewCard } from "../../components/realtorDashboard/ReviewCard";
import { TablePagination } from "@mui/material";

import OutlinedErrorAlert from "../../components/common/ErrorAlert";
import { APP_ENV } from "../../env";
import { TablePaginationActions } from "../../components/realtorDashboard/TablePagination";

export function ReviewsPage() {
    const dispatch = useAppDispatch();
    const [errorMessage, setErrorMessage] = useState<string | undefined>(
        undefined
    );
    const [feedbackList, setFeedbackList] = useState<ReviewCardProps[]>([]);
    const [totalCount, setTotalCount] = useState(0);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(3);
    const defaultFetchData: IFetchData = {
        page: 1,
        sizeOfPage: rowsPerPage,
    };
    const [fetchData, setFetchData] = useState<IFetchData>(defaultFetchData);

    const getfeedbackList = async (data: IFetchData) => {
        try {
            const response = await dispatch(getListOfFeedbackForRealtor(data));
            unwrapResult(response);
            return response;
        } catch (error) {
            setErrorMessage(ErrorHandler(error));
        }
    };

    //get list of feedback due to page and count of iteps per page
    useEffect(() => {
        getfeedbackList(fetchData).then((history) => {
            setFeedbackList(history?.payload.items.$values);
            setTotalCount(history?.payload.totalCount);
        });
    }, [fetchData]);

    const handleChangePage = (_event: unknown, newPage: number) => {
        setPage(newPage);
        setFetchData((prevData) => ({ ...prevData, page: newPage + 1 }));
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const newRowsPerPage = parseInt(event.target.value, 10);
        setRowsPerPage(newRowsPerPage);
        setPage(0); // Reset to the first page
        setFetchData({ page: 1, sizeOfPage: newRowsPerPage });
    };

    return (
        <div className="rewievContainer">
            {errorMessage && (
                <OutlinedErrorAlert message={errorMessage} textColor="#000" />
            )}
            <h1>Reviews</h1>
            {feedbackList.length > 0 ? (
                feedbackList.map((feedback, index) => (
                    <ReviewCard
                        key={index}
                        postName={feedback.postName}
                        countryName={feedback.countryName}
                        cityName={feedback.cityName}
                        postRaiting={feedback.postRaiting}
                        postImage={`${APP_ENV.BASE_URL}${"/images/posts/"}${
                            feedback.postImage
                        }`}
                        userName={feedback.userName}
                        date={feedback.date}
                        givenRate={feedback.givenRate}
                        reviewText={feedback.reviewText}
                        avatar={feedback.avatar}
                    />
                ))
            ) : (
                <p>No reviews available</p>
            )}

            <div className="pagination">
                <TablePagination
                    rowsPerPageOptions={[3, 6, 12]}
                    colSpan={6}
                    count={totalCount}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    ActionsComponent={TablePaginationActions}
                />
            </div>
        </div>
    );
}
