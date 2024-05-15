import {Status} from "../../utils/enum";
import {IUser} from "../account";

export  interface IChatState{
    chatRooms: IChatRoom[] | null,
    hasNewPosts: boolean,
    status: Status;
}

export interface IChatRoom{
    chatRoomId: string,
    clientId: string,
    realtorId: string,
    postId: string,
    userMessages: IUserMessage[]
}

export interface IUserMessage{
    id: string,
    user: IUser,
    message: string,
    sentAt: string,
    isRead: boolean
}




