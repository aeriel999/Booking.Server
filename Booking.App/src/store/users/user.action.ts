import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiClient } from "../../utils/api/apiClient.ts";
import { handleAxiosError } from "../../utils/errors";
import { IChangePassword, IGetFeedbacks, ISendFeedback } from "../../interfaces/user";

export const changePassword = createAsyncThunk(
    'User/change-password',
    async (payload: IChangePassword, { rejectWithValue }) => {
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
            return response.data;
        } catch (error) {
            return rejectWithValue(handleAxiosError(error, "Network error"));
        }
    },
);

export const getRealtorById = createAsyncThunk(
    'User/get-realtor-by-id',
    async (id: string, { rejectWithValue }) => {
        try {
            const response = await apiClient.get(`/api/User/get-realtor-by-id-${id}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(handleAxiosError(error, "Network error"));
        }
    },
);

export const getFeedbacksByRealtor = createAsyncThunk(
    'User/get-feedbacks',
    async (payload: IGetFeedbacks, { rejectWithValue }) => {
        try {
            const response = await apiClient.get(`/api/User/get-feedbacks-${payload.id}?page=${payload.pages.page}&sizeOfPage=${payload.pages.sizeOfPage}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(handleAxiosError(error, "Network error"));
        }
    }
)
export const sendFeedback = createAsyncThunk(
    'User/send-feedback',
    async (payload: ISendFeedback, { rejectWithValue }) => {
        try {
            const response = await apiClient.post(`/api/User/send-feedback`, payload);
            return response.status;
        } catch (error) {
            return rejectWithValue(handleAxiosError(error, "Network error"));
        }
    }
)
export const getRealtorsByUserFeedbacks = createAsyncThunk(
    'User/get-realtor-by-user-feedbacks',
    async (_, { rejectWithValue }) => {
        try {
            const response = await apiClient.get(`/api/User/get-realtors-by-user-feedbacks`);
            return response.data;
        } catch (error) {
            return rejectWithValue(handleAxiosError(error, "Network error"));
        }
    }
)
export const deleteUserAccount = createAsyncThunk(
    'User/delete-user-account',
    async (_, { rejectWithValue }) => {
        try {
            const response = await apiClient.delete(`/api/User/delete-user`);
            return response.status;
        } catch (error) {
            return rejectWithValue(handleAxiosError(error, "Network error"));
        }
    }
)
export const editUserProfile = createAsyncThunk(
    'User/edit-user-profile',
    async (email: { Email: string }, { rejectWithValue }) => {
        try {
            const response = await apiClient.put(`/api/User/edit-user-profile`, email);
            return response.status;
        } catch (error) {
            return rejectWithValue(handleAxiosError(error, "Network error"));
        }
    }
)