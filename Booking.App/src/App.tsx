import { Routes, Route } from "react-router-dom";
import NotFound from "./pages/errors/NotFound.tsx";
import UserRegisterPage from "./pages/accaunt/register/UserRegisterPage.tsx";

const App : React.FC = () => {

    return (
        <Routes>
            <Route path="*" element={<NotFound/>} />
            <Route path="/user-register" element={<UserRegisterPage/>} />

        </Routes>
    );
}

export default App


