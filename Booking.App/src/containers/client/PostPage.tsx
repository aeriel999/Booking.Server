import Container from "@mui/material/Container";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { getPostById } from "../../store/post/post.actions.ts";
import { Box, Button, CardMedia, Rating, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import { APP_ENV } from "../../env";
import ImagesPage from "../../components/common/ImagesPage.tsx";
export default function PostPage() {
    const navigate = useNavigate();
    const { postId } = useParams();
    const post = useSelector((state: RootState) => state.post.post);
    const isLogin = useSelector((state: RootState) => state.account.isLogin);
    const dispatch = useDispatch<AppDispatch>();
    const [isOpen, setIsOpen] = useState(false);
    useEffect(() => {
        const getPost = async () => {
            await dispatch(getPostById(postId as string));
        };
        getPost();
    }, []);

    useEffect(() => {
        console.log(post);
    }, [post]);
    return (
        <>
            <ImagesPage
                isOpen={isOpen}
                closeImagePage={() => {
                    setIsOpen(false);
                }}
                images={post?.imagePostList ? post?.imagePostList : []}
            ></ImagesPage>
            <Container
                fixed
                sx={{
                    boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                    height: "auto",
                    padding: 5,
                    filter: `blur(${isOpen ? 5 : 0}px)`,
                }}
            >
                {post != null ? (
                    <Grid container spacing={1} height={"100%"}>
                        <Grid item xs={4}>
                            <Button
                                sx={{ height: 300, width: "100%" }}
                                onClick={() => setIsOpen(!isOpen)}
                            >
                                <CardMedia
                                    sx={{ height: "100%", width: "100%" }}
                                    image={`${APP_ENV.BASE_URL}/images/posts/${post.imagePostList[0]}`}
                                    title={post.name}
                                />
                            </Button>
                        </Grid>
                        <Grid item xs={4}>
                            <Stack spacing={2}>
                                <Typography
                                    sx={{ fontSize: 21, textAlign: "center" }}
                                    color="text.secondary"
                                    gutterBottom
                                >
                                    Name :
                                </Typography>
                                {post.categoryName == null ? (
                                    ""
                                ) : (
                                    <Typography
                                        sx={{
                                            fontSize: 21,
                                            textAlign: "center",
                                        }}
                                        color="text.secondary"
                                        gutterBottom
                                    >
                                        Category :
                                    </Typography>
                                )}

                                {post.numberOfGuests == null ? (
                                    ""
                                ) : (
                                    <Typography
                                        sx={{
                                            fontSize: 21,
                                            textAlign: "center",
                                        }}
                                        color="text.secondary"
                                        gutterBottom
                                    >
                                        Number Of Guests :
                                    </Typography>
                                )}

                                {post.countryName == null ? (
                                    ""
                                ) : (
                                    <Typography
                                        sx={{
                                            fontSize: 21,
                                            textAlign: "center",
                                        }}
                                        color="text.secondary"
                                        gutterBottom
                                    >
                                        Country :
                                    </Typography>
                                )}

                                {post.cityName == null ? (
                                    ""
                                ) : (
                                    <Typography
                                        sx={{
                                            fontSize: 21,
                                            textAlign: "center",
                                        }}
                                        color="text.secondary"
                                        gutterBottom
                                    >
                                        City :
                                    </Typography>
                                )}

                                {post.streetName == null ? (
                                    ""
                                ) : (
                                    <Typography
                                        sx={{
                                            fontSize: 21,
                                            textAlign: "center",
                                        }}
                                        color="text.secondary"
                                        gutterBottom
                                    >
                                        Street :
                                    </Typography>
                                )}

                                {post.zipCode == null ? (
                                    ""
                                ) : (
                                    <Typography
                                        sx={{
                                            fontSize: 21,
                                            textAlign: "center",
                                        }}
                                        color="text.secondary"
                                        gutterBottom
                                    >
                                        Zip Code :
                                    </Typography>
                                )}

                                {post.discount == null ? (
                                    ""
                                ) : (
                                    <Typography
                                        sx={{
                                            fontSize: 21,
                                            textAlign: "center",
                                        }}
                                        color="text.secondary"
                                        gutterBottom
                                    >
                                        Discount :
                                    </Typography>
                                )}

                                <Typography
                                    sx={{ fontSize: 21, textAlign: "center" }}
                                    color="text.secondary"
                                    gutterBottom
                                >
                                    Rating :
                                </Typography>

                                <Typography
                                    sx={{ fontSize: 21, textAlign: "center" }}
                                    color="text.secondary"
                                    gutterBottom
                                >
                                    Typest of rest :
                                </Typography>

                                <Typography
                                    sx={{ fontSize: 21, textAlign: "center" }}
                                    color="text.secondary"
                                    gutterBottom
                                >
                                    Services :
                                </Typography>

                                <Typography
                                    sx={{ fontSize: 21, textAlign: "center" }}
                                    color="text.secondary"
                                    gutterBottom
                                >
                                    Price :
                                </Typography>

                                {post.user == " " ? (
                                    ""
                                ) : (
                                    <Typography
                                        sx={{
                                            fontSize: 21,
                                            textAlign: "center",
                                        }}
                                        color="text.secondary"
                                        gutterBottom
                                    >
                                        Realtor :
                                    </Typography>
                                )}
                                {post.description == null ? (
                                    ""
                                ) : (
                                    <Typography
                                        sx={{
                                            fontSize: 21,
                                            textAlign: "center",
                                        }}
                                        color="text.secondary"
                                        gutterBottom
                                    >
                                        Description :
                                    </Typography>
                                )}
                            </Stack>
                        </Grid>
                        <Grid item xs={4}>
                            <Stack spacing={2}>
                                <Typography
                                    sx={{ fontSize: 21, textAlign: "center" }}
                                    color="text.secondary"
                                    gutterBottom
                                >
                                    {post.name}
                                </Typography>
                                {post.categoryName == null ? (
                                    ""
                                ) : (
                                    <Typography
                                        sx={{
                                            fontSize: 21,
                                            textAlign: "center",
                                        }}
                                        color="text.secondary"
                                        gutterBottom
                                    >
                                        {post.categoryName}
                                    </Typography>
                                )}

                                {post.numberOfGuests == null ? (
                                    ""
                                ) : (
                                    <Typography
                                        sx={{
                                            fontSize: 21,
                                            textAlign: "center",
                                        }}
                                        color="text.secondary"
                                        gutterBottom
                                    >
                                        {post.numberOfGuests}
                                    </Typography>
                                )}

                                {post.countryName == null ? (
                                    ""
                                ) : (
                                    <Typography
                                        sx={{
                                            fontSize: 21,
                                            textAlign: "center",
                                        }}
                                        color="text.secondary"
                                        gutterBottom
                                    >
                                        {post.countryName}
                                    </Typography>
                                )}

                                {post.cityName == null ? (
                                    ""
                                ) : (
                                    <Typography
                                        sx={{
                                            fontSize: 21,
                                            textAlign: "center",
                                        }}
                                        color="text.secondary"
                                        gutterBottom
                                    >
                                        {post.cityName}
                                    </Typography>
                                )}

                                {post.streetName == null ? (
                                    ""
                                ) : (
                                    <Typography
                                        sx={{
                                            fontSize: 21,
                                            textAlign: "center",
                                        }}
                                        color="text.secondary"
                                        gutterBottom
                                    >
                                        {post.streetName}
                                    </Typography>
                                )}

                                {post.zipCode == null ? (
                                    ""
                                ) : (
                                    <Typography
                                        sx={{
                                            fontSize: 21,
                                            textAlign: "center",
                                        }}
                                        color="text.secondary"
                                        gutterBottom
                                    >
                                        {post.zipCode}
                                    </Typography>
                                )}

                                {post.discount == null ? (
                                    ""
                                ) : (
                                    <Typography
                                        sx={{
                                            fontSize: 21,
                                            textAlign: "center",
                                        }}
                                        color="text.secondary"
                                        gutterBottom
                                    >
                                        {post.discount}
                                    </Typography>
                                )}

                                <Rating
                                    name="half-rating-read"
                                    defaultValue={post.rate}
                                    precision={0.5}
                                    readOnly
                                />

                                <Box sx={{ display: "flex", flexWrap: "wrap" }}>
                                    {post.typesOfRest.map((type) => (
                                        <Box
                                            sx={{
                                                display: "inline-block",
                                                padding: 1,
                                                border: "1px solid green",
                                            }}
                                        >
                                            {type}
                                        </Box>
                                    ))}
                                </Box>

                                <Box sx={{ display: "flex", flexWrap: "wrap" }}>
                                    {post.services.map((type) => (
                                        <Box
                                            sx={{
                                                display: "inline-block",
                                                padding: 1,
                                                border: "1px solid green",
                                            }}
                                        >
                                            {type}
                                        </Box>
                                    ))}
                                </Box>

                                <Typography
                                    sx={{ fontSize: 21, textAlign: "center" }}
                                    color="text.secondary"
                                    gutterBottom
                                >
                                    {post.price} UAH
                                </Typography>

                                {post.user == " " ? (
                                    ""
                                ) : (
                                    <Typography
                                        sx={{
                                            fontSize: 21,
                                            textAlign: "center",
                                        }}
                                        color="text.secondary"
                                        gutterBottom
                                    >
                                        {post.user}
                                    </Typography>
                                )}

                                {post.description == null ? (
                                    ""
                                ) : (
                                    <Typography
                                        sx={{
                                            fontSize: 21,
                                            textAlign: "center",
                                        }}
                                        color="text.secondary"
                                        gutterBottom
                                    >
                                        {post.description}
                                    </Typography>
                                )}
                            </Stack>
                        </Grid>
                        <Grid
                            item
                            xs={12}
                            sx={{ display: "flex", columnGap: 7 }}
                        >
                            <Button
                                sx={{ height: "50%" }}
                                variant="outlined"
                                onClick={() => navigate(-1)}
                            >
                                GO BACK
                            </Button>
                            {isLogin ? (
                                <Button
                                    sx={{ height: "50%" }}
                                    variant="outlined"
                                >
                                    WRITE TO THE REALTOR
                                </Button>
                            ) : (
                                <Button
                                    sx={{ height: "50%" }}
                                    onClick={() =>
                                        navigate(`/authentication/login`)
                                    }
                                    variant="outlined"
                                >
                                    SIGN IN
                                </Button>
                            )}
                            <Button
                                sx={{ height: "50%" }}
                                variant="outlined"
                                onClick={() =>
                                    navigate(`realtor/${post.userId}`)
                                }
                            >
                                VISIT PAGE OF REALTOR
                            </Button>
                        </Grid>
                    </Grid>
                ) : (
                    ""
                )}
                <Outlet />
            </Container>
        </>
    );
}
