import { AnyAction, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RejectedAction } from "../../utils/types";
import { Status } from "../../utils/enum";
import { IChatState, IGetMessage, ISendMessage } from "../../interfaces/chat";
import {
    getChatIdList,
    getChatRoomById,
    getListOfChatRooms,
    getListOfChatRoomsForClient,
    getListOfChatsByPostInfoForRealtor,
    getListOfPostInfoForChatsForRealtor,
    getNumberOfUnleastMessages,
    getPostIdListForListeningChatsByRealtor,
    getMessageListByChatId,
    setMessagesReadtByChatI,
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
    chatRoomsForClient: null,
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
    chatRoomInfoForClient: null,
    currentChatRoomId: null,
    newMessage: null,
    isCuretnChatReaded: false,
    getingMessageInfo: null
};

export const chatSlice = createSlice({
    name: "chat",
    initialState,
    reducers: {
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
        deleteNumberOfMessageFromGeneralCount: (
            state: IChatState,
            action: PayloadAction<number>
        ) => {
            state.generalNumberOfUnreadMessages =
                state.generalNumberOfUnreadMessages - action.payload;
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
            console.log("action.payload", action.payload);

            state.listOfChatsIdForListening!.push(action.payload);
            addlistToLocalStorage(
                "listOfChatsIdForListening",
                state.listOfChatsIdForListening!
            );
        },
        setChatRoomId: (state: IChatState, action: PayloadAction<string>) => {
            state.currentChatRoomId = action.payload;
            addLocalStorage("currentChatRoomId", state.currentChatRoomId);
        },
        setIsCuretnChatReaded: (
            state: IChatState,
            action: PayloadAction<boolean>
        ) => {
            state.isCuretnChatReaded = action.payload;
        },
        setNewMessage: (
            state: IChatState,
            action: PayloadAction<IGetMessage>
        ) => {
            state.generalNumberOfUnreadMessages =
                state.generalNumberOfUnreadMessages + 1;
                
            addLocalStorage(
                "generalNumberOfUnreadMessages",
                state.generalNumberOfUnreadMessages.toString()
            );

            if (state.currentChatRoomId === action.payload.chatRoomId) {
                state.newMessage = action.payload.message;
            }

            state.getingMessageInfo = action.payload;
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
                state.chatRoomsForClient = action.payload;
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
            .addCase(getChatRoomById.fulfilled, (state, action) => {
                state.chatRoomInfoForClient = action.payload;
                state.status = Status.SUCCESS;
            })
            .addCase(getChatRoomById.pending, (state) => {
                state.status = Status.LOADING;
            })
            .addCase(getMessageListByChatId.fulfilled, (state) => {
                state.status = Status.SUCCESS;
            })
            .addCase(getMessageListByChatId.pending, (state) => {
                state.status = Status.LOADING;
            })
            .addCase(setMessagesReadtByChatI.fulfilled, (state) => {
                state.status = Status.SUCCESS;
            })
            .addCase(setMessagesReadtByChatI.pending, (state) => {
                state.status = Status.LOADING;
            })

            //setMessagesReadtByChatI
            .addMatcher(isRejectedAction, (state) => {
                state.status = Status.ERROR;
            });
    },
});

export const {
    changeGeneralNumberOfUnreadMessages,
    updateListOfPostIdForListening,
    updateListOfChatIdForListening,
    setChatRoomId,
    setNewMessage,
    setIsCuretnChatReaded,
    deleteNumberOfMessageFromGeneralCount,
} = chatSlice.actions;
export default chatSlice.reducer;
