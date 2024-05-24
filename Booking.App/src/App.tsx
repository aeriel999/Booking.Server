import { Routes, Route } from "react-router-dom";
import NotFound from "./pages/errors/NotFound.tsx";
import RealtorRegisterPage from "./pages/accaunt/register/RealtorRegisterPage.tsx";
import SignInPage from "./pages/accaunt/login/SignIn.tsx";
import {useAppSelector} from "./hooks/redux";
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
import ChatRoom  from "./containers/common/ChatRoom.tsx";

import {TestPost} from "./containers/client/TestPost.tsx";
import ClientDashboardLayout from "./containers/client/layouts/_ClientDashboardLayout.tsx";
import {AddNewPost} from "./containers/dashboard/AddNewPost.tsx";
import ListOfPostPage from "./containers/client/ListOfPostPage.tsx";
import AnonymousDashboardLayout from "./containers/anonymous/layouts/AnonymousDashboardLayout.tsx";


const App : React.FC = () => {

    // const [connection, setConnection] = useState<any>({});
    // const [messages, setMessages] = useState<IMessage[]>([]);
    //
    // const index = async ({userName, chatRoom}) => {
    //     try {
    //         const conn = new HubConnectionBuilder()
    //             .withUrl("http://localhost:5095/chat")
    //             .configureLogging(LogLevel.Information)
    //             .build();
    //
    //         conn.on("JoinChat",(userName, msg) => {
    //             setMessages(messages => [...messages, {userName, msg}]);
    //
    //         } );
    //
    //         conn.on("ReceiveSpecificMessage",(userName, msg) => {
    //             console.log("{  msg} ",msg )
    //             console.log("{  userName} ",userName )
    //
    //             setMessages(messages => [...messages, {userName, msg}]);
    //         } );
    //
    //         conn.onclose(e =>{
    //             setConnection({});
    //             setMessages([]);
    //         })
    //
    //         await  conn.start();
    //         await conn.invoke("JoinChat", {userName, chatRoom});
    //
    //         setConnection(conn);
    //
    //     }catch (e){
    //         console.log(e)
    //     }
    // }
    //
    // const closeConnection = async () =>{
    //     try {
    //         await connection.stop();
    //     }catch (e){
    //         console.log(e)
    //     }
    // }
    //
    // const sendMSG = async (message : string) =>{
    //     try {
    //         await  connection.invoke("SendMessage", message);
    //     }catch (e){
    //         console.log(e)
    //     }
    // }

    const {isLogin, user} = useAppSelector(state => state.account);

   const role = () =>{
       if (user?.role.toLowerCase().includes('realtor'))
       {
          return 'realtor'
       }else if(user?.role.toLowerCase().includes('user'))
       {
           return 'user'
       }else if(user?.role.toLowerCase().includes('admin'))
       {
           return 'admin'
       }
   }

    return (
        <Routes>
            {isLogin && (
               <>
                   <Route path="/instructions" element={<InformationAfterConfirmationEmail/>} />

                   {role() === "realtor" && (
                       <Route path="/dashboard"  element={<DashboardLayout/>} >
                           <Route index element={<RealtorProfilePage />} />
                           <Route path="/dashboard/profile" element={<RealtorProfilePage/>} />
                           <Route path="/dashboard/profile/edit" element={<RealtorProfileEditPage/>} />
                           <Route path="/dashboard/profile/change-password" element={<ChangePasswordPage/>} />
                           <Route path="/dashboard/post/add" element={<AddNewPost/>} />

                       </Route>
                   )}

                   {role() === "user" && (
                       <Route path="/"  element={<ClientDashboardLayout/>} >
                           <Route index element={<UserProfilePage />} />
                           <Route path="/profile" element={<UserProfilePage/>} />
                           <Route path="/posts" element={<ListOfPostPage/>} />
                           <Route path="/dashboard/chat/:postId" element={<ChatRoom/>} />
                       </Route>
                   )}

               </>
            )}
            <Route/>

            {/*{!connection*/}
            {/*    ? <Route path="/test" element={<WaitingRoom joinChatRoom={joinChatRoom} />} />*/}
            {/*    : <Route path="/test" element={<ChatRoom messages={messages} sendMSG={sendMSG} />} />}*/}

            <Route path="/"  element={<AnonymousDashboardLayout/>} >
                <Route path="*" element={<ListOfPostPage/>} />
            </Route>

            <Route path="/dashboard/profile" element={<SignInPage/>} />
            <Route path="/dashboard/profile/edit" element={<SignInPage/>} />
            <Route path="/dashboard/profile/change-password" element={<SignInPage/>} />
           // <Route path="*" element={<NotFound/>} />
            <Route path="/authentication/user-register" element={<UserRegisterPage/>} />
            <Route path="/authentication/register-information/:email" element={<RegisterInformationPage/>} />
            <Route path="/authentication/confirm-email/:userId/:token"  element={<ConfirmEmailPage/>} />
            <Route path="/authentication/realtor-register" element={<RealtorRegisterPage/>} />
            <Route path="/authentication/login" element={<SignInPage/>} />
            <Route path="/authentication/forgot-password" element={<ForgotPasswordPage/>} />
            <Route path="/authentication/forgot-password-information/:email" element={<ForgotPasswordInformationPage/>} />
            <Route path="/authentication/reset-password/:email/:token"  element={<ResetPasswordPage/>} />
            <Route path="/authentication/change-email/:userId/:email/:token" element={<ChangeEmailPage/>} />
            <Route path="/authentication/reconfirm-email" element={<ReConfirmEmailPage/>} />

        </Routes>
    );
}

export default App


