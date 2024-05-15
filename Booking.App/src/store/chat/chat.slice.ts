import {AnyAction, createSlice} from "@reduxjs/toolkit";
import {RejectedAction} from "../../utils/types";
import {Status} from "../../utils/enum";
import {IChatState} from "../../interfaces/chat";
import {getListOfChatRooms} from "./chat.action.ts";


function isRejectedAction(action: AnyAction): action is RejectedAction {
    return action.type.endsWith('/rejected');
}

const initialState: IChatState = {
    chatRooms: null,
    hasNewPosts: false,
    status: Status.IDLE,
};

export const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        addNewPostState: (state: IChatState) => {
            state.hasNewPosts = true;
        },
        deleteNewPostState: (state: IChatState) => {
            state.hasNewPosts = false;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getListOfChatRooms.fulfilled, (state, action) => {
                const  {chatRooms, hasNewPosts} = action.payload;
                state.chatRooms = chatRooms;
                state.hasNewPosts = hasNewPosts;

                state.status = Status.SUCCESS;
            })
            .addCase(getListOfChatRooms.pending, (state) => {
                state.status = Status.LOADING;
            })
            .addMatcher(isRejectedAction, (state) => {
                state.status = Status.ERROR;
            });
    },
});

export const { addNewPostState, deleteNewPostState } = chatSlice.actions;
export default chatSlice.reducer;