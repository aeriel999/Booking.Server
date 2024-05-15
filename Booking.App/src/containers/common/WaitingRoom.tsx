import {useState} from "react";
import Box from "@mui/material/Box";
import {TextField} from "@mui/material";
import Button from "@mui/material/Button";

export interface IWaitingRoom {
    joinChatRoom: (arg: { userName: string, chatRoom: string }) => void
}

export default function WaitingRoom({ joinChatRoom }: IWaitingRoom) {
    const [userName, setUserName] = useState<string>('')
    const [chatRoom, setChatRoom] = useState<string>('')

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        joinChatRoom({ userName, chatRoom });
    };

    return (
        <>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                <TextField
                    fullWidth
                    label="UserName"
                    type="text"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                />

                <TextField
                    fullWidth
                    label="ChatRoom"
                    type="text"
                    value={chatRoom}
                    onChange={(e) => setChatRoom(e.target.value)}
                />

                <Button type="submit" color="primary">Add</Button>
            </Box>
        </>
    )
}
