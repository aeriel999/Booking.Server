import "../../../css/PaginationClasses/index.scss"
import { useEffect, useState } from "react";
import chevronLeft from "../../../assets/Icons/chevron-left.svg";
import chevronRight from "../../../assets/Icons/chevron-right.svg";
interface IPagination {
    page: number;
    sizeOfPage: number;
    countOfPosts: number;
    changePage: React.Dispatch<React.SetStateAction<number>>;
}

export const Pagination = (info: IPagination) => {

    const [countOfPages, setCountOfPages] = useState(0);
    const [dotsRight, setDotsRight] = useState(false);
    const [dotsLeft, setDotsLeft] = useState(false);
    const [allPages, setAllPages] = useState<number[]>([]);


    useEffect(() => {

        let pages = Math.ceil(info.countOfPosts / info.sizeOfPage);
        let arrPages = [];

        if (info.page < 5) {
            setDotsLeft(false);
            if (pages > 5) {
                for (let i = 2; i <= 5; i++) {
                    arrPages.push(i);
                    setDotsRight(true);
                }
            }
            else {
                for (let i = 2; i < pages; i++) {
                    arrPages.push(i);
                }
            }

        }
        else {
            setDotsLeft(true);
            if (pages - info.page <= 3) {
                setDotsRight(false);
                for (let i = pages - 4; i < pages; i++) {
                    arrPages.push(i);
                }
            }
            else {
                setDotsRight(true);
                for (let i = info.page - 1; i < info.page + 3; i++) {
                    arrPages.push(i);
                }

            }
        }

        if (info.page > pages) info.changePage(1)

        setCountOfPages(pages);
        setAllPages(arrPages);
    }, [info.page, info.countOfPosts, info.sizeOfPage])

    return (
        <div className="pagination">
            {countOfPages > 1 ?
                <>
                    <div className="pagination-button-move"
                        tabIndex={0}
                        onClick={() => info.page != 1 ? info.changePage(info.page - 1) : ""}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                info.page != 1 ? info.changePage(info.page - 1) : ""
                            }
                        }}>
                        <img src={chevronLeft} alt="chevron left" />
                    </div>
                    <div tabIndex={0}
                        className={`${info.page == 1 ? "page-number-active" : "page-number"}`}
                        onClick={() => info.changePage(1)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                info.changePage(1)
                            }
                        }}
                    >
                        {1}
                    </div>
                    {dotsLeft ? (
                        <div>
                            ...
                        </div>
                    ) : ""}
                    {allPages.map((item) => (

                        <div
                            key={item}
                            tabIndex={0}
                            className={`${info.page == item ? "page-number-active" : "page-number"}`}
                            onClick={() => info.changePage(item)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    info.changePage(item)
                                }
                            }}
                        >
                            {item}
                        </div>

                    ))}
                    {dotsRight ? (
                        <div>
                            ...
                        </div>
                    ) : ""}
                    <div tabIndex={0}
                        className={`${info.page == countOfPages ? "page-number-active" : "page-number"}`}
                        onClick={() => info.changePage(countOfPages)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                info.changePage(countOfPages)
                            }
                        }}
                    >
                        {countOfPages}
                    </div>
                    <div tabIndex={0}
                        className="pagination-button-move" onClick={() => info.page != countOfPages ? info.changePage(info.page + 1) : ""}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                info.page != countOfPages ? info.changePage(info.page + 1) : ""
                            }
                        }}
                    >
                        <img src={chevronRight} alt="chevron right" />
                    </div>
                </>

                : ""
            }


        </div>
    )
}