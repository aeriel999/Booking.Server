import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiClient, apiMediaClient } from "../../utils/api/apiClient.ts";
import { handleAxiosError } from "../../utils/errors";
import {
    IFetchData,
    IFetchDataByName,
    IFilteredListOfCategoriesRequest,
    IFilteredListOfCitiesRequest,
    IFilteredListOfCountriesRequest,
    IFilteredRequest,
    IFilteredRequestName,
    IPostCreate,
    IPostEdit,
    IRoom,
} from "../../interfaces/post";

export const getListOfCategories = createAsyncThunk(
    "Post/get-categories-list",
    async (_, { rejectWithValue }) => {
        try {
            const response = await apiClient.get(
                "/api/Post/get-categories-list"
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(handleAxiosError(error, "Network error"));
        }
    }
);

export const getFilteredListOfCategories = createAsyncThunk(
    "Post/get-categories-filtered-list",
    async (payload: IFilteredListOfCategoriesRequest, { rejectWithValue }) => {
        try {
            const response = await apiClient.get(
                `/api/Post/get-categories-filtered-list`,
                {
                    params: {
                        country: payload.country,
                        city: payload.city,
                        realtor: payload.realtor,
                    },
                }
            );

            return response.data;
        } catch (error) {
            return rejectWithValue(handleAxiosError(error, "Network error"));
        }
    }
);

export const getPostListByRealtorId = createAsyncThunk(
    "Post/get-post-list-by-realtor-id",
    async (id: string, { rejectWithValue }) => {
        try {
            const response = await apiClient.get(
                `/api/Post/get-post-list-by-realtor-id-${id}`
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(handleAxiosError(error, "Network error"));
        }
    }
);

export const getFilteredListByType = createAsyncThunk(
    "Post/get-filtered-list-by-type",
    async (payload: IFilteredRequest, { rejectWithValue }) => {
        try {
            /*const response = await apiClient.get(
                `/api/Post/get-filtered-list-by-type?category=${payload.filter?.category}&country=${payload.filter?.country}&city=${payload.filter?.city}&realtor=${payload.filter?.realtor}&page=${payload.pages.page}&sizeOfPage=${payload.pages.sizeOfPage}`
            );*/
            const response = await apiClient.get(
                `/api/Post/get-filtered-list-by-type`,
                {
                    params: {
                        category: payload.filter!.category,
                        country: payload.filter!.country,
                        city: payload.filter!.city,
                        realtor: payload.filter!.realtor,
                        page: payload.pages.page,
                        sizeOfPage: payload.pages.sizeOfPage,
                    },
                }
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(handleAxiosError(error, "Network error"));
        }
    }
);

export const getListOfPosts = createAsyncThunk(
    "Post/get-list-of-posts",
    async (data: IFetchData, { rejectWithValue }) => {
        try {
            const response = await apiClient.get(
                `/api/Post/get-list-of-post?page=${data.page}&sizeOfPage=${data.sizeOfPage}`
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(handleAxiosError(error, "Network error"));
        }
    }
);

export const getListOfPostsName = createAsyncThunk(
    "Post/get-list-of-posts-name",
    async (payload: IFilteredRequestName, { rejectWithValue }) => {
        try {
            const response = await apiClient.get(`/api/Post/get-name-of-post`, {
                params: {
                    category: payload.filter?.category,
                    country: payload.filter?.country,
                    city: payload.filter?.city,
                    realtor: payload.filter?.realtor,
                    name: payload.name,
                },
            });
            return response.data.$values;
        } catch (error) {
            return rejectWithValue(handleAxiosError(error, "Network error"));
        }
    }
);
export const getListOfPostsByName = createAsyncThunk(
    "Post/get-list-of-posts-by-name",
    async (payload: IFetchDataByName, { rejectWithValue }) => {
        try {
            const response = await apiClient.get(`/api/Post/get-post-by-name`, {
                params: {
                    category: payload.filter.category,
                    country: payload.filter.country,
                    city: payload.filter.city,
                    realtor: payload.filter.realtor,
                    name: payload.name,
                    page: payload.pages.page,
                    sizeOfPage: payload.pages.sizeOfPage,
                },
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(handleAxiosError(error, "Network error"));
        }
    }
);

export const getPostById = createAsyncThunk(
    "Post/get-post-by-id",
    async (id: string, { rejectWithValue }) => {
        try {
            const response = await apiClient.get(
                `api/Post/get-post-by-id-${id}`
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(handleAxiosError(error, "Network error"));
        }
    }
);

export const getListOfCountries = createAsyncThunk(
    "Post/get-countries-list",
    async (_, { rejectWithValue }) => {
        try {
            const response = await apiClient.get(
                "/api/Post/get-countries-list"
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(handleAxiosError(error, "Network error"));
        }
    }
);

export const getFilteredListOfCountries = createAsyncThunk(
    "Post/get-countries-filtered-list",
    async (payload: IFilteredListOfCountriesRequest, { rejectWithValue }) => {
        try {
            const response = await apiClient.get(
                `/api/Post/get-countries-filtered-list`,
                {
                    params: {
                        category: payload.category,
                        realtor: payload.realtor,
                    },
                }
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(handleAxiosError(error, "Network error"));
        }
    }
);

export const getListOfCitiesByCountryId = createAsyncThunk(
    "Post/get-cities-list",
    async (countryId: string | null, { rejectWithValue }) => {
        try {
            const response = await apiClient.get(
                `/api/Post/get-cities-list?countryId=${countryId}`
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(handleAxiosError(error, "Network error"));
        }
    }
);

export const getFilteredListOfCities = createAsyncThunk(
    "Post/get-cities-filtered-list",
    async (payload: IFilteredListOfCitiesRequest, { rejectWithValue }) => {
        try {
            const response = await apiClient.get(
                `/api/Post/get-cities-filtered-list`,
                {
                    params: {
                        category: payload.category,
                        country: payload.country,
                        realtor: payload.realtor,
                    },
                }
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(handleAxiosError(error, "Network error"));
        }
    }
);

export const getListOfStreetsByCityId = createAsyncThunk(
    "Post/get-street-list",
    async (cityId: string, { rejectWithValue }) => {
        try {
            const response = await apiClient.get(
                `/api/Post/get-street-list?cityId=${cityId}`
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(handleAxiosError(error, "Network error"));
        }
    }
);

export const createPost = createAsyncThunk(
    "Post/create-post",
    async (payload: IPostCreate, { rejectWithValue }) => {
        try {
            const response = await apiMediaClient.post(
                "/api/Post/create-post",
                payload
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(handleAxiosError(error, "Network error"));
        }
    }
);

export const getListPostsForRealtor = createAsyncThunk(
    "Post/get-post-list-for-realtor",
    async (payload: IFetchData, { rejectWithValue }) => {
        try {
            const response = await apiClient.get(
                `/api/Post/get-post-list-for-realtor?page=${payload.page}&sizeOfPage=${payload.sizeOfPage}`
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(handleAxiosError(error, "Network error"));
        }
    }
);

export const editPost = createAsyncThunk(
    "Post/edit-post",
    async (payload: IPostEdit, { rejectWithValue }) => {
        try {
            const response = await apiMediaClient.post(
                "/api/Post/edit-post",
                payload
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(handleAxiosError(error, "Network error"));
        }
    }
);

export const archivePost = createAsyncThunk(
    "Post/archive-post",
    async (postId: string, { rejectWithValue }) => {
        try {
            const response = await apiClient.get(
                `api/Post/archive-post-${postId}`
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(handleAxiosError(error, "Network error"));
        }
    }
);

export const getArchivedPostList = createAsyncThunk(
    "Post/get-archived-post-list-for-realtor",
    async (payload: IFetchData, { rejectWithValue }) => {
        try {
            const response = await apiClient.get(
                `/api/Post/get-archived-post-list-for-realtor?page=${payload.page}&sizeOfPage=${payload.sizeOfPage}`
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(handleAxiosError(error, "Network error"));
        }
    }
);

export const deletePost = createAsyncThunk(
    "Post/delete-post",
    async (postId: string, { rejectWithValue }) => {
        try {
            const response = await apiClient.get(
                `api/Post/delete-post-${postId}`
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(handleAxiosError(error, "Network error"));
        }
    }
);

export const repostPost = createAsyncThunk(
    "Post/repost-post",
    async (postId: string, { rejectWithValue }) => {
        try {
            const response = await apiClient.get(
                `api/Post/repost-post-${postId}`
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(handleAxiosError(error, "Network error"));
        }
    }
);

export const getTypesOfRest = createAsyncThunk(
    "Post/get-types-of-rest",
    async (_, { rejectWithValue }) => {
        try {
            const response = await apiClient.get(`api/Post/get-types-of-rest`);
            return response.data.$values;
        } catch (error) {
            return rejectWithValue(handleAxiosError(error, "Network error"));
        }
    }
);

export const getPostsWithMostRating = createAsyncThunk(
    "Post/get-posts-with-most-rating",
    async (_, { rejectWithValue }) => {
        try {
            const response = await apiClient.get(
                `api/Post/get-posts-with-most-rating`
            );
            return response.data.$values;
        } catch (error) {
            return rejectWithValue(handleAxiosError(error, "Network error"));
        }
    }
);

export const getPostsWithMostDiscount = createAsyncThunk(
    "Post/get-posts-with-most-discount",
    async (_, { rejectWithValue }) => {
        try {
            const response = await apiClient.get(
                `api/Post/get-posts-with-most-discount`
            );
            return response.data.$values;
        } catch (error) {
            return rejectWithValue(handleAxiosError(error, "Network error"));
        }
    }
);

export const getListOfTypesOfRest = createAsyncThunk(
    "Post/get-post-types-of-rest-list",
    async (_, { rejectWithValue }) => {
        try {
            const response = await apiClient.get(
                `api/Post/get-post-types-of-rest-list`
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(handleAxiosError(error, "Network error"));
        }
    }
);

export const getListOfServices = createAsyncThunk(
    "Post/get-services-list",
    async (_, { rejectWithValue }) => {
        try {
            const response = await apiClient.get(`api/Post/get-services-list`);
            return response.data;
        } catch (error) {
            return rejectWithValue(handleAxiosError(error, "Network error"));
        }
    }
);

export const createRoom = createAsyncThunk(
    "Post/create-room",
    async (payload: IRoom, { rejectWithValue }) => {
        try {
            const response = await apiMediaClient.post(
                "/api/Post/create-room",
                payload
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(handleAxiosError(error, "Network error"));
        }
    }
);