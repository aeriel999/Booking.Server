import { Status } from "../../utils/enum";

export interface IFetchData {
    page: number;
    sizeOfPage: number;
}

export interface IListForCombobox {
    id: string;
    name: string;
}

export interface ICategory {
    id: string;
    name: string;
}

export interface ICountry {
    id: string;
    name: string;
}

export interface ICity {
    id: string;
    name: string;
}

export interface IStreet {
    id: string;
    name: string;
}

export interface ITypeOfRent {
    id: string;
    name: string;
}

export interface IPageOfPosts {
    items: {
        $id: string;
        $values: IPost[];
    };
    page: number;
    sizeOfPage: number;
    totalCount: number;
}

export interface IPost {
    id: number;
    name: string;
    category: string;
    user: string;
    price: number;
    imagePost: string;
}

export interface IPostInformation {
    id: number;
    name: string;
    category: string;
    description: string;
    postTypeOfRent: string;
    countryName: string;
    countryId: string;
    cityName: string;
    cityId: string;
    street: string;
    buildingNumber: string;
    numberOfRooms: number;
    area: number;
    user: string;
    isArchive: boolean;
    price: number;
    imagePost: string;
}
export interface IFilteredRequest {
    filter:IFilter|null,
    pages:IFetchData
}
export interface IFilter{
    category:string | null,
    country:string | null,
    city:string | null,
    realtor:string | null
}
export interface IFilteredRequestName {
    filter:IFilter|null,
    name:string | null
}
export  interface IPostState{
    status: Status
    post:IPostInformation | null,
    posts: IPageOfPosts | null,
    categories: ICategory[] | null,
    countries: ICountry[] | null,
    cities: ICity[] | null,
    streets: IStreet[] | null,
    typeOfRent: ITypeOfRent[] | null,
    searchPost:string[]
}
export interface IFetchData{
    page:number,
    sizeOfPage:number
}

export interface IFetchDataByName{
     filter:IFilter,
     name:string,
     pages:IFetchData

export interface IPostCreate {
    name: string;
    postTypeOfRentId: string;
    categoryId: string | null;
    countryId: string | null;
    cityId: string | null;
    cityName: string | null;
    streetId: string | null;
    streetName: string | null;
    buildingNumber: string | null;
    numberOfRooms: number | null;
    area: number | null;
    price: number;
    description: string | null;
    images: File[];
}

export interface IPostInfoForRealtor {
    id: string;
    category: string;
    typeOfRent: string;
    adress: string;
    name: string;
    price: number;
    dateOfPost: string;
    dateOfEdit: string | null;
    isActive: boolean;
    isArhive: boolean;
}

export interface IPageOfPostsForRealtor {
    items: {
        $id: string;
        $values: IPostInfoForRealtor[];
    };
    page: number;
    sizeOfPage: number;
    totalCount: number;
}
