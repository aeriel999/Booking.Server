import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiClient } from "../../utils/api/apiClient.ts";
import { handleAxiosError } from "../../utils/errors";

// export const getListOfChatRooms = createAsyncThunk(
//     "chat/chat-list",
//     async (_, { rejectWithValue }) => {
//         try {
//             const response = await apiClient.get("/api/Chat/chat-list");
//             return response.data;
//         } catch (error) {
//             console.log("response error", error);

//             return rejectWithValue(handleAxiosError(error, "Network error"));
//         }
//     }
// );

export const getListOfChatRoomsForClient = createAsyncThunk(
    "chat/get-chat-list-for-client",
    async (_, { rejectWithValue }) => {
        try {
            const response = await apiClient.get(
                "/api/Chat/get-chat-list-for-client"
            );
            return response.data.$values;
        } catch (error) {
            console.log("response error", error);

            return rejectWithValue(handleAxiosError(error, "Network error"));
        }
    }
);

export const getNumberOfUnleastMessages = createAsyncThunk(
    "chat/get-unread-messages-count",
    async (_, { rejectWithValue }) => {
        try {
            const response = await apiClient.get(
                "/api/Chat/get-unread-messages-count"
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(handleAxiosError(error, "Network error"));
        }
    }
);

export const getPostIdListForListeningChatsByRealtor = createAsyncThunk(
    "chat/get-post-id-list-for-realtor",
    async (_, { rejectWithValue }) => {
        try {
            const response = await apiClient.get(
                "/api/Chat/get-post-id-list-for-realtor"
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(handleAxiosError(error, "Network error"));
        }
    }
);

export const getChatIdList = createAsyncThunk(
    "chat/get-chat-id-list",
    async (_, { rejectWithValue }) => {
        try {
            const response = await apiClient.get("/api/Chat/get-chat-id-list");
            return response.data;
        } catch (error) {
            return rejectWithValue(handleAxiosError(error, "Network error"));
        }
    }
);

export const getListOfPostInfoForChatsForRealtor = createAsyncThunk(
    "chat/get-list-of-postinfo-for-chats-for-realtor",
    async (_, { rejectWithValue }) => {
        try {
            const response = await apiClient.get(
                "/api/Chat/get-list-of-postinfo-for-chats-for-realtor"
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(handleAxiosError(error, "Network error"));
        }
    }
);

export const getListOfChatsByPostInfoForRealtor = createAsyncThunk(
    "chat/get-list-of-chats-by-post-for-realtor",
    async (postId: string, { rejectWithValue }) => {
        try {
            const response = await apiClient.get(
                `/api/Chat/get-list-of-chats-by-post-for-realtor`,
                {
                    params: { postId }, // Pass postId as a query parameter
                }
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(handleAxiosError(error, "Network error"));
        }
    }
);

export const getChatRoomById = createAsyncThunk(
    "chat/get-chat-room-by-id",
    async (chatRoomId: string, { rejectWithValue }) => {
        try {
            const response = await apiClient.get(
                `/api/Chat/get-chat-room-by-id`,
                {
                    params: { chatRoomId },
                }
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(handleAxiosError(error, "Network error"));
        }
    }
);

export const getMessageListByChatId = createAsyncThunk(
    "chat/get-message-list-by-chatId",
    async (chatRoomId: string, { rejectWithValue }) => {
        try {
            const response = await apiClient.get(
                `/api/Chat/get-message-list-by-chatId`,
                {
                    params: { chatRoomId },
                }
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(handleAxiosError(error, "Network error"));
        }
    }
);

export const setMessagesReadtByChatId = createAsyncThunk(
    "chat/set-messages-read-by-chatId",
    async (chatRoomId: string, { rejectWithValue }) => {
        console.log("setMessagesReadtByChatI", { chatRoomId });
        try {
            const response = await apiClient.post(
                `/api/Chat/set-messages-read-by-chatId`,
                { chatRoomId }
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(handleAxiosError(error, "Network error"));
        }
    }
);

export const deleteChatById = createAsyncThunk(
    "chat/delete-chat",
    async (chatRoomId: string, { rejectWithValue }) => {
        console.log("deleteChatById", { chatRoomId });
        try {
            const response = await apiClient.post(`/api/Chat/delete-chat`, {
                chatRoomId,
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(handleAxiosError(error, "Network error"));
        }
    }
);

export const GetGeneralCountOfUnreadedMessages = createAsyncThunk(
    "chat/get-general-count-of-unreaded-messages",
    async (_, { rejectWithValue }) => {
        try {
            const response = await apiClient.get(
                `/api/Chat/get-general-count-of-unreaded-messages`
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(handleAxiosError(error, "Network error"));
        }
    }
);

export const CheckChatIsExist = createAsyncThunk(
    'Chat/check-chat-for-client-is-exist',
    async (postId: string, { rejectWithValue }) => {
        try {
            const response = await apiClient.get(
                `/api/Chat/check-chat-for-client-is-exist`,
                {
                    params: {
                        postId: postId
                    }
                }
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(handleAxiosError(error, "Network error"));
        }
    }
)
