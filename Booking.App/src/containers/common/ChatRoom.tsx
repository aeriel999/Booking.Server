// //import { leave, send, startListening} from "../../SignalR";
// import { useParams } from "react-router-dom";
//
// import { TextField } from "@mui/material";
// import Button from "@mui/material/Button";
// import SendIcon from "@mui/icons-material/Send";
// import Box from "@mui/material/Box";
// import * as React from "react";
// import {useEffect} from "react"; // Import SendIcon
//
// export interface IMessage {
//     userName: string;
//     msg: string;
// }
//
// export interface IChatRoomProps {
//     messages: IMessage[];
//     sendMSG: (msg: string) => void;
// }
//
//
// export default function ChatRoom() {
//     const { postId } = useParams();
//
//     useEffect(() => {
//         startListening();
//     }, []);
//
//     const  disconnect = () =>{
//
//         leave("5c57dae8-39f3-41da-9bc8-521221e4bf44");
//         leave("1bf1e188-3dd0-42c0-a100-d0720c92b453");
//     }
//
//     const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
//         event.preventDefault();
//
//         const data = new FormData(event.currentTarget);
//         const message = data.get("message") as string;
//         console.log("Form submitted with value:", postId);
//
//         // const roomId =  await joinRoomByClientForPost(postId);
//         //
//         // console.log("history", roomId)
//         // if(postId)
//         // {
//         //     console.log("Start", postId);
//         //
//         //     await joinRoomByClientForPost(postId);
//         //
//         // }
//       await send(message, "5c57dae8-39f3-41da-9bc8-521221e4bf44");
//     };
//     return (
//         <>
//         <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}
//              style={{
//                  display: "flex",
//                  justifyContent: "center",
//                  width: "95%",
//                  margin: "0 auto"
//              }}
//         >
//
//                 <TextField
//                     id="message"
//                     name="message"
//                     style={{ width: "100%"}}
//                     margin="normal"
//
//                 />
//                 <Button variant="contained" color="primary" type={"submit"}>
//                     <SendIcon /> {/* Correctly use SendIcon */}
//                 </Button>
//         </Box>
//             <Button onClick={disconnect} color={"inherit"}>End connection</Button>
//         </>
//     );
// }
