import { AnyAction, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RejectedAction } from "../../utils/types";
import { Status } from "../../utils/enum";
import {
    IHistoryOfFeedbacksByClient,
    IPageOfPosts,
    IPostForEdit,
    IPostInformation,
    IPostState,
} from "../../interfaces/post";
import {
    activatePost,
    archivePost,
    createPost,
    createRoom,
    deletePost,
    editPost,
    editRoom,
    getArchivedPostList,
    getFeedbacksByPost,
    getFilteredListByType,
    getFilteredListOfCategories,
    getFilteredListOfCities,
    getFilteredListOfCountries,
    getHistoryOfFeedbacksByClient,
    getListOfCategories,
    getListOfCitiesByCountryId,
    getListOfCountries,
    getListOfFeedbackForRealtor,
    getListOfPosts,
    getListOfPostsForModeration,
    getListOfPostsName,
    getListOfServices,
    getListOfStreetsByCityId,
    getListOfTypesOfRest,
    getListPostsForRealtor,
    getPageOfSelectedFeedback,
    getPostById,
    getPostByName,
    getPostForEditById,
    getPostListByRealtorId,
    getPostsWithMostDiscount,
    getPostsWithMostRating,
    getTypesOfRest,
    repostPost,
    sendFeedback,
} from "./post.actions.ts";

function isRejectedAction(action: AnyAction): action is RejectedAction {
    return action.type.endsWith("/rejected");
}

