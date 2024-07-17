import React from "react";
import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";
import { SxProps, Theme } from "@mui/system";

type OutlinedAlertsProps = {
    message: string;
};

const OutlinedErrorAlert: React.FC<OutlinedAlertsProps> = ({ message }) => {
    const alertStyle: SxProps<Theme> = {
        backgroundColor: "rgba(255, 255, 255, 0.33)", // Replace with your desired background color
        borderColor: "#f5c2c7", // Optionally, you can also change the border color
        color: "#ffff", // And the text color
        borderRadius: "5px",
        border: "1px solid #DADADA",
        fontFamily: "Roboto", // Font family
        fontSize: "18px", // Font size
        fontStyle: "normal", // Font style
        fontWeight: 300, // Font weight
        lineHeight: "normal",
    };

    return (
        <Stack sx={{ width: "100%" }} spacing={2}>
            <Alert variant="outlined" severity="error" sx={alertStyle}>
                {message}
            </Alert>
        </Stack>
    );
};

export default OutlinedErrorAlert;
