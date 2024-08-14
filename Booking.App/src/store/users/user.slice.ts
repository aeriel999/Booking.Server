import { AnyAction, createSlice } from '@reduxjs/toolkit';
import { RejectedAction } from "../../utils/types";
import { Status } from "../../utils/enum";
import { IUserState } from "../../interfaces/user";
import { changePassword, deleteUserAccount, editUserProfile, getFeedbacksByRealtor, getFilteredListOfRealtors, getListOfRealtors, getRealtorById, getRealtorsByUserFeedbacks, sendFeedback } from "./user.action.ts";

function isRejectedAction(action: AnyAction): action is RejectedAction {
    return action.type.endsWith('/rejected');
}

const initialState: IUserState = {
    status: Status.IDLE,
    realtors: null,
    realtor: null,
    feedbacks: null,
    realtorsByUserFeedbacks: null,
    filteredRealtors: null
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(changePassword.fulfilled, (state) => {
                state.status = Status.SUCCESS;
            })
            .addCase(changePassword.pending, (state) => {
                state.status = Status.LOADING;
            })
            .addCase(getListOfRealtors.fulfilled, (state, action) => {
                state.realtors = action.payload.$values;
                state.status = Status.SUCCESS;
            })
            .addCase(getListOfRealtors.pending, (state) => {
                state.status = Status.LOADING;
            })
            .addCase(getFilteredListOfRealtors.fulfilled, (state, action) => {
                state.filteredRealtors = action.payload.$values;
                state.status = Status.SUCCESS;
            })
            .addCase(getFilteredListOfRealtors.pending, (state) => {
                state.status = Status.LOADING;
            })
            .addCase(getRealtorById.fulfilled, (state, action) => {
                state.realtor = action.payload;
                /*if (state.feedbacks?.items.$values != null) {
                    state.feedbacks?.items.$values.map((item) => {
                        const date = new Date(item.feedbackAt);
                        item.feedbackAt = date;
                    })
                }*/
                state.status = Status.SUCCESS;
            })
            .addCase(getRealtorById.pending, (state) => {
                state.status = Status.LOADING;
            })
            .addCase(getFeedbacksByRealtor.fulfilled, (state, action) => {
                state.feedbacks = action.payload;
                state.status = Status.SUCCESS;
            })
            .addCase(getFeedbacksByRealtor.pending, (state) => {
                state.status = Status.LOADING;
            })
            .addCase(sendFeedback.fulfilled, (state) => {
                state.status = Status.SUCCESS;
            })
            .addCase(sendFeedback.pending, (state) => {
                state.status = Status.LOADING;
            })
            .addCase(getRealtorsByUserFeedbacks.fulfilled, (state, action) => {
                state.realtorsByUserFeedbacks = action.payload;
                state.status = Status.SUCCESS;
            })
            .addCase(getRealtorsByUserFeedbacks.pending, (state) => {
                state.status = Status.LOADING;
            })
            .addCase(deleteUserAccount.fulfilled, (state) => {
                state.status = Status.SUCCESS;
            })
            .addCase(deleteUserAccount.pending, (state) => {
                state.status = Status.LOADING;
            })
            .addCase(editUserProfile.fulfilled, (state) => {
                state.status = Status.SUCCESS;
            })
            .addCase(editUserProfile.pending, (state) => {
                state.status = Status.LOADING;
            })
            .addMatcher(isRejectedAction, (state) => {
                state.status = Status.ERROR;
            })

            ;
    },
});

export default userSlice.reducer;
