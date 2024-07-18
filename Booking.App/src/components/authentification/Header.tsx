import "../../css/AuthenticationClasses/index.scss"; 
import Logo from '../../assets/Logo/tripbook 1.svg'

export default  function Header (){

    return(
        <div className="authHeader">
            <div id="authHeaderLogo"><img  src={Logo} alt="Logo" /></div>
        </div>
    )
}