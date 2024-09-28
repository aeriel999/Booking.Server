import { AnyAction, createSlice } from '@reduxjs/toolkit';
import { RejectedAction } from "../../utils/types";
import { Status } from "../../utils/enum";
import { IUserState } from "../../interfaces/user";
import { changePassword, deleteUserAccount, getFeedbacksByRealtor, getFilteredListOfRealtors, getListOfAllUsersForAdmin, getListOfRealtors, getRealtorById, getRealtorsByUserFeedbacks, sendFeedback } from "./user.action.ts";

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
            .addCase(getListOfAllUsersForAdmin.fulfilled, (state) => {
                state.status = Status.SUCCESS;
            })
            .addCase(getListOfAllUsersForAdmin.pending, (state) => {
                state.status = Status.LOADING;
            })
            //getListOfAllUsersForAdmin
            .addMatcher(isRejectedAction, (state) => {
                state.status = Status.ERROR;
            });
    },
});

export default userSlice.reducer;
