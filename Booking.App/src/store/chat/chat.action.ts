import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiClient } from "../../utils/api/apiClient.ts";
import { handleAxiosError } from "../../utils/errors";

export const getListOfChatRooms = createAsyncThunk(
    'chat/chat-list',
    async (_, { rejectWithValue }) => {
        try {
            const response = await apiClient.get('/api/Chat/chat-list');
            return response.data;
        } catch (error) {
            console.log("response error", error)

            return rejectWithValue(handleAxiosError(error, "Network error"));
        }
    },
);

export const getListOfChatRoomsForClient = createAsyncThunk(
    'chat/get-chat-list-for-client',
    async (_, { rejectWithValue }) => {
        try {
            const response = await apiClient.get('/api/Chat/get-chat-list-for-client');
            return response.data;
        } catch (error) {
            console.log("response error", error)

            return rejectWithValue(handleAxiosError(error, "Network error"));
        }
    },
);