import { Status } from "../../utils/enum";

export interface IChatState {
    chatRooms: IChatRoom[] | null;
    chatRoomsForClient: IChatRoomListForClient[] | null;
    hasNewPosts: boolean;
    status: Status;
    generalNumberOfUnreadMessages: number;
    listOfPostIdForListening: string[] | null;
    listOfChatsIdForListening: string[] | null;
    chatRoomInfoForClient: IChatRoomInfoForClient | null;
    currentChatRoomId: string | null;
    newMessage: string | null;
    isCuretnChatReaded: boolean;
    getingMessageInfo: IGetMessage | null;
    outcomeMessagesReadedChatId: string | null;
    deletedChatId: string | null;
    readedMessages: IReadMessage | null;
    chatIsExist: boolean | null;
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

export interface ISendMessage {
    message: string;
    roomId: string;
}

export interface IGetMessage {
    message: string;
    chatRoomId: string;
    postId: string;
}
export interface IReadMessage {
    chatRoomId: string;
    countReadedMessages: number;
}

export interface IChatRoomInfoForClient {
    postImage: string;
    postName: string;
    realtorAvatar: string;
    realtorName: string;
}

export interface IChatRoomListForClient {
    realtorId: string;
    realtorAvatar: string;
    realtorName: string;
    hasUnreadMessages: boolean;
    unreadMessages: number | null;
    chatsForClient: {
        $values: IChatRoomForClient[];
    };
}

export interface IChatRoomForClient {
    postId: string;
    chatRoomId: string;
    postImage: string;
    postName: string;
    hasUnreadMessages: boolean;
    unreadMessages: number | null;
}

export interface IChatItem {
    id: string;
    name: string;
    image: string;
    numberOfUnreadMessages: number;
    setChatInfo: (arg: IChatInfo) => void;
    isOpen: boolean;
    onChatClick: () => void;
    deletedChatId: string | null;
    setDeletedPostChatId?: (arg: boolean) => void;
}

export interface IChatInfo {
    chatId: string;
    postImage: string;
    postId?: string;
    postName: string;
    userAvatar: string;
    userName: string;
    chatMessages: IChatMessageInfo[] | null;
    // numberOfUnreadMessages: number | null;
}

export interface IChatMessageInfo {
    id?: string;
    userId: string;
    sentAt?: string;
    text: string;
    date?: Date;
    isRead: boolean;
}
