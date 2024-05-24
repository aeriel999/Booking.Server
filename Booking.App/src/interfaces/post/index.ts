import {Status} from "../../utils/enum";

export interface IListForCombobox {
    id: string ;
    name: string;
}

export  interface ICategory{
    id: string,
    name: string
}

export  interface ICountry{
    id: string,
    name: string
}

export  interface ICity{
    id: string,
    name: string
}

export interface IStreet {
    id: string,
    name: string
}

export interface ITypeOfRent {
    id: string,
    name: string
}
export interface IPageOfPosts{
    items: {
        $id: string,
        $values: IPost[]
    },
    page:number,
    sizeOfPage:number,
    totalCount:number
}

export interface IPost{
    id: number,
    name:string;
    category:string,
    user:string,
    price:number,
    imagePost:string
}
export  interface IPostState{
    status: Status
    posts: IPageOfPosts | null,
    categories: ICategory[] | null,
    countries: ICountry[] | null,
    cities: ICity[] | null,
    streets: IStreet[] | null,
    typeOfRent: ITypeOfRent[] | null,
}

export  interface IPostCreate {
    name: string,
    postTypeOfRentId: string,
    categoryId: string | null,
    countryId: string | null,
    cityId: string | null,
    cityName: string | null,
    streetId: string | null,
    streetName: string | null,
    buildingNumber: string | null,
    numberOfRooms: number | null,
    area: number | null,
    price: number,
    description: string | null,
    images: File[]
}

