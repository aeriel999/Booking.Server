import { Routes, Route } from "react-router-dom";
import NotFound from "./pages/errors/NotFound.tsx";
import RealtorRegisterPage from "./pages/accaunt/register/RealtorRegisterPage.tsx";

import { useAppSelector } from "./hooks/redux/index.ts";
import DashboardLayout from "./containers/dashboard/layouts/_DashboardLayot.tsx";
import ChangeEmailPage from "./pages/accaunt/change-email/ChangeEmailPage.tsx";
import UserRegisterPage from "./pages/accaunt/register/UserRegisterPage.tsx";
import InformationAfterConfirmationEmail from "./pages/accaunt/instruction/InformationAfterConfirmationEmail.tsx";
import RealtorProfilePage from "./containers/dashboard/RealtorProfilePage.tsx";
import RealtorProfileEditPage from "./containers/dashboard/RealtorProfileEditPage.tsx";
import ChangePasswordPage from "./containers/dashboard/ChangePasswordPage.tsx";
import UserProfilePage from "./containers/client/UserProfilePage.tsx";
import RegisterInformationPage from "./pages/accaunt/register/RegisterInformationPage.tsx";
import ConfirmEmailPage from "./pages/accaunt/confirmation/ConfirmEmailPage.tsx";
import ForgotPasswordPage from "./pages/accaunt/forgot-password/ForgotPasswordPage.tsx";
import ForgotPasswordInformationPage from "./pages/accaunt/forgot-password/ForgotPasswordInformationPage.tsx";
import ResetPasswordPage from "./pages/accaunt/reset-password/ResetPasswordPage.tsx";
import ReConfirmEmailPage from "./pages/reconfirm-email/ReConfirmEmailPage.tsx";
import ClientDashboardLayout from "./containers/client/layouts/_ClientDashboardLayout.tsx";
import { AddNewPost } from "./containers/dashboard/AddNewPost.tsx";
import ListOfPostPage from "./containers/client/ListOfPostPage.tsx";
import AnonymousDashboardLayout from "./containers/anonymous/layouts/AnonymousDashboardLayout.tsx";
import ChatRoom from "./components/chat/ChatRoom.tsx";
import AllPostList from "./containers/dashboard/AllPostList.tsx";
import { EditPost } from "./containers/dashboard/EditPost.tsx";
import PostPage from "./containers/client/PostPage.tsx";
import RealtorPage from "./containers/client/RealtorPage.tsx";
import { EditUserEpailPage } from "./containers/client/EditUserEmailPage.tsx";

import ArchivePage from "./containers/dashboard/ArchivePage.tsx";
import { ReviewsPage } from "./containers/dashboard/ReviewsPage.tsx";
import "./App.scss";
import { HomePage } from "./containers/client/HomePage/HomePage.tsx";
import SignInPage from "./pages/accaunt/login/SignIn.tsx";

