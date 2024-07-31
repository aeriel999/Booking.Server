import { useEffect } from 'react';
import '../../../css/HomePageClasses/index.scss';
import point from '../../../assets/Icons/ph_map-pin.svg';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { points } from './pointsAnimation';
import { PostCard } from '../../../components/common/PostCard/PostCard';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../store';
import { getPostsWithMostDiscount, getPostsWithMostRating, getTypesOfRest } from '../../../store/post/post.actions';
import { APP_ENV } from '../../../env';

export const HomePage = () => {

    const typesOfRest = useSelector((state: RootState) => state.post.typesOfRest);
    const mostRating = useSelector((state: RootState) => state.post.postMostRating);
    const mostDiscount = useSelector((state: RootState) => state.post.postMostDiscount);
    const dispatch = useDispatch<AppDispatch>();

    const getAllTypesOfRest = async () => {
        await dispatch(getTypesOfRest());
    }
    const getPostsRating = async () => {
        await dispatch(getPostsWithMostRating());
    }
    const getPostsDiscount = async () => {
        await dispatch(getPostsWithMostDiscount());
    }
    useEffect(() => {
        console.log(mostRating)
    }, [mostRating])
    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
        points.map((item) => {
            gsap.to(`.point${item.number}`, {
                scrollTrigger: {
                    trigger: `.point${item.number}`,
                    start: "top 70%",
                    toggleActions: "play none none none"
                },
                top: item.coord,
                duration: item.number / 10
            });
        })

        gsap.to(".eco-block", {
            scrollTrigger: {
                trigger: ".eco-block",
                start: "top 70%",
                toggleActions: "play none none none"

            },
            scale: 1,
            duration: 1
        })

        getAllTypesOfRest();
        getPostsRating();
        getPostsDiscount();

    }, [])
    //<img src={`${APP_ENV.BASE_URL}/images/posts/${item.image}`}></img>
    return (
        <>
            <main>
                <div className='popular-places'>
                    <h2>Visit unique places!</h2>
                    <h5>The most popular tourist places</h5>

                    <div className='places'>
                        {typesOfRest != null ? typesOfRest.map((item) => (
                            <div>
                                <div className='place-image' style={
                                    {
                                        backgroundImage: `url(${APP_ENV.BASE_URL}/images/posts/${item.image})`,
                                        backgroundSize: "cover",
                                        backgroundPosition: 'center',
                                    }
                                }></div>
                                <div className='place-name'><p>{item.name}</p></div>
                            </div>
                        )) : ""}
                    </div>
                </div>
                <div className='find-dwelling'>
                    <div>
                        <p>Find a home for your new journey!</p>
                        <button>View properties</button>
                    </div>
                    <div>
                        <svg className='svg' xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 562 282" fill="0, 0, 0, 0.50">
                            <path d="M281 -91C125.91 -91 0 34.9105 0 190C0 345.09 125.91 471 281 471C435.809 471 561.5 345.539 561.955 190.832C561.984 190.555 561.999 190.278 562 190C562 189.75 561.989 189.501 561.966 189.253C561.562 34.5058 435.842 -91 281 -91ZM265.753 -73.6792C255.496 -71.2626 245.409 -67.9749 236.613 -61.8996C228.076 -58.0499 223.878 -62.6864 224.086 -67.9299C237.8 -70.9501 251.733 -72.8726 265.753 -73.6792ZM343.534 -61.8884C352.537 -62.0401 356.156 -45.3206 371.297 -44.1966C386.572 -31.473 383.014 -61.731 367.801 -55.2905C366.164 -57.4136 364.382 -59.421 362.468 -61.2983C413.528 -44.7261 458.332 -12.9992 490.918 29.6614C481.634 26.3063 471.951 29.9368 462.947 15.0382C448.189 -5.02524 459.266 39.221 445.273 16.7804C432.532 10.0307 458.631 9.89024 439.731 3.70261C427.789 -4.94094 419.022 -7.61044 431.391 7.52422C419.926 12.5654 422.416 -9.60554 414.739 -11.1904C414.265 -11.2837 413.78 -11.3027 413.3 -11.2466C411.755 -11.0836 409.872 -10.2237 407.506 -8.41972C396.626 -5.07582 402.156 20.9111 384.588 19.6072C402.1 23.6986 431.357 2.44936 443.485 21.8552C447.729 31.6003 474.918 46.9766 477.093 42.8853C471.962 28.824 495.071 44.6331 502.068 45.4199C530.24 88.3716 545.213 138.634 545.14 190C545.14 264.004 514.736 330.82 465.769 378.753C464.139 378.978 462.492 379.023 460.829 378.72C476.969 352.058 469.034 319.524 481.848 291.992C495.605 272.221 490.525 244.671 477.863 226.221C481.415 209.305 484.079 191.664 462.959 192.602C451.252 167.363 430.099 205.152 410.119 194.766C387.212 203.724 367.576 180.064 356.595 163.732C337.79 157.213 334.941 131.951 343.275 116.063C342.59 107.521 333.238 95.6964 342.753 93.2292C326.516 92.9482 349.238 70.4682 350.188 61.0266L356.37 55.3167C370.824 48.7525 366.357 29.4759 377.046 19.5454C361.574 15.7069 359.197 0.965675 354.245 -12.8932C364.603 -17.8726 395.255 -9.0885 371.415 -24.7908C364.288 -26.9039 356.044 -31.9956 366.52 -35.244C349.615 -28.4663 353.565 -57.2182 346.254 -40.6954C325.724 -39.1892 344.259 -53.9136 336.233 -58.6962C339.094 -60.9274 341.46 -61.8547 343.534 -61.8884ZM188.512 -57.4879C189.253 -53.7844 186.37 -45.7815 189.765 -42.8872C181.554 -34.7831 191.524 -16.2203 168.544 -23.9197C158.832 -27.5671 188.287 -40.7516 165.003 -32.2092C152.594 -28.3707 151.762 -23.0317 160.794 -20.4184C140.461 -7.50928 128.024 -11.7973 110.534 4.28709C92.612 23.9009 65.4056 38.2544 58.8245 65.8092C69.5812 62.7014 59.6675 85.8445 67.7491 89.9752C69.3227 93.6957 56.7114 100.799 71.9753 103.042C71.2953 112.764 96.338 106.571 83.8167 114.754C74.6224 111.736 46.7247 120.615 58.4143 104.801C44.3924 108.285 49.8944 89.9022 37.7608 92.4705C40.9698 69.9849 69.0473 104.301 61.7975 90.3012C55.8797 90.1607 64.3602 68.4675 54.2218 82.9671C64.8998 58.9079 52.4121 80.3145 50.0068 75.8747C52.9179 67.0175 54.6095 59.7003 52.9854 56.643C83.4795 4.57372 131.249 -36.1038 188.512 -57.4879ZM331.754 52.4111C336.363 54.5187 340.769 53.6195 344.697 52.7259L344.798 59.5654C334.103 60.577 318.457 53.9791 331.76 52.4111M34.6754 94.5724C35.125 96.5787 34.046 100.608 30.393 106.487C31.7244 102.481 33.1523 98.5088 34.6754 94.5724ZM94.0676 111.286C97.8779 112.326 101.317 144.602 89.8301 149.188C98.676 138.229 87.79 115.097 93.3032 111.517C93.5561 111.292 93.8147 111.213 94.0676 111.286ZM28.4822 112.259C26.5095 123.403 33.1524 134.851 26.8805 150.317C32.7309 171.589 48.0679 138.796 58.4705 143.124C60.0834 138.515 71.4414 141.477 67.5299 151.829C79.6129 155.167 76.8479 148.21 81.2933 149.3C93.5337 155.667 98.5355 142.399 94.652 162.507C101.733 184.976 136.381 177.366 138.921 202.594C142.86 224.237 163.435 222.489 175.878 233.943C195.919 239.703 223.8 245.464 233.275 265.392C237.479 289.733 203.714 299.523 211.582 325.206C214.673 353.194 191.069 353.958 172.944 362.41C176.957 377.708 158.698 399.025 152.96 399.351C154.522 404.886 144.855 410.366 145.541 416.812C129.339 407.112 114.221 395.705 100.446 382.788C88.3408 363.04 80.5964 340.397 72.5542 318.872C59.0831 300.512 42.2287 283.736 36.3333 260.739C26.5714 240.395 22.3002 214.672 31.9947 193.76C34.5012 184.987 35.5971 157.921 27.7684 170.465C22.8678 166.947 21.3448 156.657 20.395 146.99C22.2993 135.242 24.9975 123.638 28.4822 112.259Z" fill="rgba(0, 0, 0, 0.5)" fill-opacity="0.5" />
                        </svg>
                        <img className='point1' src={point}></img>
                        <img className='point2' src={point}></img>
                        <img className='point3' src={point}></img>
                        <img className='point4' src={point}></img>
                        <img className='point5' src={point}></img>
                        <img className='point6' src={point}></img>
                        <img className='point7' src={point}></img>
                        <img className='point8' src={point}></img>
                        <img className='point9' src={point}></img>
                        <img className='point10' src={point}></img>
                    </div>

                </div>
                <div className='bestPosts'>
                    <div className='text'>
                        <p>Book our accommodation</p>
                        <p>The most popular villas, castles and luxury hotels around the world!</p>
                    </div>
                    <div className='posts'>
                        {mostRating != null ? mostRating.map((item) => (
                            <PostCard post={item.name} rating={item.rating} city={item.city} country={item.country} image={item.image}></PostCard>
                        )) : ""}


                    </div>
                </div>
                <div className='eco'>

                    <div className='eco-block'>ECO</div>
                    <div className='eco-block'>ECO</div>
                    <div className='eco-block'>ECO</div>
                    <div className='eco-block'>ECO</div>
                    <div className='eco-block'>ECO</div>
                    <div className='eco-block'>ECO</div>
                    <div className='eco-block'>ECO</div>
                    <div className='eco-block'>ECO</div>

                    <div className='text'>
                        <p>Get discounts</p>
                        <p>Log in to your TripBook account and look for the green Eco logo to save!</p>
                    </div>
                    <div className='buttons'>
                        <button>Login</button>
                        <button>Register</button>
                    </div>
                </div>

                <div className='discounts'>
                    <div className='text'>
                        <p>Choose the best offer</p>
                        <p>Book accommodation at a reduced price</p>
                    </div>
                    <div className='posts'>
                        {mostDiscount != null ? mostDiscount.map((item) => (
                            <PostCard post={item.name} rating={item.rating} city={item.city} country={item.country} discount={item.discount} image={item.image}></PostCard>
                        )) : ""}


                    </div>
                </div>
                <div className='other-places'>
                    <div className='text'>
                        Plan your trip now
                    </div>
                    <div className='places'>
                        <div>
                            <p>
                                Lviv region
                            </p>
                            <p>
                                3 815 apartments
                            </p>
                        </div>
                        <div>
                            <p>
                                Antalya
                            </p>
                            <p>
                                4 324 apartments
                            </p>
                        </div>
                        <div>
                            <p>
                                Transcarpathia
                            </p>
                            <p>
                                1 219 apartments
                            </p>
                        </div>
                        <div>
                            <p>
                                Tenerife
                            </p>
                            <p>
                                9 621 apartments
                            </p>
                        </div>
                        <div>
                            <p>
                                Balaton
                            </p>
                            <p>
                                5 496 apartments
                            </p>
                        </div>
                        <div>
                            <p>
                                Transcarpathia
                            </p>
                            <p>
                                1 219 apartments
                            </p>
                        </div>
                        <div>
                            <p>
                                Santorini
                            </p>
                            <p>
                                1 768 apartments
                            </p>
                        </div>
                        <div>
                            <p>
                                Odesa region
                            </p>
                            <p>
                                6 190 apartments
                            </p>
                        </div>
                        <div>
                            <p>
                                Maldives
                            </p>
                            <p>
                                810 apartments
                            </p>
                        </div>
                        <div>
                            <p>
                                Halkidiki
                            </p>
                            <p>
                                4299 apartments
                            </p>
                        </div>
                        <div>
                            <p>
                                Arabat arrow
                            </p>
                            <p>
                                165 apartments
                            </p>
                        </div>
                        <div>
                            <p>
                                Maldives
                            </p>
                            <p>
                                810 apartments
                            </p>
                        </div>
                        <div>
                            <p>
                                Crete
                            </p>
                            <p>
                                10 025 apartments
                            </p>
                        </div>
                        <div>
                            <p>
                                Kemer
                            </p>
                            <p>
                                377 apartments
                            </p>
                        </div>
                        <div>
                            <p>
                                Tasos
                            </p>
                            <p>
                                1 343 apartments
                            </p>
                        </div>
                        <div>
                            <p>
                                Shatsky lakes
                            </p>
                            <p>
                                172 apartments
                            </p>
                        </div>
                        <div>
                            <p>
                                Kyiv region
                            </p>
                            <p>
                                549 apartments
                            </p>
                        </div>
                        <div>
                            <p>
                                Tasos
                            </p>
                            <p>
                                1 343 apartments
                            </p>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}
