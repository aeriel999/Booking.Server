import { Status } from "../../utils/enum";

export interface IChangePassword {
    currentPassword: string | undefined,
    newPassword: string | undefined,
    confirmNewPassword: string | undefined,
}

export interface IUserState {
    status: Status;
    realtors: IRealtor[] | null,
    realtor: IRealtorInformation | null,
    feedbacks: IFeedbackView | null,
    realtorsByUserFeedbacks: IRealtorByUserFeedbacks[] | null
}

export interface IRealtor {
    id: string,
    name: string
}
export interface IRealtorInformation {
    id: string,
    name: string,
    email: string,
    avatar: string,
    rating: number,
    phone: string
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
export interface IPage {
    page: number,
    sizeOfPage: number
}
export interface IGetFeedbacks {
    id: string,
    pages: IPage
}
export interface ISendFeedback {
    text: string,
    rating: number,
    realtorId: string
}
export interface IRealtorByUserFeedbacks {
    id: string,
    realtor: string,
    avatar: string
}