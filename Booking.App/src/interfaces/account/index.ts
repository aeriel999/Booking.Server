import { Status } from "../../utils/enum";

export interface IUserRegister {
    email: string;
    password: string;
    confirmPassword: string;
}

export interface IAccountState {
    user: IUser | null;
    token: string | null;
    isLogin: boolean;
    status: Status;
    registerData: IRealtorRegister | null;
}

export interface IConfirmEmail {
    userId: string | undefined;
    token: string | undefined;
}

export interface IUser {
    id: string;
    email: string;
    role: string;
    firstName: string | null;
    lastName: string | null;
    phoneNumber: string | null;
    avatar: string | null;
    rating: number | null;
}

export interface IErrorResponse {
    $id: number;
    details: string;
    errors: Error;
    status: number;
    title: string;
    type: string;
}

interface Error {
    $id: number;
    $values: IServerError[];
}

export interface IServerError {
    code: string;
    description: string;
    metadata: string | null;
    numericType: number;
    type: number;
}

export interface ILogin {
    email: string;
    password: string;
}

export interface IRealtorRegister {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email: string;
    password: string;
    confirmPassword: string;
    avatar: File | undefined | null;
}

export interface IForgotPassword {
    email: string;
}

export interface IReconfirmEmail {
    email: string;
}

export interface IResetPassword {
    email: string;
    token: string;
    password: string;
    confirmPassword: string;
}

export interface IEditRealtorInfo {
    firstName: string | null;
    lastName: string | null;
    phoneNumber: string | null;
    email: string | null;
    avatar: File | undefined | null;
}

export interface IReloadAvatar {
    avatar: File;
}

export interface IChangeEmail {
    email: string | undefined;
    token: string | undefined;
    userId: string | undefined;
}

export interface IGoogleLogin {
    googleToken: string;
}

export interface IUploadedFile {
    lastModified: number;
    lastModifiedDate: Date;
    name: string;
    originFileObj: File;
    percent: number;
    size: number;
    thumbUrl: string;
    type: string;
    uid: string;
}
