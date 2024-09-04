import { Status } from "../../utils/enum";

export interface IChangePassword {
    currentPassword: string
    newPassword: string,
    confirmNewPassword: string,
}

export interface ICreatePassword {
    password: string,
    confirmPassword: string,
}

export interface IUserState {
    status: Status;
    realtors: IRealtor[] | null,
    realtor: IRealtorInformation | null,
    feedbacks: IFeedbackView | null,
    realtorsByUserFeedbacks: IRealtorsForUser | null,
    filteredRealtors: IRealtor[] | null
}

export interface IRealtor {
    id: string,
    name: string
}

export interface IFilteredListOfRealtorsRequest {
    category: string | null;
    country: string | null;
    city: string | null;
}

export interface IRealtorInformation {
    id: string,
    name: string,
    email: string,
    avatar: string,
    rating: number,
    phone: string,
    headerImage: string | null
}
export interface IFeedback {
    text: string,
    rating: number,
    clientId: string,
    client: string,
    feedbackAt: Date
}
export interface IFeedbackView {
    items: {
        $id: string;
        $values: IFeedback[];
    };
    page: number;
    sizeOfPage: number;
    totalCount: number;
}

export interface IPageForFeedbacks {
    page: number,
    sizeOfPage: number
}

export interface IGetFeedbacks {
    id: string,
    pages: IPageForFeedbacks
}
export interface ISendFeedback {
    text: string,
    rating: number,
    realtorId: string
}

export interface IRealtorsForUser {
    $id: string,
    $values: IRealtorByUserFeedbacks[] | null
}

export interface IRealtorByUserFeedbacks {
    id: string,
    realtor: string,
    avatar: string
}

export interface IEditClientProfile {
    email: string,
    firstName: string,
    lastName: string
}