import { useEffect, useState } from "react";
import chewronTop from "../../../assets/Icons/chevron-top.svg";
import chewronDown from "../../../assets/Icons/chevron-down.svg";
import "../../../css/FilterPanelItemClasses/index.scss";

interface IFilterPanelItem {
    name: string;
    items: { id: string, name: string }[] | null;
    isOpen: boolean;
    selectedItem: React.Dispatch<React.SetStateAction<string | null>>;
    defaultValue: string | null;
}

export const FilterPanelItem = (info: IFilterPanelItem) => {

    const [isOpen, setIsOpen] = useState(false);
    const [selectedButton, setSelectedButton] = useState<string | null>(null);

    useEffect(() => {
        setIsOpen(info.isOpen);
    }, [])

    useEffect(() => {
        info.selectedItem(selectedButton);
    }, [selectedButton])
    return (
        <div className="filter-panel-item" >
            <div className="filter-panel-item-name" onClick={() => { setIsOpen(!isOpen) }}>
                <p>{info.name}</p>
                <img src={isOpen ? chewronTop : chewronDown} alt="chewron" />
            </div>
            {isOpen ? <form style={{ overflowY: `${info.items && info.items.length > 7 ? "scroll" : "hidden"}` }}>
                <div className="item">
                    <label>
                        <input
                            name="category-filter-option"
                            type="radio"
                            checked={!info.defaultValue ? true : false}
                            onChange={() => setSelectedButton(null)} />
                        <p>Any</p>
                    </label>
                </div>
                {info.items ? info.items.map((item) => (
                    <div key={item.id} className="item">
                        <label>
                            <input
                                name="category-filter-option"
                                type="radio"
                                checked={info.defaultValue && info.defaultValue == item.id ? true : false}
                                onChange={() => setSelectedButton(item.id)} />
                            <p>{item.name}</p>
                        </label>
                    </div>
                )) : ""}
            </form> : ""}

        </div>
    )
}