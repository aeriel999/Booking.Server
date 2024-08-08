import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IDashboardState as ISettingsState } from "../../interfaces/common";
import {
    addLocalStorage,
    getLocalStorage,
} from "../../utils/storage/localStorageUtils";

const initialState: ISettingsState = {
    currentBreadcrumbsItem:
        getLocalStorage("currentBreadcrumbsItem") === null
            ? "Profile"
            : getLocalStorage("currentBreadcrumbsItem")!,
};

export const settingsSlice = createSlice({
    name: "chat",
    initialState,
    reducers: {
        changeDashboardMenuItem: (
            state: ISettingsState,
            action: PayloadAction<string>
        ) => {
            state.currentBreadcrumbsItem = action.payload;
            addLocalStorage("currentBreadcrumbsItem", action.payload);
        },
    },
});

export const { changeDashboardMenuItem } = settingsSlice.actions;
export default settingsSlice.reducer;
