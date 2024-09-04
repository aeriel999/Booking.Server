import { useNavigate } from "react-router-dom"
import "../../../css/ListOfPostsClasses/index.scss"
import { FilterPanelItem } from "../../../components/common/FilterPanelItem/FilterPanelItem";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store";
import { getFilteredListByType, getFilteredListOfCategories, getFilteredListOfCities, getFilteredListOfCountries, getListOfCitiesByCountryId, getListOfPosts, getPostByName } from "../../../store/post/post.actions";
import { useEffect, useState } from "react";
import { getFilteredListOfRealtors } from "../../../store/users/user.action";
import { setCategoryToFilter, setCityToFilter, setCountryToFilter, setRealtorToFilter } from "../../../store/post/post.slice";
import { PostCard } from "../../../components/common/PostCard/PostCard";
import { Pagination } from "../../../components/common/Pagination/Pagination";
import { IFetchData, IFetchDataByName, IFilter, IFilteredRequest } from "../../../interfaces/post";
import { Loading } from "../../../components/common/Loading/Loading";
import { changeLoaderIsLoading, changePaginationPage } from "../../../store/settings/settings.slice";
import emptyBox from "../../../assets/Icons/empty-box.png";



export default function ListOfPostsPage() {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const listOfPosts = useSelector((state: RootState) => state.post.posts);
    const listOfCategories = useSelector((state: RootState) => state.post.filteredCategories);
    const listOfCountries = useSelector((state: RootState) => state.post.filteredCountries);
    const listOfCities = useSelector((state: RootState) => state.post.filteredCities);
    const listOfRealtors = useSelector((state: RootState) => state.user.filteredRealtors);
    const filter = useSelector((state: RootState) => state.post.filter);
    const searchingText = useSelector((state: RootState) => state.post.textForSearching);
    const currentPage = useSelector((state: RootState) => state.settings.currentPaginationPage);
    const isLoading = useSelector((state: RootState) => state.settings.loaderIsLoading);


    const [categorySelect, setCategorySelect] = useState<string | null>(null)
    const [countrySelect, setCountrySelect] = useState<string | null>(null)
    const [citySelect, setCitySelect] = useState<string | null>(null)
    const [realtorSelect, setRealtorSelect] = useState<string | null>(null)
    const [firstLoading, setFirstLoading] = useState<boolean>(false);
    const [page, setPage] = useState<number>(currentPage);



    const getPosts = async () => {
        const firstPage: IFetchData = {
            page: currentPage,
            sizeOfPage: 9
        }
        await dispatch(getListOfPosts(firstPage));
        setFirstLoading(true);
    }
    const getCategories = async () => {
        await dispatch(getFilteredListOfCategories({ country: filter.country, city: filter.city, realtor: filter.realtor }));
    }
    const getCountries = async () => {
        await dispatch(getFilteredListOfCountries({ category: filter.category, realtor: filter.realtor }))
    }
    const getCities = async () => {
        await dispatch(getListOfCitiesByCountryId(countrySelect))
    }
    const getRealtors = async () => {
        await dispatch(getFilteredListOfRealtors({ category: filter.category, country: filter.country, city: filter.city }))
    }
    const changePage = async () => {
        dispatch(changeLoaderIsLoading(true));
        const nextPage: IFetchData = {
            page: page,
            sizeOfPage: 9
        }

        await dispatch(getListOfPosts(nextPage));
    }

    const findPost = async () => {

        //if (searchingText == null || searchingText == "") {
        const currentFilter: IFilter = {
            category: filter.category,
            country: filter.country,
            city: filter.city,
            realtor: filter.realtor,
        };
        const payload: IFilteredRequest = {
            filter: currentFilter,
            pages: {
                page: 1,
                sizeOfPage: 9
            }
        }
        await dispatch(getFilteredListByType(payload));
        console.log("Finding");
        //}
        /*else {
            const currentFilter: IFilter = {
                category: filter.category,
                country: filter.country,
                city: filter.city,
                realtor: filter.realtor,
            };
            const payload: IFetchDataByName = {
                filter: currentFilter,
                name: searchingText,
            }
            await dispatch(getPostByName(payload));
        }*/



    }
    const skip = () => {
        dispatch(setCategoryToFilter(null));
        dispatch(setCountryToFilter(null));
        dispatch(setCityToFilter(null));
        dispatch(setRealtorToFilter(null));
    }

    useEffect(() => {
        getPosts();
        getCategories();
        getCountries();
        getRealtors();
    }, []);
    useEffect(() => {
        dispatch(setCategoryToFilter(categorySelect))
    }, [categorySelect])
    useEffect(() => {
        if (firstLoading) {
            dispatch(changeLoaderIsLoading(true));
            const getFilteredCategories = async () => {
                await dispatch(getFilteredListOfCountries({ category: filter.category, realtor: filter.realtor }))
                if (filter.country != null) await dispatch(getFilteredListOfCities({ category: filter.category, country: filter.country!, realtor: filter.realtor }))
                await dispatch(getFilteredListOfRealtors({ category: filter.category, country: filter.country, city: filter.city }))
                findPost();
            }
            getFilteredCategories();
        }
    }, [filter.category])

    useEffect(() => {
        if (countrySelect) getCities();
        setCitySelect(null);
        dispatch(setCountryToFilter(countrySelect))
    }, [countrySelect])

    useEffect(() => {
        if (firstLoading) {
            dispatch(changeLoaderIsLoading(true));
            const getFilteredCountries = async () => {
                await dispatch(getFilteredListOfCategories({ country: filter.country, city: filter.city, realtor: filter.realtor }))
                await dispatch(getFilteredListOfCities({ category: filter.category, country: filter.country!, realtor: filter.realtor }))
                await dispatch(getFilteredListOfRealtors({ category: filter.category, country: filter.country, city: filter.city }))
                findPost();
            }
            getFilteredCountries();
        }

    }, [filter.country])

    useEffect(() => {
        dispatch(setCityToFilter(citySelect))
    }, [citySelect])

    useEffect(() => {
        if (firstLoading) {
            dispatch(changeLoaderIsLoading(true));
            const getFilteredCities = async () => {
                await dispatch(getFilteredListOfCategories({ country: filter.country, city: filter.city, realtor: filter.realtor }))
                await dispatch(getFilteredListOfRealtors({ category: filter.category, country: filter.country, city: filter.city }))
                findPost();
            }
            getFilteredCities();
        }

    }, [filter.city])

    useEffect(() => {
        dispatch(setRealtorToFilter(realtorSelect))
    }, [realtorSelect])

    useEffect(() => {
        if (firstLoading) {
            dispatch(changeLoaderIsLoading(true));
            const getFilteredRealtors = async () => {
                await dispatch(getFilteredListOfCategories({ country: filter.country, city: filter.city, realtor: filter.realtor }))
                if (filter.country != null) await dispatch(getFilteredListOfCountries({ category: filter.category, realtor: filter.realtor }))
                await dispatch(getFilteredListOfCities({ category: filter.category, country: filter.country!, realtor: filter.realtor }))
                findPost();

            }

            getFilteredRealtors();
        }

    }, [filter.realtor])

    useEffect(() => {
        dispatch(changePaginationPage(page));
        changePage();
    }, [page])

    useEffect(() => {
        dispatch(changeLoaderIsLoading(false));
    }, [listOfPosts])

    return (<div id="list-of-posts-container">

        <div className="navigation">
            <a onClick={() => navigate("/")}>Home Page / </a>
            <p>View Accommodation</p>
        </div>
        <div className="post-list">
            <div className="filtering">
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
                <button className="skipButton" onClick={() => skip()}>Skip</button>
            </div>

            <div className="posts">
                {
                    isLoading == true || listOfPosts == null ? (
                        <Loading />)
                        :
                        ("")
                }
                <div className="posts-cards" style={{
                    justifyContent: listOfPosts && listOfPosts.items.$values.length <= 0 ? "center" : "flex-start",
                    alignItems: listOfPosts && listOfPosts.items.$values.length <= 0 ? "center" : "flex-start"
                }}>
                    {listOfPosts && listOfPosts.items.$values.length > 0 ? listOfPosts.items.$values.map((item) => (
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
                            onClick={() => navigate(`post/${item.id}`)}
                        ></PostCard>

                    )) : ""}
                    {listOfPosts && listOfPosts.items.$values.length <= 0 ?
                        (<img id="empty-box" src={emptyBox} alt="Empty Box" />)
                        : ""}
                </div>

                {listOfPosts && listOfPosts.totalCount > 9 ?
                    <Pagination
                        page={listOfPosts.page}
                        sizeOfPage={listOfPosts.sizeOfPage}
                        countOfPosts={listOfPosts.totalCount}
                        changePage={setPage}></Pagination>
                    : ""}

            </div>
        </div>
    </div>
    )

}


