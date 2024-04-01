import {createAsyncThunk} from '@reduxjs/toolkit';
import {apiClient, apiMediaClient} from "../../utils/api/apiClient.ts";
import {handleAxiosError} from "../../utils/errors";
import {
    IConfirmEmail,
    IForgotPassword,
    ILogin,
    IRealtorRegister,
    IResetPassword,
    IUserRegister
} from "../../interfaces/account";

export const login = createAsyncThunk(
    'Authentication/login',
    async (payload : ILogin, { rejectWithValue }) => {

        try {
            const response = await apiClient.post('/api/Authentication/login', payload);
            return response.data;
        } catch (error) {
            return rejectWithValue(handleAxiosError(error, 'Error'));
        }
    },
);

export const userRegister = createAsyncThunk(
    'Authentication/user-register',
    async (payload : IUserRegister, { rejectWithValue }) => {
        try {
            const response = await apiClient.post('/api/Authentication/user-register', payload);
            return response.status;
        } catch (error) {
            return rejectWithValue(handleAxiosError(error, "Network error"));
        }
    },
);

export const realtorRegister = createAsyncThunk(
    'Authentication/realtor-register',
    async (payload : IRealtorRegister, { rejectWithValue }) => {
        try {

            const response = await apiMediaClient.post('/api/Authentication/realtor-register', payload);
            return response.status;
        } catch (error) {
            return rejectWithValue(handleAxiosError(error, "Network error"));
        }
    },
);

export const confirmEmail = createAsyncThunk(
    'Authentication/confirm-email',
    async (payload : IConfirmEmail, { rejectWithValue }) => {
        try {
            const response = await apiClient.post('/api/Authentication/confirm-email', payload);

            return response.data;
        } catch (error) {
            return rejectWithValue(handleAxiosError(error, "Network error"));
        }
    },
);

export const forgotPassword = createAsyncThunk(
    'Authentication/forgot-password',
    async (payload : IForgotPassword, { rejectWithValue }) => {
        try {
            const response = await apiClient.post('/api/Authentication/forgot-password', payload);

            return response.data;
        } catch (error) {
            return rejectWithValue(handleAxiosError(error, "Network error"));
        }
    },
);

export const resetPassword = createAsyncThunk(
    'Authentication/reset-password',
    async (payload : IResetPassword, { rejectWithValue }) => {
        try {
            const response = await apiClient.post('/api/Authentication/reset-password', payload);

            return response.data;
        } catch (error) {
            return rejectWithValue(handleAxiosError(error, "Network error"));
        }
    },
);