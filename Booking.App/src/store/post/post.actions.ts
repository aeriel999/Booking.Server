import {createAsyncThunk} from "@reduxjs/toolkit";
import {apiClient, apiMediaClient} from "../../utils/api/apiClient.ts";
import {handleAxiosError} from "../../utils/errors";
import {IFetchData, IFetchDataByName, IFilteredRequest, IFilteredRequestName, IPostCreate} from "../../interfaces/post";



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
        try{
            const response = await apiClient.get('/api/Post/get-categories-list');

            return response.data;
        } catch (error) {
            return rejectWithValue(handleAxiosError(error, "Network error"));
        }
    },
);

export const getPostListByRealtorId = createAsyncThunk(
    'Post/get-post-list-by-realtor-id',
    async (id:string, { rejectWithValue }) => {
        try{
            const response = await apiClient.get(`/api/Post/get-post-list-by-realtor-id-${id}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(handleAxiosError(error, "Network error"));
        }
    },
);

export const getFilteredListByType = createAsyncThunk(
    'Post/get-filtered-list-by-type',
    async (payload:IFilteredRequest, { rejectWithValue }) => {
        try{
            const response = await apiClient.get(`/api/Post/get-filtered-list-by-type?category=${payload.filter?.category}&country=${payload.filter?.country}&city=${payload.filter?.city}&realtor=${payload.filter?.realtor}&page=${payload.pages.page}&sizeOfPage=${payload.pages.sizeOfPage}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(handleAxiosError(error, "Network error"));
        }
    },
);

export const  getListOfPosts=createAsyncThunk(
    'Post/get-list-of-posts',
    async (data:IFetchData, { rejectWithValue }) => {
        try {
            const response = await apiClient.get(`/api/Post/get-list-of-post?page=${data.page}&sizeOfPage=${data.sizeOfPage}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(handleAxiosError(error, "Network error"));
        }
    },

)

export const  getListOfPostsName=createAsyncThunk(
    'Post/get-list-of-posts-name',
    async (payload:IFilteredRequestName, { rejectWithValue }) => {
        try {
        const response = await apiClient.get(`/api/Post/get-name-of-post?category=${payload.filter?.category}&country=${payload.filter?.country}&city=${payload.filter?.city}&realtor=${payload.filter?.realtor}&name=${payload.name}`);
        return response.data;
        } catch (error) {
            return rejectWithValue(handleAxiosError(error, "Network error"));
        }
    },

)
export const  getListOfPostsByName=createAsyncThunk(
    'Post/get-list-of-posts-by-name',
    async (payload:IFetchDataByName, { rejectWithValue }) => {
        try {
        const response = await apiClient.get(`/api/Post/get-post-by-name?category=${payload.filter?.category}&country=${payload.filter?.country}&city=${payload.filter?.city}&realtor=${payload.filter?.realtor}&name=${payload.name}&page=${payload.pages.page}&sizeOfPage=${payload.pages.sizeOfPage}`);
        return response.data;
        } catch (error) {
            return rejectWithValue(handleAxiosError(error, "Network error"));
        }
    },

)

export const getPostById = createAsyncThunk(
    'Post/get-post-by-id',
    async (id : string, { rejectWithValue })=>{
        try {
            const response = await apiClient.get(`api/Post/get-post-by-id-${id}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(handleAxiosError(error, "Network error"));
        }
       
    }

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

 