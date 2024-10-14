import "./App.scss";
import { Routes, Route } from "react-router-dom";
import NotFound from "./pages/errors/NotFound.tsx";
import RealtorRegisterPage from "./pages/accaunt/register/RealtorRegisterPage.tsx";
import { useAppDispatch, useAppSelector } from "./hooks/redux/index.ts";
import ChangeEmailPage from "./pages/accaunt/change-email/ChangeEmailPage.tsx";
import UserRegisterPage from "./pages/accaunt/register/UserRegisterPage.tsx";
import InformationAfterConfirmationEmail from "./pages/accaunt/instruction/InformationAfterConfirmationEmail.tsx";
import RealtorProfilePage from "./containers/dashboard/RealtorProfilePage.tsx";
import RealtorProfileEditPage from "./containers/dashboard/RealtorProfileEditPage.tsx";
import RegisterInformationPage from "./pages/accaunt/register/RegisterInformationPage.tsx";
import ConfirmEmailPage from "./pages/accaunt/confirmation/ConfirmEmailPage.tsx";
import ForgotPasswordPage from "./pages/accaunt/forgot-password/ForgotPasswordPage.tsx";
import ForgotPasswordInformationPage from "./pages/accaunt/forgot-password/ForgotPasswordInformationPage.tsx";
import ResetPasswordPage from "./pages/accaunt/reset-password/ResetPasswordPage.tsx";
import ReConfirmEmailPage from "./pages/reconfirm-email/ReConfirmEmailPage.tsx";
import { AddNewPost } from "./containers/dashboard/AddNewPost.tsx";
import ListOfPostPage from "./containers/client/ListOfPostsPage/ListOfPostsPage.tsx";
import AnonymousDashboardLayout from "./containers/anonymous/layouts/AnonymousDashboardLayout.tsx";
import AllPostList from "./containers/dashboard/AllPostList.tsx";
import { EditPost } from "./containers/dashboard/EditPost.tsx";
import RealtorPage from "./containers/client/RealtorPage.tsx";
import ArchivePage from "./containers/dashboard/ArchivePage.tsx";
import { ReviewsPage } from "./containers/dashboard/ReviewsPage.tsx";
import { HomePage } from "./containers/client/HomePage/HomePage.tsx";
import SignInPage from "./pages/accaunt/login/SignIn.tsx";
import RealtorRegisterAvatarPage from "./pages/accaunt/register/RealtotRegisterAvatarPage.tsx";
import _RealtorDashboardLayout from "./containers/dashboard/layouts/_DashboardLayout.tsx";
import { AnonymousDashboardLayoutForPosts } from "./containers/anonymous/layouts/AnonymousDashboardLayoutForPosts.tsx";
import ListOfPostsPage from "./containers/client/ListOfPostsPage/ListOfPostsPage.tsx";
import ClientDashboardLayout from "./containers/client/layouts/ClientDashboardLayout.tsx";
import ClientProfilePage from "./containers/client/ClientProfilePage/ClientProfilePage.tsx";
import { ClientProfileEditPage } from "./containers/client/ClientProfileEditPage/ClientProfileEditPage.tsx";
import { HistoryOfFeedbacksPage } from "./containers/client/HistoryOfFeedbacksPage/HistoryOfFeedbacksPage.tsx";
import { RealtorPageForClient } from "./containers/client/RealtorPageForClient/RealtorPageForClient.tsx";
import { PageOfMessages } from "./containers/client/PageOfMessages/PageOfMessages.tsx";
import { connection } from "./SignalR/index.ts";
import * as signalR from "@microsoft/signalr";
import {
    setOutcomeMessagesReadedChatId,
    setNewMessage,
    setDeletedChatIdToArr,
} from "./store/chat/chat.slice.ts";
import { IGetMessage } from "./interfaces/chat/index.ts";
import { updateListOfChatIdForListening } from "./store/chat/chat.slice.ts";
import PageOfPost from "./containers/client/PageOfPost/PageOfPost.tsx";
import _AdminDashboardLayout from "./containers/admin/_AdminDashboardLayout.tsx";
import ChatRoom from "./containers/dashboard/ChatRoom.tsx";
import PostModeration from "./containers/admin/PostModeration.tsx";
import UsersModeration from "./containers/admin/UsersModeration.tsx";
import RealtorsModeration from "./containers/admin/RealtorsModeration.tsx";
import React from "react";

