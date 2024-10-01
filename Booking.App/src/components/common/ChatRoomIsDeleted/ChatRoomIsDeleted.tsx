import '../../../css/ChatRoomIsDeleted/index.scss';

/*interface IChatRoomIsDeleted {
    postId: string;
}*/

export const ChatRoomIsDeleted = (/*info: IChatRoomIsDeleted*/) => {

    return (
        <div id="chat-room-is-deleted">
            <p className="text">
                The chat room has been deleted by the client
            </p>
        </div>
    )
}