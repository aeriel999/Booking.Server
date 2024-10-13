import Container from "@mui/material/Container";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import {
    getRealtorById,
    getFeedbacksByRealtor,
    sendFeedback,
} from "../../store/users/user.action.ts";
import Grid from "@mui/material/Grid";
import { APP_ENV } from "../../env";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Button,
    CardMedia,
    ImageList,
    ImageListItem,
    List,
    ListItem,
    ListItemText,
    Pagination,
    Rating,
    TextField,
    Typography,
} from "@mui/material";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { getPostListByRealtorId } from "../../store/post/post.actions.ts";
import React from "react";
import {
    IGetFeedbacks,
    IPageForFeedbacks,
    ISendFeedback,
} from "../../interfaces/user/index.ts";
import CustomizedDialogs from "../../components/common/Dialog.tsx";
import { unwrapResult } from "@reduxjs/toolkit";
import ErrorHandler from "../../components/common/ErrorHandler.ts";

const firstPage: IPageForFeedbacks = {
    page: 1,
    sizeOfPage: 10,
};

export default function RealtorPage() {
    const navigate = useNavigate();
    const { realtorId } = useParams();
    const realtor = useSelector((state: RootState) => state.user.realtor);
    const posts = useSelector(
        (state: RootState) => state.post.postsByRealtorId
    );
    const feedbacks = useSelector((state: RootState) => state.user.feedbacks);
    const isLogin = useSelector((state: RootState) => state.account.isLogin);
    const [activePage, setPage] = useState<number>(1);
    const [feedbackText, setFeedbackText] = useState<string>("");
    const [ratingValue, setRatingValue] = useState<number>(0);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>("");

    const dispatch = useDispatch<AppDispatch>();
    useEffect(() => {
        const getRealtor = async () => {
            await dispatch(getRealtorById(realtorId as string));
        };
        const getPostsByRealtorId = async () => {
            await dispatch(getPostListByRealtorId(realtorId as string));
        };
        const getFeedbacks = async () => {
            const request: IGetFeedbacks = {
                id: realtorId as string,
                pages: firstPage,
            };

            await dispatch(getFeedbacksByRealtor(request));
        };
        getRealtor();
        getPostsByRealtorId();
        getFeedbacks();
    }, []);
    useEffect(() => {
        console.log(realtor);
    }, [realtor]);
    useEffect(() => {
        console.log(posts);
    }, [posts]);
    useEffect(() => {
        console.log("Feedbacks - " + feedbacks?.items.$values);
    }, [feedbacks]);
    useEffect(() => {
        console.log("User id - " + realtorId);
    }, []);

    const changePage = async ({}, value: number) => {
        setPage(value);
        const nextPage: IPageForFeedbacks = {
            page: value,
            sizeOfPage: 4,
        };
        const request: IGetFeedbacks = {
            id: realtorId as string,
            pages: nextPage,
        };
        await dispatch(getFeedbacksByRealtor(request));
    };
    const changeText = async (e: React.ChangeEvent<HTMLInputElement>) => {
        setFeedbackText(e.target.value);
    };
    const sendFeedbackAsync = async () => {
        const payload: ISendFeedback = {
            text: feedbackText,
            rating: ratingValue,
            realtorId: realtorId as string,
        };

        try {
            const response = await dispatch(sendFeedback(payload));
            unwrapResult(response);
            window.location.reload();
        } catch (error) {
            setErrorMessage(ErrorHandler(error));
            setIsOpen(true);
        }
    };
    useEffect(() => {
        console.log("Error messgae - " + errorMessage);
    }, [errorMessage]);
    return (
        <Container
            fixed
            sx={{
                boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                height: "auto",
                padding: 5,
            }}
        >
            {realtor != null ? (
                <Grid container spacing={2}>
                    <Grid xs={3}>
                        <CardMedia
                            sx={{ height: 300, width: 300 }}
                            image={`${APP_ENV.BASE_URL}/uploads/avatars/${realtor.avatar}`}
                            title={realtor.name}
                        />
                    </Grid>
                    <Grid xs={7}>
                        <Box
                            sx={{
                                height: "auto",
                                width: "100%",
                                margin: 5,
                                marginTop: 0,
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "left",
                                gap: 5,
                            }}
                        >
                            <Typography variant="h3">{realtor.name}</Typography>
                            <Typography variant="h6">Realtor</Typography>
                            <Rating
                                name="half-rating-read"
                                defaultValue={realtor.rating}
                                precision={0.5}
                                readOnly
                            />
                        </Box>
                    </Grid>
                    <Grid item xs={2}>
                        <Stack spacing={3}>
                            {isLogin ? (
                                <Button
                                    sx={{ height: "50%" }}
                                    variant="outlined"
                                >
                                    SEND MESSAGE
                                </Button>
                            ) : (
                                ""
                            )}
                            <Button
                                sx={{ height: "50%" }}
                                variant="outlined"
                                onClick={() => navigate(-1)}
                            >
                                GO BACK
                            </Button>
                        </Stack>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="h6">About</Typography>
                        <Box
                            aria-label={"About"}
                            sx={{
                                border: "1px solid black",
                                height: 200,
                                width: "100%",
                                marginTop: 0,
                                padding: 5,
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "left",
                                gap: 5,
                            }}
                        >
                            <Stack spacing={2}>
                                <Typography variant="h5">
                                    Email : {realtor.email}
                                </Typography>
                                <Typography variant="h6">
                                    Phone : {realtor.phone}
                                </Typography>
                            </Stack>
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="h6" sx={{ textAlign: "center" }}>
                            Other posts of a realtor
                        </Typography>
                        {posts != null ? (
                            <ImageList
                                sx={{
                                    width: "50%",
                                    height: 300,
                                    margin: "auto",
                                }}
                                cols={posts.length}
                                rowHeight={250}
                            >
                                {posts.map((item) => (
                                    <ImageListItem
                                        key={item.imagePost}
                                        sx={{
                                            border: "1px solid black",
                                            margin: "auto",
                                        }}
                                    >
                                        <img
                                            srcSet={`${APP_ENV.BASE_URL}/uploads/posts/${item.imagePost}`}
                                            src={`${APP_ENV.BASE_URL}/uploads/posts/${item.imagePost}`}
                                            alt={item.name}
                                            loading="lazy"
                                            style={{
                                                width: 200,
                                                height: 100,
                                                objectFit: "cover",
                                                margin: 5,
                                            }}
                                        />
                                        <Typography sx={{ margin: 1 }}>
                                            {item.name}
                                        </Typography>
                                        <Button
                                            sx={{ padding: 3 }}
                                            size="small"
                                            onClick={() =>
                                                navigate(
                                                    isLogin
                                                        ? `/dashboard/post/${item.id}`
                                                        : `/${item.id}`
                                                )
                                            }
                                        >
                                            Learn More
                                        </Button>
                                    </ImageListItem>
                                ))}
                            </ImageList>
                        ) : (
                            ""
                        )}
                    </Grid>
                    <Accordion sx={{ width: "100%" }}>
                        <AccordionSummary
                            aria-controls="feedbacks-content"
                            id="feedbacks-header"
                        >
                            <Typography>View Feedbacks</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            {isLogin ? (
                                <>
                                    {" "}
                                    <Box sx={{ display: "flex", columnGap: 5 }}>
                                        <CustomizedDialogs
                                            isOpen={isOpen}
                                            message={errorMessage}
                                            setOpen={function (): void {
                                                setIsOpen(false);
                                            }}
                                            navigate={""}
                                            lable="Error"
                                        ></CustomizedDialogs>
                                        <TextField
                                            id="filled-multiline-static"
                                            label="Feedback"
                                            multiline
                                            rows={4}
                                            variant="filled"
                                            sx={{ width: "80%" }}
                                            onChange={changeText}
                                            inputProps={{ maxLength: 300 }}
                                            helperText={`${feedbackText.length} / 300`}
                                        />
                                        <Rating
                                            name="simple-controlled"
                                            value={ratingValue}
                                            onChange={(_, newValue) => {
                                                if (newValue != null) {
                                                    setRatingValue(newValue);
                                                }
                                            }}
                                            precision={0.5}
                                            sx={{ alignItems: "center" }}
                                        />
                                    </Box>
                                    <Button
                                        variant="contained"
                                        sx={{ marginBottom: 5 }}
                                        onClick={sendFeedbackAsync}
                                    >
                                        ENTER
                                    </Button>
                                </>
                            ) : (
                                ""
                            )}
                            <List
                                sx={{
                                    width: "100%",
                                    bgcolor: "background.paper",
                                }}
                            >
                                {feedbacks != null
                                    ? feedbacks.items.$values.map((item) => (
                                          <ListItem
                                              alignItems="flex-start"
                                              sx={{
                                                  border: "1px solid black",
                                                  padding: 3,
                                              }}
                                          >
                                              <ListItemText
                                                  primary={item.client}
                                                  sx={{
                                                      fontSize: 30,
                                                      fontWeight: "bold",
                                                      color: "blue",
                                                  }}
                                                  secondary={
                                                      <React.Fragment>
                                                          <Typography
                                                              sx={{
                                                                  display:
                                                                      "inline",
                                                              }}
                                                              component="span"
                                                              variant="body2"
                                                              color="text.primary"
                                                          >
                                                              {item.text}
                                                          </Typography>
                                                          <Typography>
                                                              {`${new Date(
                                                                  item.feedbackAt
                                                              ).getDate()}-${new Date(
                                                                  item.feedbackAt
                                                              ).getMonth()}-${new Date(
                                                                  item.feedbackAt
                                                              ).getFullYear()}`}
                                                          </Typography>
                                                      </React.Fragment>
                                                  }
                                              />
                                              <Rating
                                                  sx={{
                                                      marginBottom: "auto",
                                                      marginTop: "auto",
                                                  }}
                                                  name="half-rating-read"
                                                  defaultValue={item.rating}
                                                  precision={0.5}
                                                  readOnly
                                              />
                                          </ListItem>
                                      ))
                                    : ""}
                            </List>
                            <Box sx={{ width: "auto", margin: "auto" }}>
                                {feedbacks != null &&
                                feedbacks.totalCount > 10 ? (
                                    <Pagination
                                        page={activePage}
                                        count={Math.ceil(
                                            feedbacks.totalCount / 10
                                        )}
                                        onChange={changePage}
                                        color="primary"
                                    />
                                ) : (
                                    ""
                                )}
                            </Box>
                        </AccordionDetails>
                    </Accordion>
                </Grid>
            ) : (
                ""
            )}
        </Container>
    );
}
