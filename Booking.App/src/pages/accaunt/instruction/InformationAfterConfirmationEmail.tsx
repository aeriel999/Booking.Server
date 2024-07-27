import Header from "../../../components/authentification/Header";
import { useAppSelector } from "../../../hooks/redux";
import { useEffect, useState } from "react";
import "../../../css/AuthenticationClasses/index.scss";

export default function InformationAfterConfirmationEmail() {
    const { user } = useAppSelector((state) => state.account);
    const [isRealtorInfo, setIsRealtorInfo] = useState<boolean>(false);

    useEffect(() => {
        if (user) {
            if (user.role.toLowerCase().includes("realtor"))
                setIsRealtorInfo(true);
        }
    }, [user]);

    return (
        <>
            <div className="content">
                <Header />

                <div className="instructionPageContainer">
                    <div id="instructionTextContainer">
                        <div id="topContainer">
                            <h1>Welcome to TripBook!</h1>
                            <div id="afterTitleText">
                                Familiarize yourself with the key steps for a
                                quick start.
                            </div>
                            {isRealtorInfo ? (
                                <ol>
                                    <li>
                                        Complete your professional profile by
                                        adding a photo, contact details, and
                                        information about your work experience.
                                    </li>
                                    <li>
                                        Set up search parameters and filters for
                                        effective real estate matching.
                                    </li>
                                    <li>
                                        Upload necessary documents to verify
                                        your account as a realtor.
                                    </li>
                                    <li>
                                        Familiarize yourself with our commission
                                        policy and terms of cooperation.
                                    </li>
                                    <li>
                                        Set up automatic notifications for new
                                        inquiries from potential clients.
                                    </li>
                                    <li>
                                        Learn about the rating and review system
                                        to enhance your reputation on the
                                        platform.
                                    </li>
                                    <li>
                                        Contact our realtor support service for
                                        any questions or suggestions.
                                    </li>
                                </ol>
                            ) : (
                                <ol>
                                    <li>
                                        Complete your profile by adding a photo
                                        and contact details for personalization.
                                    </li>
                                    <li>
                                        Set up currency and language preferences
                                        for convenience.
                                    </li>
                                    <li>
                                        Learn about our bonus program to receive
                                        discounts and privileges.
                                    </li>
                                    <li>
                                        Download our mobile app for access to
                                        bookings anytime.
                                    </li>
                                    <li>
                                        Understand the booking process and
                                        cancellation policy before your first
                                        order.
                                    </li>
                                    <li>
                                        Leave honest reviews about places to
                                        help other travelers.
                                    </li>
                                    <li>
                                        Check notification settings to not miss
                                        important information.
                                    </li>
                                </ol>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
