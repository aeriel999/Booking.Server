import { ChatTextArea } from '../../../components/common/ChatTextArea/ChatTextArea';
import '../../../css/ChatRoom/index.scss';
import { Message } from '../Message/Message';
interface IChatRoom {
    postImage: string,
    postName: string,
    realtorAvatar: string,
    realtorName: string
}

export const ChatRoom = (info: IChatRoom) => {
    return (
        <div id="chat-room">
            <div className="chat-room-header">
                <div className="post">
                    <img src={info.postImage} />
                    <p>{info.postName}</p>
                </div>
                <div className="realtor">
                    <img src={info.realtorAvatar} />
                    <p>{info.realtorName}</p>
                </div>
            </div>
            <div className='chat-room-messages'>
                <div className='messages'>
                    <Message
                        text='Text message from Nazariy Slava Ukraine!'
                        myMessage={true}
                        date={new Date(Date.now())}
                        isRead={true}
                    />
                    <Message
                        text='Text message from Nazariy Slava Ukraine!'
                        myMessage={false}
                        date={new Date(Date.now())}
                        isRead={null}
                    />
                    <Message
                        text='Text message from Nazariy Slava Ukraine!'
                        myMessage={true}
                        date={new Date(Date.now())}
                        isRead={true}
                    />
                    <Message
                        text='Text message from Nazariy Slava Ukraine!'
                        myMessage={false}
                        date={new Date(Date.now())}
                        isRead={null}
                    />
                    <Message
                        text='Text message from Nazariy Slava Ukraine!
                        Text message from Nazariy Slava Ukraine!
                        Text message from Nazariy Slava Ukraine!
                        Text message from Nazariy Slava Ukraine!
                        Text message from Nazariy Slava Ukraine!
                        Text message from Nazariy Slava Ukraine!
                        Text message from Nazariy Slava Ukraine!
                        Text message from Nazariy Slava Ukraine!
                        Text message from Nazariy Slava Ukraine!
                        Text message from Nazariy Slava Ukraine!'
                        myMessage={false}
                        date={new Date(Date.now())}
                        isRead={null}
                    />
                    <Message
                        text='Text message from Nazariy Slava Ukraine!
                        Text message from Nazariy Slava Ukraine!
                        Text message from Nazariy Slava Ukraine!
                        Text message from Nazariy Slava Ukraine!
                        Text message from Nazariy Slava Ukraine!
                        Text message from Nazariy Slava Ukraine!
                        Text message from Nazariy Slava Ukraine!'
                        myMessage={false}
                        date={new Date(Date.now())}
                        isRead={null}
                    />
                    <Message
                        text='Text message from Nazariy Slava Ukraine!
                        Text message from Nazariy Slava Ukraine!
                        Text message from Nazariy Slava Ukraine!
                        Text message from Nazariy Slava Ukraine!'
                        myMessage={true}
                        date={new Date(Date.now())}
                        isRead={false}
                    />
                </div>
                <div className='send-message'>
                    <ChatTextArea maxLength={4000} />
                </div>
            </div>
        </div>
    )
}
/*<Message
                        text='Text message from Nazariy Slava Ukraine!'
                        myMessage={true}
                        date={new Date(Date.now())}
                        isRead={true}
                    />
                    <Message
                        text='Text message from Nazariy Slava Ukraine!'
                        myMessage={false}
                        date={new Date(Date.now())}
                        isRead={null}
                    />
                    <Message
                        text='Text message from Nazariy Slava Ukraine!'
                        myMessage={true}
                        date={new Date(Date.now())}
                        isRead={true}
                    />
                    <Message
                        text='Text message from Nazariy Slava Ukraine!'
                        myMessage={false}
                        date={new Date(Date.now())}
                        isRead={null}
                    />
                    <Message
                        text='Text message from Nazariy Slava Ukraine!
                        Text message from Nazariy Slava Ukraine!
                        Text message from Nazariy Slava Ukraine!
                        Text message from Nazariy Slava Ukraine!
                        Text message from Nazariy Slava Ukraine!
                        Text message from Nazariy Slava Ukraine!
                        Text message from Nazariy Slava Ukraine!
                        Text message from Nazariy Slava Ukraine!
                        Text message from Nazariy Slava Ukraine!
                        Text message from Nazariy Slava Ukraine!'
                        myMessage={false}
                        date={new Date(Date.now())}
                        isRead={null}
                    />
                    <Message
                        text='Text message from Nazariy Slava Ukraine!
                        Text message from Nazariy Slava Ukraine!
                        Text message from Nazariy Slava Ukraine!
                        Text message from Nazariy Slava Ukraine!
                        Text message from Nazariy Slava Ukraine!
                        Text message from Nazariy Slava Ukraine!
                        Text message from Nazariy Slava Ukraine!'
                        myMessage={false}
                        date={new Date(Date.now())}
                        isRead={null}
                    />
                    <Message
                        text='Text message from Nazariy Slava Ukraine!
                        Text message from Nazariy Slava Ukraine!
                        Text message from Nazariy Slava Ukraine!
                        Text message from Nazariy Slava Ukraine!'
                        myMessage={true}
                        date={new Date(Date.now())}
                        isRead={false}
                    /> */