/*
<PostCard post='Holiday Village Valle' rating={8.3} city='Утсйокі' country='Фінляндія' discount={13} image='https://www.telegraph.co.uk/content/dam/Travel/hotels/europe/finland/arctic-treehouse-hotel-finland-p.jpg?imwidth=480'>

                        </PostCard>
                        <PostCard post='Holiday Village Valle' rating={8.3} city='Утсйокі' country='Фінляндія' discount={10} image='https://www.strawberryhotels.com/globalassets/global/hotel-pictures/clarion-hotel/clarion-hotel-helsinki/the-hotel/outdoor/clarion-hotel-helsinki-city-from-the-air-3.jpg?t=SmartScale%7c1024x570'>

                        </PostCard>
                        <PostCard post='Holiday Village Valle' rating={8.3} city='Утсйокі' country='Фінляндія' discount={25} image='https://hotelli-isosyote.fi/wp-content/uploads/2019/08/kotkanpesa_ulos_ylakerta-720x479.jpg'>

                        </PostCard>
                        <PostCard post='Holiday Village Valle' rating={8.3} city='Утсйокі' country='Фінляндія' discount={10} image='https://cf.bstatic.com/xdata/images/city/square250/842918.webp?k=6ce3f4cc4f46abf9454bd670eb766e1a06d7196e03ff0757d6e5402e77009e16&o='>

                        </PostCard>


<PostCard post='Holiday Village Valle' rating={8.3} city='Утсйокі' country='Фінляндія' image='https://www.telegraph.co.uk/content/dam/Travel/hotels/europe/finland/arctic-treehouse-hotel-finland-p.jpg?imwidth=480'>

                        </PostCard>
                        <PostCard post='Holiday Village Valle' rating={8.3} city='Утсйокі' country='Фінляндія' image='https://www.strawberryhotels.com/globalassets/global/hotel-pictures/clarion-hotel/clarion-hotel-helsinki/the-hotel/outdoor/clarion-hotel-helsinki-city-from-the-air-3.jpg?t=SmartScale%7c1024x570'>

                        </PostCard>
                        <PostCard post='Holiday Village Valle' rating={8.3} city='Утсйокі' country='Фінляндія' image='https://hotelli-isosyote.fi/wp-content/uploads/2019/08/kotkanpesa_ulos_ylakerta-720x479.jpg'>

                        </PostCard>
                        <PostCard post='Holiday Village Valle' rating={8.3} city='Утсйокі' country='Фінляндія' image='https://cf.bstatic.com/xdata/images/city/square250/842918.webp?k=6ce3f4cc4f46abf9454bd670eb766e1a06d7196e03ff0757d6e5402e77009e16&o='>

                        </PostCard>
*/
/*
<div>
                            <img src={image2}></img>
                            <p>Venice</p>
                        </div>
                        <div>
                            <img src={image3}></img>
                            <p>Big Ben</p>
                        </div>
                        <div>
                            <img src={image4}></img>
                            <p>Palace of Versailles</p>
                        </div>
                        <div>
                            <img src={image5}></img>
                            <p>Synevir</p>
                        </div>
                        <div>
                            <img src={image6}></img>
                            <p>Kamianets-Podilskyi</p>
                        </div>
                        <div>
                            <img src={image7}></img>
                            <p>Eiffel Tower</p>
                        </div>
*/ 