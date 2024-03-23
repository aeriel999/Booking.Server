import {createAsyncThunk} from '@reduxjs/toolkit';
import {apiClient} from "../../utils/api/apiClient.ts";
import {handleAxiosError} from "../../utils/errors";
import {ILogin, IUserRegister} from "../../interfaces/account";

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