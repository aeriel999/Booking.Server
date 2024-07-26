import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "../../../components/authentification/Header.tsx";
import BackArrowButton from "../../../components/common/BackArrowButton.tsx";

export default function RegisterInformationPage() {
    const { email } = useParams();
    const [message, setMessage] = useState<string | undefined>(undefined);
    const navigate = useNavigate();

    useEffect(() => {
        setMessage(
            "Congratulation! You are successfully registered. We have sent a confirmation email to " +
                email +
                ". Please check your inbox and follow the instructions to complete the registration process."
        );
    }, [email]);
    return (
        <div className="content">
            <Header />
            <div className="registerInformationContainer">
                <div id="messageContainer">
                    <div id="point">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="30"
                            height="31"
                            viewBox="0 0 30 31"
                            fill="none"
                        >
                            <path
                                d="M15.0001 28.3069C21.9938 28.3069 27.8069 22.5062 27.8069 15.5001C27.8069 8.50639 21.981 2.69336 14.9872 2.69336C7.98171 2.69336 2.19385 8.50639 2.19385 15.5001C2.19385 22.5062 7.99403 28.3069 15.0001 28.3069ZM15.0006 26.1726C9.07349 26.1726 4.33938 21.4262 4.33938 15.5001C4.33938 9.58586 9.06063 4.82765 14.9872 4.82765C20.901 4.82765 25.6592 9.5864 25.6721 15.5001C25.6844 21.4268 20.9133 26.1726 14.9996 26.1726M13.4176 21.7782C13.8317 21.7782 14.1708 21.5773 14.4344 21.1878L20.6369 11.4325C20.788 11.1807 20.9385 10.8919 20.9385 10.616C20.9385 10.0385 20.436 9.68657 19.9088 9.68657C19.5697 9.68657 19.2558 9.87514 19.0303 10.2518L13.3555 19.3294L10.4422 15.5634C10.1663 15.1862 9.86474 15.048 9.52617 15.048C8.97331 15.048 8.53403 15.5001 8.53403 16.0653C8.53403 16.3412 8.64653 16.6053 8.82278 16.8437L12.3381 21.1884C12.6772 21.6025 13.0035 21.7776 13.4181 21.7776"
                                fill="white"
                            />
                        </svg>
                    </div>
                    <div id="message"> {message}</div>
                </div>

                <div className="buttonContainer">
                    <BackArrowButton link="/home" />
                    <button
                        className="authButton"
                        onClick={() => {
                            navigate("/authentication/login");
                        }}
                    >
                        Log In
                    </button>
                </div>
            </div>
        </div>
    );
}
