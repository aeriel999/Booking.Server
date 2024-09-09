import { AnyAction, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RejectedAction } from "../../utils/types";
import { Status } from "../../utils/enum";
import { IChatState } from "../../interfaces/chat";
import {
    getListOfChatRooms,
    getListOfChatRoomsForClient,
    getNumberOfUnleastMessages,
    getPostIdListForListeningChatsByRealtor,
} from "./chat.action.ts";
import {
    addlistToLocalStorage,
    addLocalStorage,
    getListFromLocalStorage,
} from "../../utils/storage/localStorageUtils.ts";

function isRejectedAction(action: AnyAction): action is RejectedAction {
    return action.type.endsWith("/rejected");
}

const initialState: IChatState = {
    chatRooms: null,
    charRoomsForClient: null,
    hasNewPosts: false,
    status: Status.IDLE,
    generalNumberOfUnreadMessages: 0,
    listOfIdForListening: getListFromLocalStorage("updateListOfIdForListening"),
};

export const chatSlice = createSlice({
    name: "chat",
    initialState,
    reducers: {
        addNewPostState: (state: IChatState) => {
            state.hasNewPosts = true;
        },
        deleteNewPostState: (state: IChatState) => {
            state.hasNewPosts = false;
        },
        changeGeneralNumberOfUnreadMessages: (
            state: IChatState,
            action: PayloadAction<number>
        ) => {
            state.generalNumberOfUnreadMessages = action.payload;
        },
        updateListOfIdForListening: (
            state: IChatState,
            action: PayloadAction<string>
        ) => {
            state.listOfIdForListening!.push(action.payload);
            addlistToLocalStorage(
                "updateListOfIdForListening",
                state.listOfIdForListening!
            );
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getListOfChatRooms.fulfilled, (state, action) => {
                const { chatRooms, hasNewPosts } = action.payload;
                state.chatRooms = chatRooms;
                state.hasNewPosts = hasNewPosts;

                state.status = Status.SUCCESS;
            })
            .addCase(getListOfChatRooms.pending, (state) => {
                state.status = Status.LOADING;
            })
            .addCase(getListOfChatRoomsForClient.fulfilled, (state, action) => {
                state.charRoomsForClient = action.payload;
                state.status = Status.SUCCESS;
            })
            .addCase(getListOfChatRoomsForClient.pending, (state) => {
                state.status = Status.LOADING;
            })
            .addCase(getNumberOfUnleastMessages.fulfilled, (state, action) => {
                state.generalNumberOfUnreadMessages = action.payload;
                state.status = Status.SUCCESS;
            })
            .addCase(getNumberOfUnleastMessages.pending, (state) => {
                state.status = Status.LOADING;
            })
            .addCase(
                getPostIdListForListeningChatsByRealtor.fulfilled,
                (state, action) => {
                    state.listOfIdForListening = action.payload.$values;
                    addlistToLocalStorage(
                        "updateListOfIdForListening",
                        state.listOfIdForListening!
                    );
                    state.status = Status.SUCCESS;
                }
            )
            .addCase(
                getPostIdListForListeningChatsByRealtor.pending,
                (state) => {
                    state.status = Status.LOADING;
                }
            )
            //
            .addMatcher(isRejectedAction, (state) => {
                state.status = Status.ERROR;
            });
    },
});

export const {
    addNewPostState,
    deleteNewPostState,
    changeGeneralNumberOfUnreadMessages,
    updateListOfIdForListening,
} = chatSlice.actions;
export default chatSlice.reducer;
