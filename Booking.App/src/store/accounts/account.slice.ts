import {AnyAction, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {jwtDecode} from 'jwt-decode';
import {addLocalStorage, deleteLocalStorage} from "../../utils/storage/localStorageUtils.ts";

import {RejectedAction} from "../../utils/types";

import {login, register} from "./account.actions.ts";
import {Status} from "../../utils/enum";
import {IAccountState, IUser} from "../../interfaces/account";

function isRejectedAction(action: AnyAction): action is RejectedAction {
    return action.type.endsWith('/rejected');
}
const updateUserState = (state: IAccountState, token: string): void => {
    const { name, email, roles } = jwtDecode<IUser>(token);
    state.user = {
        name,
        email,
        roles,
    };
    state.token = token;
    state.isLogin = true;

    addLocalStorage('authToken', token);
};

//state - нашого редюсера
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
        register: (state, action: PayloadAction<string>) => {
            updateUserState(state, action.payload);
        },
        //Залогінити користувача
        autoLogin: (state, action: PayloadAction<string>) => {
            updateUserState(state, action.payload);
        },
        //провести вихід із системи
        logout: (state) => {
            deleteLocalStorage('authToken');
            state.user = null;
            state.token = null;
            state.isLogin = false;
        },
    },
    extraReducers: (builder) => {
        builder
            //команда завершена - логінимо користувача
            .addCase(login.fulfilled, (state, action) => {
                const {token} = action.payload;
                updateUserState(state, token);
                state.status = Status.SUCCESS;
            })
            //режим очікування
            .addCase(login.pending, (state) => {
                state.status = Status.LOADING;
            })
            .addCase(register.fulfilled, (state, action) => {
                const {token} = action.payload;
                updateUserState(state, token);
                state.status = Status.SUCCESS;
            })
            .addCase(register.pending, (state) => {
                state.status = Status.LOADING;
            })
            //якщо щось пішло не так
            .addMatcher(isRejectedAction, (state) => {
                state.status = Status.ERROR;
            });
    },
});

export const { autoLogin, logout } = accountsSlice.actions;
export default accountsSlice.reducer;
