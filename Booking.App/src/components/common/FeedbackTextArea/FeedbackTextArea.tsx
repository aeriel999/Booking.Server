import { useRef, useState } from 'react';
import '../../../css/FeedbackTextAreaClasses/index.scss';
import sendMessage from '../../../assets/Icons/send.svg';
import { SubmitHandler, useForm } from "react-hook-form";

interface IFeedbackTextArea {

    maxLength: number,
    //setText: React.Dispatch<React.SetStateAction<string | null>>,
    onClickSend: (text: string) => void;
}
type FeedbackForm = {
    feedbackText: string
};
export const FeedbackTextArea = (info: IFeedbackTextArea) => {

    const [textLength, setTextLength] = useState<number>(0);
    const buttonCounterRef = useRef<HTMLDivElement>(null);
    const
        {
            register,
            handleSubmit,
            setError,
            formState: { errors, isSubmitting }
        } = useForm<FeedbackForm>();

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setTextLength(e.target.value.length);
        const buttonCounter = buttonCounterRef.current;

        if (e.currentTarget) {
            e.currentTarget.style.height = 'auto';
            e.currentTarget.style.height = `${e.currentTarget.scrollHeight}px`;
            if (buttonCounter) {
                buttonCounter.style.height = 'auto';
                buttonCounter.style.height = `${e.currentTarget.scrollHeight}px`;
            }


        }
    };

    const onSubmit: SubmitHandler<FeedbackForm> = (data: FeedbackForm) => {
        if (data.feedbackText.length > 0 && data.feedbackText.length <= 10) {
            setError("feedbackText", {
                message: "Feedback text length must be 0 or greater than 10"
            })

        }
        else {
            //info.setText(data.feedbackText);
            info.onClickSend(data.feedbackText);
        }
    };
    return (
        <>
            <form className='text-area'
                onSubmit={handleSubmit(onSubmit)}>
                <textarea

                    {...register("feedbackText")}
                    onChange={(e) => handleChange(e)}
                    maxLength={300} id=""
                    placeholder="Leave a comment..."
                    disabled={isSubmitting}
                    tabIndex={0}
                ></textarea>
                <div ref={buttonCounterRef} className='text-area-counter-and-button'>
                    <button tabIndex={0} disabled={isSubmitting} type='submit'>
                        <img
                            src={sendMessage}
                            alt="Send"
                        />
                    </button>

                    <div className='counter'>{textLength}/{info.maxLength}</div>
                </div>

            </form>
            {errors.feedbackText && (<div
                className='error-message'
            >
                {errors.feedbackText?.message}
            </div>)}

        </>


    )
}
