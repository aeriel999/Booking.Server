import { useRef, useState } from 'react';
import '../../../css/TextAreaClasses/index.scss';
import sendMessage from '../../../assets/Icons/send.svg';

interface ITextArea {

    maxLength: number,
    setText: React.Dispatch<React.SetStateAction<string | null>>,
    onClickSend: () => void;
}
export const TextArea = (info: ITextArea) => {

    const [textLength, setTextLength] = useState<number>(0);
    const [isError, setIsError] = useState<boolean>(false);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const buttonCounterRef = useRef<HTMLDivElement>(null);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setTextLength(e.target.value.length);
        info.setText(e.target.value);
        const textArea = textareaRef.current;
        const buttonCounter = buttonCounterRef.current;
        if ((e.target.value.length > 10 || e.target.value.length == 0) && isError) {
            setIsError(false);
        }
        if (textArea) {
            textArea.style.height = 'auto';
            textArea.style.height = `${textArea.scrollHeight}px`;
            if (buttonCounter) {
                buttonCounter.style.height = 'auto';
                buttonCounter.style.height = `${textArea.scrollHeight}px`;
            }


        }
    };
    return (
        <>
            <div className='text-area' style={{ borderColor: (textLength > 0 && textLength <= 10) ? "red" : "#C9C9C9" }}>
                <textarea
                    ref={textareaRef}
                    onChange={(e) => handleChange(e)}
                    name="message-text-area"
                    maxLength={300} id=""
                    placeholder="Leave a comment..."
                ></textarea>
                <div ref={buttonCounterRef} className='text-area-counter-and-button'>
                    <img
                        src={sendMessage}
                        alt="Send"
                        onClick={() => {
                            if (textLength > 0 && textLength <= 10) {
                                setIsError(true);
                            }
                            else {
                                info.onClickSend();
                            }
                        }} />
                    <div className='counter'>{textLength}/{info.maxLength}</div>
                </div>

            </div>
            <div
                className='error-message'
                style={{ display: isError ? "block" : "none" }}>
                The text must contain more than 10 characters
            </div>
        </>


    )
}