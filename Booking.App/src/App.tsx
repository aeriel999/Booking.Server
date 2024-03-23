import { Routes, Route } from "react-router-dom";
import NotFound from "./pages/errors/NotFound.tsx";
import UserRegisterPage from "./pages/accaunt/register/UserRegisterPage.tsx";
import RegisterInformationPage from "./pages/accaunt/register/RegisterInformationPage.tsx";

const App : React.FC = () => {

    return (
        <Routes>
            <Route path="*" element={<NotFound/>} />
            <Route path="/user-register" element={<UserRegisterPage/>} />
            <Route path="/register-information/:email" element={<RegisterInformationPage/>} />

        </Routes>
    );
}

export default App


