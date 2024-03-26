import {Status} from "../../utils/enum";

export interface IUserRegister{
    email: string,
    password: string,
    confirmPassword: string,
}

export interface IAccountState {
    user: IUser | null,
    token: string | null,
    isLogin: boolean,
    status: Status;
}

export interface IConfirmEmail{
    userId: string | undefined,
    token: string | undefined
}

export interface IUser{
    email: string,
    role: string,
}

export interface IErrorResponse{
    details: string,
    errors: IServerError[],
    status: number,
    title: string,
    type: string
}

export  interface IServerError{
    code: string,
    description: string,
    metadata: string | null,
    numericType: number,
    type:number
}
export interface ILogin {
    email: string,
    password: string,
}



export interface IRealtorRegister {
    email: string,
    password: string,
    confirmPassword: string,
    firstName: string,
    lastName: string,
    phone: string,
}


