import {IErrorResponse} from "../../interfaces/account";

export default function ErrorHandler(error : unknown){

    if(typeof(error) === "string")
        return error;
    else if((error as IErrorResponse).status == 500)
    {
        if((error as IErrorResponse).title === "System.Net.Sockets.SocketException" ||
            (error as IErrorResponse).title === "System.Net.Mail.SmtpException")
        {
            return "Oops, something went wrong during sending a confirmation to email." +
                "Contact an administrator or use form for confirmation";
        }
        return "Oops, something went wrong. Try again later!";
    }
    else
    {
         if( (error as IErrorResponse).errors)
         {
             let errorText : string = "";

             for (const e of (error as IErrorResponse).errors) {
                 errorText = errorText + e.description + ": " + e.code + ". ";
             }

             return errorText;
         }else{
             return "Unknown Error"
         }
    }
}