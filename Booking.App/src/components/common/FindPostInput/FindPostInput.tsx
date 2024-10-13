import { useEffect, useState } from "react";
import "../../../css/FindPostInputClasses/index.scss"

interface IFindPostInput {
    postsName: string[] | null;
    setText: React.Dispatch<React.SetStateAction<string | null>>;
    onBlur: () => void;
    onFocus: () => void;
}

export const FindPostInput = (info: IFindPostInput) => {

    const [selectedText, setSelectedText] = useState<string>("");
    const [isBlur, setIsBlur] = useState<boolean>(true);
    const [posts, setPosts] = useState<string[] | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedText(e.target.value);
        if (e.target.value == "") {
            info.setText(null);
        }
        else {
            info.setText(e.target.value);
        }
    };
    useEffect(() => {
        setPosts(info.postsName);
    }, [info.postsName])

    const takeName = (item: string) => {
        setSelectedText(item);
        info.setText(item)
    }
    return (
        <div
            onFocus={() => {
                setIsBlur(false);
                info.onFocus()
            }}
            onBlur={() => {
                setIsBlur(true);
                info.onBlur()
            }
            }
            className="find-post-input">
            <input
                placeholder="Name of category"
                type="text"
                onChange={handleChange}
                value={selectedText} />
            {posts && !isBlur ? posts.map((item) => (
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