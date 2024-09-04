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

export interface IPostForEdit {
    id: number;
    name: string;
    categoryName: string;
    countryId: string;
    countryName: string;
    cityName: string;
    cityId: string;
    streetName: string;
    zipCode: number;
    discount: number | null;
    numberOfGuests: number | null;
    price: number;
    imagePostList: string[];
    typesOfRest: string[] | null;
    services: string[] | null;
    roomList?: IRoomInfo[];
}

export interface IPostInformation {
    id: number;
    name: string;
    categoryName: string;
    categoryId: string;
    countryName: string;
    countryId: string;
    cityName: string;
    cityId: string;
    streetName: string;
    zipCode: number;
    discount: number | null;
    numberOfGuests: number | null;
    userName: string;
    userId: string;
    price: number;
    rate: number;
    countOfFeedbacks: number | null;
    imagePostList: {
        $id: number,
        $values: string[]
    } | null;
    typesOfRest: string[] | null;
    services: {
        $id: number,
        $values: IServiseInfo[]
    } | null;
    roomList?: {
        $id: number,
        $values: IRoomInfo[]
    };
}

export interface IServiseInfo {
    name: string,
    icon: string
}

export interface IRoomInfo {
    //postId: string;
    id: string;
    numberOfGuests: number;
    numberOfRooms: number;
    discount: number | null;
    price: number;
    mainImage: string;
}
export interface IPostByRealtorId {
    id: number;
    name: string;
    imagePost: string;
}

export interface IPostState {
    status: Status;
    post: IPostInformation | null;
    posts: IPageOfPosts | null;
    postForEdit: IPostForEdit | null;
    categories: ICategory[] | null;
    countries: ICountry[] | null;
    cities: ICity[] | null;
    streets: IStreet[] | null;
    typesOfRest: IGetTypeOfRestWithImage[] | null;
    services: IGetService[] | null;
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
    feedbacks: IFeedbacksByPost | null;
    historyOfFeedbacksByClient: IHistoryOfFeedbacksByClient | null;
    idOfSelectedFeedback: string | null;
    pageOfSelectedFeedback: number;
    searchingPost: string | null
}
export interface IHistoryOfFeedbacksByClient {
    items: {
        $id: string;
        $values: IFeedbackForClient[];
    };
    page: number;
    sizeOfPage: number;
    totalCount: number;
}
export interface IFeedbackForClient {
    feedbackId: string;
    postId: string;
    feedbackAt: Date,
    textOfFeedback: string;
    rating: number;
    imageOfPost: string,
    nameOfPost: string,
    country: string,
    city: string;
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

export interface ITypeOfRest {
    id: string;
    name: string;
    image?: string;
}

export interface IService {
    id: string;
    name: string;
}

export interface IFetchDataByName {
    filter: IFilter;
    name: string;
}

export interface IPostCreate {
    name: string;
    categoryId: string;
    countryId: string;
    cityId: string | null;
    cityName: string | null;
    streetId: string | null;
    streetName: string | null;
    zipCode: number;
    numberOfGuests: number;
    price: number;
    discount: number | null;
    mainImage: File;
    images: File[];
    postTypesOfRest: string[] | null;
    postServices: string[] | null;
}

export interface IRoom {
    postId: string;
    numberOfGuests: number;
    numberOfRooms: number;
    discount: number | null;
    price: number;
    mainImage: File | null;
}

export interface IPostInfoForRealtor {
    id: string;
    name: string;
    category: string;
    adress: string;
    price: number;
    discount: number | null;
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
    zipCode: number | null;
    discount: number | null;
    numberOfGuests: number | null;
    price: number;
    postTypesOfRest: string[] | null;
    services: string[] | null;
    images: File[] | null;
    deleteImages: string[] | undefined;
    roomList: IRoom[] | null;
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
export interface IGetService {
    id: string,
    name: string,
    icon: string
}
export interface IGetTypeOfRest {
    id: string,
    name: string,
}
export interface IGetTypeOfRestWithImage {
    id: string,
    name: string,
    image: string
}
export interface IGetFeedbacksRequest {
    id: string,
    page: number,
    sizeOfPage: number
}
export interface IFeedbacksByPost {
    items: {
        $id: string;
        $values: IFeedback[];
    };
    page: number;
    sizeOfPage: number;
    totalCount: number;
}
export interface IFeedback {
    text: string,
    rating: number,
    client: string,
    clientAvatar: string | null,
    feedbackAt: Date
}
export interface ISendFeedback {
    text: string | null,
    rating: number,
    postId: string
}

export interface IDeleteImage {
    name: string;
    index: number;
}
