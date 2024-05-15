import {createAsyncThunk} from "@reduxjs/toolkit";
import {apiClient} from "../../utils/api/apiClient.ts";
import {handleAxiosError} from "../../utils/errors";

export const getListOfChatRooms = createAsyncThunk(
    'Chat/chat-list',
    async (_, { rejectWithValue }) => {
        try {
            const response = await apiClient.get('/api/Chat/chat-list');
            console.log("response", response)
            return response.data;
        } catch (error) {
            console.log("response error", error)

            return rejectWithValue(handleAxiosError(error, "Network error"));
        }
    },
);