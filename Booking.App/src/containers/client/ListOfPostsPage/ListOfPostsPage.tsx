import { useNavigate } from "react-router-dom"
import "../../../css/ListOfPostsClasses/index.scss"
import { FilterPanelItem } from "../../../components/common/FilterPanelItem/FilterPanelItem";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store";
import { getListOfCategories, getListOfCitiesByCountryId, getListOfCountries, getListOfPosts } from "../../../store/post/post.actions";
import { useEffect, useState } from "react";
import { getListOfRealtors } from "../../../store/users/user.action";
import { setCategoryToFilter, setCityToFilter, setCountryToFilter, setRealtorToFilter } from "../../../store/post/post.slice";
import { PostCard } from "../../../components/common/PostCard/PostCard";
import { Pagination } from "../../../components/common/Pagination/Pagination";
import { IFetchData } from "../../../interfaces/post";

const firstPage: IFetchData = {
    page: 1,
    sizeOfPage: 9
}

export default function ListOfPostsPage() {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const listOfPosts = useSelector((state: RootState) => state.post.posts);
    const listOfCategories = useSelector((state: RootState) => state.post.categories);
    const listOfCountries = useSelector((state: RootState) => state.post.countries);
    const listOfCities = useSelector((state: RootState) => state.post.cities);
    const listOfRealtors = useSelector((state: RootState) => state.user.realtors);
    const filter = useSelector((state: RootState) => state.post.filter);


    const [currentPage, setCurrentPage] = useState(1);
    const [categorySelect, setCategorySelect] = useState<string | null>(null)
    const [countrySelect, setCountrySelect] = useState<string | null>(null)
    const [citySelect, setCitySelect] = useState<string | null>(null)
    const [realtorSelect, setRealtorSelect] = useState<string | null>(null)


    const getPosts = async () => {
        await dispatch(getListOfPosts(firstPage));
    }
    const getCategories = async () => {
        await dispatch(getListOfCategories());
    }
    const getCountries = async () => {
        await dispatch(getListOfCountries());
    }
    const getCities = async () => {
        await dispatch(getListOfCitiesByCountryId(countrySelect))
    }
    const getRealtors = async () => {
        await dispatch(getListOfRealtors())
    }
    const changePage = async () => {
        console.log("Current page - ", currentPage)
        const nextPage: IFetchData = {
            page: currentPage,
            sizeOfPage: 9
        }

        await dispatch(getListOfPosts(nextPage));
    }
    useEffect(() => {
        getPosts();
        getCategories();
        getCountries();
        getRealtors();
    }, []);
    useEffect(() => {
        if (listOfPosts?.page == 1) setCurrentPage(1);
    }, [listOfPosts])
    useEffect(() => {
        dispatch(setCategoryToFilter(categorySelect))
    }, [categorySelect])
    useEffect(() => {
        if (countrySelect) getCities();
        setCitySelect(null);
        dispatch(setCountryToFilter(countrySelect))
    }, [countrySelect])
    useEffect(() => {
        dispatch(setCityToFilter(citySelect))
    }, [citySelect])
    useEffect(() => {
        dispatch(setRealtorToFilter(realtorSelect))
    }, [realtorSelect])
    useEffect(() => {
        changePage();
    }, [currentPage])

    return (
        <div id="list-of-posts-container">
            <div className="navigation">
                <a onClick={() => navigate("/")}>Home Page / </a>
                <p>View Accommodation</p>
            </div>
            <div className="post-list">
                <div className="filter-panel">
                    <div className="text">Filter by the following criteria : </div>
                    <FilterPanelItem
                        name="Category"
                        items={listOfCategories ? listOfCategories : []}
                        isOpen={false}
                        selectedItem={setCategorySelect}
                        defaultValue={filter.category}></FilterPanelItem>
                    <FilterPanelItem
                        name="Country"
                        items={listOfCountries ? listOfCountries : []}
                        isOpen={false}
                        selectedItem={setCountrySelect}
                        defaultValue={filter.country}
                    ></FilterPanelItem>
                    <FilterPanelItem
                        name="City" items={listOfCities ? listOfCities : []}
                        isOpen={false}
                        selectedItem={setCitySelect}
                        defaultValue={filter.city}
                    ></FilterPanelItem>
                    <FilterPanelItem
                        name="Realtor"
                        items={listOfRealtors ? listOfRealtors : []}
                        isOpen={false}
                        selectedItem={setRealtorSelect}
                        defaultValue={filter.realtor}
                    ></FilterPanelItem>
                </div>

                <div className="posts">
                    <div className="posts-cards">
                        {listOfPosts ? listOfPosts.items.$values.map((item) => (
                            <PostCard
                                key={item.id}
                                id={item.id}
                                name={item.name}
                                city={item.city}
                                country={item.country}
                                rating={item.rating}
                                image={item.imagePost}
                                countOfRating={item.countOfRating}
                                price={item.price}
                                category={item.category}
                                typeOfRest={item.typesOfRest.join(", ")}
                                realtor={item.user}
                            ></PostCard>

                        )) : ""}
                    </div>

                    {listOfPosts ?
                        <Pagination page={listOfPosts.page} sizeOfPage={listOfPosts.sizeOfPage} countOfPosts={listOfPosts.totalCount} changePage={setCurrentPage}></Pagination>
                        : ""}

                </div>
            </div>
        </div>
    )

}


