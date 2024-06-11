import Container from "@mui/material/Container";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../store";
import {getPostById} from "../../store/post/post.actions.ts";
import {Button, CardMedia, Typography} from "@mui/material";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import {APP_ENV} from "../../env";
export default function PostPage(){
    const navigate = useNavigate();
    const {id} = useParams();
    const post = useSelector((state:RootState)=>state.post.post);

    const dispatch = useDispatch<AppDispatch>();
    useEffect(() => {
        const  getPost = async()=>{
            await dispatch(getPostById(id));
        }
        getPost();
    }, []);
    useEffect(() => {
        console.log(post);
    }, [post]);
    return(

        <Container  fixed sx={{ boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',height:"auto",padding:5}}>
            {post!=null?
                <Grid container spacing={1} height={"100%"}>
                    <Grid item xs={4}>
                        <CardMedia
                                     sx={{ height: 300, width:"100%" }}
                                     image={`${APP_ENV.BASE_URL}/images/posts/${post.imagePost}`}
                                     title={post.name}
                                />
                    </Grid>
                    <Grid item xs={4}>
                        <Stack spacing={2}>
                            <Typography sx={{ fontSize: 21, textAlign:"center" }} color="text.secondary" gutterBottom>
                                Name :
                            </Typography>
                            <Typography sx={{ fontSize: 21, textAlign:"center" }} color="text.secondary" gutterBottom>
                                Category :
                            </Typography>
                            <Typography sx={{ fontSize: 21, textAlign:"center" }} color="text.secondary" gutterBottom>
                                Type of rent :
                            </Typography>
                            <Typography sx={{ fontSize: 21, textAlign:"center" }} color="text.secondary" gutterBottom>
                                Is Archive :
                            </Typography>
                            <Typography sx={{ fontSize: 21, textAlign:"center" }} color="text.secondary" gutterBottom>
                                Number of rooms :
                            </Typography>
                            <Typography sx={{ fontSize: 21, textAlign:"center" }} color="text.secondary" gutterBottom>
                                Country :
                            </Typography>
                            <Typography sx={{ fontSize: 21, textAlign:"center" }} color="text.secondary" gutterBottom>
                                City :
                            </Typography>
                            <Typography sx={{ fontSize: 21, textAlign:"center" }} color="text.secondary" gutterBottom>
                                Street :
                            </Typography>
                            <Typography sx={{ fontSize: 21, textAlign:"center" }} color="text.secondary" gutterBottom>
                                Building number :
                            </Typography>
                            <Typography sx={{ fontSize: 21, textAlign:"center" }} color="text.secondary" gutterBottom>
                                Area :
                            </Typography>
                            <Typography sx={{ fontSize: 21, textAlign:"center" }} color="text.secondary" gutterBottom>
                                Price :
                            </Typography>
                            <Typography sx={{ fontSize: 21, textAlign:"center" }} color="text.secondary" gutterBottom>
                                Realtor :
                            </Typography>
                            <Typography sx={{ fontSize: 21, textAlign:"center" }} color="text.secondary" gutterBottom>
                                Description :
                            </Typography>

                        </Stack>




                    </Grid>
                    <Grid item xs={4}>
                        <Stack spacing={2}>
                            <Typography sx={{ fontSize: 21, textAlign:"center" }} color="text.secondary" gutterBottom>
                                {post.name}
                            </Typography>
                            <Typography sx={{ fontSize: 21, textAlign:"center" }} color="text.secondary" gutterBottom>
                                {post.category==null?"none":post.category}
                            </Typography>
                            <Typography sx={{ fontSize: 21, textAlign:"center" }} color="text.secondary" gutterBottom>
                                {post.postTypeOfRent==null?"none":post.postTypeOfRent}
                            </Typography>
                            <Typography sx={{ fontSize: 21, textAlign:"center" }} color="text.secondary" gutterBottom>
                                {post.isArchive?"Yes":"No"}
                            </Typography>
                            <Typography sx={{ fontSize: 21, textAlign:"center" }} color="text.secondary" gutterBottom>
                                {post.numberOfRooms==null?"none":post.numberOfRooms}
                            </Typography>
                            <Typography sx={{ fontSize: 21, textAlign:"center" }} color="text.secondary" gutterBottom>
                                {post.country==null?"none":post.country}
                            </Typography>
                            <Typography sx={{ fontSize: 21, textAlign:"center" }} color="text.secondary" gutterBottom>
                                {post.city==null?"none":post.city}
                            </Typography>
                            <Typography sx={{ fontSize: 21, textAlign:"center" }} color="text.secondary" gutterBottom>
                                {post.street==null?"none":post.street}
                            </Typography>
                            <Typography sx={{ fontSize: 21, textAlign:"center" }} color="text.secondary" gutterBottom>
                                {post.buildingNumber==null?"none":post.buildingNumber}
                            </Typography>
                            <Typography sx={{ fontSize: 21, textAlign:"center" }} color="text.secondary" gutterBottom>
                                {post.area==null?"none":post.area}
                            </Typography>
                            <Typography sx={{ fontSize: 21, textAlign:"center" }} color="text.secondary" gutterBottom>
                                {post.price} UAH
                            </Typography>
                            <Typography sx={{ fontSize: 21, textAlign:"center" }} color="text.secondary" gutterBottom>
                                {post.user}
                            </Typography>
                            <Typography sx={{ fontSize: 21, textAlign:"center",overflow:"hidden" }} color="text.secondary" gutterBottom>
                                {post.description==null?"none":post.description}
                            </Typography>
                        </Stack>
                    </Grid>
                    <Grid item xs={12} sx={{display:"flex",columnGap:7}}>
                        <Button sx={{height:"50%"}} variant="outlined" onClick={()=>navigate(-1)}>HOME</Button>
                        <Button sx={{height:"50%"}} variant="outlined">WRITE TO THE REALTOR</Button>
                        <Button sx={{height:"50%"}} variant="outlined">VISIT PAGE OF REALTOR</Button>
                    </Grid>
                </Grid>

            :""}
        </Container>);
}
