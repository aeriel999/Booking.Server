import {useEffect, useState} from "react";
import {getListOfPosts, getListOfPostsByName, getListOfPostsName, IFetchData} from "../../store/post/post.actions.ts";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../store";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import {
    alpha,
    Button,
    CardActions,
    CardContent,
    CardMedia,
    InputBase,
    Pagination, TextField,
    Typography
} from "@mui/material";
import Card from "@mui/material/Card";
import {useNavigate} from "react-router-dom";
import {APP_ENV} from "../../env";
import IconButton from "@mui/material/IconButton";
import Divider from "@mui/material/Divider";
import SearchIcon from '@mui/icons-material/Search';
import Paper from '@mui/material/Paper';
import DirectionsIcon from '@mui/icons-material/Directions';
import {IFetchDataByName} from "../../interfaces/post";
import Autocomplete from "@mui/material/Autocomplete";
import {styled} from "@mui/system";



const firstPage:IFetchData={
    page:1,
    sizeOfPage:4
}
export default function ListOfPostPage (){
    const navigate = useNavigate();
    const [inputValue,setInputValue]=useState("");
    const [activePage,setPage]=useState(1);
    const listOfPosts = useSelector((state:RootState)=>state.post.posts);
    const listOfPostsName = useSelector((state:RootState)=>state.post.searchPost);
    const isLogin = useSelector((state:RootState)=>state.account.isLogin);
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        const getPosts = async()=>{
            await dispatch(getListOfPosts(firstPage));
        }
        getPosts();

    }, []);
    const changePage = async(event: React.ChangeEvent<unknown>,value: number)=>{
        console.log("Next page",value);
        setPage(value);
        const nextPage:IFetchData={
            page:value,
            sizeOfPage:4
        }
        console.log("Next page",nextPage);
        await dispatch(getListOfPosts(nextPage));
    }
    const changeText = async(e: React.ChangeEvent<HTMLInputElement>)=>{
        if (e.target.value==null)await dispatch(getListOfPostsName(" "));
        else await dispatch(getListOfPostsName(e.target.value));

        setInputValue(e.target.value);
    }
    const searchPost = async()=>{
        if (inputValue == "")await dispatch(getListOfPosts(firstPage));
        else {
            const data: IFetchDataByName={
                name:inputValue,
                pages:{
                    page:1,
                    sizeOfPage:4
                }
            }
            console.log(data);
            setPage(1);
            await dispatch(getListOfPostsByName(data));

        }

    }
    useEffect(() => {
        console.log(listOfPostsName.$values);
    }, [listOfPostsName]);

    
    return(
        <Container fixed>



                <Autocomplete
                    disablePortal
                    id="post-search"
                    filterOptions={(x) => x}
                    options={listOfPostsName.$values!=null?listOfPostsName.$values:[]}
                    sx={{ width: "100%" }}

                    renderInput={(params) =>
                        <Paper
                            component="form"
                            sx={{  display: 'flex', alignItems: 'center', width: "100%",marginBottom:5 }}
                        >
                        <InputBase
                            sx={{ ml: 1, flex: 1 }}
                            {...params.inputProps}
                            inputProps={{ ...params.inputProps, 'aria-label': 'search posts' }}
                            inputRef={params.InputProps.ref}
                            placeholder="Search Posts"
                            onChange={changeText}

                        />
                            <IconButton type="button" sx={{ p: '10px' }} aria-label="search" onClick={searchPost}>
                                <SearchIcon />
                            </IconButton>
                            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                            <IconButton color="primary" sx={{ p: '10px' }} aria-label="directions">
                                <DirectionsIcon />
                            </IconButton>
                        </Paper>
                        }
                />


            <Box sx={{ boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px', height: '100vh',display:'flex',flexDirection:"row",flexWrap:"wrap",padding:15,position:'relative',justifyContent:'space-around' }}>

                {listOfPosts != null ? listOfPosts.items.$values.map((item, index) => (
                    <Card sx={{ width: '40%' ,height:345}}>
                        <CardMedia
                            sx={{ height: 140 }}
                            image={`${APP_ENV.BASE_URL}/images/posts/${item.imagePost}`}
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
                            {/*{isLogin?<Button size="small">Learn More</Button>:""}*/}
                            {isLogin?<Button size="small" onClick={()=>navigate(`/posts/${item.id}`)}>Learn More</Button>:""}
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
/*



<Autocomplete
                    disablePortal
                    id="post-search"
                    filterOptions={(x) => x}
                    options={listOfPostsName.$values!=null?listOfPostsName.$values:[]}
                    sx={{ width: "80%" }}
                    onChange={changeText}
                    renderInput={(params) => <TextField {...params}  label="Search Post" />}
                />

 <Autocomplete
                    freeSolo
                    options={listOfPostsName!=null?listOfPostsName:""}
                    inputValue={inputValue}
                    onInputChange={(event, newInputValue) => {
                        handleInputChange(event);
                    }}
                    renderInput={(params) => (
                <InputBase
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="Search Posts"
                    inputProps={{ 'aria-label': 'search posts' }}
                    onChange={changeText}

                />
                    )}
                />
* */