export const App: React.FC = () => {
    const { isLogin, user } = useAppSelector((state) => state.account);

    const role = () => {
        console.log("user", user);
        console.log("isLogin", isLogin);

        if (user?.role.toLowerCase().includes("realtor")) {
            return "realtor";
        } else if (user?.role.toLowerCase().includes("user")) {
            return "user";
        } else if (user?.role.toLowerCase().includes("admin")) {
            return "admin";
        }
    };

    return (
        <Routes>
            <Route
                path="authentication/user-register"
                element={<UserRegisterPage />}
            />
            <Route
                path="/authentication/realtor-register"
                element={<RealtorRegisterPage />}
            />
            <Route path="authentication/login" element={<SignInPage />} />

            {isLogin && (
                <>
                    <Route
                        path="/instructions"
                        element={<InformationAfterConfirmationEmail />}
                    />

                    {role() === "realtor" && (
                        <Route path="/dashboard" element={<DashboardLayout />}>
                            <Route index element={<RealtorProfilePage />} />
                            <Route
                                path="/dashboard/profile"
                                element={<RealtorProfilePage />}
                            />
                            <Route
                                path="/dashboard/profile/edit"
                                element={<RealtorProfileEditPage />}
                            />
                            <Route
                                path="/dashboard/profile/change-password"
                                element={<ChangePasswordPage />}
                            />
                            <Route
                                path="/dashboard/post/add"
                                element={<AddNewPost />}
                            />

                            <Route
                                path="/dashboard/show-all-post"
                                element={<AllPostList />}
                            />
                            <Route
                                path="/dashboard/edit-post/:postId"
                                element={<EditPost />}
                            />
                            <Route
                                path="/dashboard/chat-room/:roomId"
                                element={<ChatRoom />}
                            />

                            <Route
                                path="/dashboard/archive"
                                element={<ArchivePage />}
                            />

                            <Route
                                path="/dashboard/reviews"
                                element={<ReviewsPage />}
                            />
                            <Route path="/dashboard/*" element={<NotFound />} />
                        </Route>
                    )}

                    {role() === "user" && (
                        <Route
                            path="/dashboard"
                            element={<ClientDashboardLayout />}
                        >
                            <Route index element={<ListOfPostPage />} />
                            <Route
                                path="/dashboard/post/:postId"
                                element={<PostPage />}
                            />
                            <Route
                                path="/dashboard/post/:postId/realtor/:realtorId"
                                element={<RealtorPage />}
                            />
                            <Route
                                path="/dashboard/realtor/:realtorId"
                                element={<RealtorPage />}
                            />
                            <Route
                                path="/dashboard/profile"
                                element={<UserProfilePage />}
                            />
                            <Route
                                path="/dashboard/profile/edit"
                                element={<EditUserEpailPage />}
                            />
                            <Route
                                path="/dashboard/profile/change-password"
                                element={<ChangePasswordPage />}
                            />
                            <Route path="*" element={<NotFound />} />
                        </Route>
                    )}
                </>
            )}
            <Route />
            <Route path="/" element={<AnonymousDashboardLayout />}>
                <Route
                    index
                    element={
                        //<ListOfPostPage />
                        <HomePage />
                    }
                />
                <Route path="post/:postId" element={<PostPage />} />
                <Route
                    path="post/:postId/realtor/:realtorId"
                    element={<RealtorPage />}
                />
                <Route path="dashboard/profile" element={<SignInPage />} />
                <Route path="dashboard/profile/edit" element={<SignInPage />} />
                <Route
                    path="dashboard/profile/change-password"
                    element={<SignInPage />}
                />

                <Route path="*" element={<NotFound />} />
            </Route>
            <Route
                path="/authentication/user-register"
                element={<UserRegisterPage />}
            />
            <Route
                path="/authentication/register-information/:email"
                element={<RegisterInformationPage />}
            />
            <Route
                path="/authentication/confirm-email/:userId/:token"
                element={<ConfirmEmailPage />}
            />

            <Route path="/authentication/login" element={<SignInPage />} />
            <Route
                path="authentication/forgot-password"
                element={<ForgotPasswordPage />}
            />
            <Route
                path="/authentication/forgot-password-information/:email"
                element={<ForgotPasswordInformationPage />}
            />
            <Route
                path="/authentication/reset-password/:email/:token"
                element={<ResetPasswordPage />}
            />
            <Route
                path="/authentication/change-email/:userId/:email/:token"
                element={<ChangeEmailPage />}
            />
            <Route
                path="/authentication/reconfirm-email"
                element={<ReConfirmEmailPage />}
            />

            <Route
                path="authentication/register-information/:email"
                element={<RegisterInformationPage />}
            />
            <Route
                path="authentication/confirm-email/:userId/:token"
                element={<ConfirmEmailPage />}
            />
            <Route
                path="authentication/realtor-register"
                element={<RealtorRegisterPage />}
            />
            <Route
                path="authentication/forgot-password"
                element={<ForgotPasswordPage />}
            />
            <Route
                path="authentication/forgot-password-information/:email"
                element={<ForgotPasswordInformationPage />}
            />
            <Route
                path="authentication/reset-password/:email/:token"
                element={<ResetPasswordPage />}
            />
            <Route
                path="authentication/change-email/:userId/:email/:token"
                element={<ChangeEmailPage />}
            />
            <Route
                path="authentication/reconfirm-email"
                element={<ReConfirmEmailPage />}
            />
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
};