const initialState: IPostState = {
    status: Status.IDLE,
    post: null,
    posts: null,
    postForEdit: null,
    categories: null,
    countries: null,
    cities: null,
    streets: null,
    typesOfRest: null,
    services: null,
    searchPost: null,
    postInfoList: null,
    postsByRealtorId: null,
    postMostRating: null,
    postMostDiscount: null,
    filter: {
        category: null,
        country: null,
        city: null,
        realtor: null
    },
    filteredCategories: null,
    filteredCountries: null,
    filteredCities: null,
    textForSearching: null,
    feedbacks: null,
    historyOfFeedbacksByClient: null,
    idOfSelectedFeedback: null,
    pageOfSelectedFeedback: 1,
    searchingPost: null
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
        setTextForSearching: (state, action: PayloadAction<string | null>) => {
            state.textForSearching = action.payload;
        },
        setIdOfSelectedFeedback: (state, action: PayloadAction<string | null>) => {
            state.idOfSelectedFeedback = action.payload;
        },
        clearSearchingPost: (state) => {
            state.searchingPost = null;
        },
        clearPosts: (state) => {
            state.posts = null;
        },
        clearFilter: (state) => {
            state.filteredCategories = null;
            state.filteredCountries = null;
            state.filteredCities = null;
        },
        clearPost: (state) => {
            state.post = null;
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
                getPostForEditById.fulfilled,
                (state, action: PayloadAction<IPostForEdit>) => {
                    state.postForEdit = action.payload;
                    state.status = Status.SUCCESS;
                }
            )
            .addCase(getPostForEditById.pending, (state) => {
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
            /*.addCase(
                getListOfPostsByName.fulfilled,
                (state, action: PayloadAction<IPageOfPosts>) => {
                    state.posts = action.payload;
                    state.status = Status.SUCCESS;
                }
            )
            .addCase(getListOfPostsByName.pending, (state) => {
                state.status = Status.LOADING;
            })*/
            .addCase(
                getPostByName.fulfilled,
                (state, action: PayloadAction<string>) => {
                    state.searchingPost = action.payload;
                    state.status = Status.SUCCESS;
                }
            )
            .addCase(getPostByName.pending, (state) => {
                state.status = Status.LOADING;
            })

            .addCase(getListOfCategories.fulfilled, (state, action) => {
                state.categories = action.payload.$values;
                state.status = Status.SUCCESS;
            })
            .addCase(getListOfCategories.pending, (state) => {
                state.status = Status.LOADING;
            })
            .addCase(getFilteredListOfCategories.fulfilled, (state, action) => {
                state.filteredCategories = action.payload.$values;
                state.status = Status.SUCCESS;
            })
            .addCase(getFilteredListOfCategories.pending, (state) => {
                state.status = Status.LOADING;
            })
            .addCase(getPostListByRealtorId.fulfilled, (state, action) => {
                state.status = Status.SUCCESS;

                state.postsByRealtorId = action.payload.$values;
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
            .addCase(getFilteredListOfCountries.fulfilled, (state, action) => {
                state.filteredCountries = action.payload.$values;
                state.status = Status.SUCCESS;
            })
            .addCase(getFilteredListOfCountries.pending, (state) => {
                state.status = Status.LOADING;
            })
            .addCase(getListOfCitiesByCountryId.fulfilled, (state, action) => {
                state.cities = action.payload.$values;
                state.status = Status.SUCCESS;
            })
            .addCase(getListOfCitiesByCountryId.pending, (state) => {
                state.status = Status.LOADING;
            })
            .addCase(getFilteredListOfCities.fulfilled, (state, action) => {
                state.filteredCities = action.payload.$values;
                state.status = Status.SUCCESS;
            })
            .addCase(getFilteredListOfCities.pending, (state) => {
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
            .addCase(getListOfServices.fulfilled, (state, action) => {
                state.status = Status.SUCCESS;
                state.services = action.payload;
            })
            .addCase(getListOfServices.pending, (state) => {
                state.status = Status.LOADING;
            })
            .addCase(getListOfTypesOfRest.fulfilled, (state, action) => {
                state.status = Status.SUCCESS;
                state.typesOfRest = action.payload;
            })
            .addCase(getListOfTypesOfRest.pending, (state) => {
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
            .addCase(createRoom.fulfilled, (state) => {
                state.status = Status.SUCCESS;
            })
            .addCase(createRoom.pending, (state) => {
                state.status = Status.LOADING;
            })
            .addCase(editRoom.fulfilled, (state) => {
                state.status = Status.SUCCESS;
            })
            .addCase(editRoom.pending, (state) => {
                state.status = Status.LOADING;
            })
            .addCase(getFeedbacksByPost.fulfilled, (state, action) => {
                state.feedbacks = action.payload;
                state.status = Status.SUCCESS
            })
            .addCase(getFeedbacksByPost.pending, (state) => {
                state.status = Status.LOADING
            })
            .addCase(sendFeedback.fulfilled, (state) => {
                state.status = Status.SUCCESS;
            })
            .addCase(sendFeedback.pending, (state) => {
                state.status = Status.LOADING;
            })
            .addCase(getHistoryOfFeedbacksByClient.fulfilled, (state, action: PayloadAction<IHistoryOfFeedbacksByClient>) => {
                state.historyOfFeedbacksByClient = action.payload;
                state.status = Status.SUCCESS;
            })
            .addCase(getHistoryOfFeedbacksByClient.pending, (state) => {
                state.status = Status.LOADING;
            })
            .addCase(getPageOfSelectedFeedback.fulfilled, (state, action: PayloadAction<number>) => {
                state.pageOfSelectedFeedback = action.payload;
                state.status = Status.SUCCESS;
            })
            .addCase(getPageOfSelectedFeedback.pending, (state) => {
                state.status = Status.LOADING;
            })
            .addCase(getListOfFeedbackForRealtor.fulfilled, (state) => {
                state.status = Status.SUCCESS;
            })
            .addCase(getListOfFeedbackForRealtor.pending, (state) => {
                state.status = Status.LOADING;
            })
            .addCase(getListOfPostsForModeration.fulfilled, (state) => {
                state.status = Status.SUCCESS;
            })
            .addCase(getListOfPostsForModeration.pending, (state) => {
                state.status = Status.LOADING;
            })
            .addCase(activatePost.fulfilled, (state) => {
                state.status = Status.SUCCESS;
            })
            .addCase(activatePost.pending, (state) => {
                state.status = Status.LOADING;
            })
            //activatePost
            .addMatcher(isRejectedAction, (state) => {
                state.status = Status.ERROR;
            });
    },
});

export const { setCategoryToFilter,
    setCountryToFilter,
    setCityToFilter,
    setRealtorToFilter,
    setTextForSearching,
    setIdOfSelectedFeedback,
    clearSearchingPost,
    clearPosts,
    clearFilter,
    clearPost } = postSlice.actions;

export default postSlice.reducer;
