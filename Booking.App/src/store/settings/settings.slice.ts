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
    currentPaginationPage:
        getLocalStorage("currentPaginationPage") === null
            ? 1
            : parseInt(getLocalStorage("currentPaginationPage")!),
    loaderIsLoading: true,
    savedPath:
        getLocalStorage("savedPath") === null
            ? "/dashboard/profile"
            : getLocalStorage("savedPath")!,
    savedPostIdForChat:
        getLocalStorage("savedPostIdForChat") === null || getLocalStorage("savedPostIdForChat") === ""
            ? ""
            : getLocalStorage("savedPostIdForChat")!

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
        changePaginationPage: (
            state,
            action: PayloadAction<number>
        ) => {
            state.currentPaginationPage = action.payload
            addLocalStorage("currentPaginationPage", action.payload.toString())
        },
        changeLoaderIsLoading: (
            state,
            action: PayloadAction<boolean>
        ) => {
            state.loaderIsLoading = action.payload
        },
        savePath: (
            state,
            action: PayloadAction<string>
        ) => {
            state.savedPath = action.payload;
            addLocalStorage("savedPath", action.payload);
        },
        savePostIdForChat: (
            state,
            action: PayloadAction<string>
        ) => {
            state.savedPostIdForChat = action.payload;
            addLocalStorage("savedPostIdForChat", action.payload);
        }
    },
});

export const { changeDashboardMenuItem, changePaginationPage, changeLoaderIsLoading, savePath, savePostIdForChat } = settingsSlice.actions;
export default settingsSlice.reducer;
