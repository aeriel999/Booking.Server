import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import OutlinedSuccessAlert from "../../../components/common/SuccessAlert.tsx";
import Button from "@mui/material/Button";
import {Link} from "react-router-dom";

export default function RegisterInformationPage( ) {
const {email}  = useParams();
const [message, setMessage] = useState<string | undefined >(undefined);

    useEffect(() => {
        setMessage ("Congratulation! You are successfully registered. We have sent a confirmation email to " +  email +
            ". Please check your inbox and follow the instructions to complete the registration process.");
    }, [email]);
    return(
        <>
            {message && <OutlinedSuccessAlert message={message} />}
            <Link  to={"/"}><Button>Home</Button></Link>
            <Link to={"/authentication/login"}><Button>Login</Button></Link>
        </>
    );
}