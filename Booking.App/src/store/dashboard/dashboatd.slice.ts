import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IDashboardState } from "../../interfaces/common";
import {
    addLocalStorage,
    getLocalStorage,
} from "../../utils/storage/localStorageUtils";

const initialState: IDashboardState = {
    currentBreadcrumbsItem:
        getLocalStorage("currentBreadcrumbsItem") === null
            ? "Profile"
            : getLocalStorage("currentBreadcrumbsItem")!,
};

export const dashboardSlice = createSlice({
    name: "chat",
    initialState,
    reducers: {
        changeDashboardMenuItem: (
            state: IDashboardState,
            action: PayloadAction<string>
        ) => {
            state.currentBreadcrumbsItem = action.payload;
            console.log("currentBreadcrumbsItem", action.payload);
            addLocalStorage("currentBreadcrumbsItem", action.payload);
        },
    },
});

export const { changeDashboardMenuItem } = dashboardSlice.actions;
export default dashboardSlice.reducer;
