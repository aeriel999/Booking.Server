import {createAsyncThunk} from '@reduxjs/toolkit';
import {apiClient} from "../../utils/api/apiClient.ts";
import {handleAxiosError} from "../../utils/errors";
import {IConfirmEmail, ILogin, IUserRegister} from "../../interfaces/account";

export const login = createAsyncThunk(
    'Authentication/login',
    async (payload : ILogin, { rejectWithValue }) => {
        try {
            const response = await apiClient.post('/api/account/login', payload);
            return response.data;
        } catch (error) {
            return rejectWithValue(handleAxiosError(error, 'Error'));
        }
    },
);

export const register = createAsyncThunk(
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

export const confirmEmail = createAsyncThunk(
    'Authentication/confirm-email',
    async (payload : IConfirmEmail, { rejectWithValue }) => {
        console.log("payload", payload)
        try {
            const response = await apiClient.post('/api/Authentication/confirm-email', payload);

            console.log("response.data", response.data)
            return response.data;
        } catch (error) {
            console.log("error", error)
            return rejectWithValue(handleAxiosError(error, "Network error"));
        }
    },
);