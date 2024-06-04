import {createAsyncThunk} from "@reduxjs/toolkit";
import {apiClient, apiMediaClient} from "../../utils/api/apiClient.ts";
import {handleAxiosError} from "../../utils/errors";
import {IFetchData, IPostCreate} from "../../interfaces/post";



export const getTypesOfRentList = createAsyncThunk(
    'Post/get-type-of-rent-list',
    async (_, { rejectWithValue }) => {
        try {
            const response = await apiClient.get('/api/Post/get-type-of-rent-list');
            return response.data;
        } catch (error) {
            return rejectWithValue(handleAxiosError(error, "Network error"));
        }
    },
);

export const getListOfCategories = createAsyncThunk(
    'Post/get-categories-list',
    async (_, { rejectWithValue }) => {
        try {
            const response = await apiClient.get('/api/Post/get-categories-list');
            return response.data;
        } catch (error) {
            return rejectWithValue(handleAxiosError(error, "Network error"));
        }
    },
);



export const  getListOfPosts=createAsyncThunk(
    'Post/get-list-of-posts',
    async (data:IFetchData) => {
            const response = await apiClient.get(`/api/Post/get-list-of-post?page=${data.page}&sizeOfPage=${data.sizeOfPage}`);
            return response.data;

    },

)

export const getListOfCountries = createAsyncThunk(
    'Post/get-countries-list',
    async (_, { rejectWithValue }) => {
        try {
            const response = await apiClient.get('/api/Post/get-countries-list');
            return response.data;
        } catch (error) {
            return rejectWithValue(handleAxiosError(error, "Network error"));
        }
    },
);

export const getListOfCitiesByCountryId = createAsyncThunk(
    'Post/get-cities-list',
    async (countryId: string, { rejectWithValue }) => {
        try {
            const response = await apiClient.get(`/api/Post/get-cities-list?countryId=${countryId}`);
            console.log("response.data",response.data)
            return response.data;
        } catch (error) {
            return rejectWithValue(handleAxiosError(error, "Network error"));
        }
    },
);

export const getListOfStreetsByCityId = createAsyncThunk(
    'Post/get-street-list',
    async (cityId: string, { rejectWithValue }) => {
        try {
            const response = await apiClient.get(`/api/Post/get-street-list?cityId=${cityId}`);
            console.log("response.data",response.data)
            return response.data;
        } catch (error) {
            return rejectWithValue(handleAxiosError(error, "Network error"));
        }
    },
);

export const createPost = createAsyncThunk(
    'Post/create-post',
    async (payload : IPostCreate, { rejectWithValue }) => {
        try {
            console.log("handleSubmit", payload)
            const response = await apiMediaClient.post('/api/Post/create-post', payload);
            return response.data;
        } catch (error) {
            return rejectWithValue(handleAxiosError(error, "Network error"));
        }
    },
);

export const getListPostsForRealtor = createAsyncThunk(
    'Post/get-post-list-for-realtor',
    async (payload : IFetchData, { rejectWithValue }) => {
        try {
            const response = await apiClient.get(
                `/api/Post/get-post-list-for-realtor?page=${payload.page}&sizeOfPage=${payload.sizeOfPage}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(handleAxiosError(error, "Network error"));
        }
    },
);