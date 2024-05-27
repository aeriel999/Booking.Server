import {APP_ENV} from "../env";
import {getLocalStorage} from "../utils/storage/localStorageUtils.ts";

import * as signalR from "@microsoft/signalr";

export interface IJoinChatRoom{
    roomId: string,
    setIsActive: (setIsActive: boolean) => void,
}

//const access_token = getLocalStorage('authToken') as string;

const connection = new signalR.HubConnectionBuilder()
            .withUrl( APP_ENV.BASE_URL +  "/chat",
                { accessTokenFactory: () => (getLocalStorage('authToken') as string) } )
    .build();

export const startListening = () =>connection.start()
.then(() => {console.log("Conected")});
    // .then(() => {
    //     connection.on('send_notify', joinNewChatRoom)
    //     connection.on('send_message', logMessage)
    // });

export const endListening = () =>connection.stop()
.then(() => {console.log("Disconnected")});

export const joinForPostListening = (roomId: string) =>
 
    connection.invoke('JoinPostChanelForNotifyByRealtor', {roomId})
    .then(() => {console.log("joinForPostListening")});

// export const send = (message: string, roomId : string) =>
//     connection.send('SendMessage', {message, roomId})
//
//
// export const joinForPostListening = (roomId: string) => connection.invoke("JoinRoomForListening", {roomId})
// const logMessage = (m: string) => console.log("logMessage", m)
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
// export const joinRoomByClientForPost = (roomId: string) =>
//     connection.invoke('joinRoomByClientForPost', {roomId});
//         // .then((history) => {
//         //     console.log("Get Id for post",history);
//         //     currentRoom = history;
//         //     console.log("currentRoom",currentRoom);
//         //
//         // });
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






export  const  joinPostListening = (roomId: string) =>  connection.start()
    .then(() =>  connection.invoke('JoinRoom', {roomId}))
    .then(() => {console.log("joinPostListening")});
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


