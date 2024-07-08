import { CardMedia } from "@mui/material";
import { Box } from "@mui/system"
import { useEffect, useState } from "react";
import CloseIcon from '@mui/icons-material/Close';
import { APP_ENV } from "../../env";
import { isCancel } from "axios";

interface IImagesPage {
    isOpen: boolean,
    closeImagePage: () => void,
    images: string[] | undefined
}

export default function ImagesPage(props: IImagesPage) {

    const [isOpen, setIsOpen] = useState(false);
    const [isMouseOnButton, setIsMouseOnButton] = useState(false);
    const [scaleIndex, setScaleIndex] = useState(-1);


    useEffect(() => {
        setIsOpen(props.isOpen)
    }, [props.isOpen])
    useEffect(() => {
        console.log("Images" + props.images);
    }, [props.images])
    //, filter: { blur: 5 }
    return (
        <Box sx={{ position: "fixed", zIndex: 1, left: 0, right: 0, top: 150, bottom: 0, visibility: isOpen ? "visible" : "hidden" }}>
            <Box sx={{ width: "60%", height: 700, backgroundColor: "white", margin: "auto", border: "1px solid black", borderRadius: 5, padding: 5 }}>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                        width: "auto",
                        margin: 2,


                    }}
                    onMouseEnter={() => { setIsMouseOnButton(!isMouseOnButton) }}
                    onMouseLeave={() => { setIsMouseOnButton(!isMouseOnButton) }}
                    onClick={() => props.closeImagePage()}
                >
                    <CloseIcon
                        sx={{ transform: `scale(${isMouseOnButton ? 1.2 : 1})`, transition: isOpen ? "1s" : "0s", }}
                    />
                </Box>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-around",
                        flexWrap: "wrap",
                        width: "100%",
                        height: "90%",
                        padding: 1,
                        border: "1px solid black",
                        overflowY: "scroll"

                    }}>
                    {props.images?.map((item, index) =>
                        <CardMedia
                            sx={{ height: 300, width: 300, transform: `scale(${index == scaleIndex ? 1.2 : 1})`, transition: isOpen ? "1s" : "0s", margin: 3 }}
                            image={`${APP_ENV.BASE_URL}/images/posts/${item}`}
                            title={item}
                            onMouseEnter={() => {
                                setScaleIndex(index);
                            }}
                            onMouseLeave={() => {
                                setScaleIndex(-1);
                            }}
                        />
                    )}
                </Box>
            </Box>
        </Box>
    )
}