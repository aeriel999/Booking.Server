import {AnyAction, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RejectedAction} from "../../utils/types";
import {Status} from "../../utils/enum";
import {IPageOfPosts, IPostInformation, IPostState} from "../../interfaces/post";
import {
    createPost, getFilteredListByType,
    getListOfCategories,
    getListOfCitiesByCountryId,
    getListOfCountries, getListOfPosts, getListOfPostsByName, getListOfPostsName,
    getListOfStreetsByCityId, getListPostsForRealtor, getPostById, getTypesOfRentList
} from "./post.actions.ts";

function isRejectedAction(action: AnyAction): action is RejectedAction {
    return action.type.endsWith("/rejected");
}

const initialState: IPostState = {
    status: Status.IDLE,
    post:null,
    posts:null,
    categories: null,
    countries: null,
    cities: null,
    streets: null,
    typeOfRent: null,
    searchPost:[],
    postInfoList: null,
};

export const postSlice = createSlice({
    name: "post",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getTypesOfRentList.fulfilled, (state, action) => {
                state.typeOfRent = action.payload.$values;
                state.status = Status.SUCCESS;
            })
            .addCase(getTypesOfRentList.pending, (state) => {
                state.status = Status.LOADING;
            })
            .addCase(getPostById.fulfilled,(state,action:PayloadAction<IPostInformation>)=>{
                state.post = action.payload;
                state.status = Status.SUCCESS;
            })
            .addCase(getPostById.pending, (state) => {
                state.status = Status.LOADING;
            })
            .addCase(getListOfPosts.fulfilled,(state, action:PayloadAction<IPageOfPosts>) => {
                state.posts = action.payload;
                state.status = Status.SUCCESS;
            })
            .addCase(getListOfPosts.pending, (state) => {
                state.status = Status.LOADING;
            })
            .addCase(getListOfPostsName.fulfilled,(state, action:PayloadAction<string[]>) => {
                state.searchPost = action.payload;
                state.status = Status.SUCCESS;
            })
            .addCase(getListOfPostsName.pending, (state) => {
                state.status = Status.LOADING;
            })
            .addCase(getFilteredListByType.fulfilled,(state, action:PayloadAction<IPageOfPosts>) => {
                state.posts = action.payload;
                state.status = Status.SUCCESS;
            })
            .addCase(getFilteredListByType.pending, (state) => {
                state.status = Status.LOADING;
            })
            .addCase(getListOfPostsByName.fulfilled,(state, action:PayloadAction<IPageOfPosts>) => {
                state.posts = action.payload;
                state.status = Status.SUCCESS;
            })
            .addCase(getListOfPostsByName.pending, (state) => {
                state.status = Status.LOADING;
            })
            .addCase(getListOfCategories.fulfilled, (state, action) => {
                state.categories = action.payload.$values;
                state.status = Status.SUCCESS;
            })
            .addCase(getListOfCategories.pending, (state) => {
                state.status = Status.LOADING;
            })
            .addCase(getListOfCountries.fulfilled, (state, action) => {
                state.countries = action.payload.$values;
                state.status = Status.SUCCESS;
            })
            .addCase(getListOfCountries.pending, (state) => {
                state.status = Status.LOADING;
            })
            .addCase(getListOfCitiesByCountryId.fulfilled, (state, action) => {
                state.cities = action.payload.$values;
                state.status = Status.SUCCESS;
            })
            .addCase(getListOfCitiesByCountryId.pending, (state) => {
                state.status = Status.LOADING;
            })
            .addCase(getListOfStreetsByCityId.fulfilled, (state, action) => {
                state.streets = action.payload.$values;
                state.status = Status.SUCCESS;
            })
            .addCase(getListOfStreetsByCityId.pending, (state) => {
                state.status = Status.LOADING;
            })
            .addCase(createPost.fulfilled, (state) => {
                state.status = Status.SUCCESS;
            })
            .addCase(createPost.pending, (state) => {
                state.status = Status.LOADING;
            })
            .addCase(getListPostsForRealtor.fulfilled, (state, action) => {
                state.status = Status.SUCCESS;
                state.postInfoList = action.payload;
            })
            .addCase(getListPostsForRealtor.pending, (state) => {
                state.status = Status.LOADING;
            })
            .addMatcher(isRejectedAction, (state) => {
                state.status = Status.ERROR;
            });
    },
});

export default postSlice.reducer;
