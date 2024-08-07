import { configureStore } from '@reduxjs/toolkit';
import accountReducer from "./accounts/account.slice.ts";
import userReducer from "./users/user.slice.ts";
import chatReducer from "./chat/chat.slice.ts";
import postReducer from "./post/post.slice.ts";
import dashboardReducer from "./dashboard/dashboatd.slice.ts";

export const store = configureStore({
    reducer: {
        account: accountReducer,
        user: userReducer,
        chat: chatReducer,
        post: postReducer,
        dashboard: dashboardReducer
    },
});

// Типізація Redux
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;