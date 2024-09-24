import { APP_ENV } from "../env";
import { getLocalStorage } from "../utils/storage/localStorageUtils.ts";
import * as signalR from "@microsoft/signalr";

//Connection build
export const connection = new signalR.HubConnectionBuilder()
    .withUrl(APP_ENV.BASE_URL + "/chat", {
        accessTokenFactory: () => getLocalStorage("authToken") as string,
    })
    .withAutomaticReconnect([0, 2000, 10000, 30000])
    .build();

//create new chatRoom and choin it for listening
export const joinNewPostChatByUser = async (roomId: string) => {
    //const dispatch = useAppDispatch();
    if (connection.state === signalR.HubConnectionState.Connected) {
        return await connection
            .invoke("JoinNewPostChatByUser", { roomId })
            .then((history) => {
                console.log("JoinNewPostChatByUser history", history);
                return history;
            });
    }
};

// export const startListeningPost = async (roomId: string) => {
//     if (connection.state === signalR.HubConnectionState.Connected) {
//         await connection
//             .invoke("JoinRoomForListening", { roomId })
//             .then(async () => {
//                 console.log("roomId", roomId);
//                 // Remove any previous listener before adding a new one
//                 connection.off("send_notify");
//                 // Add the new listener
//                 connection.on("send_message", async (m) => {
//                     console.log("send_message", m);
//                     //  props.setMessages(m)
//                 });
//             });
//     }
// };

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

//
export const joinForPostListening = (roomId: string) =>
    connection.invoke("JoinNewChanelOrNewChatRoomForListening", { roomId });

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

// export const leave = (roomId: string) =>
//     connection.send("LeaveRoom", { roomId }).then((data) => {
//         console.log("leave", data);
//         connection.off("send_message");
//     });

// export const start = (setState: (value: (((prevState: (IActive | undefined)) =>
//     (IActive | undefined)) | IActive | undefined)) => void) =>
//     connection.on('send_message', () => setState(true));

// export const joinPostListening = (roomId: string) =>
//     connection
//         .start()
//         .then(() => connection.invoke("JoinRoom", { roomId }))
//         .then(() => {
//             console.log("joinPostListening");
//         });
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
