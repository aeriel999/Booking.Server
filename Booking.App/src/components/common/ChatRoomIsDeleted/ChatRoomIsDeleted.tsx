import '../../../css/ChatRoomIsDeleted/index.scss';

interface IChatRoomIsDeleted {
    postId: string;
}

export const ChatRoomIsDeleted = (info: IChatRoomIsDeleted) => {

    return (
        <div id="chat-room-is-deleted">
            <p className="text">
                The chat was deleted by the realtor. Create a new chat or select another one.
            </p>
            <div className="buttons">
                <button>Create a new chat</button>
                <button>Come to others chats</button>
            </div>
        </div>
    )
}