import {AnyAction, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {jwtDecode} from 'jwt-decode';
import {addLocalStorage, deleteLocalStorage} from "../../utils/storage/localStorageUtils.ts";

import {RejectedAction} from "../../utils/types";

import {confirmEmail, forgotPassword, login, realtorRegister, resetPassword, userRegister} from "./account.actions.ts";
import {Status} from "../../utils/enum";
import {IAccountState} from "../../interfaces/account";

function isRejectedAction(action: AnyAction): action is RejectedAction {
    return action.type.endsWith('/rejected');
}
const updateLoginUserState = (state: IAccountState, token: string): void => {
    const decodedToken: { [key: string]: string } = jwtDecode(token);

    console.log("decodedToken", decodedToken)
    const  email  = decodedToken["email"]
    const role = decodedToken["Roles"]

    if(role === "realtor")
    {
        const firstName = decodedToken["family_name"];
        const lastName = decodedToken["given_name"];
        const phoneNumber = decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/mobilephone"];
        const avatar = decodedToken["Avatar"];

        state.user = {
            email: email,
            role: role,
            firstName:   firstName,
            lastName:   lastName,
            phoneNumber:  phoneNumber,
            avatar:  "/images/avatars/" +  avatar
        };
    }else {
        state.user = {
            email: email,
            role: role,
            firstName:   null,
            lastName:   null,
            phoneNumber:  null,
            avatar:    null
        };
    }
    state.token = token;
    state.isLogin = true;

    addLocalStorage('authToken', token);
};

const initialState: IAccountState = {
    user: null,
    token: null,
    isLogin: false,
    status: Status.IDLE,
};

export const accountsSlice = createSlice({
    name: 'account',
    initialState,
    reducers: {
        autoLogin: (state, action: PayloadAction<string>) => {
            updateLoginUserState(state, action.payload);
        },

        logout: (state) => {
            deleteLocalStorage('authToken');
            state.user = null;
            state.token = null;
            state.isLogin = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.fulfilled, (state, action) => {
                updateLoginUserState(state, action.payload);
                state.status = Status.SUCCESS;
            })
            .addCase(login.pending, (state) => {
                state.status = Status.LOADING;
            })
            .addCase(userRegister.fulfilled, (state) => {
                state.status = Status.SUCCESS;
            })
            .addCase(userRegister.pending, (state) => {
                state.status = Status.LOADING;
            })
            .addCase(confirmEmail.fulfilled, (state, action) => {
                console.log("action.payload", action.payload)
                updateLoginUserState(state, action.payload);
                state.status = Status.SUCCESS;
            })
            .addCase(confirmEmail.pending, (state) => {
                state.status = Status.LOADING;
            })
            .addCase(realtorRegister.fulfilled, (state) => {
                state.status = Status.SUCCESS;
            })
            .addCase(realtorRegister.pending, (state) => {
                state.status = Status.LOADING;
            })
            .addCase(forgotPassword.fulfilled, (state) => {
                state.status = Status.SUCCESS;
            })
            .addCase(forgotPassword.pending, (state) => {
                state.status = Status.LOADING;
            })
            .addCase(resetPassword.fulfilled, (state) => {
                state.status = Status.SUCCESS;
            })
            .addCase(resetPassword.pending, (state) => {
                state.status = Status.LOADING;
            })
            .addMatcher(isRejectedAction, (state) => {
                state.status = Status.ERROR;
            });
    },
});

export const { autoLogin, logout } = accountsSlice.actions;
export default accountsSlice.reducer;
