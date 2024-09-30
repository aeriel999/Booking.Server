import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiClient } from "../../utils/api/apiClient.ts";
import { handleAxiosError } from "../../utils/errors";
import { IChangePassword, IFilteredListOfRealtorsRequest, IGetFeedbacks, ISendFeedback } from "../../interfaces/user";
import { IFetchData } from "../../interfaces/post/index.ts";

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

export const getFilteredListOfRealtors = createAsyncThunk(
    'User/get-realtors-filtered-list',
    async (payload: IFilteredListOfRealtorsRequest, { rejectWithValue }) => {
        try {
            const response = await apiClient.get(
                `/api/User/get-realtors-filtered-list`, {
                params: {
                    category: payload.category,
                    country: payload.country,
                    city: payload.city
                }
            });
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
);

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
);

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
);


export const getListOfAllUsersForAdmin = createAsyncThunk(
    'User/get-list-of-all-users',
    async (payload: IFetchData, { rejectWithValue }) => {
        try {
            const response = await apiClient.get(
                `/api/User/get-list-of-all-users?page=${payload.page}&sizeOfPage=${payload.sizeOfPage}`
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(handleAxiosError(error, "Network error"));
        }
    }
);


export const blockUserByAdmin = createAsyncThunk(
    "User/block-user-by-admin",
    async (userId: string, { rejectWithValue }) => {
        try {
            const response = await apiClient.post("/api/User/block-user-by-admin", {
                userId,
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(handleAxiosError(error, "Network error"));
        }
    }
);


export const unblockUserByAdmin = createAsyncThunk(
    "User/unblock-user-by-admin",
    async (userId: string, { rejectWithValue }) => {
        try {
            const response = await apiClient.post("/api/User/unblock-user-by-admin", {
                userId,
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(handleAxiosError(error, "Network error"));
        }
    }
);


export const deleteUserByAdmin = createAsyncThunk(
    "User/delete-user-by-admin",
    async (userId: string, { rejectWithValue }) => {
        try {
            const response = await apiClient.post("/api/User/delete-user-by-admin", {
                userId,
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(handleAxiosError(error, "Network error"));
        }
    }
);


