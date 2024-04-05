import { configureStore } from '@reduxjs/toolkit';
import accountReducer from "./accounts/account.slice.ts";
import userReducer from "./users/user.slice.ts";

export const store = configureStore({
    reducer: {
        account: accountReducer,
        user: userReducer
    },
});

// Типізація Redux
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;