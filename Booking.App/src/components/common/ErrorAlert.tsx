import { forwardRef, useEffect, useRef } from "react";
import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";
import { SxProps, Theme } from "@mui/system";
import { OutlinedAlertsProps } from "../../utils/types";

const OutlinedErrorAlert = forwardRef<HTMLDivElement, OutlinedAlertsProps>(
    ({ message, textColor = "#000" }) => {
        const alertRef = useRef<HTMLDivElement>(null);//Ref for focuse

        //Set ref for focuse
        useEffect(() => {
            if (message && alertRef.current) {
                alertRef.current.focus();
            }
        }, [message]);

        //Set Style
        const alertStyle: SxProps<Theme> = {
            backgroundColor: "rgba(255, 255, 255, 0.33)",
            borderColor: "#f5c2c7",
            color: textColor,
            borderRadius: "5px",
            border: "1px solid #DADADA",
            fontFamily: "Roboto",
            fontSize: "18px",
            fontStyle: "normal",
            fontWeight: 300,
            lineHeight: "normal",
            marginBottom: "20px",
            "&:focus": {
                outlineOffset: "2px",
            },
        };

        return (
            <Stack sx={{ width: "100%" }} spacing={2}>
                <Alert
                    variant="outlined"
                    severity="error"
                    sx={alertStyle}
                    ref={alertRef} // Forward the ref to Alert component
                    tabIndex={-1} // Ensure it can be focused
                >
                    {message}
                </Alert>
            </Stack>
        );
    }
);

export default OutlinedErrorAlert;
