import { useDispatch } from "react-redux";
import { APP_ENV } from "../env";
import { useAppDispatch } from "../hooks/redux/index.ts";
import {
    addNewMessageInGeneralCount,
    updateListOfChatIdForListening,
} from "../store/chat/chat.slice.ts";
import { getLocalStorage } from "../utils/storage/localStorageUtils.ts";
import * as signalR from "@microsoft/signalr";
import { AppDispatch } from "../store/index.ts";

//Connection build
const connection = new signalR.HubConnectionBuilder()
    .withUrl(APP_ENV.BASE_URL + "/chat", {
        accessTokenFactory: () => getLocalStorage("authToken") as string,
    })
    .withAutomaticReconnect([0, 2000, 10000, 30000])
    .build();

//Connection for listening chanels for all posts and new chatrooms
export const connectionForRealtorToSignalR = async (list: string[]) => {
    if (connection.state === signalR.HubConnectionState.Disconnected) {
        await connection
            .start()
            .then(async () => {
                if (list) {
                    await Promise.all(list.map((id) => startListeningPost(id)));
                }
            })
            .catch((err) => console.error("Connection failed: ", err));
    }

    connection.onreconnected(async () => {
        if (list) {
            await Promise.all(list.map((id) => startListeningPost(id)));
        }
    });
};

//join post channel for new chat Rooms appearance
const startListeningPost = async (roomId: string) => {
    if (connection.state === signalR.HubConnectionState.Connected) {
        await connection
            .invoke("JoinNewChanelOrNewChatRoomForListening", { roomId })
            .then(() => {
                console.log("roomId", roomId);
                connection.on("send_notify", (m) => joinForChatListening(m));
                
            });
    }
};
const test = async (roomId : string) => {
    console.log("test ", roomId);

    const dispatch = useDispatch<AppDispatch>();

                    await  dispatch(addNewMessageInGeneralCount());
                    await dispatch(updateListOfChatIdForListening(roomId));
                };

//join new chatRooms
const joinForChatListening = async (roomId: string) => {
    if (connection.state === signalR.HubConnectionState.Connected) {
        await connection
            .invoke("JoinNewChanelOrNewChatRoomForListening", { roomId })
            .then(() => {
               
                console.log("send_notify", roomId);
                 test(roomId);
            });
    }
};


//create new chatRoom and choin it for listening
export const joinNewPostChatByUser = (roomId: string) => {
    if (connection.state === signalR.HubConnectionState.Connected) {
        connection
            .invoke("JoinNewPostChatByUser", { roomId })
            .then((history) => {
                console.log("JoinNewPostChatByUser history", history);
            });
    }
};

//end connection
export const endListening = () =>
    connection.stop().then(() => {
        console.log("Disconnected");
    });
// export const joinRoomByClientForPost = (roomId: string) =>
//     connection.invoke('joinRoomByClientForPost', {roomId})
//         .then((history) => {
//             console.log("Get Id for post",history);
//             var currentRoom = history;
//             console.log("currentRoom",currentRoom);

//         });

// export const send = (message: string, roomId : string) =>
//     connection.send('SendMessage', {message, roomId})
//
//
// export const joinForPostListening = (roomId: string) => connection.invoke("JoinRoomForListening", {roomId})

//
// export const joinChatRoom = (roomId: string)=> connection.invoke('JoinRoomForListening', {roomId})
//     .then((history) => {
//             console.log('message history', history)
//
//            // needed for working example
//         }
//     )
//
//
//

//
//
//
// // needed for working example
//
//
// export const leave = (roomId: string) => connection.send('LeaveRoom', {roomId})
//     .then(() => {
//        // currentRoom = ''
//         // function reference needs to be the same to work
//         // connection.off('send_message', m => console.log(m)) // doesn't work
//         // connection.off('send_message', logMessage) // works
//         connection.off('send_message')
//         return connection.stop()
//     })

// export const start = (setState: (value: (((prevState: (IActive | undefined)) =>
//     (IActive | undefined)) | IActive | undefined)) => void) =>
//     connection.on('send_message', () => setState(true));

export const joinPostListening = (roomId: string) =>
    connection
        .start()
        .then(() => connection.invoke("JoinRoom", { roomId }))
        .then(() => {
            console.log("joinPostListening");
        });
// export const joinChatRoom = async ({userName, chatRoom}) => {
//
//
//     try {
//         const conn = new HubConnectionBuilder()
//             .withUrl("http://localhost:5095/chat")
//             .configureLogging(LogLevel.Information)
//             .build();
//
//         conn.on("JoinRoomUser",(userName, msg) => {
//             console.log(userName, msg)
//
//         } );
//         //
//         // conn.on("ReceiveSpecificMessage",(userName, msg) => {
//         //     console.log("{  msg} ",msg )
//         //     console.log("{  userName} ",userName )
//         //
//         //     setMessages(messages => [...messages, {userName, msg}]);
//         // } );
//
//         // conn.onclose(e =>{
//         //     setConnection({});
//         //     setMessages([]);
//         // })
//
//         await  conn.start();
//         await conn.invoke("JoinRoomUser", {userName, chatRoom });
//
//        /// setConnection(conn);
//
//     }catch (e){
//         console.log(e)
//     }
// }

// export const joinChatRoom = async (room : IJoinChatRoom) =>{
//     await  connection.start();
//     await connection.invoke("JoinRoom", {room});
// }
