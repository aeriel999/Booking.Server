import { AnyAction, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RejectedAction } from "../../utils/types";
import { Status } from "../../utils/enum";
import { IChatState, IGetMessage, IReadMessage } from "../../interfaces/chat";
import {
    getChatIdList,
    getChatRoomById,
    getListOfChatRoomsForClient,
    getListOfChatsByPostInfoForRealtor,
    getListOfPostInfoForChatsForRealtor,
    getNumberOfUnleastMessages,
    getPostIdListForListeningChatsByRealtor,
    getMessageListByChatId,
    deleteChatById,
    setMessagesReadtByChatId,
    GetGeneralCountOfUnreadedMessages,
    CheckChatIsExist,
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
    statusToListOfChatRooms: Status.IDLE,
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
    getingMessageInfo: null,
    outcomeMessagesReadedChatId: null,
    readedMessages: null,
    deletedChatId: null,
    deletedChatRooms: null,
    chatIsExist: null,
    
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
            if (state.generalNumberOfUnreadMessages - action.payload >= 0)
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
        setOutcomeMessagesReadedChatId: (
            state: IChatState,
            action: PayloadAction<string>
        ) => {
            if (state.currentChatRoomId === action.payload) {
                state.outcomeMessagesReadedChatId = action.payload;
                console.log(
                    "Test test test - ",
                    state.outcomeMessagesReadedChatId
                );
            }
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
        setNewMessageToClient: (
            state: IChatState,
            action: PayloadAction<IGetMessage>
        ) => {
            if (state.currentChatRoomId === action.payload.chatRoomId) {
                state.newMessage = action.payload.message;
            } else {
                state.generalNumberOfUnreadMessages =
                    state.generalNumberOfUnreadMessages + 1;

                addLocalStorage(
                    "generalNumberOfUnreadMessages",
                    state.generalNumberOfUnreadMessages.toString()
                );
                console.log(
                    "General count is - ",
                    state.generalNumberOfUnreadMessages
                );
                state.getingMessageInfo = action.payload;
            }
        },
        readMessages: (
            state: IChatState,
            action: PayloadAction<IReadMessage>
        ) => {
            state.readedMessages = action.payload;
        },

        setDeletedChatId: (
            state: IChatState,
            action: PayloadAction<string>
        ) => {
            state.deletedChatId = action.payload;
        },
        resetChatInfoForClient: (
            state: IChatState
        ) => {
            state.chatRoomInfoForClient = null;
        },
        setDeletedChatIdToArr: (
            state: IChatState,
            action: PayloadAction<string>
        ) => {
            if (state.deletedChatRooms) {
                state.deletedChatRooms = [...state.deletedChatRooms, action.payload];
            } else {
                state.deletedChatRooms = [action.payload];
            }

        },
        clearChatRoomsForClient: (
            state: IChatState
        ) => {
            if (state.chatRoomsForClient) state.chatRoomsForClient = null;

        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getListOfChatRoomsForClient.fulfilled, (state, action) => {
                state.chatRoomsForClient = action.payload;
                state.statusToListOfChatRooms = Status.SUCCESS;
            })
            .addCase(getListOfChatRoomsForClient.pending, (state) => {
                state.statusToListOfChatRooms = Status.LOADING;
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
            .addCase(setMessagesReadtByChatId.fulfilled, (state) => {
                state.status = Status.SUCCESS;
            })
            .addCase(setMessagesReadtByChatId.pending, (state) => {
                state.status = Status.LOADING;
            })
            .addCase(deleteChatById.fulfilled, (state) => {
                state.status = Status.SUCCESS;
            })
            .addCase(deleteChatById.pending, (state) => {
                state.status = Status.LOADING;
            })
            .addCase(
                GetGeneralCountOfUnreadedMessages.fulfilled,
                (state, action) => {
                    state.generalNumberOfUnreadMessages = action.payload;
                    localStorage.setItem(
                        "generalNumberOfUnreadMessages",
                        action.payload
                    );
                    state.status = Status.SUCCESS;
                }
            )
            .addCase(GetGeneralCountOfUnreadedMessages.pending, (state) => {
                state.status = Status.LOADING;
            })
            .addCase(CheckChatIsExist.fulfilled, (state, action) => {
                state.chatIsExist = action.payload;
                state.status = Status.SUCCESS;
            })
            .addCase(CheckChatIsExist.pending, (state) => {
                state.status = Status.LOADING;
            })
            //deleteChatById
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
    setNewMessageToClient,
    setIsCuretnChatReaded,
    deleteNumberOfMessageFromGeneralCount,
    setOutcomeMessagesReadedChatId,
    readMessages,
    setDeletedChatId,
    resetChatInfoForClient,
    setDeletedChatIdToArr,
    clearChatRoomsForClient
} = chatSlice.actions;
export default chatSlice.reducer;
