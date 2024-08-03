import { AnyAction, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";
import {
    addLocalStorage,
    deleteLocalStorage,
} from "../../utils/storage/localStorageUtils.ts";
import { RejectedAction } from "../../utils/types";
import {
    changeEmail,
    confirmEmail,
    editProfile,
    forgotPassword,
    googleLogin,
    login,
    realtorRegister,
    reconfirmEmail,
    reloadAvatar,
    reloadProfileHeaderImage,
    resetPassword,
    userRegister,
} from "./account.actions.ts";
import { Status } from "../../utils/enum";
import { IAccountState, IRealtorRegister } from "../../interfaces/account";

function isRejectedAction(action: AnyAction): action is RejectedAction {
    return action.type.endsWith("/rejected");
}
const updateLoginUserState = (state: IAccountState, token: string): void => {
    const decodedToken: { [key: string]: string } = jwtDecode(token);

    const email = decodedToken["email"];
    const role =
        decodedToken[
            "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
        ];
    const id = decodedToken["sub"];
    const headerImage = decodedToken["ProfileHeaderImage"];
    const avatar = decodedToken["Avatar"];

    if (role === "realtor") {
        const firstName = decodedToken["family_name"];
        const lastName = decodedToken["given_name"];
        const phoneNumber =
            decodedToken[
                "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/mobilephone"
            ];

        const rating = decodedToken["Rating"];

        state.user = {
            id: id,
            email: email,
            role: role,
            firstName: firstName,
            lastName: lastName,
            phoneNumber: phoneNumber,
            avatar: "/images/avatars/" + avatar,
            rating: Number(rating),
            profileHeaderImage:
                headerImage === null ? null : "/images/avatars/" + headerImage,
        };
    } else {
        state.user = {
            id: id,
            email: email,
            role: role,
            firstName: null,
            lastName: null,
            phoneNumber: null,
            avatar: avatar === null ? null : "/images/avatars/" + avatar,
            rating: null,
            profileHeaderImage:
                headerImage === null ? null : "/images/avatars/" + headerImage,
        };
    }
    state.token = token;
    state.isLogin = true;

    addLocalStorage("authToken", token);
};

const initialState: IAccountState = {
    user: null,
    token: null,
    isLogin: false,
    status: Status.IDLE,
    registerData: null,
};

export const accountsSlice = createSlice({
    name: "account",
    initialState,
    reducers: {
        autoLogin: (state, action: PayloadAction<string>) => {
            updateLoginUserState(state, action.payload);
        },

        logout: (state) => {
            deleteLocalStorage("authToken");
            state.user = null;
            state.token = null;
            state.isLogin = false;
        },

        realtorRegisterFirstStep: (
            state,
            action: PayloadAction<IRealtorRegister>
        ) => {
            state.registerData = action.payload;
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
            .addCase(googleLogin.fulfilled, (state, action) => {
                updateLoginUserState(state, action.payload.token);
                state.status = Status.SUCCESS;
            })
            .addCase(googleLogin.pending, (state) => {
                state.status = Status.LOADING;
            })
            .addCase(userRegister.fulfilled, (state) => {
                state.status = Status.SUCCESS;
            })
            .addCase(userRegister.pending, (state) => {
                state.status = Status.LOADING;
            })
            .addCase(confirmEmail.fulfilled, (state, action) => {
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
            .addCase(editProfile.fulfilled, (state, action) => {
                const { token } = action.payload;
                updateLoginUserState(state, token);
                state.status = Status.SUCCESS;
            })
            .addCase(editProfile.pending, (state) => {
                state.status = Status.LOADING;
            })
            .addCase(reloadAvatar.fulfilled, (state, action) => {
                updateLoginUserState(state, action.payload);
                state.status = Status.SUCCESS;
            })
            .addCase(reloadAvatar.pending, (state) => {
                state.status = Status.LOADING;
            })
            .addCase(reloadProfileHeaderImage.fulfilled, (state, action) => {
                updateLoginUserState(state, action.payload);
                state.status = Status.SUCCESS;
            })
            .addCase(reloadProfileHeaderImage.pending, (state) => {
                state.status = Status.LOADING;
            })
            .addCase(changeEmail.fulfilled, (state) => {
                state.status = Status.SUCCESS;
            })
            .addCase(changeEmail.pending, (state) => {
                state.status = Status.LOADING;
            })
            .addCase(reconfirmEmail.fulfilled, (state) => {
                state.status = Status.SUCCESS;
            })
            .addCase(reconfirmEmail.pending, (state) => {
                state.status = Status.LOADING;
            })
            .addMatcher(isRejectedAction, (state) => {
                state.status = Status.ERROR;
            });
    },
});

export const { autoLogin, logout, realtorRegisterFirstStep } =
    accountsSlice.actions;
export default accountsSlice.reducer;
