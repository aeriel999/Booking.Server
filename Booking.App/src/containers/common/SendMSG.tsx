import { useState } from "react";
import Box from "@mui/material/Box";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";

export interface ISendMSG {
    sendMSG: (msg: string) => void;
}

export default function SendMSG({ sendMSG }: ISendMSG) {
    const [msg, setMsg] = useState("");

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        sendMSG(msg);
        setMsg("");
    };

    return (
        <>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                <TextField
                    fullWidth
                    label="Message"
                    type="text"
                    value={msg}
                    onChange={(e) => setMsg(e.target.value)}
                />
                <Button type="submit" color="primary">Add</Button>
            </Box>
        </>
    );
}
