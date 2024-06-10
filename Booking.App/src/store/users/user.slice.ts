import {AnyAction, createSlice} from '@reduxjs/toolkit';
import {RejectedAction} from "../../utils/types";
import {Status} from "../../utils/enum";
import { IUserState} from "../../interfaces/user";
import {changePassword, getListOfRealtors} from "./user.action.ts";

function isRejectedAction(action: AnyAction): action is RejectedAction {
    return action.type.endsWith('/rejected');
}

const initialState: IUserState = {
    status: Status.IDLE,
    realtors : null
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
            .addMatcher(isRejectedAction, (state) => {
                state.status = Status.ERROR;
            })

        ;
    },
});

export default userSlice.reducer;
