import {createAsyncThunk} from "@reduxjs/toolkit";
import {apiClient} from "../../utils/api/apiClient.ts";
import {handleAxiosError} from "../../utils/errors";
import {IChangePassword} from "../../interfaces/user";

export const changePassword = createAsyncThunk(
    'User/change-password',
    async (payload : IChangePassword, { rejectWithValue }) => {
        try {
            const response = await apiClient.post('/api/User/change-password', payload);
            return response.status;
        } catch (error) {
            return rejectWithValue(handleAxiosError(error, "Network error"));
        }
    },
);

export const getListOfRealtors = createAsyncThunk(
    'User/get-realtors-list',
    async (_, { rejectWithValue }) => {
        try {
            const response = await apiClient.get('/api/User/get-realtors-list');
            return response.data; // assuming the realtors are in $values
        } catch (error) {
            return rejectWithValue(handleAxiosError(error, "Network error"));
        }
    },
);