import { AnyAction, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RejectedAction } from "../../utils/types";
import { Status } from "../../utils/enum";
import {
    IPageOfPosts,
    IPostInformation,
    IPostState,
} from "../../interfaces/post";
import {
    archivePost,
    createPost,
    deletePost,
    editPost,
    getArchivedPostList,
    getFilteredListByType,
    getListOfCategories,
    getListOfCitiesByCountryId,
    getListOfCountries,
    getListOfPosts,
    getListOfPostsByName,
    getListOfPostsName,
    getListOfStreetsByCityId,
    getListOfTypesOrRest,
    getListPostsForRealtor,
    getPostById,
    getPostListByRealtorId,
    getPostsWithMostDiscount,
    getPostsWithMostRating,
    getTypesOfRest,
    repostPost,
} from "./post.actions.ts";

function isRejectedAction(action: AnyAction): action is RejectedAction {
    return action.type.endsWith("/rejected");
}

const initialState: IPostState = {
    status: Status.IDLE,
    post: null,
    posts: null,
    categories: null,
    countries: null,
    cities: null,
    streets: null,
    typesOfRest: null,
    searchPost: null,
    postInfoList: null,
    postsByRealtorId: null,
    postMostRating: null,
    postMostDiscount: null,
    filter: {
        category: null,
        country: null,
        city: null,
        realtor: null,
    },
};

export const postSlice = createSlice({
    name: "post",
    initialState,
    reducers: {
        setCategoryToFilter: (state, action: PayloadAction<string | null>) => {
            state.filter.category = action.payload;
        },
        setCountryToFilter: (state, action: PayloadAction<string | null>) => {
            state.filter.country = action.payload;
        },
        setCityToFilter: (state, action: PayloadAction<string | null>) => {
            state.filter.city = action.payload;
        },
        setRealtorToFilter: (state, action: PayloadAction<string | null>) => {
            state.filter.realtor = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder

            .addCase(
                getPostById.fulfilled,
                (state, action: PayloadAction<IPostInformation>) => {
                    state.post = action.payload;
                    state.status = Status.SUCCESS;
                }
            )
            .addCase(getPostById.pending, (state) => {
                state.status = Status.LOADING;
            })
            .addCase(
                getListOfPosts.fulfilled,
                (state, action: PayloadAction<IPageOfPosts>) => {
                    state.posts = action.payload;
                    state.status = Status.SUCCESS;
                }
            )
            .addCase(getListOfPosts.pending, (state) => {
                state.status = Status.LOADING;
            })
            .addCase(
                getListOfPostsName.fulfilled,
                (state, action: PayloadAction<string[]>) => {
                    state.searchPost = action.payload;
                    state.status = Status.SUCCESS;
                }
            )
            .addCase(getListOfPostsName.pending, (state) => {
                state.status = Status.LOADING;
            })
            .addCase(
                getFilteredListByType.fulfilled,
                (state, action: PayloadAction<IPageOfPosts>) => {
                    state.posts = action.payload;
                    state.status = Status.SUCCESS;
                }
            )
            .addCase(getFilteredListByType.pending, (state) => {
                state.status = Status.LOADING;
            })
            .addCase(
                getListOfPostsByName.fulfilled,
                (state, action: PayloadAction<IPageOfPosts>) => {
                    state.posts = action.payload;
                    state.status = Status.SUCCESS;
                }
            )
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
            .addCase(getPostListByRealtorId.fulfilled, (state, action) => {
                state.postsByRealtorId = action.payload.$values;
                state.status = Status.SUCCESS;
            })
            .addCase(getPostListByRealtorId.pending, (state) => {
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
            .addCase(editPost.fulfilled, (state) => {
                state.status = Status.SUCCESS;
            })
            .addCase(editPost.pending, (state) => {
                state.status = Status.LOADING;
            })
            .addCase(archivePost.fulfilled, (state) => {
                state.status = Status.SUCCESS;
            })
            .addCase(archivePost.pending, (state) => {
                state.status = Status.LOADING;
            })
            .addCase(getArchivedPostList.fulfilled, (state) => {
                state.status = Status.SUCCESS;
            })
            .addCase(getArchivedPostList.pending, (state) => {
                state.status = Status.LOADING;
            })
            .addCase(deletePost.fulfilled, (state) => {
                state.status = Status.SUCCESS;
            })
            .addCase(deletePost.pending, (state) => {
                state.status = Status.LOADING;
            })
            .addCase(repostPost.fulfilled, (state) => {
                state.status = Status.SUCCESS;
            })
            .addCase(repostPost.pending, (state) => {
                state.status = Status.LOADING;
            })
            .addCase(getTypesOfRest.fulfilled, (state, action) => {
                state.status = Status.SUCCESS;
                state.typesOfRest = action.payload;
            })
            .addCase(getTypesOfRest.pending, (state) => {
                state.status = Status.LOADING;
            })
            .addCase(getListOfTypesOrRest.fulfilled, (state, action) => {
                state.status = Status.SUCCESS;
                state.typesOfRest = action.payload;
            })
            .addCase(getListOfTypesOrRest.pending, (state) => {
                state.status = Status.LOADING;
            })
            .addCase(getPostsWithMostRating.fulfilled, (state, action) => {
                state.postMostRating = action.payload;
                state.status = Status.SUCCESS;
            })
            .addCase(getPostsWithMostRating.pending, (state) => {
                state.status = Status.LOADING;
            })
            .addCase(getPostsWithMostDiscount.fulfilled, (state, action) => {
                state.postMostDiscount = action.payload;
                state.status = Status.SUCCESS;
            })
            .addCase(getPostsWithMostDiscount.pending, (state) => {
                state.status = Status.LOADING;
            })
            .addMatcher(isRejectedAction, (state) => {
                state.status = Status.ERROR;
            });
    },
});

export const {
    setCategoryToFilter,
    setCountryToFilter,
    setCityToFilter,
    setRealtorToFilter,
} = postSlice.actions;

export default postSlice.reducer;
