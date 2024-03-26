import { Routes, Route } from "react-router-dom";
import NotFound from "./pages/errors/NotFound.tsx";
import UserRegisterPage from "./pages/accaunt/register/UserRegisterPage.tsx";
import RegisterInformationPage from "./pages/accaunt/register/RegisterInformationPage.tsx";
import ConfirmEmailPage from "./pages/accaunt/confirmation/ConfirmEmailPage.tsx";
import InformationAfterConfirmationEmail from "./pages/accaunt/instruction/InformationAfterConfirmationEmail.tsx";

const App : React.FC = () => {

    return (
        <Routes>
            <Route path="*" element={<NotFound/>} />
            <Route path="/authentication/user-register" element={<UserRegisterPage/>} />
            <Route path="/authentication/register-information/:email" element={<RegisterInformationPage/>} />
            <Route path="/authentication/confirm-email/:userId/:token"  element={<ConfirmEmailPage/>} />
            <Route path="/instructions" element={<InformationAfterConfirmationEmail/>} />


        </Routes>
    );
}

export default App


