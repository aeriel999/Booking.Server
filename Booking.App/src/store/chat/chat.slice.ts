import { AnyAction, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RejectedAction } from "../../utils/types";
import { Status } from "../../utils/enum";
import { IChatState } from "../../interfaces/chat";
import {
    getChatIdList,
    getListOfChatRooms,
    getListOfChatRoomsForClient,
    getListOfChatsByPostInfoForRealtor,
    getListOfPostInfoForChatsForRealtor,
    getNumberOfUnleastMessages,
    getPostIdListForListeningChatsByRealtor,
} from "./chat.action.ts";
import {
    addlistToLocalStorage,
    addLocalStorage,
    getListFromLocalStorage,
    getLocalStorage,
} from "../../utils/storage/localStorageUtils.ts";

function isRejectedAction(action: AnyAction): action is RejectedAction {
    return action.type.endsWith("/rejected");
}

const initialState: IChatState = {
    chatRooms: null,
    charRoomsForClient: null,
    hasNewPosts: false,
    status: Status.IDLE,
    generalNumberOfUnreadMessages: getLocalStorage(
        "generalNumberOfUnreadMessages"
    )
        ? parseInt(
              getLocalStorage("generalNumberOfUnreadMessages") as string,
              10
          )
        : 0,
    listOfPostIdForListening: getListFromLocalStorage(
        "updateListOfIdForListening"
    ),
    listOfChatsIdForListening: getListFromLocalStorage(
        "listOfChatsIdForListening"
    ),
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
            addLocalStorage(
                "generalNumberOfUnreadMessages",
                state.generalNumberOfUnreadMessages.toString()
            );
        },
        addNewMessageInGeneralCount: (state: IChatState) => {
            console.log("send_notify", state.generalNumberOfUnreadMessages)

            state.generalNumberOfUnreadMessages =
                state.generalNumberOfUnreadMessages + 1;
            addLocalStorage(
                "generalNumberOfUnreadMessages",
                state.generalNumberOfUnreadMessages.toString()
            );
        },
        updateListOfPostIdForListening: (
            state: IChatState,
            action: PayloadAction<string>
        ) => {
            state.listOfPostIdForListening!.push(action.payload);
            addlistToLocalStorage(
                "updateListOfIdForListening",
                state.listOfPostIdForListening!
            );
        },
        updateListOfChatIdForListening: (
            state: IChatState,
            action: PayloadAction<string>
        ) => {
            console.log("action.payload", action.payload)

            state.listOfChatsIdForListening!.push(action.payload);
            addlistToLocalStorage(
                "listOfChatsIdForListening",
                state.listOfChatsIdForListening!
            );

            console.log("state.listOfChatsIdForListening",state.listOfChatsIdForListening)

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
                addLocalStorage(
                    "generalNumberOfUnreadMessages",
                    state.generalNumberOfUnreadMessages.toString()
                );
                state.status = Status.SUCCESS;
            })
            .addCase(getNumberOfUnleastMessages.pending, (state) => {
                state.status = Status.LOADING;
            })
            .addCase(
                getPostIdListForListeningChatsByRealtor.fulfilled,
                (state, action) => {
                    state.listOfPostIdForListening = action.payload.$values;
                    addlistToLocalStorage(
                        "updateListOfIdForListening",
                        state.listOfPostIdForListening!
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
            .addCase(getChatIdList.fulfilled, (state, action) => {
                state.listOfChatsIdForListening = action.payload.$values;
                addlistToLocalStorage(
                    "listOfChatsIdForListening",
                    state.listOfChatsIdForListening!
                );
                state.status = Status.SUCCESS;
            })
            .addCase(getChatIdList.pending, (state) => {
                state.status = Status.LOADING;
            })
            .addCase(getListOfPostInfoForChatsForRealtor.fulfilled, (state) => {
                state.status = Status.SUCCESS;
            })
            .addCase(getListOfPostInfoForChatsForRealtor.pending, (state) => {
                state.status = Status.LOADING;
            })
            .addCase(getListOfChatsByPostInfoForRealtor.fulfilled, (state) => {
                state.status = Status.SUCCESS;
            })
            .addCase(getListOfChatsByPostInfoForRealtor.pending, (state) => {
                state.status = Status.LOADING;
            })
            
            //getListOfChatsByPostInfoForRealtor
            .addMatcher(isRejectedAction, (state) => {
                state.status = Status.ERROR;
            });
    },
});

export const {
    addNewPostState,
    deleteNewPostState,
    changeGeneralNumberOfUnreadMessages,
    updateListOfPostIdForListening,
    addNewMessageInGeneralCount,
    updateListOfChatIdForListening,
} = chatSlice.actions;
export default chatSlice.reducer;
