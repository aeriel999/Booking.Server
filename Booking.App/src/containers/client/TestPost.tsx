import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import {TextField} from "@mui/material";

import * as React from "react";
import {useNavigate} from "react-router-dom";


export  function TestPost(){
    const navigate = useNavigate();
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const data = new FormData(event.currentTarget);
        const inputValue = data.get("postId") as string;

        navigate('/dashboard/chat/' + inputValue);
    };

    return(
<>
    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}

    >

        <TextField
            id="postId"
            name="postId"

            margin="normal"

        />
        <Button variant="contained" color="primary" type={"submit"}>
             Post
        </Button>
    </Box>
</>

    )
}