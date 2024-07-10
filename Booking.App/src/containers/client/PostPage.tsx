import Container from "@mui/material/Container";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { getPostById } from "../../store/post/post.actions.ts";
import { Button, CardMedia, Typography } from "@mui/material";
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
        }
        getPost();
    }, []);
    //sx={{ height: 300, width: "100%" }}
    //<ImagesPage isOpen={isOpen}></ImagesPage>
    useEffect(() => {
        console.log(post);
    }, [post]);
    return (
        <>
            <ImagesPage isOpen={isOpen} closeImagePage={() => { setIsOpen(false) }} images={post?.imagePostList ? post?.imagePostList : []}></ImagesPage>
            <Container fixed sx={{ boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px', height: "auto", padding: 5, filter: `blur(${isOpen ? 5 : 0}px)` }}>

                {post != null ?
                    <Grid container spacing={1} height={"100%"} >
                        <Grid item xs={4}>
                            <Button sx={{ height: 300, width: "100%" }} onClick={() => setIsOpen(!isOpen)}>
                                <CardMedia
                                    sx={{ height: "100%", width: "100%" }}
                                    image={`${APP_ENV.BASE_URL}/images/posts/${post.imagePostList[0]}`}
                                    title={post.name}

                                />
                            </Button>

                        </Grid>
                        <Grid item xs={4}>
                            <Stack spacing={2}>
                                <Typography sx={{ fontSize: 21, textAlign: "center" }} color="text.secondary" gutterBottom>
                                    Name :
                                </Typography>
                                {post.category == null ? "" :
                                    <Typography sx={{ fontSize: 21, textAlign: "center" }} color="text.secondary" gutterBottom>
                                        Category :
                                    </Typography>
                                }

                                {post.postTypeOfRent == null ? "" :
                                    <Typography sx={{ fontSize: 21, textAlign: "center" }} color="text.secondary" gutterBottom>
                                        Type of rent :
                                    </Typography>
                                }

                                {post.numberOfRooms == null ? "" :
                                    <Typography sx={{ fontSize: 21, textAlign: "center" }} color="text.secondary" gutterBottom>
                                        Number of rooms :
                                    </Typography>
                                }


                                {post.countryName == null ? "" :
                                    <Typography sx={{ fontSize: 21, textAlign: "center" }} color="text.secondary" gutterBottom>
                                        Country :
                                    </Typography>
                                }

                                {post.cityName == null ? "" :
                                    <Typography sx={{ fontSize: 21, textAlign: "center" }} color="text.secondary" gutterBottom>
                                        City :
                                    </Typography>
                                }

                                {post.street == null ? "" :
                                    <Typography sx={{ fontSize: 21, textAlign: "center" }} color="text.secondary" gutterBottom>
                                        Street :
                                    </Typography>
                                }

                                {post.buildingNumber == null ? "" :
                                    <Typography sx={{ fontSize: 21, textAlign: "center" }} color="text.secondary" gutterBottom>
                                        Building number :
                                    </Typography>
                                }

                                {post.area == null ? "" :
                                    <Typography sx={{ fontSize: 21, textAlign: "center" }} color="text.secondary" gutterBottom>
                                        Area :
                                    </Typography>
                                }

                                <Typography sx={{ fontSize: 21, textAlign: "center" }} color="text.secondary" gutterBottom>
                                    Price :
                                </Typography>

                                {post.user == " " ? "" :
                                    <Typography sx={{ fontSize: 21, textAlign: "center" }} color="text.secondary" gutterBottom>
                                        Realtor :
                                    </Typography>
                                }
                                {post.description == null ? "" :
                                    <Typography sx={{ fontSize: 21, textAlign: "center" }} color="text.secondary" gutterBottom>
                                        Description :
                                    </Typography>
                                }

                            </Stack>




                        </Grid>
                        <Grid item xs={4}>
                            <Stack spacing={2}>
                                <Typography sx={{ fontSize: 21, textAlign: "center" }} color="text.secondary" gutterBottom>
                                    {post.name}
                                </Typography>
                                {post.category == null ? "" :
                                    <Typography sx={{ fontSize: 21, textAlign: "center" }} color="text.secondary" gutterBottom>
                                        {post.category}
                                    </Typography>
                                }

                                {post.postTypeOfRent == null ? "" :
                                    <Typography sx={{ fontSize: 21, textAlign: "center" }} color="text.secondary" gutterBottom>
                                        {post.postTypeOfRent}
                                    </Typography>
                                }

                                {post.numberOfRooms == null ? "" :
                                    <Typography sx={{ fontSize: 21, textAlign: "center" }} color="text.secondary" gutterBottom>
                                        {post.numberOfRooms}
                                    </Typography>
                                }


                                {post.countryName == null ? "" :
                                    <Typography sx={{ fontSize: 21, textAlign: "center" }} color="text.secondary" gutterBottom>
                                        {post.countryName}
                                    </Typography>
                                }

                                {post.cityName == null ? "" :
                                    <Typography sx={{ fontSize: 21, textAlign: "center" }} color="text.secondary" gutterBottom>
                                        {post.cityName}
                                    </Typography>
                                }

                                {post.street == null ? "" :
                                    <Typography sx={{ fontSize: 21, textAlign: "center" }} color="text.secondary" gutterBottom>
                                        {post.street}
                                    </Typography>
                                }

                                {post.buildingNumber == null ? "" :
                                    <Typography sx={{ fontSize: 21, textAlign: "center" }} color="text.secondary" gutterBottom>
                                        {post.buildingNumber}
                                    </Typography>
                                }

                                {post.area == null ? "" :
                                    <Typography sx={{ fontSize: 21, textAlign: "center" }} color="text.secondary" gutterBottom>
                                        {post.area}
                                    </Typography>
                                }

                                <Typography sx={{ fontSize: 21, textAlign: "center" }} color="text.secondary" gutterBottom>
                                    {post.price} UAH
                                </Typography>

                                {post.user == " " ? "" :
                                    <Typography sx={{ fontSize: 21, textAlign: "center" }} color="text.secondary" gutterBottom>
                                        {post.user}
                                    </Typography>
                                }

                                {post.description == null ? "" :
                                    <Typography sx={{ fontSize: 21, textAlign: "center" }} color="text.secondary" gutterBottom>
                                        {post.description}
                                    </Typography>
                                }

                            </Stack>
                        </Grid>
                        <Grid item xs={12} sx={{ display: "flex", columnGap: 7 }}>
                            <Button sx={{ height: "50%" }} variant="outlined" onClick={() => navigate(-1)}>GO BACK</Button>
                            {isLogin ? <Button sx={{ height: "50%" }} variant="outlined">WRITE TO THE REALTOR</Button> :
                                <Button sx={{ height: "50%" }} onClick={() => navigate(`/authentication/login`)} variant="outlined">SIGN IN</Button>}
                            <Button sx={{ height: "50%" }} variant="outlined" onClick={() => navigate(`realtor/${post.userId}`)}>VISIT PAGE OF REALTOR</Button>
                        </Grid>
                    </Grid>

                    : ""}
                <Outlet />
            </Container>
        </>);
}
