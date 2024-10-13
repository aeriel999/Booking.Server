import "../../../css/PageOfImagesClasses/index.scss";
import { APP_ENV } from "../../../env";
import active_button from "../../../assets/Icons/exit_button_active.svg";
import notActive_button from "../../../assets/Icons/exit_button_not_active.svg";
import { useState } from "react";

interface IPageOfImages {
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    images: string[];
}

export const PageOfImages = (info: IPageOfImages) => {
    const [isEnter, setIsEnter] = useState<boolean>(false);

    return (
        <div id="page-of-images">
            <div className="page-of-images-list">
                <div className="page-of-images-list-exit">
                    <img
                        tabIndex={0}
                        onClick={() => info.setIsOpen(false)}
                        onMouseEnter={() => setIsEnter(true)}
                        onMouseLeave={() => setIsEnter(false)}
                        src={isEnter ? active_button : notActive_button}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                info.setIsOpen(false);
                            }
                        }}
                        alt="Exit Button"
                    />
                </div>
                <div className="page-of-images-list-items">
                    {info.images.map((item, index) => (
                        <img
                            src={`${APP_ENV.BASE_URL}/uploads/posts/${item}`}
                            alt={item}
                            key={index}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};
