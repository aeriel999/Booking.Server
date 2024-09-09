import { Status } from "../../utils/enum";

export interface IChatState {
    chatRooms: IChatRoom[] | null;
    charRoomsForClient: IChatRoomListForClient[] | null;
    hasNewPosts: boolean;
    status: Status;
    generalNumberOfUnreadMessages: number
    listOfIdForListening: string[] | null
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
    id: string;
    userId: string;
    message: string;
    chatRoomId: string;
    sentAt: string;
    isRead: boolean;
}

export interface ISendMessage{
    message: string;
    roomId:string;
}

export interface IChatRoomListForClient {
    realtorId: string;
    realtorAvatar: string;
    realtorName: string,
    hasUnreadMessages: boolean,
    unreadMessages: number | null,
    chatsForClient: IChatRoomForClient[]

}

export interface IChatRoomForClient {
    chatRoomId: string;
    postImage: string;
    postName: string,
    hasUnreadMessages: boolean,
    unreadMessages: number | null
}
