import { Status } from "../../utils/enum";

export interface IChatState {
    chatRooms: IChatRoom[] | null;
    hasNewPosts: boolean;
    status: Status;
}

export interface IChatRoomList {
    hasNewMsg: boolean;
    postChatRoomsInfoList: IChatsForPostListInfo[];
}

export interface IChatsForPostListInfo {
    hasNewMsg: boolean;
    postName: string;
    postId: string;
    chatRoomsInfoList: IChatRoomInfo[];
}

export interface IChatRoomInfo {
    hasNewMsg: boolean;
    chatRoomName: string;
    chatRoomId: string;
}

export interface IChatRoom {
    chatRoomId: string;
    clientId: string;
    realtorId: string;
    postId: string;
    postName: string;
    postImage: string;
    sendUserName: string;
    sendUserAvatar: string;
    userMessages: IUserMessage[];
}

export interface IUserMessage {
    userName: any;
    id: string;
    userId: string;
    message: string;
    chatRoomId: string;
    sentAt: string;
    isRead: boolean;
}