export const App: React.FC = () => {
    const { isLogin, user } = useAppSelector((state) => state.account);
    const { listOfPostIdForListening } = useAppSelector((state) => state.chat);
    const { listOfChatsIdForListening } = useAppSelector((state) => state.chat);
    const dispatch = useAppDispatch();

    const role = () => {
        if (user?.role.toLowerCase().includes("realtor")) {
            return "realtor";
        } else if (user?.role.toLowerCase().includes("user")) {
            return "user";
        } else if (user?.role.toLowerCase().includes("admin")) {
            return "admin";
        }
    };

    const setMessageInRedux = async (msg: IGetMessage) => {
        await dispatch(setNewMessage(msg));
    };

    const setIncomeMessagesReadedChatIdInRedux = async (id: string) => {
        console.log("setIncomeMessagesReadedChatIdInRedux", id);
        await dispatch(setOutcomeMessagesReadedChatId(id));
    };

    // const setDeletedChatIdRedux = async (roomId: string) => {
    //     await dispatch(setDeletedChatId(roomId));
    // };
    const addDeletedIdToArrRedux = async (roomId: string) => {
        await dispatch(setDeletedChatIdToArr(roomId));
    };

    const startConnectionWithSignalR = async () => {
        if (connection.state === signalR.HubConnectionState.Disconnected) {
            await connection
                .start()
                .then(async () => {
                    if (listOfPostIdForListening) {
                        await listeningAllPostChanelForRealtorToSignalR(
                            listOfPostIdForListening
                        );
                    }
                    if (listOfChatsIdForListening) {
                        await listeningAllChats(listOfChatsIdForListening);
                    }
                })
                .catch((err) => console.error("Connection failed: ", err));
        }
        connection.onreconnected(async () => {
            if (listOfPostIdForListening) {
                await listeningAllPostChanelForRealtorToSignalR(
                    listOfPostIdForListening
                );
            }
        });
    };

    // //Connection for listening chanels for all posts and new chatrooms
    const listeningAllPostChanelForRealtorToSignalR = async (
        list: string[]
    ) => {
        if (connection.state === signalR.HubConnectionState.Connected) {
            await Promise.all(list.map((id) => startListeningPost(id)));
        }
    };

    const startListeningPost = async (roomId: string) => {
        if (connection.state === signalR.HubConnectionState.Connected) {
            await connection
                .invoke("JoinNewChanelOrNewChatRoomForListening", { roomId })
                .then(async () => {
                    // Remove any previous listener before adding a new one
                    connection.off("send_notify");
                    // Add the new listener
                    connection.on("send_notify", async (m) => {
                        await joinForChatListening(m);
                    });
                });
        }
    };

    //join new chatRooms
    const joinForChatListening = async (roomId: string) => {
        if (connection.state === signalR.HubConnectionState.Connected) {
            await connection
                .invoke("JoinNewChanelOrNewChatRoomForListening", { roomId })
                .then(() => {
                    dispatch(updateListOfChatIdForListening(roomId));
                });
        }
    };

    //Join to listening chats
    const listeningAllChats = async (list: string[]) => {
        if (connection.state === signalR.HubConnectionState.Connected) {
            await Promise.all(list.map((id) => startListeningChat(id)));
        }
    };

    const startListeningChat = async (roomId: string) => {
        if (connection.state === signalR.HubConnectionState.Connected) {
            await connection
                .invoke("JoinRoomForListening", { roomId })
                .then(() => {
                    // Remove any previous listener before adding a new one
                    connection.off("send_message");

                    // Add the new listener
                    connection.on("send_message", async (m) => {
                        await setMessageInRedux(m);
                    });
                })
                .then(async () => {
                    // Remove any previous listener before adding a new one
                    connection.off("get_message");
                    // Add the new listener
                    connection.on("get_message", async (m) => {
                        await setIncomeMessagesReadedChatIdInRedux(m);
                    });
                })
                .then(async () => {
                    // Remove any previous listener before adding a new one
                    connection.off("delete_chat");
                    // Add the new listener
                    connection.on("delete_chat", async (m) => {
                        console.log("Deleted chat - ", m);
                        addDeletedIdToArrRedux(m);
                        await leaveRoom(m);
                    });
                });
        }
    };

    const leaveRoom = async (roomId: string) => {
        if (connection.state === signalR.HubConnectionState.Connected) {
            await connection.send("LeaveRoom", { roomId });
        } else {
            await connection.start().then(async () => {
                await connection.send("LeaveRoom", { roomId });
            });
        }
    };

    if (isLogin && (role() === "realtor" || role() === "user")) {
        startConnectionWithSignalR();
    }

    return (
        <Routes>
            {/* For ligin users */}
            {isLogin && (
                <>
                    <Route
                        path="/instructions"
                        element={<InformationAfterConfirmationEmail />}
                    />

                    {role() === "realtor" && (
                        <Route
                            path="/dashboard"
                            element={<_RealtorDashboardLayout />}
                        >
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
                                path="/dashboard/archive"
                                element={<ArchivePage />}
                            />

                            <Route
                                path="/dashboard/reviews"
                                element={<ReviewsPage />}
                            />

                            <Route
                                path="/dashboard/chat"
                                element={<ChatRoom />}
                            />

                            <Route
                                path="/dashboard/reviews"
                                element={<ReviewsPage />}
                            />
                        </Route>
                    )}

                    {role() === "user" && (
                        <>
                            <Route
                                path="/dashboard"
                                element={<ClientDashboardLayout />}
                            >
                                <Route index element={<ListOfPostPage />} />

                                <Route
                                    path="/dashboard/post/:postId"
                                    element={<PageOfPost />}
                                />

                                <Route
                                    path="/dashboard/post/:postId/realtor/:realtorId"
                                    element={<RealtorPage />}
                                />

                                <Route
                                    path="/dashboard/profile"
                                    element={<ClientProfilePage />}
                                />

                                <Route
                                    path="/dashboard/profile/edit"
                                    element={<ClientProfileEditPage />}
                                />

                                <Route
                                    path="/dashboard/profile/history-of-feedbacks"
                                    element={<HistoryOfFeedbacksPage />}
                                />

                                <Route
                                    path="/dashboard/profile/page-of-messages"
                                    element={<PageOfMessages />}
                                />
                            </Route>
                        </>
                    )}

                    {role() === "admin" && (
                        <Route
                            path="/admin"
                            element={<_AdminDashboardLayout />}
                        >
                            <Route index element={<PostModeration />} />

                            <Route
                                path="/admin/moderation"
                                element={<PostModeration />}
                            />

                            <Route
                                path="/admin/users"
                                element={<UsersModeration />}
                            />

                            <Route
                                path="/admin/realtors"
                                element={<RealtorsModeration />}
                            />
                        </Route>
                    )}
                </>
            )}

            {/* Unauthirithed dashboard */}
            <Route path="/" element={<AnonymousDashboardLayout />}>
                <Route index element={<HomePage />} />

                <Route path="home" element={<HomePage />} />

                <Route path="post/:postId" element={<PageOfPost />} />

                <Route
                    path="post/:postId/realtor/:realtorId"
                    element={<RealtorPage />}
                />
            </Route>

            {/* Pages for sorting */}
            <Route path="/posts" element={<AnonymousDashboardLayoutForPosts />}>
                <Route index element={<ListOfPostsPage />} />

                <Route path="post/:postId" element={<PageOfPost />} />

                <Route
                    path="realtor/:realtorId"
                    element={<RealtorPageForClient />}
                />
            </Route>

            {/* Athorization page */}
            <Route path="authentication/login" element={<SignInPage />} />

            <Route
                path="/authentication/user-register"
                element={<UserRegisterPage />}
            />

            <Route
                path="/authentication/confirm-email/:userId/:token"
                element={<ConfirmEmailPage />}
            />

            <Route
                path="authentication/forgot-password"
                element={<ForgotPasswordPage />}
            />

            <Route
                path="/authentication/change-email/:userId/:email/:token"
                element={<ChangeEmailPage />}
            />

            <Route
                path="authentication/register-information/:email"
                element={<RegisterInformationPage />}
            />

            <Route
                path="authentication/realtor-register"
                element={<RealtorRegisterPage />}
            />

            <Route
                path="/authentication/realtor-register-add-avatar"
                element={<RealtorRegisterAvatarPage />}
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
                path="authentication/reconfirm-email"
                element={<ReConfirmEmailPage />}
            />

            <Route path="*" element={<NotFound />} />
        </Routes>
    );
};
