import { useState } from "react";
import "../../../css/FindPostInputClasses/index.scss"

interface IFindPostInput {
    postsName: string[] | null;
    setText: React.Dispatch<React.SetStateAction<string | null>>;
    onBlur: () => void;
    onFocus: () => void;
}

export const FindPostInput = (info: IFindPostInput) => {

    const [selectedText, setSelectedText] = useState<string>("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedText(e.target.value);
        if (e.target.value == "") {
            info.setText(null);
        }
        else {
            info.setText(e.target.value);
        }
    };

    const takeName = (item: string) => {
        setSelectedText(item);
        info.setText(item)
    }
    return (
        <div
            onFocus={() => info.onFocus()}
            onBlur={() => info.onBlur()}
            className="find-post-input">
            <input
                placeholder="Name of category"
                type="text"
                onChange={handleChange}
                value={selectedText} />
            {info.postsName ? info.postsName.map((item) => (
                <div
                    key={item}
                    className="input-item-name"
                    onClick={() => takeName(item)}
                    onMouseDown={(e) => e.preventDefault()}>
                    {item}
                </div>
            )) : ""}
        </div>
    )
}