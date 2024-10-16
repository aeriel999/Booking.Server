import { AnyAction, createSlice } from '@reduxjs/toolkit';
import { RejectedAction } from "../../utils/types";
import { Status } from "../../utils/enum";
import { IUserState } from "../../interfaces/user";
import { blockUserByAdmin, changePassword, deleteUserAccount, deleteUserByAdmin, getFeedbacksByRealtor, getFilteredListOfRealtors, getListOfAllRealtorsForAdmin, getListOfAllUsersForAdmin, getListOfRealtors, getRealtorById, getRealtorsByUserFeedbacks, sendFeedback, unblockUserByAdmin } from "./user.action.ts";

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
        clearFilterRealtors: (state) => {
            state.filteredRealtors = null;
        }
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
            .addCase(blockUserByAdmin.fulfilled, (state) => {
                state.status = Status.SUCCESS;
            })
            .addCase(blockUserByAdmin.pending, (state) => {
                state.status = Status.LOADING;
            })
            .addCase(unblockUserByAdmin.fulfilled, (state) => {
                state.status = Status.SUCCESS;
            })
            .addCase(unblockUserByAdmin.pending, (state) => {
                state.status = Status.LOADING;
            })
            .addCase(deleteUserByAdmin.fulfilled, (state) => {
                state.status = Status.SUCCESS;
            })
            .addCase(deleteUserByAdmin.pending, (state) => {
                state.status = Status.LOADING;
            })
            .addCase(getListOfAllRealtorsForAdmin.fulfilled, (state) => {
                state.status = Status.SUCCESS;
            })
            .addCase(getListOfAllRealtorsForAdmin.pending, (state) => {
                state.status = Status.LOADING;
            })
            //getListOfAllRealtorsForAdmin
            .addMatcher(isRejectedAction, (state) => {
                state.status = Status.ERROR;
            });
    },
});

export const { clearFilterRealtors } = userSlice.actions;

export default userSlice.reducer;