/*

<PostCard
                        id="123456789"
                        name="Smart House Apartments"
                        city="Lviv"
                        country="Ukraine"
                        rating={3.5}
                        image="https://www.momondo.ua/rimg/himg/a1/17/3e/ice-142152272-61848297_3XL-267443.jpg?width=968&height=607&crop=true"
                        countOfRating={62}
                        price={1653}
                        category="Apartaments"
                        typeOfRest="For family"
                        realtor="Olesya Zubchuk"
                    ></PostCard>

const firstPage: IFetchData = {
    page: 1,
    sizeOfPage: 4
}

import { useEffect, useState } from "react";
import {
    getFilteredListByType,
    getListOfCategories, getListOfCitiesByCountryId, getListOfCountries,
    getListOfPosts,
    getListOfPostsByName,
    getListOfPostsName
} from "../../store/post/post.actions.ts";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
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
import { Outlet, useNavigate } from "react-router-dom";
import { APP_ENV } from "../../env";
import IconButton from "@mui/material/IconButton";
import SearchIcon from '@mui/icons-material/Search';
import Paper from '@mui/material/Paper';
import {
    IFetchDataByName,
    IFetchData,
    IFilteredRequest,
    IFilteredRequestName,
    IFilter
} from "../../interfaces/post";
import Autocomplete from "@mui/material/Autocomplete";
import Grid from "@mui/material/Grid";
import { getListOfRealtors } from "../../store/users/user.action.ts";

const navigate = useNavigate();
    const [inputValue, setInputValue] = useState("");
    const [activePage, setPage] = useState(1);
    const listOfPosts = useSelector((state: RootState) => state.post.posts);
    const listOfPostsName = useSelector((state: RootState) => state.post.searchPost);
    const listOfCategories = useSelector((state: RootState) => state.post.categories);
    const listOfCountries = useSelector((state: RootState) => state.post.countries);
    const listOfCities = useSelector((state: RootState) => state.post.cities);
    const listOfRealtors = useSelector((state: RootState) => state.user.realtors);
    const isLogin = useSelector((state: RootState) => state.account.isLogin);
    const dispatch = useDispatch<AppDispatch>();
    const [categorySelect, setCategorySelect] = useState("0")
    const [countrySelect, setCountrySelect] = useState("0")
    const [citySelect, setCitySelect] = useState("0")
    const [realtorSelect, setRealtorSelect] = useState("0")
    const [filter, setFilter] = useState<IFilter>({ category: "0", country: "0", city: "0", realtor: "0" });


    const getPosts = async () => {
        await dispatch(getListOfPosts(firstPage));
    }
    const getCategories = async () => {
        await dispatch(getListOfCategories());
    }
    const getCountries = async () => {
        await dispatch(getListOfCountries());
    }
    const getCities = async () => {
        if (countrySelect != "0")
            await dispatch(getListOfCitiesByCountryId(countrySelect))
        else
            await dispatch(getListOfCitiesByCountryId(""))
    }
    const getRealtors = async () => {
        await dispatch(getListOfRealtors())
    }
    useEffect(() => {
        getPosts();
        getCategories();
        getCountries();
        getRealtors();
        setFilter({ category: categorySelect, country: countrySelect, city: citySelect, realtor: realtorSelect });
    }, []);
    useEffect(() => {
        console.log("Filter - " + filter.category)
    }, [filter]);
    const changePage = async ({ }, value: number) => {
        setPage(value);
        const nextPage: IFetchData = {
            page: value,
            sizeOfPage: 4
        }
        console.log("Next page", nextPage);
        await dispatch(getListOfPosts(nextPage));
    }
    const changeText = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const currentFilter: IFilter = {
            category: filter.category == "0" ? "" : filter.category,
            country: filter.country == "0" ? "" : filter.country,
            city: filter.city == "0" ? "" : filter.city,
            realtor: filter.realtor == "0" ? "" : filter.realtor,
        };
        const payload: IFilteredRequestName = {
            filter: currentFilter,
            name: e.target.value == null ? "" : e.target.value
        }
        await dispatch(getListOfPostsName(payload));

        setInputValue(e.target.value);
    }
    const searchPost = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (inputValue == "") {
            const currentFilter: IFilter = {
                category: filter.category == "0" ? "" : filter.category,
                country: filter.country == "0" ? "" : filter.country,
                city: filter.city == "0" ? "" : filter.city,
                realtor: filter.realtor == "0" ? "" : filter.realtor,
            };
            const payload: IFilteredRequest = {
                filter: currentFilter,
                pages: {
                    page: 1,
                    sizeOfPage: 4
                }
            }
            await dispatch(getFilteredListByType(payload));
        }
        else {
            const currentFilter: IFilter = {
                category: filter.category == "0" ? "" : filter.category,
                country: filter.country == "0" ? "" : filter.country,
                city: filter.city == "0" ? "" : filter.city,
                realtor: filter.realtor == "0" ? "" : filter.realtor,
            };
            const payload: IFetchDataByName = {
                filter: currentFilter,
                name: inputValue,
                pages: {
                    page: 1,
                    sizeOfPage: 4
                }
            }
            setPage(1);
            await dispatch(getListOfPostsByName(payload));

        }

    }
    useEffect(() => {
        getCities();
    }, [countrySelect]);
    useEffect(() => {
        console.log(listOfPostsName)
    }, [listOfPostsName]);
    const changeCategory = (event: SelectChangeEvent) => {
        setCategorySelect(event.target.value);
    }
    const changeCountry = async (event: SelectChangeEvent) => {
        setCountrySelect(event.target.value as string);
        if (citySelect != "0") setCitySelect("0");
    }
    const changeCity = async (event: SelectChangeEvent) => {
        setCitySelect(event.target.value as string);
    }
    const changeRealtor = async (event: SelectChangeEvent) => {
        setRealtorSelect(event.target.value as string);
    }
    const filterAsync = async () => {
        if (inputValue == "") {
            const currentFilter: IFilter = {
                category: categorySelect == "0" ? "" : categorySelect,
                country: countrySelect == "0" ? "" : countrySelect,
                city: citySelect == "0" ? "" : citySelect,
                realtor: realtorSelect == "0" ? "" : realtorSelect
            };
            const payload: IFilteredRequest = {
                filter: currentFilter,
                pages: {
                    page: 1,
                    sizeOfPage: 4
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
        setFilter({ category: categorySelect, country: countrySelect, city: citySelect, realtor: realtorSelect })

    }
    const skip = async () => {
        setCategorySelect("0");
        setCountrySelect("0");
        setCitySelect("0");
        setRealtorSelect("0");
        getPosts();
        setFilter({ category: "0", country: "0", city: "0", realtor: "0" });
    }
    return (
        <Container fixed>



            <Autocomplete
                disablePortal
                id="post-search"
                filterOptions={(x) => x}
                options={listOfPostsName?.$values != null ? listOfPostsName.$values : []}
                sx={{ width: "100%" }}
                noOptionsText={"Enter word"}
                onSelect={changeText}

                renderInput={(params) =>
                    <Paper
                        component="form"
                        sx={{ display: 'flex', alignItems: 'center', width: "100%", marginBottom: 5 }}
                        onSubmit={searchPost}
                    >
                        <InputBase
                            sx={{ ml: 1, flex: 1 }}
                            {...params}
                            inputProps={{ ...params.inputProps, 'aria-label': 'search posts' }}
                            inputRef={params.InputProps.ref}
                            placeholder="Search Posts"
                        />
                        <IconButton type="submit" sx={{ p: '10px' }} aria-label="search"  >
                            <SearchIcon />
                        </IconButton>

                    </Paper>
                }
            />

            <Grid container spacing={2}>
                <Grid item xs={10}>
                    <Box sx={{ boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px', height: '100vh', display: 'flex', flexDirection: "row", flexWrap: "wrap", padding: 15, position: 'relative', justifyContent: 'space-around' }}>

                        {listOfPosts != null ? listOfPosts.items.$values.map((item) => (
                            <Card sx={{ width: '40%', height: 345, overflowY: "scroll" }}>
                                <CardMedia
                                    sx={{ height: 140 }}
                                    image={`${APP_ENV.BASE_URL}/images/posts/${item.imagePost}`}
                                    title={item.name}
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h6" component="div">
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
                                    <Box sx={{ display: "flex", flexWrap: "wrap" }}>
                                        {item.typesOfRest.map((type) => (
                                            <Box sx={{ display: "inline-block", padding: 1, border: "1px solid green" }}>
                                                {type}
                                            </Box>
                                        ))}
                                    </Box>
                                </CardContent>
                                <CardActions>
                                    <Button size="small" onClick={() => isLogin ? navigate(`/dashboard/post/${item.id}`) : navigate(`/post/${item.id}`)}>Learn More</Button>
                                </CardActions>
                            </Card>
                        )) : ""}


                        <Box sx={{ position: 'absolute', bottom: 30 }}>
                            {listOfPosts != null && listOfPosts.totalCount > 4 ? <Pagination page={activePage} count={Math.ceil(listOfPosts.totalCount / 4)} onChange={changePage} color="primary" /> : ""}
                        </Box>
                    </Box>
                </Grid>
                <Grid item xs={2}>
                    <Box sx={{ width: "100%", display: "flex", flexDirection: "column", rowGap: 5 }}>
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
                                {listOfCategories != null ? listOfCategories.map((item) =>
                                    <MenuItem value={item.id}>{item.name}</MenuItem>
                                ) : ""}

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
                                {listOfCountries != null ? listOfCountries.map((item) =>
                                    <MenuItem value={item.id}>{item.name}</MenuItem>
                                ) : ""}

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
                                {listOfCities != null ? listOfCities.map((item) =>
                                    <MenuItem value={item.id}>{item.name}</MenuItem>
                                ) : ""}

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
                                {listOfRealtors != null ? listOfRealtors.map((item) =>
                                    <MenuItem value={item.id}>{item.name}</MenuItem>
                                ) : ""}

                            </Select>
                        </FormControl>
                        <Button variant="outlined" onClick={() => filterAsync()}>FILTER</Button>
                        <Button variant="outlined" onClick={() => skip()}>SKIP</Button>
                    </Box>

                </Grid>

            </Grid>

            <Outlet />

        </Container>
    );

*/

