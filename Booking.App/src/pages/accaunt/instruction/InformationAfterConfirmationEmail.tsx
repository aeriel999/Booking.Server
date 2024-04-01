import {useAppSelector} from "../../../hooks/redux";
import {useEffect, useState} from "react";


export  default function InformationAfterConfirmationEmail(){
    const {user} = useAppSelector(state => state.account);
    const [isRealtorInfo, setIsRealtorInfo] = useState<boolean>(false);

    useEffect(() => {
       if(user)
       {
           if (user.role.toLowerCase().includes('realtor'))
               setIsRealtorInfo(true)
       }
    }, [user]);

    return(
        <>
            {
                isRealtorInfo && (<h1>Instruction for realtor</h1>)
            }

            <h1>Instruction for User</h1>
        </>
    )
}