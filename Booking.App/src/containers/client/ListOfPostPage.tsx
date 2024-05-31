import {useEffect, useState} from "react";
import {getListOfPosts, IFetchData} from "../../store/post/post.actions.ts";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../store";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import {Button, CardActions, CardContent, CardMedia, Pagination, Typography} from "@mui/material";
import Card from "@mui/material/Card";
// import Stack from "@mui/material/Stack";



const firstPage:IFetchData={
    page:1,
    sizeOfPage:4
}
export default function ListOfPostPage (){

    const [activePage,setPage]=useState(1);
    const listOfPosts = useSelector((state:RootState)=>state.post.posts);
    const dispatch = useDispatch<AppDispatch>();
    useEffect(() => {
        const getPosts = async()=>{
            await dispatch(getListOfPosts(firstPage));
        }
        getPosts();

    }, []);
    const changePage = async(event: React.ChangeEvent<unknown>,value: number)=>{
        console.log("Next page", value);
        console.log("Next page", event);

        setPage(value);
        const nextPage:IFetchData={
            page:value,
            sizeOfPage:4
        }
        console.log("Next page",nextPage);
        await dispatch(getListOfPosts(nextPage));
    }

    return(
        <Container fixed>
            <Box sx={{ boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px', height: '100vh',display:'flex',flexDirection:"row",flexWrap:"wrap",padding:15,position:'relative',justifyContent:'space-around' }}>

                {listOfPosts != null ? listOfPosts.items.$values.map((item) => (
                    <Card sx={{ width: '40%' ,height:345}}>
                        <CardMedia
                            sx={{ height: 140 }}
                            image={`http://localhost:5095/images/posts/${item.imagePost}`}
                            title={item.name}
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                {item.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Category : {item.category}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Price : {item.price}$
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Realtor : {item.user}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="small">Learn More</Button>
                        </CardActions>
                    </Card>
                    )) :""}


                <Box sx={{position: 'absolute',bottom:30}}>
                    {listOfPosts != null&&listOfPosts.totalCount>4?<Pagination  page={activePage} count={Math.ceil(listOfPosts.totalCount/4)} onChange={changePage} color="primary" />:""}
                </Box>
            </Box>


        </Container>
    );
}