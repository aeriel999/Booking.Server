import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiClient, apiMediaClient } from "../../utils/api/apiClient.ts";
import { handleAxiosError } from "../../utils/errors";
import {
    IChangeEmail,
    IConfirmEmail,
    IEditRealtorInfo,
    IForgotPassword,
    IGoogleLogin,
    ILogin,
    IRealtorRegister,
    IReconfirmEmail,
    IReloadAvatar,
    IResetPassword,
    IUserRegister,
} from "../../interfaces/account";

export const login = createAsyncThunk(
    "Authentication/login",
    async (payload: ILogin, { rejectWithValue }) => {
        try {
            const response = await apiClient.post(
                "/api/Authentication/login",
                payload
            );
            console.log("response.data", response.data);
            return response.data;
        } catch (error) {
            return rejectWithValue(handleAxiosError(error, "Error"));
        }
    }
);

export const googleLogin = createAsyncThunk(
    "Authentication/google-login",
    async (payload: IGoogleLogin, { rejectWithValue }) => {
        try {
            console.log("payload", payload);

            const response = await apiClient.post(
                "/api/Authentication/google-login",
                payload
            );
            return response.data;
        } catch (error) {
            console.log("error", error);
            return rejectWithValue(handleAxiosError(error, "Error"));
        }
    }
);

export const userRegister = createAsyncThunk(
    "Authentication/user-register",
    async (payload: IUserRegister, { rejectWithValue }) => {
        try {
            const response = await apiClient.post(
                "/api/Authentication/user-register",
                payload
            );
            return response.status;
        } catch (error) {
            return rejectWithValue(handleAxiosError(error, "Network error"));
        }
    }
);

export const realtorRegister = createAsyncThunk(
    "Authentication/realtor-register",
    async (payload: IRealtorRegister, { rejectWithValue }) => {
        try {
            const response = await apiMediaClient.post(
                "/api/Authentication/realtor-register",
                payload
            );
            return response.status;
        } catch (error) {
            return rejectWithValue(handleAxiosError(error, "Network error"));
        }
    }
);

export const confirmEmail = createAsyncThunk(
    "Authentication/confirm-email",
    async (payload: IConfirmEmail, { rejectWithValue }) => {
        try {
            const response = await apiClient.post(
                "/api/Authentication/confirm-email",
                payload
            );

            return response.data;
        } catch (error) {
            return rejectWithValue(handleAxiosError(error, "Network error"));
        }
    }
);

export const forgotPassword = createAsyncThunk(
    "Authentication/forgot-password",
    async (payload: IForgotPassword, { rejectWithValue }) => {
        try {
            const response = await apiClient.post(
                "/api/Authentication/forgot-password",
                payload
            );

            return response.data;
        } catch (error) {
            return rejectWithValue(handleAxiosError(error, "Network error"));
        }
    }
);

export const resetPassword = createAsyncThunk(
    "Authentication/reset-password",
    async (payload: IResetPassword, { rejectWithValue }) => {
        try {
            const response = await apiClient.post(
                "/api/Authentication/reset-password",
                payload
            );

            return response.data;
        } catch (error) {
            return rejectWithValue(handleAxiosError(error, "Network error"));
        }
    }
);

export const editProfile = createAsyncThunk(
    "User/realtor-profile",
    async (payload: IEditRealtorInfo, { rejectWithValue }) => {
        try {
            const response = await apiMediaClient.post(
                "/api/User/realtor-profile",
                payload
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(handleAxiosError(error, "Network error"));
        }
    }
);

//
export const changeEmail = createAsyncThunk(
    "Authentication/change-email",
    async (payload: IChangeEmail, { rejectWithValue }) => {
        try {
            const response = await apiClient.post(
                "/api/Authentication/change-email",
                payload
            );
            return response.status;
        } catch (error) {
            return rejectWithValue(handleAxiosError(error, "Network error"));
        }
    }
);

export const reconfirmEmail = createAsyncThunk(
    "Authentication/reconfirm-email",
    async (payload: IReconfirmEmail, { rejectWithValue }) => {
        try {
            const response = await apiClient.post(
                "/api/Authentication/reconfirm-email",
                payload
            );
            return response.status;
        } catch (error) {
            return rejectWithValue(handleAxiosError(error, "Network error"));
        }
    }
);

export const reloadAvatar = createAsyncThunk(
    "User/reupload-avatar",
    async (payload: IReloadAvatar, { rejectWithValue }) => {
        try {
            const response = await apiMediaClient.post(
                "/api/User/reupload-avatar",
                payload
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(handleAxiosError(error, "Network error"));
        }
    }
);