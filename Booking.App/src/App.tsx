import { Routes, Route } from "react-router-dom";
import NotFound from "./pages/errors/NotFound.tsx";

const App : React.FC = () => {

    return (
        <Routes>
            <Route path="*" element={<NotFound/>} />
        </Routes>
    );
}

export default App


