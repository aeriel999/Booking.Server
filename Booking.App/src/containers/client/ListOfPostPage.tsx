import {useEffect, useRef, useState} from "react";
import {
    getFilteredListByType,
    getListOfCategories, getListOfCitiesByCountryId, getListOfCountries,
    getListOfPosts,
    getListOfPostsByName,
    getListOfPostsName
} from "../../store/post/post.actions.ts";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../store";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import {
    Button,
    CardActions,
    CardContent,
    CardMedia, FormControl,
    InputBase, InputLabel, MenuItem,
    Pagination, Select, SelectChangeEvent,
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
import {
    IFetchDataByName,
    IFetchData,
    IFilteredRequest,
    IFilteredRequestName,
    IFilter
} from "../../interfaces/post";
import Autocomplete from "@mui/material/Autocomplete";
import Grid from "@mui/material/Grid";
import {getListOfRealtors} from "../../store/users/user.action.ts";



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
    const listOfCategories = useSelector((state:RootState)=>state.post.categories);
    const listOfCountries = useSelector((state:RootState)=>state.post.countries);
    const listOfCities = useSelector((state:RootState)=>state.post.cities);
    const listOfRealtors = useSelector((state:RootState)=>state.user.realtors);
    const isLogin = useSelector((state:RootState)=>state.account.isLogin);
    const dispatch = useDispatch<AppDispatch>();
    const [categorySelect, setCategorySelect] = useState("0")
    const [countrySelect, setCountrySelect] = useState("0")
    const [citySelect, setCitySelect] = useState("0")
    const [realtorSelect, setRealtorSelect] = useState("0")
    const [filter,setFilter]=useState<IFilter>({category:"0",country:"0",city:"0",realtor:"0"});


    const getPosts = async()=>{
        await dispatch(getListOfPosts(firstPage));
    }
    const getCategories = async()=>{
        await dispatch(getListOfCategories());
    }
    const getCountries = async()=>{
        await dispatch(getListOfCountries());
    }
    const getCities = async()=>{
        if(countrySelect!="0")
            await dispatch(getListOfCitiesByCountryId(countrySelect))
        else
            await dispatch(getListOfCitiesByCountryId(""))
    }
    const getRealtors = async()=>{
        await dispatch(getListOfRealtors())
    }
    useEffect(() => {
        getPosts();
        getCategories();
        getCountries();
        getRealtors();
        setFilter({category:categorySelect,country:countrySelect,city:citySelect,realtor:realtorSelect});
    }, []);
    useEffect(() => {
        console.log("Filter - "+filter.category)
    }, [filter]);
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
    const changeText = async(e: React.ChangeEvent<HTMLInputElement>)=>{
        const currentFilter:IFilter = {
            category:filter.category=="0"?"":filter.category,
            country: filter.country=="0"?"":filter.country,
            city: filter.city=="0"?"":filter.city,
            realtor: filter.realtor=="0"?"":filter.realtor,
        };
        const payload:IFilteredRequestName={
            filter: currentFilter,
            name:e.target.value==null?"":e.target.value
        }
        await dispatch(getListOfPostsName(payload));

        setInputValue(e.target.value);
    }
    const searchPost = async()=>{
        if (inputValue == ""){
            const currentFilter:IFilter = {
                category:filter.category=="0"?"":filter.category,
                country: filter.country=="0"?"":filter.country,
                city: filter.city=="0"?"":filter.city,
                realtor: filter.realtor=="0"?"":filter.realtor,
            };
            const payload: IFilteredRequest={
                filter:currentFilter,
                pages:{
                    page:1,
                    sizeOfPage:4
                }
            }
            await dispatch(getFilteredListByType(payload));
        }
        else {
            const currentFilter:IFilter = {
                category:filter.category=="0"?"":filter.category,
                country: filter.country=="0"?"":filter.country,
                city: filter.city=="0"?"":filter.city,
                realtor: filter.realtor=="0"?"":filter.realtor,
            };
            const payload: IFetchDataByName={
                filter:currentFilter,
                name:inputValue,
                pages:{
                    page:1,
                    sizeOfPage:4
                }
            }
            setPage(1);
            await dispatch(getListOfPostsByName(payload));

        }

    }
    useEffect(() => {
        getCities();
    }, [countrySelect]);
    const changeCategory = (event : SelectChangeEvent) =>{
        setCategorySelect(event.target.value);
    }
    const changeCountry = async (event : SelectChangeEvent) =>{
        setCountrySelect(event.target.value as string);
        if(citySelect!="0")setCitySelect("0");
    }
    const changeCity = async (event : SelectChangeEvent) =>{
        setCitySelect(event.target.value as string);
    }
    const changeRealtor = async (event : SelectChangeEvent) =>{
        setRealtorSelect(event.target.value as string);
    }
    const filterAsync = async()=>{
        if (inputValue == ""){
            const currentFilter:IFilter = {
                category: categorySelect == "0" ? "" : categorySelect,
                country: countrySelect == "0" ? "" : countrySelect,
                city: citySelect == "0" ? "" : citySelect,
                realtor: realtorSelect == "0" ? "" : realtorSelect
            };
            const payload: IFilteredRequest={
                filter:currentFilter,
                pages:{
                    page:1,
                    sizeOfPage:4
                }
            }
            await dispatch(getFilteredListByType(payload));
        }
        else {
            const currentFilter: IFilter = {
                category: categorySelect == "0" ? "" : categorySelect,
                country: countrySelect == "0" ? "" : countrySelect,
                city: citySelect == "0" ? "" : citySelect,
                realtor: realtorSelect == "0" ? "" : realtorSelect
            };
            const payload: IFetchDataByName = {
                filter: currentFilter,
                name: inputValue,
                pages: {
                    page: 1,
                    sizeOfPage: 4
                }
            }
            await dispatch(getListOfPostsByName(payload));
        }
        setFilter({category:categorySelect,country:countrySelect,city:citySelect,realtor:realtorSelect})

    }
    const skip = async()=>{
        setCategorySelect("0");
        setCountrySelect("0");
        setCitySelect("0");
        setRealtorSelect("0");
        getPosts();
        setFilter({category:"0",country:"0",city:"0",realtor:"0"});
    }
    return(
        <Container fixed>



                <Autocomplete
                    disablePortal
                    id="post-search"
                    filterOptions={(x) => x}
                    options={listOfPostsName.$values!=null?listOfPostsName.$values:[]}
                    sx={{ width: "100%" }}
                    noOptionsText={"Enter word"}
                    onSelect={changeText}

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
                        />
                            <IconButton type="button" sx={{ p: '10px' }} aria-label="search" onClick={searchPost}>
                                <SearchIcon />
                            </IconButton>
                            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                        </Paper>
                        }
                />

            <Grid container spacing={2}>
                <Grid item xs={10}>
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
                </Grid>
                <Grid item xs={2}>
                    <Box sx={{width:"100%", display:"flex",flexDirection:"column", rowGap:5}}>
                        <FormControl>
                            <InputLabel id="select-category-label">Category</InputLabel>
                            <Select
                                labelId="select-category-label"
                                id="select-category"
                                label="category"
                                value={categorySelect}
                                onChange={changeCategory}
                            >
                                <MenuItem value={"0"}>Any</MenuItem>
                                {listOfCategories != null ? listOfCategories.map((item)=>
                                    <MenuItem value={item.id}>{item.name}</MenuItem>
                                ):""}

                            </Select>
                        </FormControl>
                        <FormControl>
                            <InputLabel id="select-country-label">Country</InputLabel>
                            <Select
                                labelId="select-country-label"
                                id="select-country"
                                label="country"
                                value={countrySelect}
                                onChange={changeCountry}
                            >
                                <MenuItem value={"0"}>Any</MenuItem>
                                {listOfCountries != null ? listOfCountries.map((item)=>
                                    <MenuItem value={item.id}>{item.name}</MenuItem>
                                ):""}

                            </Select>
                        </FormControl>
                        <FormControl>
                            <InputLabel id="select-city-label">City</InputLabel>
                            <Select
                                labelId="select-city-label"
                                id="select-city"
                                label="city"
                                value={citySelect}
                                onChange={changeCity}
                            >
                                <MenuItem value={"0"}>Any</MenuItem>
                                {listOfCities != null ? listOfCities.map((item)=>
                                    <MenuItem value={item.id}>{item.name}</MenuItem>
                                ):""}

                            </Select>
                        </FormControl>
                        <FormControl>
                            <InputLabel id="select-realtor-label">Realtor</InputLabel>
                            <Select
                                labelId="select-realtor-label"
                                id="select-realtor"
                                label="realtor"
                                value={realtorSelect}
                                onChange={changeRealtor}
                            >
                                <MenuItem value={"0"}>Any</MenuItem>
                                {listOfRealtors != null ? listOfRealtors.map((item)=>
                                    <MenuItem value={item.id}>{item.name}</MenuItem>
                                ):""}

                            </Select>
                        </FormControl>
                        <Button variant="outlined" onClick={()=>filterAsync()}>FILTER</Button>
                        <Button variant="outlined" onClick={()=>skip()}>SKIP</Button>
                    </Box>

                </Grid>

            </Grid>



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