import { useNavigate } from "react-router-dom";
import "../../App.scss";
import NotFound from "../../assets/NotFound/look-02 1.svg";

const NotFoundPage = () => {
   const  navigate = useNavigate();
    return (
        <div className='notFound'>
            <img src={NotFound} alt="Not found" />
            <p>NOT FOUND</p>
            <button onClick={()=>{navigate("/home")}}>
                    Back Home
                </button>
        </div>
      
    );
};

export default NotFoundPage;
