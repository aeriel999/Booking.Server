import { Routes, Route } from "react-router-dom";
import NotFound from "./pages/errors/NotFound.tsx";
import UserRegisterPage from "./pages/accaunt/register/UserRegisterPage.tsx";
import RegisterInformationPage from "./pages/accaunt/register/RegisterInformationPage.tsx";
import ConfirmEmailPage from "./pages/accaunt/confirmation/ConfirmEmailPage.tsx";
import InformationAfterConfirmationEmail from "./pages/accaunt/instruction/InformationAfterConfirmationEmail.tsx";
import RealtorRegisterPage from "./pages/accaunt/register/RealtorRegisterPage.tsx";
import SignInPage from "./pages/accaunt/login/SignIn.tsx";
import {useAppSelector} from "./hooks/redux";
import RealtorProfilePage from "./containers/dashboard/RealtorProfilePage.tsx";
import UserProfilePage from "./containers/client/UserProfilePage.tsx";
import ForgotPasswordPage from "./pages/accaunt/forgot-password/ForgotPasswordPage.tsx";
import ForgotPasswordInformationPage from "./pages/accaunt/forgot-password/ForgotPasswordInformationPage.tsx";
import ResetPasswordPage from "./pages/accaunt/reset-password/ResetPasswordPage.tsx";
import DashboardLayout from "./containers/dashboard/layots/_DashboardLayot.tsx";
import RealtorProfileEditPage from "./containers/dashboard/RealtorProfileEditPage.tsx";
import ChangeEmailPage from "./pages/accaunt/change-email/ChangeEmailPage.tsx";


const App : React.FC = () => {
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
            <Route path="*" element={<NotFound/>} />
            <Route path="/authentication/user-register" element={<UserRegisterPage/>} />
            <Route path="/authentication/register-information/:email" element={<RegisterInformationPage/>} />
            <Route path="/authentication/confirm-email/:userId/:token"  element={<ConfirmEmailPage/>} />
            <Route path="/authentication/realtor-register" element={<RealtorRegisterPage/>} />
            <Route path="/authentication/login" element={<SignInPage/>} />
            <Route path="/authentication/forgot-password" element={<ForgotPasswordPage/>} />
            <Route path="/authentication/forgot-password-information/:email" element={<ForgotPasswordInformationPage/>} />
            <Route path="/authentication/reset-password/:email/:token"  element={<ResetPasswordPage/>} />
            <Route path="/authentication/change-email" element={<ChangeEmailPage/>} />

            {isLogin && (
               <>
                   <Route path="/instructions" element={<InformationAfterConfirmationEmail/>} />

                   {role() === "realtor" && (
                       <Route path="/dashboard"  element={<DashboardLayout/>} >
                           <Route index element={<RealtorProfilePage />} />
                           <Route path="/dashboard/profile" element={<RealtorProfilePage/>} />
                           <Route path="/dashboard/profile/edit" element={<RealtorProfileEditPage/>} />
                       </Route>
                   )}

                   <Route path="/profile" element={<UserProfilePage/>} />
               </>
            )}
            <Route/>
        </Routes>
    );
}

export default App


