import "../../css/AuthenticationClasses/index.scss"; 
import Logo from '../../assets/Logo/tripbook 1.svg'
import { useNavigate } from "react-router-dom";

export default  function Header (){
const navigate = useNavigate();

    return(
        <div className="authHeader">
            <div id="authHeaderLogo" 
            onClick={()=>{navigate("/")}}
            ><img  src={Logo} alt="Logo" /></div>
        </div>
    )
}