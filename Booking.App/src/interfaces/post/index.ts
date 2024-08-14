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

export interface IFilteredListOfCategoriesRequest {
    country: string | null;
    city: string | null;
    realtor: string | null;
}

export interface ICountry {
    id: string;
    name: string;
}

export interface IFilteredListOfCountriesRequest {
    category: string | null;
    realtor: string | null;
}

export interface ICity {
    id: string;
    name: string;
}

export interface IFilteredListOfCitiesRequest {
    category: string | null;
    country: string;
    realtor: string | null;
}

export interface IStreet {
    id: string;
    name: string;
}

export interface IFilteredRequest {
    filter: IFilter | null;
    pages: IFetchData;
}

export interface IFilter {
    category: string | null;
    country: string | null;
    city: string | null;
    realtor: string | null;
}

export interface IFilteredRequestName {
    filter: IFilter | null;
    name: string | null;
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
    id: string;
    name: string;
    category: string;
    city: string;
    country: string;
    rating: number;
    countOfRating: number;
    user: string;
    price: number;
    imagePost: string;
    typesOfRest: string[];
}

export interface IPostInformation {
    id: number;
    name: string;
    category: string;
    description: string;
    countryName: string;
    countryId: string;
    cityName: string;
    cityId: string;
    street: string;
    zipCode: number;
    discount: number;
    rate: number;
    typesOfRest: string[];
    services: string[];
    numberOfGuests: number;
    user: string;
    userId: string;
    isArchive: boolean;
    price: number;
    imagePostList: string[];
}

export interface IPostByRealtorId {
    id: number;
    name: string;
    imagePost: string;
}

export interface IFilteredRequest {
    filter: IFilter | null;
    pages: IFetchData;
}
export interface IFilter {
    category: string | null;
    country: string | null;
    city: string | null;
    realtor: string | null;
}
export interface IFilteredRequestName {
    filter: IFilter | null;
    name: string | null;
}
export interface IPostState {
    status: Status;
    post: IPostInformation | null;
    posts: IPageOfPosts | null;
    categories: ICategory[] | null;
    countries: ICountry[] | null;
    cities: ICity[] | null;
    streets: IStreet[] | null;
    typesOfRest: ITypeOfRest[] | null;
    searchPost: string[] | null;
    postInfoList: IPageOfPostsForRealtor | null;
    postsByRealtorId: IPostByRealtorId[] | null;
    postMostRating: IPostRatingAndDiscount[] | null;
    postMostDiscount: IPostRatingAndDiscount[] | null;
    filter: IFilter;
    filteredCategories: ICategory[] | null;
    filteredCountries: ICountry[] | null;
    filteredCities: ICity[] | null;
    textForSearching: string | null;

}

interface IPostRatingAndDiscount {
    id: string;
    name: string;
    image: string;
    country: string;
    city: string;
    rating: number;
    discount: number | null;
}

interface ITypeOfRest {
    id: number;
    name: string;
    image: string;
}

export interface INamesOfPosts {
    $id: string;
    $values: string[];
}

export interface IFetchData {
    page: number;
    sizeOfPage: number;
}

export interface IFetchDataByName {
    filter: IFilter;
    name: string;
    pages: IFetchData;
}

export interface IPostCreate {
    name: string;
    categoryId: string | null;
    countryId: string | null;
    cityId: string | null;
    cityName: string | null;
    streetId: string | null;
    streetName: string | null;
    zipCode: number;
    numberOfGuests: number;
    price: number;
    discount: number | null;
    images: IImage[];
}

export interface IImage {
    id: number;
    image: File;
}

export interface IPostInfoForRealtor {
    id: string;
    category: string;
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

export interface IPostEdit {
    id: string;
    name: string;
    categoryId: string | null;
    countryId: string | null;
    cityId: string | null;
    cityName: string | null;
    streetId: string | null;
    streetName: string | null;

    price: number | null;
    description: string | null;
    images: File[] | null;
    deleteImages: string[] | undefined;
}

export interface TablePaginationActionsProps {
    count: number;
    page: number;
    rowsPerPage: number;
    onPageChange: (
        event: React.MouseEvent<HTMLButtonElement>,
        newPage: number
    ) => void;
}

